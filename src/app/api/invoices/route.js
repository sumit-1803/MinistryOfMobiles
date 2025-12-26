import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invoice from '@/models/Invoice';
import InventoryItem from '@/models/InventoryItem';
import Product from '@/models/Product';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const invoices = await Invoice.find({}).sort({ date: -1 });
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getSession();
    if (session?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { type, items, ...invoiceData } = body;

    // Start a session for transaction if possible, but for now we'll do it sequentially
    // MongoDB standalone doesn't support transactions easily without replica set, 
    // so we will be careful with order of operations.

    const savedInvoiceItems = [];

    if (type === 'BUY') {
      // Create Inventory Items
      for (const item of items) {
        const inventoryItemData = {
          productName: item.productName, // Snapshot
          brand: item.brand,
          category: item.category,
          status: 'Available',
          imei1: item.imei1,
          imei2: item.imei2,
          serialNumber: item.serialNumber,
          storage: item.storage,
          ram: item.ram,
          color: item.color,
          batteryHealth: item.batteryHealth,
          accessoriesIncluded: item.accessoriesIncluded,
          condition: item.condition,
          physicalDamage: item.physicalDamage,
          warrantyType: item.warrantyType,
          warrantyValidTill: item.warrantyValidTill,
          purchasePrice: item.purchasePrice,
          expectedSellingPrice: item.expectedSellingPrice,
        };

        if (item.productId) {
          inventoryItemData.product = item.productId;
        }

        const newInventoryItem = await InventoryItem.create(inventoryItemData);

        savedInvoiceItems.push({
          inventoryItem: newInventoryItem._id,
          productName: item.productName,
          imei: item.imei1 || item.serialNumber,
          amount: item.purchasePrice,
        });
      }
    } else if (type === 'SELL') {
      // Update Inventory Items to Sold
      for (const item of items) {
        const inventoryItem = await InventoryItem.findById(item.inventoryItemId);
        if (!inventoryItem) {
          throw new Error(`Inventory item not found: ${item.inventoryItemId}`);
        }
        if (inventoryItem.status === 'Sold') {
           throw new Error(`Item already sold: ${inventoryItem.imei1 || inventoryItem.serialNumber}`);
        }

        inventoryItem.status = 'Sold';
        await inventoryItem.save();

        savedInvoiceItems.push({
          inventoryItem: inventoryItem._id,
          productName: inventoryItem.productName,
          imei: inventoryItem.imei1 || inventoryItem.serialNumber,
          amount: item.sellingPrice,
        });
      }
    }

    // Create Invoice
    const newInvoice = await Invoice.create({
      ...invoiceData,
      type,
      items: savedInvoiceItems,
    });

    return NextResponse.json(newInvoice, { status: 201 });

  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import SearchableSelect from '@/components/admin/SearchableSelect';

export default function CreateInvoicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'BUY'; // BUY or SELL

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); // For BUY
  const [inventory, setInventory] = useState([]); // For SELL
  
  // Invoice State
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    paymentMode: 'Cash',
    paymentId: '',
    notes: '',
    // Party Details
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    gstNumber: '',
    sellerName: '',
    sellerPhone: '',
    sellerAddress: '',
    idProofType: 'Adhaar',
    idProofNumber: '',
  });

  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  
  // Temporary Item State for adding
  const [currentItem, setCurrentItem] = useState({
    productId: '', // For BUY
    productName: '', // Custom name or from Product
    inventoryItemId: '', // For SELL
    imei1: '',
    imei2: '',
    serialNumber: '',
    storage: '',
    ram: '',
    color: '',
    batteryHealth: '',
    accessoriesIncluded: false,
    condition: 'Good',
    physicalDamage: '',
    warrantyType: 'No Warranty',
    warrantyValidTill: '',
    purchasePrice: 0,
    expectedSellingPrice: 0,
    sellingPrice: 0, // For SELL
  });

  useEffect(() => {
    if (type === 'BUY') {
      fetchProducts();
    } else {
      fetchAvailableInventory();
    }
  }, [type]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products'); // Assuming this exists or I need to use the public one? 
    // Wait, the public one might return everything. Let's check if there is an admin product list API.
    // The admin products page uses server actions or client fetch? 
    // Let's assume /api/products returns all products for now or I might need to create a specific one.
    // Actually, I'll use the existing /api/products if available, or just fetch from the same place the admin products page does.
    // Let's try /api/products first.
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products || data); // Handle pagination structure if any
    }
  };

  const fetchAvailableInventory = async () => {
    const res = await fetch('/api/inventory');
    if (res.ok) {
      const data = await res.json();
      setInventory(data.filter(i => i.status === 'Available'));
    }
  };

  const handleAddItem = () => {
    if (type === 'BUY') {
      // Allow adding without productId, but require a name
      const product = products.find(p => p._id === currentItem.productId);
      const finalName = currentItem.productName || (product ? product.title : '');
      
      if (!finalName) return alert('Please enter a Product Name');

      const newItem = { 
        ...currentItem, 
        productName: finalName, 
        brand: product ? product.brand : '', 
        category: product ? product.category : '' 
      };

      if (editingIndex >= 0) {
        const updatedItems = [...items];
        updatedItems[editingIndex] = newItem;
        setItems(updatedItems);
        setEditingIndex(-1);
      } else {
        setItems([...items, newItem]);
      }
    } else {
      if (!currentItem.inventoryItemId) return alert('Select an item');
      const invItem = inventory.find(i => i._id === currentItem.inventoryItemId);
      const newItem = { 
        ...currentItem, 
        inventoryItemId: invItem._id,
        productName: invItem.productName,
        imei1: invItem.imei1,
        serialNumber: invItem.serialNumber
      };

      if (editingIndex >= 0) {
        const updatedItems = [...items];
        updatedItems[editingIndex] = newItem;
        setItems(updatedItems);
        setEditingIndex(-1);
      } else {
        setItems([...items, newItem]);
      }
    }
    // Reset current item (keep some defaults)
    setCurrentItem(prev => ({
      ...prev,
      imei1: '', imei2: '', serialNumber: '', 
      purchasePrice: 0, expectedSellingPrice: 0, sellingPrice: 0,
      inventoryItemId: '', productName: ''
    }));
  };

  const handleEditItem = (index) => {
    const item = items[index];
    setCurrentItem(item);
    setEditingIndex(index);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(-1);
      // Reset current item
      setCurrentItem({
        productId: '', productName: '', inventoryItemId: '',
        imei1: '', imei2: '', serialNumber: '', 
        storage: '', ram: '', color: '', batteryHealth: '',
        accessoriesIncluded: false, condition: 'Good', physicalDamage: '',
        warrantyType: 'No Warranty', warrantyValidTill: '',
        purchasePrice: 0, expectedSellingPrice: 0, sellingPrice: 0,
      });
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + Number(type === 'BUY' ? item.purchasePrice : item.sellingPrice), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (type === 'BUY') {
        if (invoiceData.sellerPhone.length > 10) return alert('Seller Phone must be max 10 digits');
        if (invoiceData.idProofType === 'Adhaar' && invoiceData.idProofNumber.length !== 12) return alert('Adhaar Number must be 12 digits');
    } else {
        if (invoiceData.customerPhone.length > 10) return alert('Customer Phone must be max 10 digits');
    }

    setLoading(true);

    try {
      const payload = {
        ...invoiceData,
        type,
        totalAmount: calculateTotal(),
        items
      };

      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create invoice');
      }

      const createdInvoice = await res.json();
      router.push(`/admin/invoices/${createdInvoice._id}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/invoices" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Create {type} Invoice
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Invoice Details */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Invoice Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
              <input 
                type="text" 
                required
                className="mt-1 block w-full border rounded-md p-2"
                value={invoiceData.invoiceNumber}
                onChange={e => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input 
                type="date" 
                required
                className="mt-1 block w-full border rounded-md p-2"
                value={invoiceData.date}
                onChange={e => setInvoiceData({...invoiceData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
              <select 
                className="mt-1 block w-full border rounded-md p-2"
                value={invoiceData.paymentMode}
                onChange={e => setInvoiceData({...invoiceData, paymentMode: e.target.value})}
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            {invoiceData.paymentMode !== 'Cash' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment ID / Ref</label>
                <input 
                  type="text" 
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                  value={invoiceData.paymentId}
                  onChange={e => setInvoiceData({...invoiceData, paymentId: e.target.value})}
                />
              </div>
            )}
          </div>
        </div>

        {/* Party Details */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            {type === 'BUY' ? 'Seller Details' : 'Customer Details'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {type === 'BUY' ? (
              <>
                <input placeholder="Seller Name" className="border p-2 rounded" required value={invoiceData.sellerName} onChange={e => setInvoiceData({...invoiceData, sellerName: e.target.value})} />
                <input 
                    placeholder="Seller Phone" 
                    className="border p-2 rounded" 
                    required 
                    maxLength={10}
                    value={invoiceData.sellerPhone} 
                    onChange={e => setInvoiceData({...invoiceData, sellerPhone: e.target.value.replace(/\D/g, '')})} 
                />
                <input placeholder="Address" className="border p-2 rounded" value={invoiceData.sellerAddress} onChange={e => setInvoiceData({...invoiceData, sellerAddress: e.target.value})} />
                <div className="flex gap-2">
                    <select 
                        className="border p-2 rounded w-1/3"
                        value={invoiceData.idProofType}
                        onChange={e => setInvoiceData({...invoiceData, idProofType: e.target.value})}
                    >
                        <option>Adhaar</option>
                        <option>PAN</option>
                        <option>Voter ID</option>
                        <option>Driving License</option>
                    </select>
                    <input 
                        placeholder="ID Proof Number" 
                        className="border p-2 rounded w-2/3" 
                        value={invoiceData.idProofNumber} 
                        onChange={e => setInvoiceData({...invoiceData, idProofNumber: e.target.value})} 
                    />
                </div>
              </>
            ) : (
              <>
                <input placeholder="Customer Name" className="border p-2 rounded" required value={invoiceData.customerName} onChange={e => setInvoiceData({...invoiceData, customerName: e.target.value})} />
                <input 
                    placeholder="Customer Phone" 
                    className="border p-2 rounded" 
                    required 
                    maxLength={10}
                    value={invoiceData.customerPhone} 
                    onChange={e => setInvoiceData({...invoiceData, customerPhone: e.target.value.replace(/\D/g, '')})} 
                />
                <input placeholder="Address" className="border p-2 rounded" value={invoiceData.customerAddress} onChange={e => setInvoiceData({...invoiceData, customerAddress: e.target.value})} />
                <input placeholder="GST Number (Optional)" className="border p-2 rounded" value={invoiceData.gstNumber} onChange={e => setInvoiceData({...invoiceData, gstNumber: e.target.value})} />
              </>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Items</h2>
          
          {/* Add Item Form */}
          <div className="bg-gray-50 p-4 rounded-md space-y-4 border">
            <h3 className="text-sm font-medium text-gray-700">Add Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {type === 'BUY' ? (
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SearchableSelect
                    options={products.map(p => ({
                      value: p._id,
                      label: `${p.brand} ${p.title} (${p.category})`
                    }))}
                    value={currentItem.productId}
                    onChange={(val) => {
                        const product = products.find(p => p._id === val);
                        setCurrentItem({
                            ...currentItem, 
                            productId: val,
                            productName: product ? product.title : ''
                        });
                    }}
                    placeholder="Select Product Model..."
                  />
                  <input 
                    placeholder="Product Name (Editable)" 
                    className="border p-2 rounded" 
                    value={currentItem.productName} 
                    onChange={e => setCurrentItem({...currentItem, productName: e.target.value})} 
                  />
                </div>
              ) : (
                <div className="md:col-span-3">
                  <select 
                    className="w-full border p-2 rounded"
                    value={currentItem.inventoryItemId}
                    onChange={e => {
                      const item = inventory.find(i => i._id === e.target.value);
                      setCurrentItem({
                        ...currentItem, 
                        inventoryItemId: e.target.value,
                        sellingPrice: item ? item.expectedSellingPrice : 0
                      });
                    }}
                  >
                    <option value="">Select Inventory Item...</option>
                    {inventory.map(i => (
                      <option key={i._id} value={i._id}>
                        {i.productName} - {i.imei1 || i.serialNumber} - ₹{i.expectedSellingPrice}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {type === 'BUY' && (
                <>
                  <input placeholder="IMEI 1" className="border p-2 rounded" value={currentItem.imei1} onChange={e => setCurrentItem({...currentItem, imei1: e.target.value})} />
                  <input placeholder="IMEI 2" className="border p-2 rounded" value={currentItem.imei2} onChange={e => setCurrentItem({...currentItem, imei2: e.target.value})} />
                  <input placeholder="Serial Number" className="border p-2 rounded" value={currentItem.serialNumber} onChange={e => setCurrentItem({...currentItem, serialNumber: e.target.value})} />
                  <input placeholder="Storage" className="border p-2 rounded" value={currentItem.storage} onChange={e => setCurrentItem({...currentItem, storage: e.target.value})} />
                  <input placeholder="RAM" className="border p-2 rounded" value={currentItem.ram} onChange={e => setCurrentItem({...currentItem, ram: e.target.value})} />
                  <input placeholder="Color" className="border p-2 rounded" value={currentItem.color} onChange={e => setCurrentItem({...currentItem, color: e.target.value})} />
                  <input placeholder="Battery Health %" type="number" className="border p-2 rounded" value={currentItem.batteryHealth} onChange={e => setCurrentItem({...currentItem, batteryHealth: e.target.value})} />
                  <select className="border p-2 rounded" value={currentItem.condition} onChange={e => setCurrentItem({...currentItem, condition: e.target.value})}>
                    <option>Like New</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                  </select>
                  <div>
                    <label className="block text-xs text-gray-500">Purchase Price</label>
                    <input placeholder="Purchase Price" type="number" className="border p-2 rounded w-full" value={currentItem.purchasePrice} onChange={e => setCurrentItem({...currentItem, purchasePrice: e.target.value})} />
                  </div>
                  {/* Optional Fields */}
                  <div>
                    <label className="block text-xs text-gray-500">Expected Sell Price (Optional)</label>
                    <input placeholder="Expected Sell Price" type="number" className="border p-2 rounded w-full" value={currentItem.expectedSellingPrice} onChange={e => setCurrentItem({...currentItem, expectedSellingPrice: e.target.value})} />
                  </div>
                </>
              )}

              {type === 'SELL' && (
                <div className="md:col-span-1">
                  <label className="block text-xs text-gray-500">Selling Price</label>
                  <input 
                    type="number" 
                    className="w-full border p-2 rounded" 
                    value={currentItem.sellingPrice} 
                    onChange={e => setCurrentItem({...currentItem, sellingPrice: e.target.value})} 
                  />
                </div>
              )}
            </div>
            <button 
              type="button" 
              onClick={handleAddItem}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              {editingIndex >= 0 ? 'Update Item' : 'Add Item'}
            </button>
          </div>

          {/* Items List */}
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">ID</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm">{item.productName}</td>
                    <td className="px-4 py-2 text-sm">{item.imei1 || item.serialNumber}</td>
                    <td className="px-4 py-2 text-sm text-right">
                      ₹{type === 'BUY' ? item.purchasePrice : item.sellingPrice}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button type="button" onClick={() => handleEditItem(idx)} className="text-blue-600 hover:text-blue-800 mr-2">
                        Edit
                      </button>
                      <button type="button" onClick={() => handleRemoveItem(idx)} className="text-red-600 hover:text-red-800">
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="2" className="px-4 py-2 text-right font-bold">Total:</td>
                  <td className="px-4 py-2 text-right font-bold">₹{calculateTotal()}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={loading || items.length === 0}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Create ${type} Invoice`}
          </button>
        </div>
      </form>
    </div>
  );
}

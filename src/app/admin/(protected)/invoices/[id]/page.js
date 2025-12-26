'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';

export default function InvoiceViewPage() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const res = await fetch('/api/invoices'); // We need a single invoice endpoint or filter client side. 
      // Ideally we should have /api/invoices/[id].
      // For now, I'll fetch all and find one, or update the API.
      // Updating the API is better practice but for speed I might just fetch list if it's small.
      // Actually, let's just update the API to handle ID query or param.
      // But wait, I can just fetch all and filter for now to save a step, assuming list isn't huge yet.
      // Better: Let's assume /api/invoices returns list, and I'll filter here.
      if (res.ok) {
        const data = await res.json();
        const found = data.find(i => i._id === id);
        setInvoice(found);
      }
    } catch (error) {
      console.error('Failed to fetch invoice', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading invoice...</div>;
  if (!invoice) return <div className="p-8 text-center">Invoice not found</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body {
            background: white;
          }
        }
      `}</style>
      {/* No Print Header */}
      <div className="print:hidden flex justify-between items-center mb-6">
        <Link href="/admin/invoices" className="text-gray-500 hover:text-gray-700 flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Invoices
        </Link>
        <button 
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print Invoice
        </button>
      </div>

      {/* Invoice Content - Printable Area */}
      <div className="bg-white p-8 shadow-lg print:shadow-none print:p-0" id="invoice-content">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Ministry of Mobiles</h1>
            <p className="text-gray-500 mt-2">Premium Pre-owned Devices</p>
            <p className="text-sm text-gray-500 mt-1">B- 138, Gali No. 7, Block C, Kiran Garden, Nawada, New Delhi, 110059</p>
            <p className="text-sm text-gray-500">Phone: +91 93105 20254</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-900">{invoice.type} INVOICE</h2>
            <p className="text-gray-600 mt-2">#{invoice.invoiceNumber}</p>
            <p className="text-gray-600">Date: {new Date(invoice.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Party Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-gray-500 font-semibold uppercase text-xs tracking-wider mb-2">
              {invoice.type === 'SELL' ? 'Bill To:' : 'Purchase From:'}
            </h3>
            <div className="text-gray-900 font-medium">
              {invoice.type === 'SELL' ? invoice.customerName : invoice.sellerName}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {invoice.type === 'SELL' ? invoice.customerPhone : invoice.sellerPhone}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {invoice.type === 'SELL' ? invoice.customerAddress : invoice.sellerAddress}
            </div>
            {invoice.gstNumber && (
              <div className="text-gray-600 text-sm mt-1">GST: {invoice.gstNumber}</div>
            )}
          </div>
          <div className="text-right">
             {/* Payment Info */}
             <h3 className="text-gray-500 font-semibold uppercase text-xs tracking-wider mb-2">Payment Details</h3>
             <div className="text-gray-900">{invoice.paymentMode}</div>
             {invoice.paymentId && <div className="text-gray-600 text-sm">Ref: {invoice.paymentId}</div>}
          </div>
        </div>

        {/* Items Table */}
        <table className="min-w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Item Description</th>
              <th className="text-left py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">IMEI / Serial</th>
              <th className="text-right py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-4 text-sm text-gray-900 font-medium">{item.productName}</td>
                <td className="py-4 text-sm text-gray-500">{item.imei}</td>
                <td className="py-4 text-sm text-gray-900 text-right">₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="pt-4 text-right font-bold text-gray-900">Total Amount:</td>
              <td className="pt-4 text-right font-bold text-xl text-blue-600">₹{invoice.totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        {/* Footer / Terms */}
        <div className="border-t pt-8 text-sm text-gray-500">
          <p className="font-semibold mb-2">Terms & Conditions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Goods once sold will not be taken back unless there is a manufacturing defect covered under warranty.</li>
            <li>Warranty as per manufacturer or shop terms specified.</li>
            <li>Subject to local jurisdiction.</li>
          </ul>
          <div className="mt-8 text-center text-xs text-gray-400">
            This is a computer generated invoice.
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Edit, Trash, CheckCircle, Globe, X } from 'lucide-react';
import { updateInventoryItem, deleteInventoryItem, markAsSold, pushToProduct } from '@/app/actions/inventory';

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/inventory');
      if (res.ok) {
        const data = await res.json();
        setInventory(data);
      }
    } catch (error) {
      console.error('Failed to fetch inventory', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({
      productName: item.productName,
      expectedSellingPrice: item.expectedSellingPrice,
      condition: item.condition,
      status: item.status
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const res = await updateInventoryItem(editingItem._id, editForm);
    if (res.success) {
      setInventory(inventory.map(i => i._id === editingItem._id ? { ...i, ...editForm } : i));
      setIsEditModalOpen(false);
      setEditingItem(null);
    } else {
      alert('Failed to update: ' + res.error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const res = await deleteInventoryItem(id);
    if (res.success) {
      setInventory(inventory.filter(i => i._id !== id));
    } else {
      alert('Failed to delete: ' + res.error);
    }
  };

  const handleMarkSold = async (id) => {
    const res = await markAsSold(id);
    if (res.success) {
      setInventory(inventory.map(i => i._id === id ? { ...i, status: res.status } : i));
    } else {
      alert('Failed to update status: ' + res.error);
    }
  };

  const handlePushToProduct = async (id) => {
    if (!confirm('Create a new Product on the website from this item?')) return;
    const res = await pushToProduct(id);
    if (res.success) {
      alert('Product created successfully!');
    } else {
      alert('Failed to push to product: ' + res.error);
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.imei1?.includes(searchTerm) ||
      item.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="p-8 text-center">Loading inventory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <Link 
          href="/admin/invoices/create?type=BUY" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stock (Buy)
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Product Name, IMEI, or Serial..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IMEI / Serial</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Buy/Exp. Sell)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Buy/Exp. Sell)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                  <div className="text-sm text-gray-500">{item.storage} | {item.color}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {item.imei1 && <div>IMEI: {item.imei1}</div>}
                  {item.serialNumber && <div>SN: {item.serialNumber}</div>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {item.condition}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>Buy: ₹{item.purchasePrice}</div>
                  <div className="text-green-600">Sell: ₹{item.expectedSellingPrice}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex flex-col gap-2 items-end">
                    <button 
                      onClick={() => handleEditClick(item)} 
                      className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors w-full justify-end"
                      title="Edit Item Details"
                    >
                      <span className="mr-2">Edit</span>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleMarkSold(item._id)} 
                      className={`flex items-center px-3 py-1 rounded-md transition-colors w-full justify-end ${
                        item.status === 'Sold' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={item.status === 'Sold' ? 'Mark as Available' : 'Mark as Sold'}
                    >
                      <span className="mr-2">{item.status === 'Sold' ? 'Sold' : 'Mark Sold'}</span>
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handlePushToProduct(item._id)} 
                      className="flex items-center px-3 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-md transition-colors w-full justify-end"
                      title="Create Public Product from this Item"
                    >
                      <span className="mr-2">Push to Web</span>
                      <Globe className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item._id)} 
                      className="flex items-center px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors w-full justify-end"
                      title="Delete Item Permanently"
                    >
                      <span className="mr-2">Delete</span>
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No inventory items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Inventory Item</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdateItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border rounded-md p-2"
                  value={editForm.productName}
                  onChange={e => setEditForm({...editForm, productName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Selling Price</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full border rounded-md p-2"
                  value={editForm.expectedSellingPrice}
                  onChange={e => setEditForm({...editForm, expectedSellingPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Condition</label>
                <select 
                  className="mt-1 block w-full border rounded-md p-2"
                  value={editForm.condition}
                  onChange={e => setEditForm({...editForm, condition: e.target.value})}
                >
                  <option>Like New</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  className="mt-1 block w-full border rounded-md p-2"
                  value={editForm.status}
                  onChange={e => setEditForm({...editForm, status: e.target.value})}
                >
                  <option>Available</option>
                  <option>Sold</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

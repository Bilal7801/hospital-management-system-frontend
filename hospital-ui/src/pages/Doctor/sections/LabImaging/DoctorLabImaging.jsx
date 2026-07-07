import React, { useState, useEffect } from 'react';
import LabImagingOrders from './LabImagingOrders';
import LabImagingResults from './LabImagingResults';
import { PlusCircle, Database, Loader2 } from 'lucide-react';
import api from '../../../../api/axios';

const DoctorLabImaging = () => {
  const [activeTab, setActiveTab] = useState('results');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/doctor/lab-imaging/my-orders');
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

 const handleCreateOrder = async (newOrder) => {
  try {
    const payload = {
      patientId: 8, // ← Replace with actual selected patient ID
      testName: newOrder.testName,
      notes: newOrder.clinicalNotes,
      category: newOrder.category
    };

    console.log("Sending:", payload);

    const res = await api.post('/doctor/lab-imaging/order', payload);
    alert("Order placed successfully!");
    fetchOrders();
    setActiveTab('results');
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Failed: " + (err.response?.data?.message || "Unknown error"));
  }
};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Diagnostics & Imaging Lab Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Manage lab tests and imaging orders</p>
        </div>

        <div className="inline-flex p-1 bg-gray-100 rounded-xl border self-start sm:self-center">
          <button
            onClick={() => setActiveTab('results')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'results' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>View Results</span>
          </button>
          <button
            onClick={() => setActiveTab('order')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'order' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : activeTab === 'results' ? (
        <LabImagingResults records={orders} onRefresh={fetchOrders} />
      ) : (
        <LabImagingOrders onSubmit={handleCreateOrder} onCancel={() => setActiveTab('results')} />
      )}
    </div>
  );
};

export default DoctorLabImaging;
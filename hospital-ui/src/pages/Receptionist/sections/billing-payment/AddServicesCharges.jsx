import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const AddServicesCharges = ({ invoiceId, onTotalUpdate, onNext }) => {
  const [items, setItems] = useState([]);
  const [newService, setNewService] = useState({
    description: '',
    quantity: 1,
    unitPrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Calculate Total Safely
  const totalSum = items.reduce((acc, item) => {
    const qty = parseFloat(item.qty) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return acc + (qty * price);
  }, 0);

  // Load existing services if needed (future enhancement)
  useEffect(() => {
    if (invoiceId) {
      setItems([]);
    }
  }, [invoiceId]);

  const handleAddService = async () => {
    if (!newService.description.trim()) {
      setError("Please enter service description");
      return;
    }
    if (!newService.unitPrice || parseFloat(newService.unitPrice) <= 0) {
      setError("Please enter valid unit price");
      return;
    }
    if (!invoiceId) {
      setError("Please create an invoice first");
      return;
    }

    setAdding(true);
    setError('');

    try {
      const payload = {
        paymentId: invoiceId,
        description: newService.description.trim(),
        quantity: parseInt(newService.quantity),
        unitPrice: parseFloat(newService.unitPrice)
      };

      const response = await api.post('/receptionist/billing/add-service', payload);
      
      if (response.data.success) {
        const newItem = {
          id: Date.now(),
          desc: newService.description.trim(),
          qty: parseInt(newService.quantity),
          unitPrice: parseFloat(newService.unitPrice)
        };

        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        setNewService({ description: '', quantity: 1, unitPrice: '' });
        setSuccessMsg("Service added successfully");

        // Update parent total
        if (onTotalUpdate) {
          onTotalUpdate(response.data.currentTotal || totalSum + (newItem.qty * newItem.unitPrice));
        }

        setTimeout(() => setSuccessMsg(''), 2000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add service");
    } finally {
      setAdding(false);
    }
  };

  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    
    // Update total in parent
    const newTotal = updatedItems.reduce((acc, item) => {
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return acc + (qty * price);
    }, 0);
    
    if (onTotalUpdate) onTotalUpdate(newTotal);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-blue-600" />
            Append Diagnostic Procedures & Treatment Consumables
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Add services to invoice #{invoiceId || 'N/A'}</p>
        </div>
      </div>

      {/* Add New Service Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100">
        <div className="md:col-span-6">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Service / Procedure Description</label>
          <input
            type="text"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            placeholder="e.g., ECG, Blood Test, Consultation"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Qty</label>
          <input
            type="number"
            min="1"
            value={newService.quantity}
            onChange={(e) => setNewService({ ...newService, quantity: e.target.value })}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 text-center"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Unit Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={newService.unitPrice}
            onChange={(e) => setNewService({ ...newService, unitPrice: e.target.value })}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600"
          />
        </div>
        <div className="md:col-span-1 flex items-end">
          <button
            onClick={handleAddService}
            disabled={adding || !newService.description.trim() || !newService.unitPrice}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
            Add
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          {error}
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-start gap-3">
          <CheckCircle className="w-5 h-5 mt-0.5" />
          {successMsg}
        </div>
      )}

      {/* Services Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-5 py-3.5 text-left">Fee Item Description</th>
              <th className="px-5 py-3.5 text-center w-24">Quantity</th>
              <th className="px-5 py-3.5 text-right w-36">Unit Price</th>
              <th className="px-5 py-3.5 text-right w-36">Net Sum</th>
              <th className="px-5 py-3.5 text-center w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-4 font-medium text-gray-800">{item.desc}</td>
                  <td className="px-5 py-4 text-center font-bold text-gray-600">{item.qty}</td>
                  <td className="px-5 py-4 text-right font-medium text-gray-500">${parseFloat(item.unitPrice).toFixed(2)}</td>
                  <td className="px-5 py-4 text-right font-bold text-gray-800">${(parseFloat(item.qty) * parseFloat(item.unitPrice)).toFixed(2)}</td>
                  <td className="px-5 py-4 text-center">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-5 py-8 text-center text-gray-400">
                  No services added yet. Add services above.
                </td>
              </tr>
            )}

            {/* Total Row */}
            {items.length > 0 && (
              <tr className="bg-blue-50/30 font-bold border-t border-gray-200">
                <td colSpan="3" className="px-5 py-4 text-right text-gray-500 uppercase text-[10px] tracking-wide">Gross Subtotal Amount:</td>
                <td className="px-5 py-4 text-right text-sm text-blue-600 font-black">${totalSum.toFixed(2)}</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {items.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide uppercase px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            Continue to Discounts →
          </button>
        </div>
      )}
    </div>
  );
};

export default AddServicesCharges;
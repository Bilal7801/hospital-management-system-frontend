import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, CreditCard, Smartphone, Building2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Credit Card',
      name: 'Visa',
      provider: 'Visa Inc.',
      lastDigits: '4242',
      expiryDate: '12/2026',
      isActive: true,
      percentage: 45,
      totalTransactions: 185,
    },
    {
      id: 2,
      type: 'Debit Card',
      name: 'MasterCard',
      provider: 'MasterCard',
      lastDigits: '5555',
      expiryDate: '08/2025',
      isActive: true,
      percentage: 30,
      totalTransactions: 123,
    },
    {
      id: 3,
      type: 'Online Transfer',
      name: 'Bank Transfer',
      provider: 'Direct Bank',
      lastDigits: 'N/A',
      expiryDate: 'N/A',
      isActive: true,
      percentage: 20,
      totalTransactions: 82,
    },
    {
      id: 4,
      type: 'Cash',
      name: 'Direct Cash',
      provider: 'Manual',
      lastDigits: 'N/A',
      expiryDate: 'N/A',
      isActive: true,
      percentage: 5,
      totalTransactions: 20,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Credit Card',
    name: '',
    provider: '',
    lastDigits: '',
    expiryDate: '',
  });

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      type: 'Credit Card',
      name: '',
      provider: '',
      lastDigits: '',
      expiryDate: '',
    });
    setShowModal(true);
  };

  const handleEdit = (method) => {
    setEditingId(method.id);
    setFormData({
      type: method.type,
      name: method.name,
      provider: method.provider,
      lastDigits: method.lastDigits,
      expiryDate: method.expiryDate,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      setPaymentMethods(
        paymentMethods.map((m) =>
          m.id === editingId ? { ...m, ...formData } : m
        )
      );
    } else {
      setPaymentMethods([
        ...paymentMethods,
        { ...formData, id: Date.now(), isActive: true, percentage: 0, totalTransactions: 0 },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setPaymentMethods(paymentMethods.filter((m) => m.id !== id));
  };

  const toggleActive = (id) => {
    setPaymentMethods(
      paymentMethods.map((m) =>
        m.id === id ? { ...m, isActive: !m.isActive } : m
      )
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Credit Card':
      case 'Debit Card':
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case 'Online Transfer':
        return <Smartphone className="w-6 h-6 text-green-600" />;
      case 'Cash':
        return <Building2 className="w-6 h-6 text-orange-600" />;
      default:
        return <CreditCard className="w-6 h-6 text-gray-600" />;
    }
  };

  const totalTransactions = paymentMethods.reduce((sum, m) => sum + m.totalTransactions, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/billing')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Billing
      </button>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Payment Methods Management
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage and configure payment methods
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Active Methods
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {paymentMethods.filter((m) => m.isActive).length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Total Transactions
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {totalTransactions}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Payment Methods
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {paymentMethods.length}
          </p>
        </div>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-50 p-3 rounded-xl">
                  {getIcon(method.type)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {method.name}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    {method.type}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(method)}
                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-all cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Provider:</span>
                <span className="text-sm font-semibold text-gray-900">
                  {method.provider}
                </span>
              </div>

              {method.lastDigits !== 'N/A' && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Card Number:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    •••• {method.lastDigits}
                  </span>
                </div>
              )}

              {method.expiryDate !== 'N/A' && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Expiry:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {method.expiryDate}
                  </span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-600">
                  Usage: {method.percentage}%
                </span>
                <span className="text-xs font-semibold text-gray-600">
                  {method.totalTransactions} txn
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${method.percentage}%` }}
                />
              </div>
            </div>

            {/* Status */}
            <button
              onClick={() => toggleActive(method.id)}
              className={`w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                method.isActive
                  ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {method.isActive ? '✓ Active' : 'Inactive'}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Payment Method' : 'Add Payment Method'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Online Transfer</option>
                  <option>Cash</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Visa"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Provider
                </label>
                <input
                  type="text"
                  value={formData.provider}
                  onChange={(e) =>
                    setFormData({ ...formData, provider: e.target.value })
                  }
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Visa Inc."
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">
                    Last Digits
                  </label>
                  <input
                    type="text"
                    value={formData.lastDigits}
                    onChange={(e) =>
                      setFormData({ ...formData, lastDigits: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="4242"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">
                    Expiry
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="12/2026"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 px-4 border border-gray-200 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PaymentMethods;

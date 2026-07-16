import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

const MakePaymentOnline = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const targetInvoice = location.state?.invoice;

  const [formData, setFormData] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate 2-second payment gateway response latency
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center max-w-lg mx-auto space-y-6 my-10">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-950">Payment Successful</h3>
          <p className="text-sm text-gray-500 font-medium">The digital invoice has been successfully cleared. A confirmation slip was compiled and sent to your profile email.</p>
        </div>
        <button 
          onClick={() => navigate('../history')}
          className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-6 py-3 rounded-xl transition-all"
        >
          View Payment History
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-xl border border-gray-150 text-gray-500">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Online Secure Checkout</h3>
          <p className="text-sm text-gray-500 font-medium">Clear open balances securely via credit card gateway integration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cardholder Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 outline-none font-medium"
              placeholder="e.g. Justin Mason" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Card Number</label>
            <div className="relative">
              <input 
                type="text" 
                required
                maxLength="19"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 outline-none font-medium"
                placeholder="4242 •••• •••• 4242" 
              />
              <CreditCard className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expiration Date</label>
              <input 
                type="text" 
                required
                maxLength="5"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 outline-none font-medium text-center"
                placeholder="MM/YY" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">CVV Code</label>
              <input 
                type="password" 
                required
                maxLength="4"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 outline-none font-medium text-center"
                placeholder="•••" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={processing}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-200 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-red-500/10 flex items-center justify-center gap-2"
          >
            {processing ? <><Loader2 className="w-4 h-4 animate-spin" /> Authorizing Transaction...</> : "Submit Secure Payment"}
          </button>
        </form>

        {/* Order Summary Summary Panel */}
        <div className="space-y-4">
          <div className="p-5 border border-red-100 rounded-2xl bg-red-50/10 space-y-4">
            <h4 className="text-xs font-extrabold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-600" /> Summary Order
            </h4>

            {targetInvoice ? (
              <div className="space-y-4 text-xs font-medium text-gray-600">
                <div className="flex justify-between">
                  <span>Invoice ID</span>
                  <span className="font-bold text-gray-900">{targetInvoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category Description</span>
                  <span className="text-right text-gray-900 max-w-[140px] font-semibold">{targetInvoice.description}</span>
                </div>
                <hr className="border-red-100/50" />
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-900">Grand Total Due</span>
                  <span className="font-extrabold text-red-700">${targetInvoice.amount.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 font-semibold leading-relaxed">No specific invoice select. Please pick an open transaction item to trigger full billing checkout.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentOnline;
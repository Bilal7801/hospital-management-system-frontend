import React, { useState, useEffect } from 'react';
import { CreditCard, Banknote, Landmark, CheckCircle2, Loader2 } from 'lucide-react';
import api from '../../../../api/axios';

const AcceptPayment = ({ 
  invoiceId, 
  totalAmount = 0, 
  patientName, 
  onPaymentSuccess 
}) => {
  const [payMode, setPayMode] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [receivedAmount, setReceivedAmount] = useState(totalAmount.toString());
  const [loadingMethods, setLoadingMethods] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const netPayable = totalAmount;
  const calculatedChange = Math.max(0, Number(receivedAmount || 0) - netPayable);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get('/receptionist/billing/payment-methods');
        setPaymentMethods(response.data || []);
        
        if (response.data?.length > 0) {
          setSelectedMethodId(response.data[0].id);
          setPayMode(response.data[0].name.toLowerCase());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMethods(false);
      }
    };
    fetchPaymentMethods();
  }, []);

  const handleProcessPayment = async () => {
    if (!invoiceId) {
      setError("Invoice ID is missing. Please go back and create invoice.");
      return;
    }
    if (!selectedMethodId) {
      setError("Please select a payment method");
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const payload = {
        invoiceId: invoiceId,           // ← Most Important
        amount: netPayable,
        paymentMethodId: selectedMethodId,
        notes: `Payment for Invoice #${invoiceId} - ${patientName || 'Patient'}`
      };

      const response = await api.post('/receptionist/billing/process-payment', payload);

      if (response.data?.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onPaymentSuccess) onPaymentSuccess();
        }, 800);
      } else {
        setError(response.data?.message || "Payment failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment processing failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          Multi-Channel Transaction Settlement Terminal
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Invoice #{invoiceId || 'N/A'} • {patientName || 'Patient'} • Total Due: ${netPayable.toFixed(2)}
        </p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-gray-700">Select Payment Method</label>
        {loadingMethods ? (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-4">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading methods...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  setSelectedMethodId(method.id);
                  setPayMode(method.name.toLowerCase());
                }}
                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all cursor-pointer text-center ${
                  selectedMethodId === method.id 
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {method.name.toLowerCase().includes('cash') && <Banknote className="w-6 h-6" />}
                {method.name.toLowerCase().includes('card') && <CreditCard className="w-6 h-6" />}
                {method.name.toLowerCase().includes('upi') && <Landmark className="w-6 h-6" />}
                <span className="text-sm font-bold">{method.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {payMode === 'cash' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-gray-50 border border-gray-100 p-5 rounded-xl">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Cash Received ($)</label>
            <input
              type="number"
              step="0.01"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
              className="w-full px-5 py-3 text-lg border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-blue-600 font-bold"
            />
          </div>
          <div className="flex flex-col justify-center pl-2">
            <span className="text-xs text-gray-500 font-bold">Change to Return</span>
            <span className="text-3xl font-black text-emerald-600">
              ${calculatedChange.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button 
          onClick={handleProcessPayment}
          disabled={processing || !selectedMethodId || success}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold text-sm tracking-wide uppercase px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Payment...
            </>
          ) : success ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Payment Completed ✓
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Complete Payment & Print Receipt
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}
    </div>
  );
};

export default AcceptPayment;
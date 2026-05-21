import React, { useState } from 'react';
import { CreditCard, Banknote, Landmark, CheckCircle2 } from 'lucide-react';

const AcceptPayment = () => {
  const [payMode, setPayMode] = useState('cash');
  const [receivedAmount, setReceivedAmount] = useState('2500');
  const netPayable = 2390;

  const calculatedChange = Math.max(0, Number(receivedAmount) - netPayable);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          Multi-Channel Transaction Settlement Terminal
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Select real-time collection mode, capture input cash balances, and execute clear-outs</p>
      </div>

      {/* Selector Group Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { id: 'cash', label: 'Hard Physical Cash', icon: Banknote },
          { id: 'card', label: 'Credit / Debit POS', icon: CreditCard },
          { id: 'online', label: 'Instant UPI / Online QR', icon: Landmark }
        ].map((mode) => {
          const Icon = mode.icon;
          const selected = payMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setPayMode(mode.id)}
              className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all cursor-pointer text-center ${
                selected 
                  ? 'bg-blue-50/50 border-blue-600 text-blue-700 shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${selected ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="text-xs font-bold">{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cash Register Processing Subfield */}
      {payMode === 'cash' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-gray-50/50 border border-gray-100 p-4 rounded-xl text-xs">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Tender Cash Received Amount</label>
            <input
              type="number"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-bold shadow-inner"
            />
          </div>
          <div className="flex flex-col justify-center space-y-0.5 pl-2">
            <span className="text-gray-400 font-bold uppercase text-[10px]">Calculated Counter Cash Return Change:</span>
            <span className="text-xl font-black text-emerald-600">₹{calculatedChange.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Submit Button Row */}
      <div className="flex justify-end pt-2 border-t border-gray-50">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center gap-2 cursor-pointer">
          <CheckCircle2 className="w-4 h-4" /> Complete Settlement Ledger & Close Encounter
        </button>
      </div>
    </div>
  );
};

export default AcceptPayment;
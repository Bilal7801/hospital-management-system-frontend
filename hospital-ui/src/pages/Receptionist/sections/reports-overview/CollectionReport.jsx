import React from 'react';
import { Banknote, TrendingUp, CreditCard, Wallet } from 'lucide-react';

const CollectionReport = () => {
  const transactionalLogs = [
    { ref: "TXN-88092", method: "Cash Desk", label: "Consultation Charge", amt: "Rs. 2,500", time: "12:10 PM" },
    { ref: "TXN-88074", method: "Credit Card", label: "Diagnostic Ultrasound Scan", amt: "Rs. 6,200", time: "11:45 AM" },
    { ref: "TXN-88011", method: "Online Gateway", label: "Pharmacy Item Clearance", amt: "Rs. 1,850", time: "09:30 AM" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-emerald-600" />
            Daily Cash & Digital Collection Audit Sheet
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Consolidated summary tracking desk point-of-sale settlements securely</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md flex items-center gap-1 font-sans shadow-sm">
            <TrendingUp className="w-3.5 h-3.5" /> Total: Rs. 48,950
          </span>
        </div>
      </div>

      {/* Transaction Records Data Grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left">Transaction Ref ID</th>
              <th className="px-5 py-3 text-left">Settlement Method</th>
              <th className="px-5 py-3 text-left">Allocation Category</th>
              <th className="px-5 py-3 text-left">Timestamp</th>
              <th className="px-5 py-3 text-right">Settled Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {transactionalLogs.map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5 font-mono font-bold text-gray-800">{log.ref}</td>
                <td className="px-5 py-3.5 font-semibold text-gray-700 flex items-center gap-1.5">
                  {log.method === 'Cash Desk' ? <Wallet className="w-3.5 h-3.5 text-amber-500" /> : <CreditCard className="w-3.5 h-3.5 text-blue-500" />}
                  {log.method}
                </td>
                <td className="px-5 py-3.5 text-gray-500 font-medium">{log.label}</td>
                <td className="px-5 py-3.5 text-gray-400 font-mono font-semibold">{log.time}</td>
                <td className="px-5 py-3.5 text-right font-black text-gray-800 font-mono">{log.amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionReport;
import React from 'react';
import { Calendar, Tag, Check, Award } from 'lucide-react';

const PaymentHistory = () => {
  const pastPayments = [
    { id: "TXN-9021", desc: "Consultation - Dr. Sarah Johnson", amount: 120.00, date: "12 Apr 2026", method: "MasterCard •••• 4242", status: "Successful" },
    { id: "TXN-7104", desc: "Laboratory Specimen Processing Fee", amount: 45.00, date: "11 Feb 2026", method: "Visa •••• 1009", status: "Successful" },
    { id: "TXN-6601", desc: "Outpatient Joint Evaluation Checkup", amount: 150.00, date: "10 Feb 2026", method: "Apple Pay", status: "Successful" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Payment Audit Logs</h3>
        <p className="text-sm text-gray-500 font-medium">Historical trace logs of cleared invoice statements and card transactions.</p>
      </div>

      <div className="overflow-hidden border border-gray-100 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Billing Item</th>
              <th className="p-4">Date Settled</th>
              <th className="p-4">Method Used</th>
              <th className="p-4">Settled Amount</th>
              <th className="p-4 text-center">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {pastPayments.map((txn) => (
              <tr key={txn.id} className="hover:bg-red-50/10 transition-colors">
                <td className="p-4 font-bold text-red-700">{txn.id}</td>
                <td className="p-4 font-bold text-gray-900">{txn.desc}</td>
                <td className="p-4 text-gray-500 font-medium">{txn.date}</td>
                <td className="p-4 text-gray-600 font-medium">{txn.method}</td>
                <td className="p-4 text-gray-950 font-bold">${txn.amount.toFixed(2)}</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-md uppercase tracking-wider text-[10px]">
                    <Check className="w-3 h-3" /> {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
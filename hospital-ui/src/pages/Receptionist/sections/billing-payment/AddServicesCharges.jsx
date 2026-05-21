import React, { useState } from 'react';
import { PlusCircle, Trash2, ShieldAlert } from 'lucide-react';

const AddServicesCharges = () => {
  const [items, setItems] = useState([
    { id: 1, desc: "Standard Consultation Base Rate", qty: 1, unitPrice: 800 },
    { id: 2, desc: "ECG Diagnostic Screening Run", qty: 1, unitPrice: 1500 },
    { id: 3, desc: "Disposable Sterile Syringe Assembly Pack", qty: 2, unitPrice: 45 },
  ]);

  const totalSum = items.reduce((acc, current) => acc + (current.qty * current.unitPrice), 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <div className="border-b border-gray-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-blue-600" />
            Append Diagnostic Procedures & Treatment Consumables
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Incorporate dynamic extra bills, laboratory codes, or protective wear tariffs</p>
        </div>
        <button className="bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-sm">
          <PlusCircle className="w-3.5 h-3.5 text-blue-600" /> Add Custom Line Row
        </button>
      </div>

      {/* Ledger Matrix Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-collapse">
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
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-4 font-bold text-gray-800">{item.desc}</td>
                <td className="px-5 py-4 text-center font-bold text-gray-600">{item.qty}</td>
                <td className="px-5 py-4 text-right font-medium text-gray-500">₹{item.unitPrice.toFixed(2)}</td>
                <td className="px-5 py-4 text-right font-bold text-gray-800">₹{(item.qty * item.unitPrice).toFixed(2)}</td>
                <td className="px-5 py-4 text-center">
                  <button className="text-gray-400 hover:text-rose-600 transition-colors cursor-pointer p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {/* Running Total Indicator Row */}
            <tr className="bg-blue-50/20 font-bold border-t border-gray-200">
              <td colSpan="3" className="px-5 py-4 text-right text-gray-500 uppercase text-[10px] tracking-wide">Gross Subtotal Amount:</td>
              <td className="px-5 py-4 text-right text-sm text-blue-600 font-black">₹{totalSum.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddServicesCharges;
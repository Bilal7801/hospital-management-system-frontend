import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, AlertTriangle, ArrowRight, DollarSign } from 'lucide-react';

const ViewInvoices = () => {
  const navigate = useNavigate();

  const invoices = [
    { id: "INV-2026-004", description: "Cardiology Visit & EKG Assessment", amount: 180.00, issueDate: "15 May 2026", dueDate: "15 Jun 2026", status: "Overdue" },
    { id: "INV-2026-005", description: "Comprehensive Lipid & Complete Blood Panel", amount: 95.00, issueDate: "28 May 2026", dueDate: "28 Jun 2026", status: "Unpaid" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Outstanding Invoices</h3>
        <p className="text-sm text-gray-500 font-medium">Review pending clinic balances, consultation charges, and procedural fees.</p>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div 
            key={invoice.id} 
            className={`p-5 border rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all ${
              invoice.status === 'Overdue' 
                ? 'border-red-150 bg-red-50/5 hover:border-red-300' 
                : 'border-gray-150 bg-gray-50/10 hover:border-red-100'
            }`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md">{invoice.id}</span>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  invoice.status === 'Overdue' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-amber-50 text-amber-700'
                }`}>
                  {invoice.status}
                </span>
              </div>
              <h4 className="text-base font-bold text-gray-900">{invoice.description}</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 font-semibold">
                <span>Issued: {invoice.issueDate}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Due: {invoice.dueDate}
                </span>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-0 pt-4 md:pt-0 border-gray-100 gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Total Balance</span>
                <span className="text-xl font-extrabold text-gray-900 mt-0.5 block">${invoice.amount.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => navigate('../pay', { state: { invoice } })}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-red-500/10 flex items-center gap-1.5"
              >
                Pay Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewInvoices;
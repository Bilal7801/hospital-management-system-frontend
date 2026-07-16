import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Wallet, FileSpreadsheet, CreditCard, History, Printer } from 'lucide-react';
import PatientHeader from '../../components/PatientHeader';

const PaymentsLayout = () => {
  const tabs = [
    { icon: FileSpreadsheet, label: "View Invoices", path: "invoices" },
    { icon: CreditCard, label: "Make Payment (Online)", path: "pay" },
    { icon: History, label: "Payment History", path: "history" },
    { icon: Printer, label: "Download Receipts", path: "receipts" },
  ];

  return (
    <div>
      {/* Patient Header Section */}
      <PatientHeader 
        title="Payments, Invoices & Accounts" 
        subtitle="Manage secure online copays, audit past balances, view diagnostic invoices, and export transaction tax slips." 
      />

      {/* Grid Side-by-Side Container */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side Menu List Card (Themed Red Style to perfectly match blueprint 8) */}
        <div className="w-full lg:w-80 bg-white border border-red-100 rounded-2xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
            <Wallet className="text-red-600 w-8 h-8" />
          </div>
          <h4 className="text-sm font-bold text-red-900 tracking-wider text-center uppercase">
            8. Payments & Invoices
          </h4>
          <p className="text-xs text-gray-400 mt-1 text-center font-medium">Verify financial transaction statuses</p>

          <hr className="w-full border-gray-100 my-4" />

          {/* Dynamic Navigation Action Items */}
          <div className="w-full space-y-2">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-red-650 bg-red-600 text-white border-transparent shadow-md shadow-red-600/10'
                      : 'bg-white text-gray-700 border-red-100/50 hover:bg-red-50/30'
                  }`
                }
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right Side Rendering Window */}
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PaymentsLayout;
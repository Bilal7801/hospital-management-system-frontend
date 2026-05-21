import React, { useState } from 'react';
import { Receipt, PlusCircle, Percent, CreditCard, Printer } from 'lucide-react';
import CreateInvoice from './CreateInvoice';
import AddServicesCharges from './AddServicesCharges';
import ApplyDiscounts from './ApplyDiscounts';
import AcceptPayment from './AcceptPayment';
import PrintEmailReceipt from './PrintEmailReceipt';

const BillingPayment = () => {
  const [activeTab, setActiveTab] = useState('create-invoice');

  // Hardcoded structure syncing exactly with step 7 of the flowchart roadmap
  const tabs = [
    { id: 'create-invoice', label: '1. Create Invoice', icon: Receipt },
    { id: 'add-services', label: '2. Add Services / Charges', icon: PlusCircle },
    { id: 'apply-discounts', label: '3. Apply Discounts', icon: Percent },
    { id: 'accept-payment', label: '4. Accept Payment', icon: CreditCard },
    { id: 'print-receipt', label: '5. Print / Email Receipt', icon: Printer },
  ];

  return (
    <div className="space-y-4">
      {/* Brand Royal Blue Header Banner */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Billing & Financial Terminal</h1>
        <p className="text-blue-100 text-sm mt-1">
          Generate accurate medical invoices, add supplementary procedural item line costs, and process multi-channel payments cleanly
        </p>
      </div>

      {/* Horizontal Nav Bar Array */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-wrap gap-2 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Render Context Target */}
      <div className="transition-all duration-200">
        {activeTab === 'create-invoice' && <CreateInvoice />}
        {activeTab === 'add-services' && <AddServicesCharges />}
        {activeTab === 'apply-discounts' && <ApplyDiscounts />}
        {activeTab === 'accept-payment' && <AcceptPayment />}
        {activeTab === 'print-receipt' && <PrintEmailReceipt />}
      </div>
    </div>
  );
};

export default BillingPayment;
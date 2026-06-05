import React, { useState } from 'react';
import { Receipt, PlusCircle, Percent, CreditCard, Printer } from 'lucide-react';
import CreateInvoice from './CreateInvoice';
import AddServicesCharges from './AddServicesCharges';
import ApplyDiscounts from './ApplyDiscounts';
import AcceptPayment from './AcceptPayment';
import PrintEmailReceipt from './PrintEmailReceipt';

const BillingPayment = () => {
  const [activeTab, setActiveTab] = useState('create-invoice');

  // Shared State Across Tabs
  const [invoiceId, setInvoiceId] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  const tabs = [
    { id: 'create-invoice', label: '1. Create Invoice', icon: Receipt },
    { id: 'add-services', label: '2. Add Services / Charges', icon: PlusCircle },
    { id: 'apply-discounts', label: '3. Apply Discounts', icon: Percent },
    { id: 'accept-payment', label: '4. Accept Payment', icon: CreditCard },
    { id: 'print-receipt', label: '5. Print / Email Receipt', icon: Printer },
  ];

  // Helper to move to next tab
  const goToNextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Billing & Financial Terminal</h1>
        <p className="text-blue-100 text-sm mt-1">
          Generate accurate medical invoices, manage charges, apply discounts and process payments
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <div 
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : index < tabs.findIndex(t => t.id === activeTab) 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-gray-100'
              }`}
            >
              Step {index + 1}
            </div>
            {index < tabs.length - 1 && <div className="text-gray-300">→</div>}
          </React.Fragment>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-1.5 flex flex-wrap gap-1 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content with Shared Props */}
      <div className="transition-all duration-200">
        {activeTab === 'create-invoice' && (
          <CreateInvoice 
            onInvoiceCreated={(id, name) => {
              setInvoiceId(id);
              setPatientName(name);
              goToNextTab();
            }} 
          />
        )}

        {activeTab === 'add-services' && (
          <AddServicesCharges 
            invoiceId={invoiceId} 
            onTotalUpdate={setTotalAmount}
            onNext={goToNextTab}
          />
        )}

        {activeTab === 'apply-discounts' && (
          <ApplyDiscounts 
            invoiceId={invoiceId} 
            currentTotal={totalAmount}
            onDiscountApplied={setTotalAmount}
            onNext={goToNextTab}
          />
        )}

        {activeTab === 'accept-payment' && (
          <AcceptPayment 
            invoiceId={invoiceId} 
            totalAmount={totalAmount}
            patientName={patientName}
            onPaymentSuccess={() => {
              setIsPaid(true);
              goToNextTab();
            }}
          />
        )}

        {activeTab === 'print-receipt' && (
          <PrintEmailReceipt 
            invoiceId={invoiceId} 
            patientName={patientName}
            totalAmount={totalAmount}
            isPaid={isPaid}
          />
        )}
      </div>
    </div>
  );
};

export default BillingPayment;
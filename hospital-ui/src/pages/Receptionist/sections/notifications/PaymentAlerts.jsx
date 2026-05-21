import React from 'react';
import { CreditCard, XCircle, CheckCircle } from 'lucide-react';

const PaymentAlerts = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <CreditCard className="w-4 h-4 text-emerald-600" />
        Payment Transaction Alerts
      </h3>
      <div className="space-y-3">
        <div className="p-3 border border-gray-100 rounded-xl bg-gray-50 text-xs flex justify-between items-center">
          <p className="font-bold text-gray-800">Transaction TXN-9982 Failed</p>
          <XCircle className="w-4 h-4 text-rose-500" />
        </div>
        <div className="p-3 border border-gray-100 rounded-xl bg-gray-50 text-xs flex justify-between items-center">
          <p className="font-bold text-gray-800">Transaction TXN-9981 Success</p>
          <CheckCircle className="w-4 h-4 text-emerald-500" />
        </div>
      </div>
    </div>
  );
};

export default PaymentAlerts;
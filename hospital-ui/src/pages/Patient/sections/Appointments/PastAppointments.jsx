import React from 'react';
import { FileText, Download, CheckCircle, Search } from 'lucide-react';

const PastAppointments = () => {
  const past = [
    { doctor: "Dr. Sarah Johnson", department: "Pediatrics", date: "12 Apr 2024", diagnosis: "Seasonal Allergy", fee: "₱800.00" },
    { doctor: "Dr. Aman Gupta", department: "Cardiology", date: "01 Mar 2024", diagnosis: "Regular Cardiovascular Fitness", fee: "₱1,200.00" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Past Consultations & Visits History</h3>
      
      <div className="space-y-4">
        {past.map((record, index) => (
          <div key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-all gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{record.doctor}</h4>
                <p className="text-xs text-gray-400">{record.date} • {record.department}</p>
                <p className="text-xs font-semibold text-gray-600 mt-1">Diagnosis: <span className="font-normal text-gray-500">{record.diagnosis}</span></p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
              <span className="text-sm font-bold text-gray-900">{record.fee}</span>
              <button className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:bg-blue-50 border border-blue-100 px-3 py-2 rounded-xl transition-all">
                <Download className="w-3.5 h-3.5" /> Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastAppointments;
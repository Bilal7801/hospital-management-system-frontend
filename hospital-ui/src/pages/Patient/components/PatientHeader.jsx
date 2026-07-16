import React from 'react';
import { User } from 'lucide-react';

const PatientHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1 font-medium">{subtitle}</p>
      </div>
      
      <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-gray-200">
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center overflow-hidden border border-emerald-100">
          <User className="text-emerald-600 w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Rahul Sharma</p>
          <p className="text-[10px] text-emerald-600 font-bold">Patient ID: #HMS-9921</p>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
import React, { useState } from 'react';
import { Receipt, Search, FileSpreadsheet } from 'lucide-react';

const CreateInvoice = () => {
  const [searchCode, setSearchCode] = useState('');
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-blue-600" />
          Initialize New Patient Billing Statement
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Lookup active encounters or verified check-ins to spin up a shell statement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
        <div className="md:col-span-2 relative">
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Patient Name or Appointment Reference ID <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Ex: APT-40921 or Vikas Khanna..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-semibold shadow-inner"
            />
          </div>
        </div>
        <button className="bg-blue-600 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-2 cursor-pointer h-[44px]">
          <FileSpreadsheet className="w-4 h-4" />
          Pull Encounter Records
        </button>
      </div>

      {/* Mock Encounter Summary Shell Output card */}
      <div className="border border-gray-100 rounded-xl bg-gray-50/40 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1">
          <span className="text-gray-400 font-bold block uppercase text-[10px]">Active Encounter Case</span>
          <p className="font-bold text-gray-800">Vikas Khanna (ID: #PT-9082)</p>
        </div>
        <div className="space-y-1">
          <span className="text-gray-400 font-bold block uppercase text-[10px]">Consulting Unit</span>
          <p className="font-semibold text-blue-600">Dr. Aman Gupta — Cardiology Hub</p>
        </div>
        <div className="space-y-1">
          <span className="text-gray-400 font-bold block uppercase text-[10px]">Standard Base Fee</span>
          <p className="font-bold text-gray-800">₹800.00</p>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
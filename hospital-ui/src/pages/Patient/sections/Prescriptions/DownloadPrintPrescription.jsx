import React, { useRef } from 'react';
import { Download, Printer, Heart, ShieldAlert } from 'lucide-react';

const DownloadPrintPrescription = () => {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top action panel */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Official Physical Prescription copies</h3>
          <p className="text-sm text-gray-500">Download high-definition PDF copies or print out physical signature slips.</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={handlePrint}
            className="flex-1 sm:flex-initial bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-3 rounded-xl transition-all shadow-md shadow-purple-500/10 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print Form
          </button>
        </div>
      </div>

      {/* Structured Prescription Pad Mock (Print friendly styling) */}
      <div 
        ref={printRef} 
        className="bg-white border-2 border-gray-150 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm relative print:border-0 print:shadow-none"
      >
        {/* Prescription Pad Header */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">MyHealth Hospital Group</h2>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">Metropolitan Central Facility</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-400 font-semibold">
            <p>ID: RX-4091</p>
            <p>DATE: 15 May 2026</p>
          </div>
        </div>

        {/* Patient Credentials */}
        <div className="grid grid-cols-2 gap-4 py-4 text-xs border-b border-gray-100/50">
          <div>
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Patient Name</p>
            <p className="font-bold text-gray-900 mt-0.5">Justin Mason</p>
          </div>
          <div>
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Attending Clinician</p>
            <p className="font-bold text-gray-900 mt-0.5">Dr. Aman Gupta (Cardiology)</p>
          </div>
        </div>

        {/* Rx Symbol Area */}
        <div className="py-8 min-h-[180px]">
          <span className="text-4xl font-extrabold text-purple-700 font-serif block">Rₓ</span>
          
          <div className="mt-4 pl-6 space-y-4">
            <div>
              <p className="text-sm font-bold text-gray-900">Atorvastatin 20mg</p>
              <p className="text-xs text-gray-500 mt-1">Disp: 30 Tablets (Daily dosage schedule of 1 tab in the evening, after dinner).</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Montelukast 10mg</p>
              <p className="text-xs text-gray-500 mt-1">Disp: 60 Tablets (Daily dosage schedule of 1 tab at bedtime).</p>
            </div>
          </div>
        </div>

        {/* Signature Area */}
        <div className="border-t border-gray-100 pt-6 mt-8 flex justify-between items-end text-xs">
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Verification Signature</p>
            <div className="w-32 h-8 border-b border-gray-300 mt-2 flex items-end">
              <span className="text-gray-300 italic text-[11px]">Aman Gupta, MD</span>
            </div>
          </div>
          <div className="text-right text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <p>Refill Allowance: Yes (2x)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPrintPrescription;
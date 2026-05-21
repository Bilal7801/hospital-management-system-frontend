import React, { useState } from 'react';
import { Ticket, Printer, Clock } from 'lucide-react';

const GenerateToken = () => {
  const [targetDoctor, setTargetDoctor] = useState('d1');

  // Dynamic preview simulator state
  const tokenPreview = {
    clinic: "Metro Care Medical Facility",
    number: "TKN-084",
    timestamp: "21-May-2026 | 12:15 PM",
    estWait: "Approx. 18 Mins"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Parameters Matrix Selection */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-blue-600" />
            Thermal Token Badge Issuer
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Generate standalone physical routing tokens for incoming healthcare walk-ins</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Target Healthcare Provider Allocation</label>
            <select
              value={targetDoctor}
              onChange={(e) => setTargetDoctor(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-semibold cursor-pointer transition-all"
            >
              <option value="d1">Dr. Aman Gupta (Cardiology Hub - OPD Desk 4)</option>
              <option value="d2">Dr. Sarah Johns (Orthopedic Suite - Room 102-A)</option>
              <option value="d3">Dr. Vikas Khanna (Pediatric Unit - Cabin B-3)</option>
            </select>
          </div>

          <div className="bg-blue-50/40 rounded-xl p-4 border border-blue-100/60 text-xs text-blue-800 font-medium leading-relaxed">
            <strong>System Operational Note:</strong> Creating a sequential token instantly logs the patient identifier block into the live dashboard and pushes notification matrix streams directly to the targeted doctor's dashboard app console.
          </div>
        </div>

        <div className="pt-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-2 cursor-pointer">
            <Printer className="w-4 h-4" />
            Execute Print & Issue Token Ticket
          </button>
        </div>
      </div>

      {/* Ticket Layout Preview Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between items-center text-center">
        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest border border-gray-200 rounded-md px-2 py-0.5 bg-gray-50">
          Live Badge Preview Output
        </span>

        {/* Thermal Ticket Render */}
        <div className="w-full max-w-[220px] border-2 border-dashed border-gray-300 rounded-xl p-4 my-6 bg-amber-50/10 shadow-inner flex flex-col items-center">
          <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-tight">{tokenPreview.clinic}</span>
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center my-3 text-blue-600 border border-blue-100">
            <Ticket className="w-4 h-4" />
          </div>
          <h2 className="text-2xl font-black tracking-wider text-gray-800">{tokenPreview.number}</h2>
          <div className="h-px bg-gray-200 w-full my-3"></div>
          
          <span className="text-[9px] text-gray-400 font-bold tracking-tight">{tokenPreview.timestamp}</span>
          
          <div className="mt-2.5 bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-md font-bold border border-emerald-100 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {tokenPreview.estWait}
          </div>
        </div>

        <p className="text-[10px] text-gray-400 font-semibold leading-normal px-2">
          Verify device synchronization constraints before deploying output to external point-of-sale terminal modules.
        </p>
      </div>
    </div>
  );
};

export default GenerateToken;
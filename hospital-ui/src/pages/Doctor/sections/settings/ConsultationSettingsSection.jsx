import React, { useState } from 'react';
import { DollarSign, Clock, CalendarRange, CheckSquare } from 'lucide-react';

const ConsultationSettingsSection = () => {
  const [fee, setFee] = useState('2500');
  const [slotDuration, setSlotDuration] = useState('15');

  const workingDays = [
    { day: 'Monday', active: true },
    { day: 'Tuesday', active: true },
    { day: 'Wednesday', active: true },
    { day: 'Thursday', active: true },
    { day: 'Friday', active: true },
    { day: 'Saturday', active: false },
    { day: 'Sunday', active: false }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Core Base Billing Parameter */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-600">
            <DollarSign className="w-4 h-4" />
            <h4 className="text-[10px] font-bold uppercase tracking-wider">Base Consultation Tariffs (PKR)</h4>
          </div>
          <input 
            type="number" 
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none font-bold text-gray-800"
          />
          <p className="text-[10px] text-gray-400 font-medium">Default financial asset value parsed during patient billing ledger initialization.</p>
        </div>

        {/* Temporal Slot Boundary Limits */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-purple-600">
            <Clock className="w-4 h-4" />
            <h4 className="text-[10px] font-bold uppercase tracking-wider">Default Operational Slot Delta</h4>
          </div>
          <select 
            value={slotDuration}
            onChange={(e) => setSlotDuration(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none font-bold text-gray-800 bg-white"
          >
            <option value="15">15 Minutes Window</option>
            <option value="30">30 Minutes Window</option>
            <option value="45">45 Minutes Window</option>
          </select>
          <p className="text-[10px] text-gray-400 font-medium">Determines density allocation calculations within pipeline schedules.</p>
        </div>
      </div>

      {/* Weekday Scheduler Mapping */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
          <CalendarRange className="w-4 h-4 text-gray-400" /> Operations Operational Grid Matrix
        </h4>
        
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
          {workingDays.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 text-xs bg-white hover:bg-slate-50/50">
              <span className="font-bold text-gray-700">{item.day}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={item.active} className="sr-only peer" />
                <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationSettingsSection;
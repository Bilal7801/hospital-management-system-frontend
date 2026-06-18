import React from 'react';
import { Pill, Activity, ShieldCheck, BarChart4 } from 'lucide-react';

const PrescriptionReportsSection = () => {
  const topMedications = [
    { rank: '#1', drug: 'Metformin HCl 500mg', class: 'Antidiabetic', trackingVolume: 1420, trend: 'Stable' },
    { rank: '#2', drug: 'Amoxicillin Trihydrate 250mg', class: 'Antibiotic Penicillin', trackingVolume: 980, trend: 'Spike (Seasonal)' },
    { rank: '#3', drug: 'Atorvastatin Calcium 10mg', class: 'Antilipemic Agent', trackingVolume: 840, trend: 'Stable' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-50 text-purple-700 rounded-lg"><BarChart4 className="w-4 h-4" /></div>
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pharmaceutical Distribution Analytics</h4>
            <p className="text-[11px] text-gray-400 font-medium">Tracking drug utilization logs patterns across longitudinal prescriptions.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topMedications.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">{item.rank} Most Prescribed</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                item.trend.includes('Spike') ? 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse' : 'bg-gray-50 text-gray-400 border-gray-100'
              }`}>{item.trend}</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{item.drug}</h4>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">Classification Subclass: <strong className="text-gray-600 font-semibold">{item.class}</strong></p>
            </div>
            <div className="border-t pt-2 mt-2 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>System Dispensations:</span>
              <strong className="text-gray-900 font-bold">{item.trackingVolume.toLocaleString()} units</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionReportsSection;
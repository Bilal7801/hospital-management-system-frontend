import React, { useState } from 'react';
import { Calendar, Pill, Clock, Search } from 'lucide-react';

const RemindersSection = ({ appointments, medications }) => {
  const [subView, setSubView] = useState('ALL');
  const [filterQuery, setFilterQuery] = useState('');

  return (
    <div className="space-y-4">
      {/* Filtering Control Structure */}
      <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex gap-1.5 w-full sm:w-auto">
          {['ALL', 'APPOINTMENTS', 'MEDICATIONS'].map(type => (
            <button
              key={type}
              onClick={() => setSubView(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                subView === type ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search unified alert feed..." 
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Grid Allocation Mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Appointments Module View Segment */}
        {(subView === 'ALL' || subView === 'APPOINTMENTS') && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Calendar Consultations Pipeline</h3>
            <div className="space-y-2">
              {appointments.filter(a => a.patientName.toLowerCase().includes(filterQuery.toLowerCase())).map(appt => (
                <div key={appt.id} className="bg-white border border-gray-200 p-3.5 rounded-xl shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-amber-50 text-amber-700 rounded-xl"><Calendar className="w-4 h-4" /></div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 text-xs truncate">{appt.patientName}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{appt.type}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold bg-slate-50 border px-2 py-1 rounded-lg text-gray-800">{appt.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medication Tracking Module View Segment */}
        {(subView === 'ALL' || subView === 'MEDICATIONS') && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Therapeutic Regime Watchdogs</h3>
            <div className="space-y-2">
              {medications.filter(m => m.patientName.toLowerCase().includes(filterQuery.toLowerCase())).map(med => (
                <div key={med.id} className="bg-white border border-gray-200 p-3.5 rounded-xl shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl"><Pill className="w-4 h-4" /></div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs">{med.patientName}</h4>
                      <p className="text-[11px] text-gray-600 font-medium">Titration Monitor: <span className="font-bold text-emerald-700">{med.medication}</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono border-t pt-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5" /> Trigger Metric: {med.schedule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersSection;
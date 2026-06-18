import React, { useState } from 'react';
import { UserSquare2, Plus, Search, BookmarkCheck, Clock } from 'lucide-react';

const ReceptionistNotesSection = () => {
  const [logs, setLogs] = useState([
    { id: 'REC-102', patient: 'Rahul Sharma', note: 'Collect 1,500 PKR outstanding billing audit balance for consultation add-ons.', time: '10 mins ago', status: 'Pending Verification' },
    { id: 'REC-101', patient: 'Sana Khan', note: 'Provide physical stamped certificate copies for medical discharge clearance verification.', time: '1 hour ago', status: 'Actioned & Closed' }
  ]);
  const [patientName, setPatientName] = useState('');
  const [instruction, setInstruction] = useState('');

  const handlePostNote = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !instruction.trim()) return;

    setLogs([
      {
        id: `REC-${Math.floor(Math.random() * 900) + 100}`,
        patient: patientName,
        note: instruction,
        time: 'Just Now',
        status: 'Pending Verification'
      },
      ...logs
    ]);
    setPatientName('');
    setInstruction('');
  };

  return (
    <div className="space-y-6 max-w-5xl animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Input Pipeline Composer Form */}
        <form onSubmit={handlePostNote} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
            <UserSquare2 className="w-4 h-4 text-indigo-600" /> Dispatch Front-Desk Directive
          </h3>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Patient Lookup Name</label>
            <input 
              type="text"
              placeholder="e.g. Zainab Ahmed"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Billing or Logistic Note Instructions</label>
            <textarea 
              rows={3}
              placeholder="Provide clean instructions (e.g., schedule follow-up ultrasound in 14 days, print specialist referral form)..."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none resize-none leading-relaxed"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5">
            <Plus className="w-4 h-4" /> Push Instruction Task
          </button>
        </form>

        {/* Large Scale Live Stream Logs Registry Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden lg:col-span-2">
          <div className="p-3 bg-gray-50 border-b flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Live Desk Action Streams</span>
            <span className="bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">{logs.length} Total Logs</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-[380px] overflow-y-auto">
            {logs.map(log => (
              <div key={log.id} className="p-4 flex items-start justify-between gap-4 text-xs hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900 font-bold">{log.patient}</strong>
                    <span className="text-[9px] font-mono font-bold bg-slate-100 px-1.5 rounded text-gray-500">{log.id}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium">{log.note}</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                    <Clock className="w-3 h-3" /> Transmitted: {log.time}
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                  log.status === 'Pending Verification' 
                    ? 'bg-amber-50 text-amber-700 border-amber-100' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                }`}>
                  {log.status === 'Pending Verification' ? <Clock className="w-3 h-3" /> : <BookmarkCheck className="w-3 h-3" />}
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReceptionistNotesSection;
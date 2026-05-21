import React, { useState } from 'react';
import { StickyNote, Send, ShieldAlert, Pin } from 'lucide-react';

const InternalRemarks = () => {
  const [remark, setRemark] = useState('');

  const activeDeskLogs = [
    { id: 1, author: "Desk Admin - Raza", scope: "Shift Turnover", text: "Lobby printer module requires roll tracking. Backup stock moved beneath reception drawer.", time: "11:04 AM" },
    { id: 2, author: "Triage Lead - Muzammil", scope: "Room Staging", text: "Cardiology Hub sub-room B requires validation override lock checking during afternoon routines.", time: "09:12 AM" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Logger input field */}
      <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
        <div className="border-b border-gray-100 pb-2">
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
            <StickyNote className="w-4 h-4 text-blue-600" /> Log Desk Internal Remark
          </h4>
          <p className="text-[11px] text-gray-400">Post quick administrative directives or handover alerts for the next staff shift</p>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Context Scope</label>
            <input 
              type="text" 
              placeholder="Ex: Shift Handover, Maintenance..." 
              className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-semibold"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Remark Description</label>
            <textarea 
              rows="4" 
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Provide clean notes context indicators..." 
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-medium resize-none"
            />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-2.5 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-1.5 cursor-pointer">
            <Send className="w-3.5 h-3.5" /> Commit Note Entry
          </button>
        </div>
      </div>

      {/* Board feed layout */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block pb-1 border-b border-gray-100">
          Active Administrative Desk Notice Board
        </span>

        <div className="space-y-2.5">
          {activeDeskLogs.map((log) => (
            <div key={log.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/40 text-xs hover:bg-gray-50 transition-colors relative group">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-gray-800">{log.author}</span>
                    <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-md">
                      {log.scope}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed tracking-normal pt-0.5">{log.text}</p>
                </div>
                <span className="text-[10px] font-mono text-gray-400 font-bold flex-shrink-0 flex items-center gap-1">
                  <Pin className="w-3 h-3 text-gray-300" /> {log.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternalRemarks;
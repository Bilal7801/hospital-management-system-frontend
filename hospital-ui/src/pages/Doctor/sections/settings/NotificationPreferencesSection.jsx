import React from 'react';
import { Bell, Mail, Smartphone, Monitor, ShieldAlert } from 'lucide-react';

const NotificationPreferencesSection = () => {
  const hooks = [
    { key: 'APPT_BOOK', label: 'Appointment Validation Hooks', desc: 'Dispatches triggers upon successful client scheduling.', email: true, push: true },
    { key: 'APPT_CANC', label: 'Cancellation Alert Realtime Streams', desc: 'Immediate notification protocols if patient deletes slot entries.', email: true, push: false },
    { key: 'LAB_READY', label: 'Diagnostic Lab Matrix Completeness', desc: 'Webhook triggers when chemical validation labs post data updates.', email: false, push: true }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-gray-400" /> Messaging & Webhook Event Routes
          </h3>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">Configure target parameters connecting active notifications with real-time tracking queues.</p>
        </div>
      </div>

      <div className="space-y-4">
        {hooks.map((item) => (
          <div key={item.key} className="p-4 border border-gray-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/30">
            <div className="space-y-0.5">
              <h5 className="text-xs font-bold text-gray-900">{item.label}</h5>
              <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-600">
                <input type="checkbox" defaultChecked={item.email} className="w-3.5 h-3.5 rounded text-blue-600 border-gray-300 focus:ring-0" />
                <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3 text-gray-400" /> Email</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-600">
                <input type="checkbox" defaultChecked={item.push} className="w-3.5 h-3.5 rounded text-blue-600 border-gray-300 focus:ring-0" />
                <span className="inline-flex items-center gap-1"><Monitor className="w-3 h-3 text-gray-400" /> Push App</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferencesSection;
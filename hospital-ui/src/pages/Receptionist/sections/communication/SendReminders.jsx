import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

const SendReminders = () => {
  const [template, setTemplate] = useState('appointment-reminder');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-600" />
          Automated Dispatch Transmission Center
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Fire custom appointment configurations directly onto digital channels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Param Fields Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Notification Preset Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-semibold cursor-pointer transition-all"
            >
              <option value="appointment-reminder">Schedule Confirmation Reminder</option>
              <option value="follow-up-alert">Routine Secondary Follow-Up Alert</option>
              <option value="delay-announcement">Clinical Slot Delay Announcement</option>
            </select>
          </div>

          <div className="space-y-2 pt-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <MessageCircle className="w-4 h-4" /> Trigger SMS Queue
            </button>
            <button className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <Mail className="w-4 h-4 text-gray-400" /> Dispatch Email Broadcast
            </button>
          </div>
        </div>

        {/* Live Payload Preview layout */}
        <div className="lg:col-span-2 bg-gray-50/50 border border-gray-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">
              Generated Notification Text Payload Preview
            </span>
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-inner text-xs font-medium text-gray-600 leading-relaxed font-mono">
              {template === 'appointment-reminder' && (
                <p>"Dear Patient, this is a prompt confirmation note regarding your check-in code scheduled at Metro Care today. Kindly secure arrival 15 mins early."</p>
              )}
              {template === 'follow-up-alert' && (
                <p>"Hello, your consulting practitioner has recommended a secondary check-in evaluation cycle. Kindly launch your reservation dashboard slot."</p>
              )}
              {template === 'delay-announcement' && (
                <p>"Notice: Due to an un-scheduled medical trauma contingency, current operational timelines are running 20 mins delayed. Thank you for your patience."</p>
              )}
            </div>
          </div>

          <div className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 pt-4 border-t border-gray-100/60 mt-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Integrated dynamic database tokens match localized recipient variables perfectly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendReminders;
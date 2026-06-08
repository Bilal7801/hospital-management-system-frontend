import React, { useState } from 'react';
import { BellRing, UserCheck, Stethoscope, AlertTriangle, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const AlertSystem = () => {
  const [activeAction, setActiveAction] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Dynamic state inputs allowing you to use real test emails directly in UI
  const [doctorEmail, setDoctorEmail] = useState('doctor-test@example.com');
  const [lobbySystemEmail, setLobbySystemEmail] = useState('lobby-display@example.com');
  const [emergencyGroupEmail, setEmergencyGroupEmail] = useState('your-own-email@domain.com');

  const [doctorName, setDoctorName] = useState('Dr. Smith (Room 102)');
  const [patientToken, setPatientToken] = useState('TK-8402');
  const [emergencyScope, setEmergencyScope] = useState('Triage Pod A & B');

  // Unified communication trigger aligned with updated Email-only C# backend
  const triggerAlert = async (actionId, payload) => {
    try {
      setActiveAction(actionId);
      setFeedback({ type: '', message: '' });

      // Post the payload configuration safely to the backend
      const response = await api.post('/receptionist/communication/send-reminder', {
        type: 'Email', // Forces system into your active Email routing service
        recipient: payload.recipient,
        template: payload.template,
        message: payload.message,
        patientId: 0,
        doctorId: 0
      });

      if (response.data.success) {
        setFeedback({
          type: 'success',
          message: `Notification successfully dispatched to: ${payload.recipient}`
        });
      }
    } catch (err) {
      console.error(`Alert system execution error on action [${actionId}]:`, err);
      setFeedback({
        type: 'error',
        message: err.response?.data?.message || 'Failed to dispatch alert. Verify recipient format or server logs.'
      });
    } finally {
      setActiveAction(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 text-slate-800">
      
      {/* Component Banner Header */}
      <div className="border-b border-slate-100 pb-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <BellRing className="w-5 h-5 text-blue-600 animate-pulse" />
          Real-Time Provider & Patient Notification Matrix
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Route internal clinic flash actions directly to practitioner inboxes and monitor system dispatch nodes.
        </p>
      </div>

      {/* Global Form Event Response Banner */}
      {feedback.message && (
        <div className={`p-4 rounded-xl text-sm font-semibold flex items-start gap-2.5 border transition-all ${
          feedback.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60' 
            : 'bg-rose-50 text-rose-800 border-rose-200/60'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Grid Configuration Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Action 1: Notify Doctor Screen */}
        <div className="border border-slate-200/80 rounded-2xl p-5 bg-slate-50/40 shadow-sm flex flex-col justify-between gap-5 hover:border-blue-300 transition-all group hover:bg-white">
          <div className="space-y-3">
            <div className="p-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Signal Next Patient Arrival</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1 font-medium">
                Sends an active notification update directly to the assigned practitioner's clinic inbox.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-2 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Target Practitioner</label>
                <select 
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
                >
                  <option value="Dr. Smith (Room 102)">Dr. Smith (Room 102)</option>
                  <option value="Dr. Adams (Room 105)">Dr. Adams (Room 105)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Practitioner Email</label>
                <input 
                  type="email"
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
                />
              </div>
            </div>
          </div>

          <button 
            disabled={activeAction !== null}
            onClick={() => triggerAlert('doctor-ping', {
              recipient: doctorEmail,
              template: 'appointment-reminder',
              message: `Notice to ${doctorName}: Your next scheduled check-in queue item is checked in and waiting outside your consultation frame.`
            })}
            className="w-full bg-white border border-slate-200 hover:bg-blue-600 text-slate-700 hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {activeAction === 'doctor-ping' && <Loader2 className="w-4 h-4 animate-spin" />}
            Ping Practitioner Inbox
          </button>
        </div>

        {/* Action 2: Notify Patient Lobby Display */}
        <div className="border border-slate-200/80 rounded-2xl p-5 bg-slate-50/40 shadow-sm flex flex-col justify-between gap-5 hover:border-emerald-300 transition-all group hover:bg-white">
          <div className="space-y-3">
            <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Broadcast Waiting Display Callout</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1 font-medium">
                Pushes a data queue sync update payload directly to the central lobby routing logs.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-2 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Active Patient Token</label>
                <input 
                  type="text"
                  value={patientToken}
                  onChange={(e) => setPatientToken(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Lobby Endpoint Email</label>
                <input 
                  type="email"
                  value={lobbySystemEmail}
                  onChange={(e) => setLobbySystemEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
                />
              </div>
            </div>
          </div>

          <button 
            disabled={activeAction !== null}
            onClick={() => triggerAlert('lobby-broadcast', {
              recipient: lobbySystemEmail,
              template: 'general',
              message: `SCREEN BROADCAST EVENT: Token Assignment reference [${patientToken}] please report directly to your assigned evaluation module.`
            })}
            className="w-full bg-white border border-slate-200 hover:bg-emerald-600 text-slate-700 hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {activeAction === 'lobby-broadcast' && <Loader2 className="w-4 h-4 animate-spin" />}
            Push To Waiting Monitors
          </button>
        </div>

        {/* Action 3: Urgent Warning Flag / Intercept */}
        <div className="border border-slate-200/80 rounded-2xl p-5 bg-slate-50/40 shadow-sm flex flex-col justify-between gap-5 hover:border-rose-300 transition-all group hover:bg-white">
          <div className="space-y-3">
            <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl w-fit group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Broadcast Priority Shift Intercept</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1 font-medium">
                Flag urgent triage updates across all operational pods to clear out room allocations immediately.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-2 pt-1">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Target Clinical Wing</label>
                <input 
                  type="text"
                  value={emergencyScope}
                  onChange={(e) => setEmergencyScope(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-700"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-0.5">Test Destination Email</label>
                <input 
                  type="text"
                  value={emergencyGroupEmail}
                  onChange={(e) => setEmergencyGroupEmail(e.target.value)}
                  placeholder="Enter a real email here to test"
                  className="w-full bg-white border border-rose-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-800 bg-rose-50/30 font-mono"
                />
              </div>
            </div>
          </div>

          <button 
            disabled={activeAction !== null}
            onClick={() => triggerAlert('emergency-flag', {
              recipient: emergencyGroupEmail,
              template: 'delay-announcement',
              message: `CRITICAL FLAG: Priority triage routing redirect occurring at ${emergencyScope}. Please hold general room allocations until clearing.`
            })}
            className="w-full bg-white border border-slate-200 hover:bg-rose-600 text-slate-700 hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {activeAction === 'emergency-flag' && <Loader2 className="w-4 h-4 animate-spin" />}
            Broadcast Emergency Flag
          </button>
        </div>

      </div>
    </div>
  );
};

export default AlertSystem;
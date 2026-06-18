import React, { useState } from 'react';
import { Send, ShieldCheck, ToggleLeft, ToggleRight, MessageSquare, Mail, Phone } from 'lucide-react';

const PatientMessagingSection = () => {
  const [isGatewayEnabled, setIsGatewayEnabled] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState('portal');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !isGatewayEnabled) return;
    
    alert(`Message dispatched via ${selectedChannel.toUpperCase()}: ${message}`);
    setMessage('');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      {/* Gateway Control Banner */}
      <div className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isGatewayEnabled ? 'bg-emerald-50/40 border-emerald-100' : 'bg-rose-50/40 border-rose-100'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg mt-0.5 ${isGatewayEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Patient Secure Communication Link</h4>
            <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
              {isGatewayEnabled 
                ? "Active: Patient has consented to encrypted digital notifications." 
                : "Suspended: Notification preferences disabled or opt-out recorded."}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsGatewayEnabled(!isGatewayEnabled)}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-600 border bg-white p-1.5 px-3 rounded-lg shadow-sm hover:bg-gray-50 transition-all"
        >
          {isGatewayEnabled ? (
            <><span>Disable Portal Link</span><ToggleRight className="w-5 h-5 text-emerald-600" /></>
          ) : (
            <><span>Enable Portal Link</span><ToggleLeft className="w-5 h-5 text-gray-400" /></>
          )}
        </button>
      </div>

      {/* Main Composition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <form onSubmit={handleSendMessage} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm md:col-span-2 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Channel Matrix</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'portal', label: 'Patient Portal', icon: MessageSquare },
                { id: 'email', label: 'Verified Email', icon: Mail },
                { id: 'sms', label: 'Direct SMS', icon: Phone }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  disabled={!isGatewayEnabled}
                  onClick={() => setSelectedChannel(item.id)}
                  className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                    selectedChannel === item.id 
                      ? 'bg-slate-900 border-slate-900 text-white' 
                      : 'bg-slate-50 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Message Payload Content</label>
            <textarea
              rows={5}
              disabled={!isGatewayEnabled}
              placeholder={isGatewayEnabled ? "Compose secure clinical bulletin, logistics notice, or automated broadcast follow-up updates..." : "Gateway is locked. Re-enable communications link to write."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50/20 resize-none leading-relaxed text-gray-800 disabled:bg-gray-100/50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex justify-end pt-2 border-t">
            <button
              type="submit"
              disabled={!message.trim() || !isGatewayEnabled}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" /> <span>Dispatch Broadcast</span>
            </button>
          </div>
        </form>

        {/* Audit Side Note Checklist */}
        <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 text-xs space-y-3">
          <h4 className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Transmission Safe Protocols</h4>
          <ul className="space-y-2 text-gray-500 font-medium list-disc pl-4 leading-relaxed">
            <li>Never send unencrypted baseline lab telemetry or raw diagnostic panels via generic SMS.</li>
            <li>All dispatches are recorded under system audit event trees for forensic tracing.</li>
            <li>Portal alerts automatically trigger smartphone cross-app push tokens.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientMessagingSection;
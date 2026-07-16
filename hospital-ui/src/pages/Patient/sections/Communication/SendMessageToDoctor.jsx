import React, { useState } from 'react';
import { Send, ShieldCheck, UserCheck, MessageSquare, AlertCircle } from 'lucide-react';

const SendMessageToDoctor = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("DR-JOHNSON");
  const [messages, setMessages] = useState([
    { sender: 'doctor', text: 'Hi Justin, I reviewed your recent blood panel. Your cholesterol is slightly elevated. Let us discuss dietary adjustments during our checkup.', time: 'Yesterday, 2:30 PM' },
    { sender: 'patient', text: 'Thanks Dr. Johnson! I have started tracking my meals and will bring my log to the appointment.', time: 'Yesterday, 4:15 PM' }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const doctors = [
    { id: "DR-JOHNSON", name: "Dr. Sarah Johnson (Cardiology) - Messaging Allowed" },
    { id: "DR-VANCE", name: "Dr. Evelyn Vance (Radiology) - Urgent Queries Only" }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, {
      sender: 'patient',
      text: newMessage,
      time: 'Just now'
    }]);
    setNewMessage("");
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Direct Patient Messaging</h3>
          <p className="text-sm text-gray-500 font-medium font-sans">Secure, HIPAA-compliant chat with your authorized care team physicians.</p>
        </div>

        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 outline-none text-xs bg-white font-bold text-gray-700"
        >
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.name}</option>
          ))}
        </select>
      </div>

      {/* HIPAA Warning Header */}
      <div className="p-4 border border-amber-100 bg-amber-50/50 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 font-medium leading-relaxed">
          <strong>Direct Messaging Guidelines:</strong> This channel is designed for non-emergency medical updates, prescription clarifications, and recovery tracking. For life-threatening emergencies, please dial <strong>911</strong> or contact your nearest emergency center directly.
        </div>
      </div>

      {/* Chat Window Box */}
      <div className="border border-gray-150 rounded-2xl overflow-hidden flex flex-col bg-gray-55/10">
        {/* Chat History Area */}
        <div className="p-6 h-80 overflow-y-auto space-y-4 bg-gray-50/30">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex flex-col max-w-[75%] ${msg.sender === 'patient' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                msg.sender === 'patient' 
                  ? 'bg-green-650 bg-green-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-150 rounded-bl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-gray-400 mt-1.5 font-bold tracking-wider uppercase">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Text Form */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-150 flex gap-3">
          <input
            type="text"
            required
            placeholder="Type your secure query..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-green-500/20 outline-none font-medium"
          />
          <button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-green-550/10 flex items-center justify-center gap-1.5 font-bold text-xs"
          >
            Send <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-green-700 bg-green-50/50 p-3 rounded-xl border border-green-100">
        <ShieldCheck className="w-4 h-4" />
        <span className="font-extrabold uppercase tracking-wider">End-To-End HIPAA Protected Communication Session</span>
      </div>
    </div>
  );
};

export default SendMessageToDoctor;
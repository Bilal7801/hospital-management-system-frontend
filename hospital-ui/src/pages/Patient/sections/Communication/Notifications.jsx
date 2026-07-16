import React, { useState } from 'react';
import { Bell, Check, Trash2, ShieldAlert } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "Report", text: "Your Lipid Profile laboratory test results have been officially published.", date: "Today, 10:45 AM", unread: true },
    { id: 2, type: "Appointment", text: "Reschedule request for Dr. Johnson's routine follow-up check has been approved.", date: "Yesterday, 3:15 PM", unread: true },
    { id: 3, type: "Security", text: "Your profile passcode was updated. If this wasn't you, please secure your account.", date: "12 May 2026", unread: false }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Personal Activity Alerts</h3>
          <p className="text-sm text-gray-500 font-medium">Keep up to date with automated schedule edits, diagnostic reports, and portal security status.</p>
        </div>

        {notifications.some(n => n.unread) && (
          <button 
            onClick={markAllRead}
            className="text-xs font-bold text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-xl transition-all"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-8 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400 font-medium text-xs">
            All caught up! No recent notifications are pending.
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 border rounded-xl flex justify-between items-center gap-4 transition-all ${
                notif.unread ? 'border-green-100 bg-green-50/10' : 'border-gray-100 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-0.5 ${
                  notif.unread ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-800 font-bold leading-relaxed">{notif.text}</p>
                  <div className="flex gap-2 items-center mt-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    <span>{notif.date}</span>
                    <span>•</span>
                    <span className={notif.unread ? 'text-green-600 font-extrabold' : ''}>
                      {notif.type}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => deleteNotification(notif.id)}
                className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
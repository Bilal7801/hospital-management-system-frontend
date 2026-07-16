import React from 'react';
import { Calendar, User, Clock, CheckCircle2 } from 'lucide-react';

const UpcomingAppointments = () => {
  const upcoming = [
    { doctor: "Dr. Aman Gupta", department: "Cardiology", date: "18 May 2024", time: "10:30 AM", type: "Regular Checkup" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Scheduled Visits</h3>
      
      {upcoming.length > 0 ? (
        <div className="space-y-4">
          {upcoming.map((appt, idx) => (
            <div key={idx} className="p-5 border border-blue-100 rounded-2xl bg-blue-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500 text-white rounded-xl shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900">{appt.doctor}</h4>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-0.5">{appt.department}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-2 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {appt.time}</span>
                    <span>•</span>
                    <span>{appt.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider block text-center md:inline-block">
                  Scheduled (In 2 Days)
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 font-medium">No upcoming consultations found.</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
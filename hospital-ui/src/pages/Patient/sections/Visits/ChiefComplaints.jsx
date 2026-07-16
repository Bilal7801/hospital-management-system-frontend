import React from 'react';
import { AlertTriangle, Clock, RefreshCcw } from 'lucide-react';

const ChiefComplaints = () => {
  const complaints = [
    { date: "15 May 2026", complaint: "Occasional localized chest pressure and moderate mid-afternoon fatigue.", duration: "Last 2 weeks", status: "Addressed", notes: "Discussed with Dr. Aman Gupta during routine cardiac evaluation. Evaluated with resting EKG." },
    { date: "12 Apr 2026", complaint: "Persistent sneezing, congestion, dry cough, and burning red eyes.", duration: "Last 5 days", status: "Addressed", notes: "Diagnosed as seasonal allergic rhinitis. Prescribed systemic antihistamines." }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Registered Chief Complaints</h3>
        <p className="text-sm text-gray-500">Subjective clinical reports submitted during your scheduling process or intake checks.</p>
      </div>

      <div className="space-y-4">
        {complaints.map((item, idx) => (
          <div key={idx} className="p-5 border border-amber-100 rounded-2xl bg-amber-50/20 flex flex-col gap-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 text-white rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.complaint}</h4>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Reported on {item.date} • {item.duration}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full shrink-0">
                {item.status}
              </span>
            </div>

            <div className="bg-white/60 rounded-xl p-3 border border-amber-100/30 text-xs text-gray-600">
              <strong>Clinical Action Taken:</strong> {item.notes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChiefComplaints;
import React from 'react';
import { Megaphone, Calendar, ShieldCheck, Heart } from 'lucide-react';

const Announcements = () => {
  const bulletins = [
    {
      id: "BUL-201",
      title: "Annual Seasonal Influenza Drive - 2026",
      summary: "Flu vaccination clinics are officially open daily at the Primary Outpatient Wing starting next Monday. No booking needed for standard enrolled patients.",
      date: "14 Jul 2026",
      urgent: false
    },
    {
      id: "BUL-198",
      title: "Holiday Operational Schedule Modifications",
      summary: "Please note our urgent diagnostic services and laboratory intake desks will run on 9:00 AM - 1:00 PM half-day rosters during the upcoming public holiday on June 19.",
      date: "01 Jun 2026",
      urgent: true
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Hospital Bulletins & Updates</h3>
        <p className="text-sm text-gray-500 font-medium">Review crucial hospital operational changes, public safety campaigns, and vaccination rollouts.</p>
      </div>

      <div className="space-y-4">
        {bulletins.map((announcement) => (
          <div 
            key={announcement.id} 
            className={`p-5 border rounded-2xl space-y-3 transition-all ${
              announcement.urgent 
                ? 'border-rose-100 bg-rose-50/10' 
                : 'border-green-100 bg-green-50/5'
            }`}
          >
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  announcement.urgent ? 'bg-rose-100 text-rose-700' : 'bg-green-100 text-green-700'
                }`}>
                  {announcement.urgent ? 'Urgent Alert' : 'General Notice'}
                </span>
                <span className="text-[10px] text-gray-400 font-bold tracking-wider">{announcement.id}</span>
              </div>
              <span className="text-xs text-gray-400 font-semibold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Published: {announcement.date}</span>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Megaphone className={`w-4 h-4 shrink-0 ${announcement.urgent ? 'text-rose-500' : 'text-green-600'}`} />
                {announcement.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">{announcement.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
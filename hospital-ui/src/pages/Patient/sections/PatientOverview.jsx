import React from 'react';
import { 
  Heart, Thermometer, Droplets, Calendar, FileText, ChevronRight, Download 
} from 'lucide-react';
import PatientHeader from '../components/PatientHeader';

const PatientOverview = () => {
  const healthRecords = [
    { id: 1, date: "12 May 2024", report: "Blood Test - CBC", doctor: "Dr. Aman Gupta", status: "Ready" },
    { id: 2, date: "05 May 2024", report: "X-Ray Chest", doctor: "Dr. Sarah Johnson", status: "Ready" },
  ];

  return (
    <div>
      <PatientHeader 
        title="Hello, Rahul! 👋" 
        subtitle="Stay on top of your health and recovery." 
      />

      {/* Health Vitals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <VitalCard icon={Heart} label="Heart Rate" value="72" unit="bpm" color="text-rose-500" bg="bg-rose-50" />
        <VitalCard icon={Thermometer} label="Body Temp" value="98.6" unit="°F" color="text-orange-500" bg="bg-orange-50" />
        <VitalCard icon={Droplets} label="Blood Sugar" value="110" unit="mg/dL" color="text-blue-500" bg="bg-blue-50" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Upcoming Appointment */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Next Appointment</h3>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">In 2 Days</span>
          </div>
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <Calendar className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Dr. Aman Gupta</p>
              <p className="text-sm text-gray-500">General Checkup • 10:30 AM</p>
            </div>
            <button className="ml-auto p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-sm">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Records</h3>
          <div className="space-y-4">
            {healthRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{record.report}</p>
                    <p className="text-[11px] text-gray-400">{record.date} • {record.doctor}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-emerald-600 text-xs font-bold hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all">
                  <Download className="w-4 h-4" /> PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const VitalCard = ({ icon: Icon, label, value, unit, color, bg }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-6">
    <div className={`${bg} ${color} p-4 rounded-xl`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-xs font-medium text-gray-400">{unit}</span>
      </div>
    </div>
  </div>
);

export default PatientOverview;
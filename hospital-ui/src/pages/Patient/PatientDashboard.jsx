import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, FileText, Clock, Droplets, Thermometer,
  Heart, Download, Video, User, ChevronRight, LogOut
} from 'lucide-react';

const PatientDashboard = () => {
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = () => {
    localStorage.clear(); // Session clear karein
    navigate('/', { replace: true }); // Login page par redirect karein
  };

  const healthRecords = [
    { id: 1, date: "12 May 2024", report: "Blood Test - CBC", doctor: "Dr. Aman Gupta", status: "Ready" },
    { id: 2, date: "05 May 2024", report: "X-Ray Chest", doctor: "Dr. Sarah Johnson", status: "Ready" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar – Patient */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="bg-emerald-500 p-2 rounded-xl shadow-sm">
            <Heart className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">MyHealth</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <PatientNavItem icon={Calendar} label="Appointments" active />
          <PatientNavItem icon={FileText} label="Medical Records" />
          <PatientNavItem icon={Droplets} label="Lab Results" />
          <PatientNavItem icon={Video} label="Tele-Consult" />
        </nav>

        {/* Emergency & Logout Section */}
        <div className="p-4 space-y-3">
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Emergency</p>
            <p className="text-sm text-blue-900 font-medium mt-1">Need help? Call:</p>
            <p className="text-lg font-bold text-blue-600">011-2345-6789</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-all group border border-transparent hover:border-rose-100"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hello, Rahul! 👋</h1>
            <p className="text-gray-500 mt-1 font-medium">Stay on top of your health and recovery.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center overflow-hidden border border-emerald-100">
              <User className="text-emerald-600 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Rahul Sharma</p>
              <p className="text-[10px] text-emerald-600 font-bold">Patient ID: #HMS-9921</p>
            </div>
          </div>
        </div>

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
      </main>
    </div>
  );
};

// Sidebar Navigation Item
const PatientNavItem = ({ icon: Icon, label, active = false }) => (
  <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
    active
      ? 'bg-emerald-50 text-emerald-700 font-medium shadow-sm'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
  }`}>
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

// Health Vital Card
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

export default PatientDashboard;
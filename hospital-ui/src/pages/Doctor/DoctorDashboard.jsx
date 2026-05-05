import React from 'react';
import { useNavigate } from 'react-router-dom'; // Navigation hook
import { 
  User, Clock, Calendar, FileText, MessageSquare, 
  Bell, Search, MoreVertical, Stethoscope, LogOut 
} from 'lucide-react';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = () => {
    localStorage.clear(); // Token aur Role clear karein
    navigate('/', { replace: true }); // Login par wapis bhej dein
  };

  const appointments = [
    { id: 1, patient: "Arjun Mehta", time: "09:00 AM", type: "Checkup", status: "In Progress" },
    { id: 2, patient: "Sana Khan", time: "10:30 AM", type: "Follow-up", status: "Waiting" },
    { id: 3, patient: "Rahul Verma", time: "11:45 AM", type: "Report Review", status: "Waiting" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar – Doctor Specific */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Stethoscope className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">Doctor Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <DoctorNavItem icon={Calendar} label="Appointments" active />
          <DoctorNavItem icon={User} label="My Patients" />
          <DoctorNavItem icon={FileText} label="Prescriptions" />
          <DoctorNavItem icon={MessageSquare} label="Consultations" />
          <DoctorNavItem icon={Bell} label="Notifications" />
        </nav>

        {/* Logout Section in Sidebar */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search patient records..." 
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-700"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex items-center gap-3 pl-5 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Dr. Aman Gupta</p>
                <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wide">Cardiologist</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center overflow-hidden">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Good Morning, Doctor</h2>
              <p className="text-gray-500 mt-1">You have 8 appointments scheduled for today.</p>
            </div>
            <div className="text-sm font-medium text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard label="Today's Patients" value="12" sub="4 completed" color="bg-blue-600" />
            <StatCard label="Pending Reports" value="05" sub="2 urgent" color="bg-orange-500" />
            <StatCard label="Next Surgery" value="02:30 PM" sub="OT Room 04" color="bg-emerald-600" />
          </div>

          {/* Appointment Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h3 className="font-bold text-gray-900">Upcoming Appointments</h3>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-50 bg-gray-50/50">
                    <th className="px-6 py-4 font-semibold">Patient Name</th>
                    <th className="px-6 py-4 font-semibold">Time</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{apt.patient}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-gray-400" /> {apt.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">{apt.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                          apt.status === 'In Progress' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sidebar Navigation Item
const DoctorNavItem = ({ icon: Icon, label, active = false }) => (
  <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
    active 
      ? 'bg-blue-50 text-blue-700 font-medium' 
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
  }`}>
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

// Stat Card
const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
    <div className={`absolute top-0 left-0 w-1 h-full ${color}`}></div>
    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{sub}</p>
  </div>
);

export default DoctorDashboard;
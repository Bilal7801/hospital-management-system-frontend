import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Search, LayoutGrid, UserCheck, CreditCard,
  Clock, Phone, Filter, MoreHorizontal, ClipboardList, LogOut
} from 'lucide-react';

const ReceptionistDashboard = () => {
  const navigate = useNavigate();

  // Logout Handler
  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const recentCheckIns = [
    { id: 1, name: "Vikas Khanna", doctor: "Dr. Aman (Cardio)", time: "10:15 AM", type: "New", bill: "Paid" },
    { id: 2, name: "Meera Joshi", doctor: "Dr. Sarah (Ortho)", time: "10:30 AM", type: "Follow-up", bill: "Pending" },
    { id: 3, name: "Karan Adani", doctor: "Dr. Aman (Cardio)", time: "10:45 AM", type: "Emergency", bill: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar – Receptionist */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">FrontDesk</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          <NavItem icon={UserCheck} label="Check-in / Out" active />
          <NavItem icon={Plus} label="Book Appointment" />
          <NavItem icon={ClipboardList} label="Patient Queue" />
          <NavItem icon={CreditCard} label="Billing & Invoice" />
          <NavItem icon={Phone} label="Emergency Calls" />
        </nav>

        {/* Logout Button added to sidebar */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full bg-gray-50 border border-gray-300 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-gray-700"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm">
              <Plus className="w-4 h-4" /> New Registration
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs border border-indigo-200">
              RD
            </div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <QuickStat label="Active Appointments" count="24" color="border-indigo-500" />
            <QuickStat label="Waiting Room" count="08" color="border-amber-500" />
            <QuickStat label="Doctors on Duty" count="12" color="border-emerald-500" />
            <QuickStat label="Today's Revenue" count="₹45k" color="border-blue-500" />
          </div>

          {/* Main Grid: Check-ins & Availability */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Patient Queue Table */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Current Patient Queue</h3>
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Filter className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-gray-500 text-[11px] uppercase font-semibold tracking-wider">
                    <tr>
                      <th className="px-6 py-4 text-left">Patient Name</th>
                      <th className="px-6 py-4 text-left">Assigned Doctor</th>
                      <th className="px-6 py-4 text-left">Time</th>
                      <th className="px-6 py-4 text-left">Payment</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentCheckIns.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{item.doctor}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" /> {item.time}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                            item.bill === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {item.bill}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-400">
                          <MoreHorizontal className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Doctor Availability Panel */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col h-fit">
              <h3 className="font-bold text-gray-900 text-lg mb-6">Doctor Availability</h3>
              <div className="space-y-4">
                <DocStatus name="Dr. Aman Gupta" dept="Cardio" available />
                <DocStatus name="Dr. Sarah Johns" dept="Ortho" available={false} />
                <DocStatus name="Dr. Mike Ross" dept="Neuro" available />
                <DocStatus name="Dr. Rachel Zane" dept="General" available />
              </div>
              <button className="w-full mt-6 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold transition-all border border-indigo-100">
                Full Schedule
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active = false }) => (
  <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
    active
      ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
  }`}>
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const QuickStat = ({ label, count, color }) => (
  <div className={`bg-white p-5 rounded-2xl border-l-4 ${color} shadow-sm border-y border-r border-gray-100`}>
    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
  </div>
);

const DocStatus = ({ name, dept, available }) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
    <div>
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <p className="text-[10px] text-indigo-600 uppercase font-bold tracking-wide">{dept}</p>
    </div>
    <div className={`w-2.5 h-2.5 rounded-full ${
      available ? 'bg-emerald-500' : 'bg-rose-400'
    } shadow-sm`}></div>
  </div>
);

export default ReceptionistDashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Navigation ke liye import kiya
import {
  Activity, Users, UserPlus, Settings, LogOut,
  LayoutDashboard, Hospital, Calendar, TrendingUp, Search
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const navigate = useNavigate(); // Hook initialize kiya

  // Logout Handler
  const handleLogout = () => {
    localStorage.clear(); // Token aur Role dono remove ho jayenge
    navigate('/', { replace: true }); // Login page par bhej dega aur 'back' history clear kar dega
  };

  const stats = [
    { title: "Total Doctors", count: "124", icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Patients", count: "1,250", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Avg. Appointments", count: "45", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Active Surgeries", count: "12", icon: Activity, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-700">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">HMS Admin</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Hospital} label="Departments" />
          <NavItem icon={UserPlus} label="Doctors List" />
          <NavItem icon={Users} label="Patient Records" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        {/* Updated Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all w-full group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">SuperAdmin Panel</h1>
            <p className="text-xs text-gray-500">Welcome back, Administrator</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                className="bg-gray-50 border border-gray-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 w-64"
              />
            </div>
            {/* User Profile Avatar */}
            <div className="flex items-center gap-3 border-l pl-4 ml-2">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-semibold text-gray-900">Bilal Ahmed</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white shadow-sm flex items-center justify-center text-white font-bold">
                BA
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className={`${stat.bg} p-3 rounded-xl`}>
                    <stat.icon className={`${stat.color} w-6 h-6`} />
                  </div>
                  <TrendingUp className="text-emerald-500 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.count}</p>
              </div>
            ))}
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">Patient</th>
                    <th className="px-6 py-4 font-medium">Doctor</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-medium">Patient #{i}042</td>
                      <td className="px-6 py-4 text-gray-700">Dr. Sarah Johnson</td>
                      <td className="px-6 py-4 text-gray-700">Oct 24, 2023</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          i % 2 === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {i % 2 === 0 ? 'Completed' : 'Pending'}
                        </span>
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

const NavItem = ({ icon: Icon, label, active = false }) => (
  <button
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
      active
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </button>
);

export default SuperAdminDashboard;
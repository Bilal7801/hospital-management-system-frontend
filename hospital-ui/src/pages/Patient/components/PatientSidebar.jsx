import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Heart, Calendar, FileText, Droplets, Video, LogOut, LayoutDashboard, User, Stethoscope, Pill, Beaker, Wallet, MessageSquare
} from 'lucide-react';

const PatientSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/patient/overview" },
    { icon: User, label: "Profile", path: "/patient/profile" },
    { icon: Calendar, label: "Appointments", path: "/patient/appointments" },
    { icon: Stethoscope, label: "Visits & Consultations", path: "/patient/visits" },
    { icon: Pill, label: "Prescriptions", path: "/patient/prescriptions" },
    // { icon: FileText, label: "Medical Records", path: "/patient/records" },
    { icon: Beaker, label: "Lab & Imaging Reports", path: "/patient/labs" },
    { icon: Wallet, label: "Payments & Invoices", path: "/patient/payments" },
    { icon: MessageSquare, label: "Communication", path: "/patient/communication" }, // Added Communication
    // { icon: Video, label: "Tele-Consult", path: "/patient/tele-consult" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 min-h-screen">
      {/* Brand Section */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-emerald-500 p-2 rounded-xl shadow-sm">
          <Heart className="text-white w-6 h-6 fill-current" />
        </div>
        <span className="text-xl font-semibold text-gray-900 tracking-tight">MyHealth</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
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
  );
};

export default PatientSidebar;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Hospital,
  UserPlus,
  Users,
  Settings,
  LogOut,
  Activity,
  CreditCard,
  FileText,
  Bell,
  CalendarDays,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/overview" },
    { icon: Hospital, label: "Department Management", path: "/dashboard/departments" },
    { icon: UserPlus, label: "Doctors Management", path: "/dashboard/doctors" },
    { icon: CalendarDays, label: "Schedule Management", path: "/dashboard/doctor-schedule" },
    { icon: Users, label: "Reception Management", path: "/dashboard/receptionists" },
    { icon: Users, label: "Patient Management", path: "/dashboard/patients" },
    { icon: CalendarDays, label: "Appointment Management", path: "/dashboard/appointments" },
    { icon: CreditCard, label: "Billing And Payment", path: "/dashboard/billing" },
    { icon: FileText, label: "Reports and Analytics", path: "/dashboard/reports" },
    { icon: Bell, label: "Notice and Announcements", path: "/dashboard/notices" },
    { icon: Settings, label: "Profile Settings", path: "/dashboard/profile" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen shadow-sm">

      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-blue-600 p-2 rounded-xl shadow-md">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          HMS Admin
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto sidebar-scroll relative">

        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator line */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-white/80 rounded-full"></span>
                )}

                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* TOP & BOTTOM FADE EFFECT */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all w-full group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* CUSTOM SCROLLBAR STYLE */}
      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
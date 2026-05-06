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
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard/overview",
    },
    {
      icon: Hospital,
      label: "Department Management",
      path: "/dashboard/departments",
    },
    {
      icon: UserPlus,
      label: "Doctors Management",
      path: "/dashboard/doctors",
    },
    {
      icon: Users,
      label: "Reception Management",
      path: "/dashboard/reception",
    },
    {
      icon: Users,
      label: "Patient Management",
      path: "/dashboard/patients",
    },
    {
      icon: CalendarDays,
      label: "Appointment Management",
      path: "/dashboard/appointments",
    },
    {
      icon: CreditCard,
      label: "Billing And Payment",
      path: "/dashboard/billing",
    },
    {
      icon: FileText,
      label: "Reports and Analytics",
      path: "/dashboard/reports",
    },
    {
      icon: Bell,
      label: "Notice and Announcements",
      path: "/dashboard/notices",
    },
    {
      icon: Settings,
      label: "Profile Settings",
      path: "/dashboard/profile",
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-blue-600 p-2 rounded-xl shadow-md">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          HMS Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all w-full group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  User,
  FileText,
  MessageSquare,
  Stethoscope,
  LogOut,
  FlaskConical,
  RefreshCw,
  Archive,
  CheckSquare,
  MessageSquareCode,
  BarChart3,
  Settings,
} from "lucide-react";

const DoctorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/doctor/overview" },
    { icon: Calendar, label: "Appointments", to: "/doctor/appointments" },
    { icon: User, label: "My Patients", to: "/doctor/patients" },
    { icon: MessageSquare, label: "Consultations", to: "/doctor/consultations" },
    { icon: FileText, label: "Prescriptions", to: "/doctor/prescriptions" },
    { icon: FlaskConical, label: "Lab Reports", to: "/doctor/lab-imaging" },
    { icon: RefreshCw, label: "Follow-ups", to: "/doctor/follow-ups" },
    { icon: Archive, label: "Medical Records", to: "/doctor/medical-records" },
    { icon: CheckSquare, label: "Tasks & Reminders", to: "/doctor/tasks" },
    { icon: MessageSquareCode, label: "Communications Center", to: "/doctor/communication" },
    { icon: BarChart3, label: "Analytics & Reports", to: "/doctor/reports" },
    { icon: Settings, label: "Profile Settings", to: "/doctor/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-blue-600 p-2 rounded-xl shadow-sm">
          <Stethoscope className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-semibold text-gray-900 tracking-tight">
          Doctor Panel
        </span>
      </div>

      {/* Dynamic Nav Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-sm font-medium border ${
                  isActive
                    ? "bg-blue-50/80 text-blue-600 border-black font-semibold shadow-sm"
                    : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Footer Row */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-all group border border-transparent"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
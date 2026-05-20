// pages/Receptionist/components/ReceptionistSidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid, UserCheck, Plus, Users, Calendar, Clock, CreditCard,
  UserCog, Phone, FileText, Bell, BarChart3, MessageSquare, Settings, LogOut,
  Activity
} from 'lucide-react';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left
      ${isActive
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }
    `}
  >
    {/* Active indicator line */}
    {isActive && (
      <span className="absolute left-0 top-2 bottom-2 w-1 bg-white/80 rounded-full"></span>
    )}
    <Icon className="w-5 h-5" />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const ReceptionistSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'patient-management', label: 'Patient Management', icon: Users },
    { id: 'appointment-management', label: 'Appointment Management', icon: Calendar },
    { id: 'doctor-slot-management', label: 'Doctor & Slot Management', icon: UserCog },
    { id: 'queue-checkin', label: 'Queue & Check-in', icon: Clock },
    { id: 'billing-invoice', label: 'Billing & Invoice', icon: CreditCard },
    { id: 'visit-records', label: 'Visit & Records', icon: FileText },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'reports', label: 'Reports & Overview', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
    { id: 'profile', label: 'Profile & Preferences', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen shadow-sm">
      {/* Logo area */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-blue-600 p-2 rounded-xl shadow-md">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          Receptionist Panel
        </span>
      </div>

      {/* Navigation with fade effects and custom scroll */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto sidebar-scroll relative">
        {menuItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}

        {/* Top & bottom fade gradients */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all w-full group cursor-pointer"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform cursor-pointer" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Custom scrollbar styles */}
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

export default ReceptionistSidebar;
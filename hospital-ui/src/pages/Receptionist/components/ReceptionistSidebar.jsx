import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid, Users, Calendar, UserCog, Clock, CreditCard,
  FileText, MessageSquare, BarChart3, Bell, Settings, LogOut, Activity
} from 'lucide-react';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left cursor-pointer
      ${isActive
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }
    `}
  >
    {isActive && (
      <span className="absolute left-0 top-2 bottom-2 w-1 bg-white/80 rounded-full"></span>
    )}
    <Icon className="w-5 h-5" />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const ReceptionistSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: '/receptionist' },
    { id: 'patient-management', label: 'Patient Management', icon: Users, path: '/receptionist/patient-management' },
    { id: 'appointment-management', label: 'Appointment Management', icon: Calendar, path: '/receptionist/appointment-management' },
    { id: 'doctor-slot-management', label: 'Doctor & Slot Management', icon: UserCog, path: '/receptionist/doctor-slot-management' },
    { id: 'queue-checkin', label: 'Queue & Check-in', icon: Clock, path: '/receptionist/queue-checkin' },
    { id: 'billing-invoice', label: 'Billing & Invoice', icon: CreditCard, path: '/receptionist/billing-invoice' },
    { id: 'visit-records', label: 'Visit & Records', icon: FileText, path: '/receptionist/visit-records' },
    { id: 'communication', label: 'Communication', icon: MessageSquare, path: '/receptionist/communication' },
    { id: 'reports', label: 'Reports & Overview', icon: BarChart3, path: '/receptionist/reports' },
    { id: 'notifications', label: 'Notifications & Alerts', icon: Bell, path: '/receptionist/notifications' },
    { id: 'profile', label: 'Profile & Preferences', icon: Settings, path: '/receptionist/profile' },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen shadow-sm">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-blue-600 p-2 rounded-xl shadow-md">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          Receptionist Panel
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto sidebar-scroll relative">
        {menuItems.map((item) => {
          let isItemActive = false;

          if (item.path === '/receptionist') {
            isItemActive = location.pathname === '/receptionist' || location.pathname === '/receptionist/';
          } 
          else if (item.id === 'patient-management') {
            // Highlight Patient Management for all patient-related pages
            isItemActive = location.pathname.startsWith('/receptionist/patient-management') ||
                          location.pathname.includes('/patient/details/') ||
                          location.pathname.includes('/patient/edit/');
          } 
          else {
            // For other menu items
            isItemActive = location.pathname.startsWith(item.path);
          }

          return (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={isItemActive}
              onClick={() => navigate(item.path)}
            />
          );
        })}

        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all w-full group cursor-pointer"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

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
// pages/Receptionist/components/ReceptionistHeader.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
} from "lucide-react";

const ReceptionistHeader = ({ activeTab }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Fallback if no user data exists
      setUser({ name: "Receptionist", role: "Receptionist" });
    }
  }, []);

  // Map activeTab to display title (like pageTitles in the example)
  const pageTitles = {
    dashboard: "Dashboard",
    "patient-management": "Patient Management",
    "appointment-management": "Appointment Management",
    "doctor-slot-management": "Doctor & Slot Management",
    "queue-checkin": "Queue & Check-in",
    "billing-invoice": "Billing & Invoice",
    "visit-records": "Visit & Records",
    communication: "Communication",
    reports: "Reports & Overview",
    notifications: "Notifications & Alerts",
    profile: "Profile & Preferences",
  };

  const currentTitle = pageTitles[activeTab] || "Dashboard";

  const getInitials = (name) => {
    if (!name) return "R";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20 shrink-0">
      {/* LEFT SIDE: Page title and role */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{currentTitle}</h1>
        <p className="text-[11px] text-gray-500">
          {user?.role || "Receptionist"} Control Panel
        </p>
      </div>

      {/* RIGHT SIDE: Search, New Registration, Profile Dropdown */}
      <div className="flex items-center gap-4">
        {/* Search input (hidden on small screens) */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient..."
            className="bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-56"
          />
        </div>

        {/* New Registration Button (kept from original design) */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm">
          <Plus className="w-4 h-4" /> New Registration
        </button>

        {/* Profile Dropdown */}
        <div className="relative border-l pl-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-all cursor-pointer"
          >
            {/* User info (hidden on small screens) */}
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || "Loading..."}
              </p>
              <p className="text-[10px] text-gray-500 uppercase">
                {user?.role || ""}
              </p>
            </div>

            {/* Avatar with online indicator */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center relative text-sm">
              {getInitials(user?.name)}
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase font-medium">
                    Account
                  </p>
                </div>

                <button
                  onClick={() => {
                    // Navigate to profile tab (or page) – adjust as needed
                    // For now, we can call setActiveTab if passed via context/props
                    // Since this component doesn't have setActiveTab, we can either
                    // add it as a prop or just close dropdown. Here we'll close.
                    setIsDropdownOpen(false);
                    // Optionally: window.location.href = '/dashboard/profile';
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  Profile Settings
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Account Security
                </button>

                <div className="h-px bg-gray-100 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ReceptionistHeader;
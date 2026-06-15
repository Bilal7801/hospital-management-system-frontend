import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, ChevronDown, Plus } from "lucide-react";
import api from "../../../api/axios";

const ReceptionistHeader = ({ activeTab, setActiveTab }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const BACKEND_URL = "https://localhost:7203";

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/receptionist/profile');
        setUser(res.data.data || res.data);
      } catch (err) {
        console.error("Header profile load failed:", err);
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : { name: "Receptionist", role: "Receptionist" });
      }
    };
    fetchProfile();
  }, []);

  const getFullImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${BACKEND_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

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
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  // New Registration Button
  const handleNewRegistration = () => {
    if (setActiveTab) setActiveTab("patient-management");
    else navigate('/receptionist/patient-management');
  };

  // Go to Profile
  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    if (setActiveTab) {
      setActiveTab("profile");
    } else {
      navigate('/receptionist/profile');
    }
  };

  const displayName = user?.Name || user?.name || "Receptionist";
  const displayRole = user?.Role || user?.role || "Receptionist";
  const userImage = user?.ProfileImageUrl || user?.profileImageUrl || user?.imageUrl || '';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20 shrink-0">
      {/* Left Side - Title */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{currentTitle}</h1>
        <p className="text-[11px] text-gray-500">Receptionist Control Panel</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        
        {/* New Registration Button */}
        <button 
          onClick={handleNewRegistration}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" /> New Registration
        </button>

        {/* Profile Dropdown */}
        <div className="relative border-l pl-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-all cursor-pointer"
          >
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-gray-900">{displayName}</p>
              <p className="text-[10px] text-gray-500 uppercase">{displayRole}</p>
            </div>

            <div className="w-9 h-9 rounded-full relative text-sm select-none overflow-hidden border border-gray-200">
              {userImage ? (
                <img 
                  src={getFullImageUrl(userImage)} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center">
                  {getInitials(displayName)}
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer text-left"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>

                <div className="h-px bg-gray-100 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer text-left"
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
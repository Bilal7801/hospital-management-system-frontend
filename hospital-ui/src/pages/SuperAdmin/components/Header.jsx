import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import api from "../../../api/axios"; // adjust path if needed

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/superadmin/profile");
      setProfile(res.data);
    } catch (err) {
      console.log("Header profile error:", err?.response?.data || err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/dashboard/overview": "Dashboard",
    "/dashboard/doctors": "Doctors Management",
    "/dashboard/departments": "Department Management",
    "/dashboard/profile": "Profile Settings",
    "/dashboard/reception": "Reception Management",
    "/dashboard/patients": "Patient Management",
    "/dashboard/appointments": "Appointment Management",
    "/dashboard/billing": "Billing And Payment",
    "/dashboard/reports": "Reports and Analytics",
    "/dashboard/notices": "Notice and Announcements",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20 shrink-0">

      {/* LEFT */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          {currentTitle}
        </h1>
        <p className="text-[11px] text-gray-500">
          {user?.role || "User"} Control Panel
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-56"
          />
        </div>

        {/* PROFILE */}
        <div className="relative border-l pl-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-all cursor-pointer"
          >

            {/* USER INFO */}
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || "Loading..."}
              </p>
              <p className="text-[10px] text-gray-500 uppercase">
                {user?.role || ""}
              </p>
            </div>

            {/* AVATAR */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center relative text-sm">

              {profile?.profileImageUrl ? (
                <img
                  src={`https://localhost:7203${profile.profileImageUrl}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(user?.name)
              )}

              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
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
                    navigate("/dashboard/profile");
                    setIsDropdownOpen(false);
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

export default Header;
import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const DoctorHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Filter input */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search patient records..." 
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-gray-700"
          />
        </div>
      </div>
      
      {/* Right Core Actions Container */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </div>
        
        <div className="flex items-center gap-3 pl-5 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">Dr. Aman Gupta</p>
            <p className="text-[10px] font-medium text-blue-600 uppercase tracking-wide">Cardiologist</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center overflow-hidden">
            <User className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
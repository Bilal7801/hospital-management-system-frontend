import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorSidebar from './components/DoctorSidebar';
import DoctorHeader from './components/DoctorHeader';

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Separated Fixed Sidebar Panel */}
      <DoctorSidebar />

      {/* Main Framework Content Container Layout */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Separated Header Bar */}
        <DoctorHeader />

        {/* Dynamic Nested View Injected Content Box */}
        <main className="flex-grow p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
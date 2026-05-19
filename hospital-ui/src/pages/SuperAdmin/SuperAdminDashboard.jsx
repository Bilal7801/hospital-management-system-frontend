import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const SuperAdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-700">
      {/* Sidebar */}
      <Sidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
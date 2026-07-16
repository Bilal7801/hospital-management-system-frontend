import React from 'react';
import { Outlet } from 'react-router-dom';
import PatientSidebar from './components/PatientSidebar';

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar - Patient */}
      <PatientSidebar />

      {/* Nested Main Content Routing Window */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientDashboard;
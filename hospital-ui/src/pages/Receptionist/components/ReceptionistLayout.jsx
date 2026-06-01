import React from 'react';
import ReceptionistHeader from './ReceptionistHeader';
import ReceptionistSidebar from './ReceptionistSidebar';

const ReceptionistLayout = ({ children }) => {
  // Extract active tab from current URL
  const getActiveTab = () => {
    const path = window.location.pathname;
    
    if (path.includes('/patient-management')) return 'patient-management';
    if (path.includes('/appointment-management')) return 'appointment-management';
    if (path.includes('/doctor-slot-management')) return 'doctor-slot-management';
    if (path.includes('/queue-checkin')) return 'queue-checkin';
    if (path.includes('/billing-invoice')) return 'billing-invoice';
    if (path.includes('/visit-records')) return 'visit-records';
    if (path.includes('/communication')) return 'communication';
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/notifications')) return 'notifications';
    if (path.includes('/profile')) return 'profile';
    
    return 'dashboard'; // default
  };

  const activeTab = getActiveTab();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <ReceptionistSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <ReceptionistHeader activeTab={activeTab} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ReceptionistLayout;
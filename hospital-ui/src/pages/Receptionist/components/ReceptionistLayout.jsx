// pages/Receptionist/components/ReceptionistLayout.jsx
import React from 'react';
import ReceptionistSidebar from './ReceptionistSidebar';
import ReceptionistHeader from './ReceptionistHeader';

const ReceptionistLayout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ReceptionistSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <ReceptionistHeader activeTab={activeTab} />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ReceptionistLayout;
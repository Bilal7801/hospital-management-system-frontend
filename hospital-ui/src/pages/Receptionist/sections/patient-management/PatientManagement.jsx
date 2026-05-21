// pages/Receptionist/sections/patient-management/PatientManagement.jsx
import React, { useState } from 'react';
import { Search, UserPlus, Edit2, History, Users } from 'lucide-react';
import SearchPatient from './SearchPatient';
import RegisterPatient from './RegisterPatient';
import UpdatePatient from './UpdatePatient';
import PatientHistory from './PatientHistory';

// Fixed: Moved helper component to the top so it is declared before use
const StatCard = ({ title, value, trend, icon: Icon, iconColor, valueSize = "text-lg" }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-1">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</p>
      <Icon className={`w-4 h-4 ${iconColor}`} />
    </div>
    <p className={`${valueSize} font-bold text-gray-900 tracking-tight`}>{value}</p>
    <p className="text-[11px] text-gray-400 mt-0.5">{trend}</p>
  </div>
);

const PatientManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('search');

  const tabs = [
    { id: 'search', label: 'Search Patient', icon: Search, count: 1250 },
    { id: 'register', label: 'Register', icon: UserPlus, count: null },
    { id: 'update', label: 'Update', icon: Edit2, count: null },
    { id: 'history', label: 'History', icon: History, count: null },
  ];

  return (
    <div className="space-y-5">
      {/* Header Container */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Patient Management</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage patient records, registration, and medical history</p>
      </div>

      {/* Quick Stats - Grid Matches the form sizing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value="1,250"
          trend="+12 this month"
          icon={Users}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Today"
          value="48"
          trend="Currently checked in"
          icon={Search}
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Updates"
          value="15"
          trend="Need review"
          icon={Edit2}
          iconColor="text-orange-600"
        />
        <StatCard
          title="Last Updated"
          value="Ahmed Khan"
          trend="2 mins ago"
          icon={History}
          iconColor="text-purple-600"
          valueSize="text-base"
        />
      </div>

      {/* Tabs Navigation Ribbon */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap
                  transition-all border-b-2
                  ${activeSubTab === tab.id
                    ? 'border-blue-600 text-blue-700 bg-blue-50/40'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Rendered View Content Area */}
      <div className="pt-1">
        {activeSubTab === 'search' && <SearchPatient />}
        {activeSubTab === 'register' && <RegisterPatient />}
        {activeSubTab === 'update' && <UpdatePatient />}
        {activeSubTab === 'history' && <PatientHistory />}
      </div>
    </div>
  );
};

export default PatientManagement;
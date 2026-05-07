import React, { useState } from 'react';
import { Bell, Plus, Trash2, Eye } from 'lucide-react';
import CreateNotice from './components/CreateNotice';
import NoticesList from './components/NoticesList';
import AnnouncementsList from './components/AnnouncementsList';

const NoticeAndAnnouncements = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'System Maintenance',
      audience: 'Staff',
      message: 'System will be under maintenance on Friday 10 PM - 2 AM',
      status: 'Sent',
      sentDate: '2025-01-10',
      scheduledDate: '2025-01-12 22:00',
      priority: 'High',
    },
    {
      id: 2,
      title: 'New Payment Method Available',
      audience: 'Patients',
      message: 'We now accept cryptocurrency payments. Please visit billing for more info.',
      status: 'Scheduled',
      sentDate: null,
      scheduledDate: '2025-01-15 09:00',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Holiday Hours',
      audience: 'Both',
      message: 'Hospital will operate with limited staff on national holidays.',
      status: 'Sent',
      sentDate: '2025-01-05',
      scheduledDate: null,
      priority: 'Normal',
    },
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Welcome to Hospital Management System',
      content: 'Latest updates and announcements will appear here.',
      date: '2025-01-10',
      active: true,
    },
    {
      id: 2,
      title: 'New Doctor Joined',
      content: 'Please welcome Dr. Sarah Johnson to our Cardiology department.',
      date: '2025-01-08',
      active: true,
    },
  ]);

  const handleAddNotice = (newNotice) => {
    const notice = {
      id: Math.max(...notices.map(n => n.id), 0) + 1,
      ...newNotice,
      status: newNotice.scheduledDate ? 'Scheduled' : 'Sent',
      sentDate: newNotice.scheduledDate ? null : new Date().toISOString().split('T')[0],
    };
    setNotices([notice, ...notices]);
    setActiveTab('manage');
  };

  const handleDeleteNotice = (id) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  const handleAddAnnouncement = (newAnnouncement) => {
    const announcement = {
      id: Math.max(...announcements.map(a => a.id), 0) + 1,
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0],
      active: true,
    };
    setAnnouncements([announcement, ...announcements]);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const tabs = [
    { id: 'create', label: 'Create Notice', icon: Plus },
    { id: 'manage', label: 'Manage Notices', icon: Bell },
    { id: 'announcements', label: 'Announcements', icon: Eye },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Notice & Announcements
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Send notices to staff and patients, manage announcements
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        {activeTab === 'create' && (
          <CreateNotice onAddNotice={handleAddNotice} />
        )}

        {activeTab === 'manage' && (
          <NoticesList
            notices={notices}
            onDeleteNotice={handleDeleteNotice}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsList
            announcements={announcements}
            onAddAnnouncement={handleAddAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
          />
        )}
      </div>
    </div>
  );
};

export default NoticeAndAnnouncements;

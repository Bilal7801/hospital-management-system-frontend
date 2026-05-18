import React, { useState, useEffect } from 'react';
import { Bell, Plus, Eye } from 'lucide-react';
import CreateNotice from './components/CreateNotice';
import NoticesList from './components/NoticesList';
import AnnouncementsList from './components/AnnouncementsList';
import api from "../../../../api/axios";

const NoticeAndAnnouncements = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [notices, setNotices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data when tab changes
  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'manage') {
        const res = await api.get("/superadmin/notices");
        setNotices(res.data);
      } else if (activeTab === 'announcements') {
        const res = await api.get("/superadmin/announcements");
        setAnnouncements(res.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'manage' || activeTab === 'announcements') {
      loadData();
    }
  }, [activeTab]);

  // ==================== NOTICE HANDLERS ====================
  const handleAddNotice = async (newNotice) => {
    try {
      const res = await api.post("/superadmin/notices", newNotice);
      setNotices([res.data, ...notices]);
      setActiveTab('manage');
      alert("Notice created successfully!");
    } catch (error) {
      console.error("Error creating notice:", error);
      alert("Failed to create notice");
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;
    try {
      await api.delete(`/superadmin/notices/${id}`);
      setNotices(notices.filter(n => n.id !== id));
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("Failed to delete notice");
    }
  };

  // ==================== ANNOUNCEMENT HANDLERS ====================
  const handleAddAnnouncement = async (newAnnouncement) => {
    try {
      const res = await api.post("/superadmin/announcements", newAnnouncement);
      setAnnouncements([res.data, ...announcements]);
      alert("Announcement published successfully!");
      loadData(); // Refresh list
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Failed to publish announcement");
    }
  };

  const handleUpdateAnnouncement = async (id, updatedData) => {
    try {
      const res = await api.put(`/superadmin/announcements/${id}`, updatedData);
      if (res.status === 200) {
        alert("Announcement updated successfully!");
        loadData(); // Refresh list
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
      alert("Failed to update announcement");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await api.delete(`/superadmin/announcements/${id}`);
      setAnnouncements(announcements.filter(a => a.id !== id));
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert("Failed to delete announcement");
    }
  };

  const handleToggleAnnouncement = async (id) => {
    try {
      const res = await api.put(`/superadmin/announcements/${id}/toggle`);
      if (res.status === 200) {
        loadData(); // Refresh to show updated status
      }
    } catch (error) {
      console.error("Error toggling announcement:", error);
      alert("Failed to toggle status");
    }
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
        <h2 className="text-2xl font-bold text-gray-900">Notice & Announcements</h2>
        <p className="text-sm text-gray-500 mt-1">Send notices and manage announcements</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
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

      {/* Content Area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        {activeTab === 'create' && <CreateNotice onAddNotice={handleAddNotice} />}
        
        {activeTab === 'manage' && (
          <NoticesList 
            notices={notices} 
            onDeleteNotice={handleDeleteNotice} 
            loading={loading}
          />
        )}

        {activeTab === 'announcements' && (
          <AnnouncementsList 
            announcements={announcements} 
            onAddAnnouncement={handleAddAnnouncement}
            onUpdateAnnouncement={handleUpdateAnnouncement}    
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onToggleAnnouncement={handleToggleAnnouncement}     
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default NoticeAndAnnouncements;
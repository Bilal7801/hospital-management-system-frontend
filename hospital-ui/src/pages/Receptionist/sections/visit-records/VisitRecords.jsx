import React, { useState } from 'react';
import { FolderHeart, History, FileText, UploadCloud } from 'lucide-react';
import ViewVisitHistory from './ViewVisitHistory';
import AddVisitNote from './AddVisitNote';
import UploadDocuments from './UploadDocuments';

const VisitRecords = () => {
  const [activeTab, setActiveTab] = useState('visit-history');

  // Unified configurations mapping directly to the item nodes in item 8 of the blueprint
  const segments = [
    { id: 'visit-history', label: '1. View Patient Visit History', icon: History },
    { id: 'add-note', label: '2. Add Visit Note', icon: FileText },
    { id: 'upload-docs', label: '3. Upload Documents', icon: UploadCloud },
  ];

  return (
    <div className="space-y-4">
      {/* Royal Blue Top Status Section Banner */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FolderHeart className="w-6 h-6 text-blue-100" />
            Visit & Records Management
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Access long-term clinical encounter archives, append descriptive tracking metadata, and catalog medical records safely
          </p>
        </div>
      </div>

      {/* Segmented Horizontal Navigation Tab Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 flex flex-wrap gap-2 shadow-sm">
        {segments.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Frame Target */}
      <div className="transition-all duration-200">
        {activeTab === 'visit-history' && <ViewVisitHistory />}
        {activeTab === 'add-note' && <AddVisitNote />}
        {activeTab === 'upload-docs' && <UploadDocuments />}
      </div>
    </div>
  );
};

export default VisitRecords;
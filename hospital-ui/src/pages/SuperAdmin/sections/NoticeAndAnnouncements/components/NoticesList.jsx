import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Clock, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const NoticesList = ({ notices = [], onDeleteNotice, loading }) => {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [filterAudience, setFilterAudience] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ← Changed to 5 for consistency

  const filteredNotices = notices.filter((notice) => {
    const audienceMatch = filterAudience === 'All' || notice.audience === filterAudience;
    const statusMatch = filterStatus === 'All' || notice.status === filterStatus;
    return audienceMatch && statusMatch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters or data change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredNotices.length]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Sent') return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    if (status === 'Scheduled') return <Clock className="w-4 h-4 text-amber-600" />;
    return null;
  };

  if (loading) {
    return <div className="text-center py-12">Loading notices...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Audience</label>
          <select
            value={filterAudience}
            onChange={(e) => setFilterAudience(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Audiences</option>
            <option value="Staff">Staff Only</option>
            <option value="Patients">Patients Only</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Sent">Sent</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-semibold">No notices found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedNotices.map((notice) => (
            <div
              key={notice.id}
              className="border border-gray-200 rounded-2xl p-5 bg-white hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedNotice(notice)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(notice.status)}
                    <h3 className="text-lg font-bold text-gray-900">{notice.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notice.priority)}`}>
                      {notice.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{notice.message}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>👥 {notice.audience}</span>
                    <span>📊 {notice.status}</span>
                    {notice.sentDate && <span>📅 Sent: {notice.sentDate}</span>}
                    {notice.scheduledDate && <span>⏰ Scheduled: {notice.scheduledDate}</span>}
                  </div>
                </div>

                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onDeleteNotice(notice.id); 
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination - Consistent with AnnouncementsList */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          <span className="text-sm text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedNotice.title}</h2>
                <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm ${getPriorityColor(selectedNotice.priority)}`}>
                  {selectedNotice.priority} Priority
                </span>
              </div>
              <button 
                onClick={() => setSelectedNotice(null)} 
                className="text-3xl text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Message</p>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedNotice.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div><p className="font-semibold text-gray-700">Audience</p><p className="mt-1">{selectedNotice.audience}</p></div>
                <div><p className="font-semibold text-gray-700">Status</p><p className="mt-1">{selectedNotice.status}</p></div>
                {selectedNotice.sentDate && <div><p className="font-semibold text-gray-700">Sent Date</p><p>{selectedNotice.sentDate}</p></div>}
                {selectedNotice.scheduledDate && <div><p className="font-semibold text-gray-700">Scheduled</p><p>{selectedNotice.scheduledDate}</p></div>}
              </div>
            </div>

            <button
              onClick={() => setSelectedNotice(null)}
              className="mt-8 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticesList;
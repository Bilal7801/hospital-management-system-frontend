import React, { useState } from 'react';
import { Trash2, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const NoticesList = ({ notices, onDeleteNotice }) => {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [filterAudience, setFilterAudience] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredNotices = notices.filter((notice) => {
    const audienceMatch =
      filterAudience === 'All' || notice.audience === filterAudience;
    const statusMatch =
      filterStatus === 'All' || notice.status === filterStatus;
    return audienceMatch && statusMatch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Sent') {
      return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    } else if (status === 'Scheduled') {
      return <Clock className="w-4 h-4 text-amber-600" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Filter by Audience
          </label>
          <select
            value={filterAudience}
            onChange={(e) => setFilterAudience(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Audiences</option>
            <option value="Staff">Staff Only</option>
            <option value="Patients">Patients Only</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Sent">Sent</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Notices Grid */}
      {filteredNotices.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-semibold">No notices found</p>
          <p className="text-gray-400 text-sm">
            Create a notice to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 cursor-pointer" onClick={() => setSelectedNotice(notice)}>
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(notice.status)}
                    <h3 className="text-lg font-bold text-gray-900">
                      {notice.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                        notice.priority
                      )}`}
                    >
                      {notice.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{notice.message}</p>
                  <div className="flex gap-4 text-xs text-gray-500 flex-wrap">
                    <span className="font-medium">
                      👥 Audience: {notice.audience}
                    </span>
                    <span className="font-medium">
                      📊 Status: {notice.status}
                    </span>
                    {notice.sentDate && (
                      <span className="font-medium">
                        📅 Sent: {notice.sentDate}
                      </span>
                    )}
                    {notice.scheduledDate && (
                      <span className="font-medium">
                        ⏰ Scheduled: {notice.scheduledDate}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onDeleteNotice(notice.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all ml-2"
                  title="Delete notice"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail View Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedNotice.title}
                </h2>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                    selectedNotice.priority
                  )}`}
                >
                  {selectedNotice.priority} Priority
                </span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Message</p>
                <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                  {selectedNotice.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-700">Audience</p>
                  <p className="text-gray-600 mt-1">{selectedNotice.audience}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedNotice.status)}
                    <span className="text-gray-600">{selectedNotice.status}</span>
                  </div>
                </div>
                {selectedNotice.sentDate && (
                  <div>
                    <p className="font-semibold text-gray-700">Sent Date</p>
                    <p className="text-gray-600 mt-1">{selectedNotice.sentDate}</p>
                  </div>
                )}
                {selectedNotice.scheduledDate && (
                  <div>
                    <p className="font-semibold text-gray-700">Scheduled Date</p>
                    <p className="text-gray-600 mt-1">
                      {selectedNotice.scheduledDate}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedNotice(null)}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
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

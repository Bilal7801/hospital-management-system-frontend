import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, ChevronLeft, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react';

const AnnouncementsList = ({
  announcements = [],
  onAddAnnouncement,
  onUpdateAnnouncement,
  onDeleteAnnouncement,
  onToggleAnnouncement,
  loading = false,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isActive: true,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ← Set to 5 as requested

  const totalPages = Math.ceil(announcements.length / itemsPerPage);

  const paginatedAnnouncements = announcements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when announcements change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [announcements.length]);

  const handleAddClick = () => {
    setFormData({ title: '', content: '', isActive: true });
    setIsAddingNew(true);
    setEditingId(null);
  };

  const handleEditClick = (ann) => {
    setFormData({
      title: ann.title || ann.Title || '',
      content: ann.content || ann.Content || '',
      isActive: ann.isActive ?? ann.IsActive ?? true,
    });
    setEditingId(ann.id || ann.Id);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({ title: '', content: '', isActive: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      isActive: formData.isActive,
    };

    if (editingId) {
      onUpdateAnnouncement(editingId, payload);
    } else {
      onAddAnnouncement(payload);
    }

    handleCancel();
  };

  const handleToggle = (id, currentStatus) => {
    onToggleAnnouncement(id, !currentStatus);
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      {!isAddingNew && !editingId && (
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      )}

      {/* Create / Edit Form */}
      {(isAddingNew || editingId !== null) && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {editingId ? 'Edit Announcement' : 'Create New Announcement'}
            </h3>
            <button onClick={handleCancel}>
              <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Announcement Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />

            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your announcement here..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
              required
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
              <label className="text-sm font-medium text-gray-700">
                Active (visible to users)
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
              >
                {editingId ? 'Update Announcement' : 'Publish Announcement'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading announcements...</p>
        ) : paginatedAnnouncements.length === 0 ? (
          <p className="text-center py-10 text-gray-500">No announcements found.</p>
        ) : (
          paginatedAnnouncements.map((ann) => {
            const id = ann.id || ann.Id;
            const title = ann.title || ann.Title;
            const content = ann.content || ann.Content;
            const date = ann.date || ann.Date || ann.CreatedAt;
            const isActive = ann.isActive ?? ann.IsActive ?? false;

            return (
              <div
                key={id}
                className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{title}</h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3 line-clamp-3">{content}</p>

                    <div className="text-xs text-gray-500">
                      📅 {date ? new Date(date).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleToggle(id, isActive)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                      title="Toggle Status"
                    >
                      {isActive ? (
                        <ToggleRight className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    <button
                      onClick={() => handleEditClick(ann)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => onDeleteAnnouncement(id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-sm text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsList;
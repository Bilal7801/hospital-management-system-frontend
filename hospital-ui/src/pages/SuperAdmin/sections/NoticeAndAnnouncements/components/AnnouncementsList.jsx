import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

const AnnouncementsList = ({ announcements, onAddAnnouncement, onDeleteAnnouncement }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleAddClick = () => {
    setFormData({ title: '', content: '' });
    setIsAddingNew(true);
    setEditingId(null);
  };

  const handleEditClick = (announcement) => {
    setFormData({ title: announcement.title, content: announcement.content });
    setEditingId(announcement.id);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({ title: '', content: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      if (!editingId) {
        onAddAnnouncement({
          title: formData.title,
          content: formData.content,
        });
      }
      handleCancel();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-6">
      {/* Add Announcement Button */}
      {!isAddingNew && !editingId && (
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Announcement
        </button>
      )}

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {editingId ? 'Edit Announcement' : 'Create New Announcement'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-blue-100 rounded-lg transition-all"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Announcement title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Announcement content"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
              >
                {editingId ? 'Update' : 'Publish'} Announcement
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">📢</div>
            <p className="text-gray-500 font-semibold">No announcements yet</p>
            <p className="text-gray-400 text-sm">
              Click "Add New Announcement" to create one
            </p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                    <span className="font-medium">
                      📅 {new Date(announcement.date).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full font-semibold ${
                        announcement.active
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {announcement.active ? '✓ Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditClick(announcement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Edit announcement"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDeleteAnnouncement(announcement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete announcement"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementsList;

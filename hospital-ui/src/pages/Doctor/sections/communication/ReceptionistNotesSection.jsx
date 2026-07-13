import React, { useState, useEffect } from 'react';
import { UserSquare2, Plus, Trash2, Loader2 } from 'lucide-react';
import api from '../../../../api/axios';

const ReceptionistNotesSection = () => {
  const [newNote, setNewNote] = useState('');
  const [scope, setScope] = useState('Receptionist'); // Default scope setup
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Common scopes mapped from your DB setup
  const scopeOptions = [
    'Receptionist',
    'Shift changeover',
    'Equipment Required',
    'Maintainence',
    'General Note'
  ];

  // Fetch existing receptionist notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await api.get('/receptionist/communication/remarks');
        setNotes(res.data.data || []);
      } catch (err) {
        console.error("Failed to load receptionist notes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes(); // Fixed the typo here
  }, []);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setSaving(true);

    try {
      const res = await api.post('/receptionist/communication/remark', {
        message: newNote,
        scope: scope, 
        author: "Receptionist"
      });

      // Optimistic update
      const newRemark = {
        ...res.data.data,
        id: res.data.data?.id || Date.now()
      };

      setNotes([newRemark, ...notes]);
      setNewNote('');
      setScope('Receptionist'); 
    } catch (err) {
      console.error("Failed to add note", err);
      alert('Failed to add note. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await api.delete(`/receptionist/communication/remark/${id}`);
      setNotes(notes.filter(n => n.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
      alert("Failed to delete note.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4 border-b pb-3">
          <UserSquare2 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-bold text-gray-800">Live Receptionist Desk Notes & Logs</h3>
        </div>

        {/* Dynamic Entry Form */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-indigo-500 min-w-[180px]"
          >
            {scopeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add quick desk note, reminder, or patient instruction..."
            className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
          />
          
          <button
            onClick={handleAddNote}
            disabled={saving || !newNote.trim()}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 whitespace-nowrap"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {saving ? 'Adding...' : 'Add Note'}
          </button>
        </div>

        {/* Display List */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {loading ? (
            <div className="text-center py-12 text-gray-400 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" /> Loading notes...
            </div>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 group">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 text-sm">{note.author}</span>
                      {note.scope && (
                        <span className="inline-block text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold tracking-wide">
                          {note.scope}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {note.createdAt ? new Date(note.createdAt).toLocaleString() : ''}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1 text-sm">{note.message}</p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              No receptionist notes yet. Add one above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceptionistNotesSection;
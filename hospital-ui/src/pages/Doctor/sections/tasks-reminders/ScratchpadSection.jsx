import React, { useState } from 'react';
import { Plus, Trash2, X, FileText } from 'lucide-react';

const ScratchpadSection = () => {
  const [notes, setNotes] = useState([
    { id: 1, content: "Confirm laboratory panel changes for clinic audits by end of week.", time: "Today, 09:30 AM" }
  ]);
  const [input, setInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const submitNote = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Append new note entry to top of feed list stack
    setNotes([
      { 
        id: Date.now(), 
        content: input, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " (Just Now)" 
      }, 
      ...notes
    ]);
    
    // Reset configuration states and close overlay canvas modal
    setInput('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Control Action Management Header */}
      <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Clinician Session Scratchpad</h3>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Temporary workspace notes and general administrative reminders.</p>
          </div>
        </div>

        {/* Action Button: Opens Create Note Modal Dialogue Sheet */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm shadow-slate-100"
        >
          <Plus className="w-4 h-4" /> <span>Add Note</span>
        </button>
      </div>

      {/* Grid Allocation Layout Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map(note => (
          <div key={note.id} className="bg-amber-50/40 border border-amber-100 p-4 rounded-xl flex flex-col justify-between gap-6 text-xs group relative hover:shadow-sm transition-all duration-200">
            <p className="text-gray-700 leading-relaxed pr-2 whitespace-pre-wrap">{note.content}</p>
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium border-t border-amber-100/60 pt-2.5 mt-auto">
              <span>{note.time}</span>
              <button 
                onClick={() => setNotes(notes.filter(n => n.id !== note.id))} 
                className="text-gray-400 hover:text-rose-600 transition-colors"
                title="Delete note entry"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="col-span-full text-center py-12 border border-dashed rounded-xl bg-gray-50/50 text-gray-400 italic text-xs">
            No active notes found. Click "+ Add Note" to open the creation sheet workspace.
          </div>
        )}
      </div>

      {/* INTERACTIVE WORKSPACE DIALOG MODAL BACKDROP SHEET */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-xl border border-gray-200 shadow-xl overflow-hidden animate-scaleIn">
            
            {/* Modal Title Banner Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between bg-gray-50">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" /> Draft New Note Entry
              </span>
              <button 
                onClick={() => { setIsModalOpen(false); setInput(''); }}
                className="p-1 hover:bg-gray-200 text-gray-400 hover:text-gray-700 rounded-md transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Note Submission Execution Form Block */}
            <form onSubmit={submitNote} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Note Details Description</label>
                <textarea 
                  autoFocus
                  rows={4}
                  placeholder="Type or dictate patient lookup flags, board review updates, clinical research tokens or general task notes..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50/30 resize-none leading-relaxed text-gray-800"
                />
              </div>

              {/* Functional Submitting Operational Layout Buttons */}
              <div className="flex items-center justify-end gap-2 border-t pt-3">
                <button 
                  type="button"
                  onClick={() => { setIsModalOpen(false); setInput(''); }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  Save Workspace Note
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ScratchpadSection;
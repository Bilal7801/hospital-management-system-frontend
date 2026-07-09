import React from 'react';
import { Calendar, FileText, User } from 'lucide-react';

const VisitHistory = ({ records = [] }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Longitudinal Clinical Encounters</h3>

      {records.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-400">
          No clinical encounter notes found yet.
        </div>
      ) : (
        <div className="relative border-l-2 border-gray-200 ml-4 space-y-6">
          {records.map((visit, idx) => (
            <div key={idx} className="relative pl-6">
              {/* Timeline node dot */}
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
              
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-700">
                      {visit.date ? new Date(visit.date).toLocaleDateString() : visit.recordDate}
                    </span>
                    <span>•</span>
                    <span>Type: <span className="font-medium text-gray-800">{visit.encounterType || visit.recordType}</span></span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">Attending: {visit.doctor || visit.doctorName || 'N/A'}</span>
                </div>

                {/* SOAP Clinical Transcription Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                  <div>
                    <span className="font-bold text-gray-400 block uppercase tracking-tight mb-1">Subjective & Objective Logs</span>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">S:</strong> {visit.notes?.subjective || visit.subjective || 'N/A'}
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-1">
                      <strong className="text-gray-900">O:</strong> {visit.notes?.objective || visit.objective || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-gray-400 block uppercase tracking-tight mb-1">Clinical Assessment & Management Plan</span>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">A/P:</strong> {visit.notes?.assessmentPlan || visit.assessmentPlan || visit.description || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitHistory;
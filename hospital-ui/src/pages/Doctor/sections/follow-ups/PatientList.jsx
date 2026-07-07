import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';

const PatientList = ({ patients = [], onAction, onViewPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p => 
    (p.fullName || p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.id || p.patientIdCode || '').toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search patient name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 font-semibold">
            <tr>
              <th className="p-4">Patient Info</th>
              <th className="p-4">Condition</th>
              <th className="p-4">Last Visit</th>
              <th className="p-4">Next Follow-up</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPatients.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-12 text-gray-400">No patients found</td></tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr key={patient.id || patient.patientId} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{patient.fullName || patient.name}</div>
                    <div className="text-xs text-gray-400">
                      {patient.patientIdCode || patient.id}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                      {patient.condition || 'N/A'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-sm">
                    {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : "No visits"}
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {patient.nextFollowUp ? new Date(patient.nextFollowUp).toLocaleDateString() : "Not Set"}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button 
                      onClick={() => onViewPatient?.(patient)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors shadow-sm"
                    >
                      <Eye className="w-4 h-4" /> View Record
                    </button>
                    <button onClick={() => onAction('advise-date', patient.id || patient.patientId)} className="text-xs text-blue-600 hover:underline font-medium">Schedule</button>
                    <button onClick={() => onAction('add-notes', patient.id || patient.patientId)} className="text-xs text-gray-600 hover:underline font-medium">+ Notes</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
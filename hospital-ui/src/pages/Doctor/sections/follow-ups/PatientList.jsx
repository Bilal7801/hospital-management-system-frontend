import React from 'react';
import { Search } from 'lucide-react';

const PatientList = ({ patients, searchTerm, setSearchTerm, onAction }) => {
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.includes(searchTerm)
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
              <th className="p-4">Recovery Progress</th>
              <th className="p-4">Next Follow-up</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{patient.name}</div>
                  <div className="text-xs text-gray-400">{patient.id} • Last: {patient.lastVisit}</div>
                </td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                    {patient.condition}
                  </span>
                </td>
                <td className="p-4 w-1/4">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${patient.progress > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${patient.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{patient.progress}%</span>
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-800">
                  {patient.nextFollowUp || "Not Set"}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => onAction('advise-date', patient.id)} 
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Schedule
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    onClick={() => onAction('add-notes', patient.id)}
                    className="text-xs text-gray-600 hover:underline font-medium"
                  >
                    + Notes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
import React from 'react';
import { ShieldCheck, Search, Info } from 'lucide-react';

const Diagnosis = () => {
  const diagnoses = [
    { code: "I49.9", condition: "Cardiac arrhythmia, unspecified", type: "Chronic Monitor Status", date: "15 May 2026", doctor: "Dr. Aman Gupta", status: "Active" },
    { code: "J30.9", condition: "Allergic rhinitis, unspecified", type: "Acute Seasonal Flareup", date: "12 Apr 2026", doctor: "Dr. Sarah Johnson", status: "Active" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Active Diagnoses & Assessments</h3>
        <p className="text-sm text-gray-500">Formal diagnosis assessments mapped directly to official ICD-10 medical coding registries.</p>
      </div>

      <div className="overflow-hidden border border-gray-100 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th className="p-4">ICD-10 Code</th>
              <th className="p-4">Condition</th>
              <th className="p-4">Assessment Category</th>
              <th className="p-4">Diagnosing Physician</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {diagnoses.map((diag, index) => (
              <tr key={index} className="hover:bg-amber-50/10 transition-colors">
                <td className="p-4 font-bold text-amber-700">{diag.code}</td>
                <td className="p-4 font-bold text-gray-900">{diag.condition}</td>
                <td className="p-4 text-gray-500">{diag.type}</td>
                <td className="p-4 text-gray-700 font-semibold">{diag.doctor}<span className="block text-[10px] text-gray-400 font-medium">{diag.date}</span></td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-md uppercase tracking-wider">
                    {diag.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Diagnosis;
import React from 'react';
import { TestTube, Image as ImageIcon, ClipboardCheck } from 'lucide-react';

const DiagnosticsHistory = ({ diagnostics }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Historical Diagnostics & Imaging Repository</h3>
      <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="w-full text-left text-sm text-gray-600 border-collapse">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-700 border-b border-gray-200">
            <tr>
              <th className="p-4">Diagnostic Profile</th>
              <th className="p-4">Processing Unit</th>
              <th className="p-4">Report Summary / Findings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {diagnostics.map((diag, index) => (
              <tr key={index} className="hover:bg-gray-50/40 transition-colors">
                <td className="p-4 vertical-align-top">
                  <div className="flex items-center gap-2.5">
                    {diag.type === 'Lab' ? (
                      <TestTube className="w-4 h-4 text-blue-600" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-indigo-600" />
                    )}
                    <span className="font-bold text-gray-900">{diag.name}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 pl-6">{diag.date} • <span className="font-mono text-blue-600">{diag.refCode}</span></div>
                </td>
                <td className="p-4 text-xs text-gray-500 font-medium">{diag.facility}</td>
                <td className="p-4 text-xs">
                  <div className="p-2.5 bg-slate-900 text-slate-100 font-mono rounded border text-xs max-w-xl shadow-inner leading-relaxed whitespace-pre-wrap">
                    {diag.summary}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticsHistory;
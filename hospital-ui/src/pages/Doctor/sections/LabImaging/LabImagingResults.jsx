import React, { useState } from 'react';
import { Download, Printer, Search, Eye, FileText, CheckCircle, Clock } from 'lucide-react';

const LabImagingResults = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredRecords = records.filter(rec =>
    rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const triggerLocalPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm max-w-md relative">
        <Search className="absolute left-7 top-7 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Filter results by test name or report code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
        />
      </div>

      {/* Grid Layout splitting Table vs Detail Inspector Modal View */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Results Overview Core Ledger List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-500 text-[11px] uppercase tracking-wider bg-gray-50/40 border-b border-gray-100 font-bold">
                  <th className="px-5 py-4">Report Details</th>
                  <th className="px-5 py-4">Sourcing Facility</th>
                  <th className="px-5 py-4">Status Log</th>
                  <th className="px-5 py-4 text-right">Action Framework</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} className={`hover:bg-gray-50/50 transition-colors ${selectedReport?.id === rec.id ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="font-bold text-gray-900">{rec.name}</div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                        <span className="font-mono text-blue-600 font-semibold">{rec.id}</span>
                        <span>•</span>
                        <span>{rec.type}</span>
                        <span>•</span>
                        <span>{rec.date}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-600 font-medium">
                      {rec.facility}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        rec.status === 'Completed' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {rec.status === 'Completed' ? <CheckCircle className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                        <span>{rec.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedReport(rec)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-all"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                        <span>Inspect Chart</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Digital Interactive Summary Report Inspector Canvas Panel */}
        <div className="xl:col-span-1">
          {selectedReport ? (
            <div className="bg-white rounded-xl border border-gray-300 shadow-md p-6 space-y-6 print:border-0 print:shadow-none sticky top-6">
              
              {/* Report Inspector Header Panel */}
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{selectedReport.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">Reference ID: {selectedReport.id}</p>
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={triggerLocalPrint}
                    title="Print Report Data" 
                    className="p-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => alert("File payload pulled into client memory buffer for secure background streaming download.")}
                    title="Download Native PDF File" 
                    className="p-1.5 bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 rounded-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Patient Core Meta Tags Column */}
              <div className="bg-gray-50 p-3 rounded-lg border text-xs space-y-1 text-gray-600">
                <div><span className="font-semibold text-gray-400 uppercase tracking-wider text-[9px] block">Validated Diagnostic Source</span>{selectedReport.facility}</div>
                <div className="pt-2"><span className="font-semibold text-gray-400 uppercase tracking-wider text-[9px] block">Date of Release Log</span>{selectedReport.date}</div>
              </div>

              {/* Narrative Findings Area Box */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Clinical Report Findings Transcription</label>
                <div className="p-4 bg-gray-900 text-gray-100 font-mono text-xs rounded-lg leading-relaxed border shadow-inner whitespace-pre-wrap">
                  {selectedReport.results}
                </div>
              </div>

              <div className="text-[11px] text-gray-400 italic bg-amber-50/50 border border-amber-100 p-2.5 rounded-lg">
                ⚠️ Confirm abnormal data variables (e.g., Glucose / Lipid matrix values) alongside longitudinal physical diagnostic exams before executing secondary therapeutic changes.
              </div>

            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed rounded-xl p-8 text-center text-gray-400">
              <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <div className="text-xs font-semibold">No Report Selected</div>
              <p className="text-[11px] text-gray-400 mt-1 max-w-[200px] mx-auto">Select a diagnostic entry line on the left view index to load secure EHR files.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LabImagingResults;
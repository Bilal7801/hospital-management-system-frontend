import React, { useState } from 'react';
import { Download, Printer, Search, Eye, Clock, CheckCircle } from 'lucide-react';

const LabImagingResults = ({ records = [], onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const filtered = records.filter(r => 
    r.testName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.id?.toString().includes(searchTerm)
  );

  const handlePrint = () => {
    if (!selectedReport) return;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
      window.print();
      return;
    }

    const reportContent = [
      `<h2>${selectedReport.testName}</h2>`,
      `<p><strong>ID:</strong> ${selectedReport.id}</p>`,
      `<p><strong>Status:</strong> ${selectedReport.status}</p>`,
      `<p><strong>Date:</strong> ${selectedReport.date}</p>`,
      `<div style="margin-top:16px; white-space:pre-wrap;">${(selectedReport.resultSummary || 'Results pending...').replace(/\n/g, '<br/>')}</div>`
    ].join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedReport.testName} Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
            h2 { margin-bottom: 8px; }
            p { margin: 6px 0; }
          </style>
        </head>
        <body>${reportContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleDownload = () => {
    if (!selectedReport) return;

    const reportText = [
      `Test Name: ${selectedReport.testName}`,
      `ID: ${selectedReport.id}`,
      `Status: ${selectedReport.status}`,
      `Date: ${selectedReport.date}`,
      '',
      selectedReport.resultSummary || 'Results pending...'
    ].join('\n');

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(selectedReport.testName || 'lab-report').toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm max-w-md relative">
        <Search className="absolute left-7 top-7 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by test name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500 font-bold border-b">
                  <th className="px-5 py-4 text-left">Test Name</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-12 text-gray-400">No records found</td></tr>
                ) : (
                  filtered.map(rec => (
                    <tr key={rec.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium">{rec.testName}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{rec.date}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${rec.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => setSelectedReport(rec)} className="text-blue-600 hover:text-blue-700">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="xl:col-span-1">
          {selectedReport ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
              <h4 className="font-bold text-lg">{selectedReport.testName}</h4>
              <p className="text-sm text-gray-500 mt-1">ID: {selectedReport.id}</p>
              <div className="mt-6 space-y-4">
                <p><strong>Status:</strong> {selectedReport.status}</p>
                <p><strong>Date:</strong> {selectedReport.date}</p>
                <div className="bg-gray-50 p-4 rounded text-sm">
                  {selectedReport.resultSummary || "Results pending..."}
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed rounded-xl p-12 text-center text-gray-400">
              Select a record to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabImagingResults;
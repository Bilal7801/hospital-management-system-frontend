import React from 'react';
import { ArrowLeft, Printer, FileText, CheckCircle, ShieldAlert, FlaskConical } from 'lucide-react';

const LabResultDetail = ({ labData, onBack }) => {
  if (!labData) return null;

  // Mock comprehensive lab telemetry payload
  const mockPanels = [
    { parameter: "Fasting Plasma Glucose", value: "134 mg/dL", range: "70-99 mg/dL", status: "HIGH" },
    { parameter: "HbA1c (Glycated Hemoglobin)", value: "6.4 %", range: "4.0-5.6 %", status: "HIGH" },
    { parameter: "Estimated Average Glucose (eAG)", value: "137 mg/dL", range: "70-126 mg/dL", status: "HIGH" }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Context Controller */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 border border-gray-200 rounded-xl shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl border border-gray-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Action Center / Lab Review Pipeline</span>
            <h1 className="text-lg font-bold text-gray-900 mt-0.5">Laboratory Diagnostic Report</h1>
          </div>
        </div>
        <button 
          onClick={() => window.print()} 
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm"
        >
          <Printer className="w-4 h-4" /> <span>Print Diagnostic Sheet</span>
        </button>
      </div>

      {/* Patient Meta Summary Block */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs shadow-sm">
        <div>
          <span className="text-gray-400 block font-medium">Patient Name</span>
          <strong className="text-sm font-bold text-gray-900 block mt-0.5">{labData.patientName}</strong>
          <span className="text-gray-400 font-mono text-[10px]">{labData.patientId}</span>
        </div>
        <div>
          <span className="text-gray-400 block font-medium">Requested Panel</span>
          <strong className="text-xs font-bold text-slate-800 block mt-1">{labData.testType}</strong>
        </div>
        <div>
          <span className="text-gray-400 block font-medium">Order Identifier</span>
          <strong className="text-xs font-mono font-bold text-blue-600 block mt-1">{labData.id}</strong>
        </div>
        <div>
          <span className="text-gray-400 block font-medium">Status Flag</span>
          <span className="inline-block mt-1 px-2 py-0.5 font-bold rounded bg-rose-50 border border-rose-100 text-rose-700 uppercase tracking-wider text-[10px]">
            {labData.status}
          </span>
        </div>
      </div>

      {/* Lab Telemetry Biometric Panel Matrix Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-blue-600" /> Biomarker Analytics Readout
          </h3>
        </div>
        <table className="w-full text-left text-xs text-gray-600 border-collapse">
          <thead className="bg-slate-50 border-b font-bold uppercase text-gray-500 text-[10px]">
            <tr>
              <th className="p-3 pl-4">Analyte Parameter Description</th>
              <th className="p-3">Observed Value Output</th>
              <th className="p-3">Standard Reference Range</th>
              <th className="p-3 text-right pr-4">Flag Alert</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {mockPanels.map((panel, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="p-3 pl-4 font-semibold text-gray-900">{panel.parameter}</td>
                <td className="p-3 font-mono text-gray-800 font-bold">{panel.value}</td>
                <td className="p-3 text-gray-400 font-mono">{panel.range}</td>
                <td className="p-3 text-right pr-4">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-bold text-[9px] bg-rose-50 text-rose-700 border border-rose-100">
                    <ShieldAlert className="w-3 h-3" /> {panel.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Validation Interactive Action Controls Section */}
      <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p>By executing authentication sign-off, this dataset will be appended to the longitudinal health file and cleared from the live operational dashboard list.</p>
        </div>
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all shadow-sm"
        >
          <CheckCircle className="w-3.5 h-3.5" /> <span>Verify & Electronically Sign</span>
        </button>
      </div>
    </div>
  );
};

export default LabResultDetail;
import React, { useState } from 'react';
import { Printer, ArrowLeft, UserCheck, Activity, FolderGit } from 'lucide-react';
import VisitHistory from './VisitHistory';
import PastPrescriptions from './PastPrescriptions';
import DiagnosticsHistory from './DiagnosticsHistory';

const PatientChartDetail = ({ activeData, onBack }) => {
  const [activeTab, setActiveTab] = useState('timeline');

  if (!activeData) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Detailed Patient Header Context Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 border border-gray-200 rounded-xl shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-xl border border-gray-200 transition-all"
            title="Return to Master Directory"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Registry Dashboard / Patient File</span>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight mt-0.5">EHR Medical Chart: {activeData.info.name}</h1>
          </div>
        </div>
        
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all shadow-sm self-start sm:self-center"
        >
          <Printer className="w-4 h-4" />
          <span>Print Comprehensive Chart</span>
        </button>
      </div>

      {/* Grid Interface splitting Patient Data Cards and Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Demographics Matrix Layout Sheet */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm print:border-none print:shadow-none">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">{activeData.info.name}</h2>
              <span className="text-xs font-mono font-bold text-blue-600">{activeData.info.id}</span>
            </div>
          </div>

          <div className="text-xs space-y-2.5 text-gray-600">
            <div className="flex justify-between"><span className="text-gray-400 font-medium">Demographics:</span> <span className="font-bold text-gray-800">{activeData.info.age} yrs / {activeData.info.gender}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">Blood Group:</span> <span className="font-bold font-mono text-gray-800">{activeData.info.bloodType}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">Primary Indication:</span> <span className="font-bold text-gray-900">{activeData.info.condition}</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-400 font-medium">Scope Profile:</span> <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.5 rounded font-bold uppercase text-[9px] tracking-wide">{activeData.info.status}</span></div>
          </div>
        </div>

        {/* Sub-Encounters Navigation & Rendering Panels Block */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Internal Filtering Tab Elements (Hidden on print layouts safely) */}
          <div className="flex border border-gray-200 bg-white rounded-xl p-1 gap-1 shadow-sm print:hidden">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'timeline' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Encounter Notes
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'prescriptions' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FolderGit className="w-3.5 h-3.5" /> Past Scripts Rx
            </button>
            <button
              onClick={() => setActiveTab('labs')}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'labs' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Printer className="w-3.5 h-3.5" /> Labs & Imaging
            </button>
          </div>

          {/* Print Sheet View Engine Layout */}
          <div className="print:block hidden space-y-8">
            <VisitHistory records={activeData.visits} />
            <hr className="border-gray-300" />
            <PastPrescriptions prescriptions={activeData.prescriptions} />
            <hr className="border-gray-300" />
            <DiagnosticsHistory diagnostics={activeData.diagnostics} />
          </div>

          {/* On-Screen Context Screen Active Tab Components */}
          <div className="print:hidden">
            {activeTab === 'timeline' && <VisitHistory records={activeData.visits} />}
            {activeTab === 'prescriptions' && <PastPrescriptions prescriptions={activeData.prescriptions} />}
            {activeTab === 'labs' && <DiagnosticsHistory diagnostics={activeData.diagnostics} />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientChartDetail;
import React, { useState, useEffect } from 'react';
import { Printer, ArrowLeft, UserCheck, Activity, FolderGit } from 'lucide-react';
import api from '../../../../api/axios';
import VisitHistory from './VisitHistory';
import PastPrescriptions from './PastPrescriptions';
import DiagnosticsHistory from './DiagnosticsHistory';

const PatientChartDetail = ({ patientId, onBack }) => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timeline');

  useEffect(() => {
    const fetchPatientChart = async () => {
      if (!patientId) return;
      
      try {
        setLoading(true);
        const res = await api.get(`/doctor/medical-records/${patientId}`);
        setPatientData(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to load patient chart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientChart();
  }, [patientId]);

  if (loading) {
    return <div className="py-20 text-center">Loading patient chart...</div>;
  }

  if (!patientData) {
    return (
      <div className="py-20 text-center text-gray-500">
        Patient chart not found.
        <button onClick={onBack} className="mt-4 text-blue-600 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 border border-gray-200 rounded-xl shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-xl border border-gray-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Patient File</span>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight mt-0.5">
              EHR Medical Chart: {patientData.fullName || patientData.name}
            </h1>
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

      {/* Demographics Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm print:border-none print:shadow-none">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">{patientData.fullName || patientData.name}</h2>
              <span className="text-xs font-mono font-bold text-blue-600">{patientData.patientIdCode || patientData.id}</span>
            </div>
          </div>

          <div className="text-xs space-y-2.5 text-gray-600">
            <div className="flex justify-between"><span className="text-gray-400 font-medium">Age / Gender:</span> <span className="font-bold text-gray-800">{patientData.age} yrs / {patientData.gender}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">Blood Group:</span> <span className="font-bold font-mono text-gray-800">{patientData.bloodGroup || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">Phone:</span> <span className="font-bold text-gray-800">{patientData.phone || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400 font-medium">Email:</span> <span className="font-bold text-gray-800">{patientData.email || 'N/A'}</span></div>
          </div>
        </div>

        {/* Tab Navigation & Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex border border-gray-200 bg-white rounded-xl p-1 gap-1 shadow-sm print:hidden">
            <button onClick={() => setActiveTab('timeline')} className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'timeline' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
              <Activity className="w-3.5 h-3.5" /> Encounter Notes
            </button>
            <button onClick={() => setActiveTab('prescriptions')} className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'prescriptions' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
              <FolderGit className="w-3.5 h-3.5" /> Past Prescriptions
            </button>
            <button onClick={() => setActiveTab('labs')} className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'labs' ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
              <Printer className="w-3.5 h-3.5" /> Labs & Imaging
            </button>
          </div>

          <div className="print:hidden">
            {activeTab === 'timeline' && <VisitHistory records={patientData.visits || []} />}
            {activeTab === 'prescriptions' && <PastPrescriptions prescriptions={patientData.prescriptions || []} />}
            {activeTab === 'labs' && <DiagnosticsHistory diagnostics={patientData.diagnostics || []} />}
          </div>

          {/* Print Version */}
          <div className="print:block hidden space-y-8">
            <VisitHistory records={patientData.visits || []} />
            <hr className="border-gray-300" />
            <PastPrescriptions prescriptions={patientData.prescriptions || []} />
            <hr className="border-gray-300" />
            <DiagnosticsHistory diagnostics={patientData.diagnostics || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientChartDetail;
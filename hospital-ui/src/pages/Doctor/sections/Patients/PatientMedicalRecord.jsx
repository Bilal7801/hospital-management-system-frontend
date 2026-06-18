import React, { useState } from 'react';
import { ArrowLeft, User, Clipboard, AlertTriangle, Activity } from 'lucide-react';

const PatientMedicalRecord = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      {/* Back Button Action Bar Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded-lg transition-colors bg-white shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{patient.id}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Clinical Dashboard Core EHR</p>
        </div>
      </div>

      {/* Internal Navigation Sub-Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-4 pt-3 rounded-xl border shadow-sm">
        {[
          { id: 'profile', label: 'Patient Profile', icon: User },
          { id: 'history', label: 'Visits & Diagnosis', icon: Clipboard },
          { id: 'allergies', label: 'Allergies & Risks', icon: AlertTriangle },
          { id: 'vitals', label: 'Vital Sign Logs', icon: Activity }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 font-medium text-sm transition-all border-b-2 flex items-center gap-2 ${
                activeTab === tab.id ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Render Matrix Panels */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[350px]">
        
        {/* TAB 1: Profile Details */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-100">
            <h3 className="text-base font-bold text-gray-900 border-b pb-2">Demographic Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div><label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label><div className="text-sm font-semibold text-gray-800 mt-1">{patient.name}</div></div>
              <div><label className="text-xs font-bold uppercase tracking-wider text-gray-400">Age / Gender</label><div className="text-sm font-semibold text-gray-800 mt-1">{patient.age} Years / {patient.gender}</div></div>
              <div><label className="text-xs font-bold uppercase tracking-wider text-gray-400">Blood Matrix Group</label><div className="text-sm font-semibold text-gray-800 mt-1">{patient.bloodGroup}</div></div>
              <div><label className="text-xs font-bold uppercase tracking-wider text-gray-400">Primary Contact Phone</label><div className="text-sm font-semibold text-gray-800 mt-1">{patient.phone}</div></div>
              <div><label className="text-xs font-bold uppercase tracking-wider text-gray-400">Digital Mailing Address</label><div className="text-sm font-semibold text-gray-800 mt-1">{patient.email}</div></div>
            </div>
          </div>
        )}

        {/* TAB 2: Visit Logs & Histories */}
        {activeTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <h3 className="text-base font-bold text-gray-900 border-b pb-2">Longitudinal Encounter History</h3>
            <div className="relative border-l border-gray-200 pl-4 space-y-6 ml-2 pt-2">
              {patient.visitHistory.map((visit, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-blue-600 rounded-full ring-4 ring-white" />
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">{visit.date}</div>
                  <div className="bg-gray-50 rounded-lg p-4 mt-2 border border-gray-100">
                    <div className="text-sm font-bold text-gray-900">Diagnosis: {visit.diagnosis}</div>
                    <div className="text-xs text-gray-600 mt-1.5"><strong className="text-gray-800">Plan / Treatment:</strong> {visit.treatment}</div>
                    <div className="text-[11px] text-gray-400 mt-3 border-t pt-2 italic">Attending: {visit.doctor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Allergies & Conditions */}
        {activeTab === 'allergies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-100">
            <div>
              <h3 className="text-base font-bold text-gray-900 border-b pb-2 text-rose-700 flex items-center gap-1.5">Allergies</h3>
              <ul className="mt-3 space-y-2">
                {patient.allergies.map((alg, i) => (
                  <li key={i} className="text-sm bg-rose-50 border border-rose-100 text-rose-800 px-3 py-2 rounded-lg font-medium">
                    ⚠️ {alg}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 border-b pb-2 text-amber-700 flex items-center gap-1.5">Active Medical Conditions</h3>
              <ul className="mt-3 space-y-2">
                {patient.conditions.map((cond, i) => (
                  <li key={i} className="text-sm bg-amber-50 border border-amber-100 text-amber-800 px-3 py-2 rounded-lg font-medium">
                    📋 {cond}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: Vital Sign Logs */}
        {activeTab === 'vitals' && (
          <div className="space-y-4 animate-in fade-in duration-100">
            <h3 className="text-base font-bold text-gray-900 border-b pb-2">Biometric Vital Metric Logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider border-b font-bold">
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Blood Pressure</th>
                    <th className="px-4 py-3">Pulse Rate</th>
                    <th className="px-4 py-3">Body Temp</th>
                    <th className="px-4 py-3">SpO2 Level</th>
                    <th className="px-4 py-3">Mass Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {patient.vitalsHistory.map((vital, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-900">{vital.date}</td>
                      <td className="px-4 py-3 font-mono text-gray-700">{vital.bp}</td>
                      <td className="px-4 py-3 text-gray-600">{vital.pulse}</td>
                      <td className="px-4 py-3 text-gray-600">{vital.temp}</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">{vital.spo2}</td>
                      <td className="px-4 py-3 text-gray-600">{vital.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMedicalRecord;
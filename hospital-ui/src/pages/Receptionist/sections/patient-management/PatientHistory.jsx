// pages/Receptionist/sections/patient-management/PatientHistory.jsx
import React, { useState } from 'react';
import { Calendar, Clock, FileText, Heart, AlertCircle, Download, ChevronDown } from 'lucide-react';

const PatientHistory = () => {
  const [expandedVisit, setExpandedVisit] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Mock patient history data
  const patientHistory = {
    name: 'Ahmed Khan',
    patientId: 'PID-78492',
    totalVisits: 24,
    history: [
      {
        id: 1,
        date: '2024-05-18',
        time: '10:30 AM',
        type: 'Follow-up',
        doctor: 'Dr. Muhammad Ali',
        department: 'General Medicine',
        symptoms: 'Mild cough, follow-up for previous respiratory infection',
        diagnosis: 'Recovered from respiratory infection, advised to continue rest',
        medications: 'Cough syrup (Robitussin) twice daily',
        notes: 'Patient responding well to treatment. Continue current medication for 3 more days.',
        vitals: { bp: '120/80', temp: '98.6°F', pulse: '72' }
      },
      {
        id: 2,
        date: '2024-05-15',
        time: '02:15 PM',
        type: 'Consultation',
        doctor: 'Dr. Sarah Ahmed',
        department: 'Cardiology',
        symptoms: 'Chest pain, shortness of breath',
        diagnosis: 'Mild hypertension, stress-related',
        medications: 'Amlodipine 5mg daily, Aspirin 100mg daily',
        notes: 'EKG shows normal results. Advised lifestyle changes and regular exercise.',
        vitals: { bp: '140/90', temp: '98.4°F', pulse: '88' }
      },
      {
        id: 3,
        date: '2024-04-28',
        time: '11:00 AM',
        type: 'General Check-up',
        doctor: 'Dr. Muhammad Ali',
        department: 'General Medicine',
        symptoms: 'Annual check-up',
        diagnosis: 'No major issues detected',
        medications: 'None',
        notes: 'Overall health is good. Advised to maintain healthy lifestyle and diet.',
        vitals: { bp: '118/78', temp: '98.5°F', pulse: '70' }
      },
      {
        id: 4,
        date: '2024-04-10',
        time: '03:45 PM',
        type: 'Emergency',
        doctor: 'Dr. Hassan Khan',
        department: 'Emergency Medicine',
        symptoms: 'Acute abdominal pain',
        diagnosis: 'Food poisoning',
        medications: 'IV fluids, Metoclopramide',
        notes: 'Admitted for 6 hours, discharged after stabilization.',
        vitals: { bp: '122/82', temp: '100.2°F', pulse: '95' }
      },
    ]
  };

  const handleDownload = (visitId) => {
    console.log('Downloading report for visit:', visitId);
  };

  const filteredHistory = patientHistory.history.filter(visit => {
    if (filterType === 'all') return true;
    if (filterType === 'consultation') return visit.type === 'Consultation';
    if (filterType === 'follow-up') return visit.type === 'Follow-up';
    if (filterType === 'checkup') return visit.type === 'General Check-up';
    return true;
  });

  const VisitTypeIcon = ({ type }) => {
    switch (type) {
      case 'Follow-up':
        return <Heart className="w-4 h-4 text-purple-600" />;
      case 'Consultation':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'General Check-up':
        return <AlertCircle className="w-4 h-4 text-green-600" />;
      case 'Emergency':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Follow-up':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Consultation':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'General Check-up':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Emergency':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl px-5 py-4 text-white shadow-sm">
        <h1 className="text-xl font-bold tracking-tight">Patient Visit History</h1>
        <p className="text-blue-100 text-sm mt-0.5">View complete medical records and history updates</p>
      </div>

      {/* Patient Key Meta Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Patient Name</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{patientHistory.name}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Patient ID</p>
            <p className="text-sm font-bold text-blue-600 tracking-tight mt-0.5">{patientHistory.patientId}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Visits</p>
            <p className="text-sm font-bold text-green-600 mt-0.5">{patientHistory.totalVisits}</p>
          </div>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm flex items-center gap-3">
        <span className="text-sm font-bold text-gray-600 whitespace-nowrap">Type:</span>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full md:w-52 px-3 py-1.5 text-sm border border-gray-300 rounded-xl bg-white font-medium text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 cursor-pointer outline-none transition"
        >
          <option value="all">All Visit Types</option>
          <option value="consultation">Consultations</option>
          <option value="follow-up">Follow-ups</option>
          <option value="checkup">General Check-ups</option>
        </select>
      </div>

      {/* Core History Stack */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/70">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Logs {filteredHistory.length > 0 && <span className="text-blue-600 font-extrabold ml-0.5">({filteredHistory.length})</span>}
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredHistory.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No logs match the criteria.</p>
            </div>
          ) : (
            filteredHistory.map((visit) => (
              <div key={visit.id} className="hover:bg-gray-50/40 transition-colors">
                <div
                  className="px-4 py-3.5 cursor-pointer flex items-center justify-between gap-3 select-none"
                  onClick={() => setExpandedVisit(expandedVisit === visit.id ? null : visit.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 p-1.5 bg-gray-50 rounded-lg border border-gray-100">
                      <VisitTypeIcon type={visit.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getTypeColor(visit.type)}`}>
                          {visit.type}
                        </span>
                        <span className="text-sm font-bold text-gray-800 truncate">{visit.doctor}</span>
                      </div>
                      <div className="flex items-center gap-x-4 gap-y-0.5 text-xs text-gray-400 flex-wrap font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(visit.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {visit.time}
                        </span>
                        <span className="text-gray-400 border-l border-gray-200 pl-4">{visit.department}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDownload(visit.id); }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer text-blue-500 hover:text-blue-600"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedVisit === visit.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {/* Nested Detail Board */}
                {expandedVisit === visit.id && (
                  <div className="px-4 py-4 bg-slate-50/60 border-t border-b border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-3.5">
                        <div>
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Symptoms</h4>
                          <p className="text-sm text-gray-700 mt-1 font-medium">{visit.symptoms}</p>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Diagnosis</h4>
                          <p className="text-sm text-gray-700 mt-1 font-medium">{visit.diagnosis}</p>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Patient Vitals</h4>
                          <div className="grid grid-cols-3 gap-2 mt-1.5">
                            <div className="bg-white rounded-xl border border-gray-200 p-2 text-center shadow-sm">
                              <p className="text-[10px] font-semibold text-gray-400">BP</p>
                              <p className="text-xs font-bold text-gray-800 mt-0.5">{visit.vitals.bp}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-2 text-center shadow-sm">
                              <p className="text-[10px] font-semibold text-gray-400">TEMP</p>
                              <p className="text-xs font-bold text-gray-800 mt-0.5">{visit.vitals.temp}</p>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-2 text-center shadow-sm">
                              <p className="text-[10px] font-semibold text-gray-400">PULSE</p>
                              <p className="text-xs font-bold text-gray-800 mt-0.5">{visit.vitals.pulse}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3.5">
                        <div>
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Medications</h4>
                          <p className="text-sm text-gray-700 mt-1 font-medium">{visit.medications}</p>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Clinical Notes</h4>
                          <div className="bg-white rounded-xl border border-gray-200 p-3 mt-1.5 shadow-sm">
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">{visit.notes}</p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 pt-1">
                          <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer">
                            Print File
                          </button>
                          <button className="flex-1 py-2 border border-blue-200 bg-white text-blue-600 hover:bg-gray-50 text-xs font-semibold rounded-xl transition-colors cursor-pointer">
                            Email PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Aggregate Bottom Blocks */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Medical Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
            <p className="text-[11px] font-semibold text-gray-500 uppercase">Active Prescriptions</p>
            <p className="text-lg font-bold text-blue-700 mt-0.5">3</p>
          </div>
          <div className="bg-green-50/50 rounded-xl p-3 border border-green-100">
            <p className="text-[11px] font-semibold text-gray-500 uppercase">Last Treatment</p>
            <p className="text-sm font-bold text-green-700 mt-1">May 18, 2024</p>
          </div>
          <div className="bg-purple-50/50 rounded-xl p-3 border border-purple-100">
            <p className="text-[11px] font-semibold text-gray-500 uppercase">Primary Physician</p>
            <p className="text-sm font-bold text-purple-700 mt-1 truncate">Dr. Muhammad Ali</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
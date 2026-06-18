import React, { useState } from 'react';
import { Search, Users, Eye, Calendar } from 'lucide-react';
import PatientChartDetail from './PatientChartDetail';

const MedicalRecordsDashboard = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [patientSearch, setPatientSearch] = useState('');

  // 📋 Master Multidisciplinary Longitudinal Database (2026)
  const [mockPatientsRegistry] = useState({
    "P-1043": {
      info: { id: "P-1043", name: "Arjun Mehta", age: 42, gender: "Male", bloodType: "O+", status: "Chronic Profile", condition: "Type-2 Diabetes", lastVisit: "June 10, 2026" },
      visits: [
        { date: "June 10, 2026", encounterType: "Chronic Checkup", doctor: "Dr. Sarah Jenkins", notes: { subjective: "Patient complains of occasional fatigue post-meals.", objective: "BP: 130/84 mmHg, HR: 72 bpm.", assessmentPlan: "Type-2 Diabetes stable but borderline hyper patterns." } }
      ],
      prescriptions: [
        { date: "June 10, 2026", rxId: "RX-99012", medications: [{ name: "Metformin HCl", strength: "500mg", dosage: "1 tab twice daily", duration: "90 Days" }] }
      ],
      diagnostics: [
        { date: "June 11, 2026", type: "Lab", name: "HbA1c Glycated Panels", refCode: "LAB-9082", facility: "Central Core Labs", summary: "HbA1c: 6.4% (Pre-diabetic Range)" }
      ]
    },
    "P-1089": {
      info: { id: "P-1089", name: "Sana Khan", age: 29, gender: "Female", bloodType: "A-", status: "Observation", condition: "Hypertension", lastVisit: "May 22, 2026" },
      visits: [
        { date: "May 22, 2026", encounterType: "Hypertension Review", doctor: "Dr. Marcus Vance", notes: { subjective: "Feels better, headaches reduced after taking prescription.", objective: "BP: 122/78 mmHg (Improved), HR: 68 bpm.", assessmentPlan: "Hypertension responding well to Ramipril." } }
      ],
      prescriptions: [
        { date: "May 22, 2026", rxId: "RX-44102", medications: [{ name: "Ramipril", strength: "5mg", dosage: "1 tablet daily in morning", duration: "60 Days" }] }
      ],
      diagnostics: [
        { date: "May 23, 2026", type: "Imaging", name: "Electrocardiogram (ECG)", refCode: "RAD-8812", facility: "CardioVascular Dept", summary: "Normal sinus rhythm." }
      ]
    },
    "P-1102": {
      info: { id: "P-1102", name: "Muhammad Raza", age: 58, gender: "Male", bloodType: "B+", status: "Post-Op Care", condition: "Knee Arthroplasty", lastVisit: "June 02, 2026" },
      visits: [
        { date: "June 02, 2026", encounterType: "Post-Surgical Follow-up", doctor: "Dr. Alan Mercer", notes: { subjective: "Reports moderate localized surgical pain, doing physical therapy exercises daily.", objective: "Incision healing well, no erythema.", assessmentPlan: "Post-Op Left Total Knee Replacement recovery pacing correctly." } }
      ],
      prescriptions: [
        { date: "June 02, 2026", rxId: "RX-11029", medications: [{ name: "Tramadol HCl", strength: "50mg", dosage: "1 tab every 8 hours PRN pain", duration: "10 Days" }] }
      ],
      diagnostics: [
        { date: "June 03, 2026", type: "Imaging", name: "X-Ray Left Knee Joint", refCode: "RAD-9921", facility: "Main Imaging Wing", summary: "Prosthetic components well-aligned." }
      ]
    }
  });

  // Filtering engine logic
  const filteredPatientIds = Object.keys(mockPatientsRegistry).filter(id => {
    const p = mockPatientsRegistry[id].info;
    return p.name.toLowerCase().includes(patientSearch.toLowerCase()) || p.id.includes(patientSearch);
  });

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-4 md:p-8 print:bg-white print:p-0">
      
      {/* MASTER LIST CONTROLLER CONDITIONAL */}
      {!selectedPatientId ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Master EHR Medical Records Registry</h1>
            <p className="text-gray-500 text-sm mt-0.5">Select a patient file to access clinical timelines, previous prescriptions, and lab data.</p>
          </div>

          {/* Search Controls Row */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search patient database by name or ID..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 self-end sm:self-center">
              <Users className="w-4 h-4 text-gray-400" />
              <span>Total Registry Records: {Object.keys(mockPatientsRegistry).length}</span>
            </div>
          </div>

          {/* Master Records Data Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm text-gray-600">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-700">
                  <tr>
                    <th className="p-4">Patient Profile</th>
                    <th className="p-4">Demographics</th>
                    <th className="p-4">Primary Diagnosis</th>
                    <th className="p-4">Last Visit Enc</th>
                    <th className="p-4">Registry Scope</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatientIds.map((id) => {
                    const p = mockPatientsRegistry[id].info;
                    return (
                      <tr 
                        key={id} 
                        onClick={() => setSelectedPatientId(id)}
                        className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                      >
                        <td className="p-4">
                          <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{p.name}</div>
                          <div className="text-xs text-gray-400 font-mono mt-0.5">{p.id}</div>
                        </td>
                        <td className="p-4 text-gray-700 font-medium">
                          {p.age} yrs / {p.gender}
                          <div className="text-xs text-gray-400 mt-0.5">Blood Type: {p.bloodType}</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800">
                            {p.condition}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-gray-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {p.lastVisit}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                            p.status === 'Post-Op Care' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                            p.status === 'Chronic Profile' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                            'bg-emerald-50 border-emerald-100 text-emerald-700'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatientId(id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-lg border text-xs font-bold text-gray-700 transition-all shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Open Chart</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ISOLATED COMPONENT FOR RENDERING PATIENT CHARTS SUB-MODULE */
        <PatientChartDetail 
          activeData={mockPatientsRegistry[selectedPatientId]} 
          onBack={() => setSelectedPatientId(null)} 
        />
      )}

    </div>
  );
};

export default MedicalRecordsDashboard;
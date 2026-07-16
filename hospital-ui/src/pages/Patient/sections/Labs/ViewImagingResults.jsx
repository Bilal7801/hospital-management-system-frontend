import React, { useState } from 'react';
import { Eye, FileText, Calendar, CheckCircle, FlameKindling } from 'lucide-react';

const ViewImagingResults = () => {
  const [selectedScan, setSelectedScan] = useState("IMG-201");

  const scans = {
    "IMG-201": {
      name: "MRI Chest (Non-Contrast)",
      date: "16 May 2026",
      facility: "Metropolitan Imaging Center",
      clinicalIndication: "Investigate intermittent retrosternal pain and mid-afternoon fatigue.",
      impression: "Lungs are clear without consolidation, pleural effusion, or pneumothorax. Heart size is within normal limits. Normal cardiac chamber structures. No signs of pathological mediastinal or hilar lymphadenopathy.",
      radiologist: "Dr. Evelyn Vance, MD"
    },
    "IMG-105": {
      name: "X-Ray Joint (Right Knee AP & Lat)",
      date: "11 Feb 2026",
      facility: "Spine & Joint Institute",
      clinicalIndication: "Evaluate localized mechanical joint pain after moderate walking.",
      impression: "No evidence of fracture, dislocation, or joint effusion. Minor narrowing of the medial joint space noted, consistent with early, mild osteoarthritic changes. Surrounding soft tissues are unremarkable.",
      radiologist: "Dr. Marcus Ross, MD"
    }
  };

  const active = scans[selectedScan] || scans["IMG-201"];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Radiology & Imaging Scans</h3>
          <p className="text-sm text-gray-500 font-medium">Official impressions and diagnostics for X-rays, MRIs, and CT scans.</p>
        </div>

        <select
          value={selectedScan}
          onChange={(e) => setSelectedScan(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm bg-white font-semibold"
        >
          <option value="IMG-201">MRI Chest (16 May 2026)</option>
          <option value="IMG-105">X-Ray Knee (11 Feb 2026)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Imaging Meta Details */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 border border-teal-100 rounded-2xl bg-teal-50/10 space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Imaging Study</span>
              <p className="text-base font-bold text-gray-900 mt-1">{active.name}</p>
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Facility</span>
              <p className="text-sm font-semibold text-teal-800 mt-1">{active.facility}</p>
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Study Date</span>
              <p className="text-sm font-semibold text-gray-600 mt-1 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> {active.date}</p>
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Interpreting Radiologist</span>
              <p className="text-sm font-bold text-gray-800 mt-1">{active.radiologist}</p>
            </div>
          </div>
        </div>

        {/* Written Radiological Finding */}
        <div className="lg:col-span-2 border border-gray-150 rounded-2xl p-6 bg-gray-50/30 space-y-5">
          <div className="space-y-1.5">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-600" /> Clinical Indication
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed italic">"{active.clinicalIndication}"</p>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-teal-600" /> Clinical Findings & Impression
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed font-normal bg-white border border-gray-100 p-4 rounded-xl shadow-inner">
              {active.impression}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImagingResults;
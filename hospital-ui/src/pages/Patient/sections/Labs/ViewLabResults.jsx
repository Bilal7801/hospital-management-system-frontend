import React, { useState } from 'react';
import { Beaker, Search, AlertCircle, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

const ViewLabResults = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const labPanels = [
    {
      id: "LAB-7701",
      name: "Lipid Profile Panel",
      date: "28 May 2026",
      lab: "Central Pathology Labs",
      status: "Completed",
      markers: [
        { name: "Total Cholesterol", value: "210 mg/dL", range: "< 200 mg/dL", status: "High" },
        { name: "Triglycerides", value: "145 mg/dL", range: "< 150 mg/dL", status: "Normal" },
        { name: "HDL Cholesterol", value: "52 mg/dL", range: "> 40 mg/dL", status: "Normal" },
        { name: "LDL Cholesterol", value: "129 mg/dL", range: "< 100 mg/dL", status: "High" }
      ]
    },
    {
      id: "LAB-6912",
      name: "Complete Blood Count (CBC)",
      date: "14 Apr 2026",
      lab: "Central Pathology Labs",
      status: "Completed",
      markers: [
        { name: "White Blood Cells (WBC)", value: "6.8 x10^3/uL", range: "4.5 - 11.0", status: "Normal" },
        { name: "Red Blood Cells (RBC)", value: "4.9 x10^6/uL", range: "4.3 - 5.9", status: "Normal" },
        { name: "Hemoglobin", value: "15.1 g/dL", range: "13.5 - 17.5", status: "Normal" },
        { name: "Platelets", value: "245 x10^3/uL", range: "150 - 450", status: "Normal" }
      ]
    }
  ];

  const filteredPanels = labPanels.filter(panel => 
    panel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Laboratory Test Results</h3>
          <p className="text-sm text-gray-500 font-medium">Verify official numerical bio-markers, blood profiles, and references.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search panels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 outline-none font-medium"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredPanels.map((panel) => (
          <div key={panel.id} className="border border-teal-100 rounded-2xl overflow-hidden shadow-sm bg-teal-50/5">
            {/* Panel Header */}
            <div className="p-4 bg-teal-50/40 border-b border-teal-100/50 flex justify-between items-center flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-extrabold text-teal-700 tracking-wider uppercase block">{panel.id}</span>
                <h4 className="text-base font-bold text-gray-900 mt-0.5">{panel.name}</h4>
              </div>
              <div className="text-right text-xs">
                <p className="text-gray-500 font-semibold">{panel.lab}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Reported: {panel.date}</p>
              </div>
            </div>

            {/* Markers Grid */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {panel.markers.map((marker, idx) => (
                <div key={idx} className="p-4 bg-white border border-gray-100 rounded-xl space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">{marker.name}</span>
                    <span className={`text-lg font-bold block mt-1 ${
                      marker.status === 'High' ? 'text-rose-600' : 'text-gray-800'
                    }`}>{marker.value}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-gray-50 pt-2 text-[10px]">
                    <span className="text-gray-400 font-semibold">Ref: {marker.range}</span>
                    <span className={`px-2 py-0.5 rounded font-extrabold uppercase tracking-wider ${
                      marker.status === 'High' 
                        ? 'bg-rose-50 text-rose-700' 
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {marker.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewLabResults;
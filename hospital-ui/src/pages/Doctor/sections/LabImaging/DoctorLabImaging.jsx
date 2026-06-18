import React, { useState } from 'react';
import LabImagingOrders from './LabImagingOrders';
import LabImagingResults from './LabImagingResults';
import { PlusCircle, Database } from 'lucide-react';

const DoctorLabImaging = () => {
  const [activeTab, setActiveTab] = useState('results'); // 'results' or 'order'
  
  const [activePatient] = useState({
    id: "P-1043",
    name: "Arjun Mehta",
    age: 42,
    gender: "Male"
  });

  // Mock Longitudinal Diagnostic Registry Databases 
  const [diagnosticHistory, setDiagnosticHistory] = useState([
    { id: "REP-9082", type: "Lab Test", name: "Comprehensive Metabolic Panel (CMP)", date: "June 10, 2026", status: "Completed", facility: "Central Core Labs", results: "Fasting Glucose: 112 mg/dL (High), HbA1c: 6.4% (Pre-diabetic Range), Serum Creatinine: 0.9 mg/dL (Normal)." },
    { id: "REP-7721", type: "Imaging", name: "Chest X-Ray PA View", date: "May 12, 2026", status: "Completed", facility: "Metro Radiographics", results: "Lung fields are completely clear bilaterally. No focal consolidations, effusions, or pneumothorax noted. Cardiac silhouette size is within normal limits." },
    { id: "REP-4310", type: "Lab Test", name: "Lipid Profile Panel", date: "Jan 15, 2026", status: "Completed", facility: "Central Core Labs", results: "Total Cholesterol: 210 mg/dL (Borderline High), Triglycerides: 165 mg/dL (High), HDL: 42 mg/dL, LDL: 135 mg/dL." },
    { id: "REP-1109", type: "Imaging", name: "Ultrasound Whole Abdomen", date: "Jan 14, 2026", status: "Pending", facility: "Metro Radiographics", results: "Specimen/Scan captured. Awaiting official radiologist signature sign-off validation logs." }
  ]);

  const handleCreateOrder = (newOrder) => {
    const formattedOrder = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      type: newOrder.category === 'lab' ? 'Lab Test' : 'Imaging',
      name: newOrder.testName,
      date: "Today",
      status: "Pending",
      facility: newOrder.facility,
      results: "Order submitted to queue. Awaiting clinical sample processing workflows."
    };

    setDiagnosticHistory([formattedOrder, ...diagnosticHistory]);
    setActiveTab('results');
  };

  return (
    <div className="space-y-6">
      {/* Module Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Diagnostics & Imaging Lab Portal</h1>
          <p className="text-gray-500 text-sm mt-1">
            Patient: <span className="text-gray-900 font-semibold">{activePatient.name}</span> ({activePatient.id})
          </p>
        </div>

        {/* Tab Switching Control Group */}
        <div className="inline-flex p-1 bg-gray-100 rounded-xl border self-start sm:self-center">
          <button
            onClick={() => setActiveTab('results')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'results' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>View Results Hub</span>
          </button>
          <button
            onClick={() => setActiveTab('order')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'order' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Order Test / Scan</span>
          </button>
        </div>
      </div>

      {/* Primary Dynamic Panel Wrapper Layout */}
      {activeTab === 'results' ? (
        <LabImagingResults records={diagnosticHistory} />
      ) : (
        <LabImagingOrders onSubmit={handleCreateOrder} onCancel={() => setActiveTab('results')} />
      )}
    </div>
  );
};

export default DoctorLabImaging;
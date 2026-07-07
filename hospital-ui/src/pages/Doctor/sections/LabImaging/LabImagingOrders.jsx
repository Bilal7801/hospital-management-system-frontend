import React, { useState } from 'react';
import { TestTube, Image as ImageIcon, Send, ArrowLeft } from 'lucide-react';

const LabImagingOrders = ({ onSubmit, onCancel }) => {
  const [category, setCategory] = useState('lab');
  const [testName, setTestName] = useState('');
  const [facility, setFacility] = useState('Central Core Labs');
  const [clinicalNotes, setClinicalNotes] = useState('');

  const preDefLabs = [
    "Complete Blood Count (CBC)", "HbA1c Glycated Hemoglobin", "Lipid Profile Panel",
    "Renal Function Test (RFT)", "Liver Function Test (LFT)", "Thyroid Profile (T3, T4, TSH)"
  ];

  const preDefScans = [
    "Chest X-Ray PA View", "Ultrasound Whole Abdomen", "MRI Brain Contrast Enhanced",
    "CT Scan Paranasal Sinuses", "Echocardiogram 2D Color Doppler"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!testName.trim()) return;

    onSubmit({
      category,
      testName: testName.trim(),
      facility,
      clinicalNotes: clinicalNotes.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-2xl">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">New Diagnostic Requisition Order</h3>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Category</label>
          <div className="grid grid-cols-2 gap-4">
            <button type="button" onClick={() => { setCategory('lab'); setTestName(''); }}
              className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${category === 'lab' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}>
              <TestTube className="w-5 h-5" />
              <div>
                <div className="font-bold">Laboratory Test</div>
                <div className="text-xs text-gray-500">Blood, Pathology, Biochemistry</div>
              </div>
            </button>

            <button type="button" onClick={() => { setCategory('imaging'); setTestName(''); }}
              className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${category === 'imaging' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}>
              <ImageIcon className="w-5 h-5" />
              <div>
                <div className="font-bold">Radiology / Imaging</div>
                <div className="text-xs text-gray-500">X-Ray, Ultrasound, CT, MRI</div>
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Test / Scan Name</label>
          <select value={testName} onChange={(e) => setTestName(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-blue-500">
            <option value="">Select Procedure</option>
            {(category === 'lab' ? preDefLabs : preDefScans).map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Facility</label>
          <select value={facility} onChange={(e) => setFacility(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-sm">
            <option value="Central Core Labs">Central Core Labs</option>
            <option value="Metro Radiographics">Metro Radiographics</option>
            <option value="Apex Molecular Lab">Apex Molecular Lab</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Clinical Notes</label>
          <textarea value={clinicalNotes} onChange={(e) => setClinicalNotes(e.target.value)} rows={4} placeholder="Reason for test..." className="w-full border border-gray-300 rounded-lg p-3 text-sm" />
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-5 py-2 border text-sm font-medium rounded-lg">Cancel</button>
        <button type="submit" className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg flex items-center gap-2">
          <Send className="w-4 h-4" /> Place Order
        </button>
      </div>
    </form>
  );
};

export default LabImagingOrders;
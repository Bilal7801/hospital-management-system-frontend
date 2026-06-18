import React, { useState } from 'react';
import { TestTube, Image as ImageIcon, Clipboard, Send } from 'lucide-react';

const LabImagingOrders = ({ onSubmit, onCancel }) => {
  const [category, setCategory] = useState('lab'); // 'lab' or 'imaging'
  const [testName, setTestName] = useState('');
  const [facility, setFacility] = useState('Central Core Labs');
  const [clinicalNotes, setClinicalNotes] = useState('');

  const preDefLabs = ["Complete Blood Count (CBC)", "HbA1c Glycated Hemoglobin", "Lipid Profile Panel", "Renal Function Test (RFT)", "Liver Function Test (LFT)", "Thyroid Profile (T3, T4, TSH)"];
  const preDefScans = ["Chest X-Ray PA View", "Ultrasound Whole Abdomen", "MRI Brain Contrast Enhanced", "CT Scan Paranasal Sinuses", "Echocardiogram 2D Color Doppler"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!testName) return;
    onSubmit({ category, testName, facility, clinicalNotes });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-2xl">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">New Diagnostic Requisition Order Form</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Category Segment Selectors */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Diagnostic Category</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => { setCategory('lab'); setTestName(''); }}
              className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                category === 'lab' ? 'border-blue-600 bg-blue-50/40 text-blue-700 font-bold' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <TestTube className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm font-bold">Laboratory Order</div>
                <div className="text-xs text-gray-400 font-normal mt-0.5">Blood chemistry, hematology, pathology assays</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => { setCategory('imaging'); setTestName(''); }}
              className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                category === 'imaging' ? 'border-blue-600 bg-blue-50/40 text-blue-700 font-bold' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <ImageIcon className="w-5 h-5 text-indigo-600" />
              <div>
                <div className="text-sm font-bold">Radiological Imaging</div>
                <div className="text-xs text-gray-400 font-normal mt-0.5">X-Ray, Ultrasound, CT Scans, MRI pathways</div>
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Preset Selector Matrix dropdown */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Select Procedure / Diagnostic Profile</label>
          <select
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white"
            required
          >
            <option value="">-- Choose a standard diagnostic procedure profile --</option>
            {(category === 'lab' ? preDefLabs : preDefScans).map((proc, index) => (
              <option key={index} value={proc}>{proc}</option>
            ))}
          </select>
        </div>

        {/* Fulfill Destination Facility */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Fulfillment Diagnostic Unit</label>
          <select
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white"
          >
            <option value="Central Core Labs">Central Core Labs (In-house Pathology)</option>
            <option value="Metro Radiographics">Metro Radiographics Inc. (Advanced Diagnostic Center)</option>
            <option value="Apex Molecular Diagnostic Lab">Apex Molecular Diagnostic Lab</option>
          </select>
        </div>

        {/* Intent Diagnostic Context Notes */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Clinical Indication / Notes for Technician</label>
          <textarea
            rows={3}
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            placeholder="e.g., Patient displays persistent fasting hyperglycemia. Evaluate for comprehensive metabolic trends..."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Interaction Submission Footer Row */}
      <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors bg-white"
        >
          Cancel Order
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Dispatch Requisition</span>
        </button>
      </div>
    </form>
  );
};

export default LabImagingOrders;
import React from 'react';
import { Printer, Share2, Edit2, ChevronLeft } from 'lucide-react';

const PrescriptionPreview = ({ patient, data, onEdit }) => {
  
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Prescription_${patient.name}`,
        text: `Clinical Chart Prescription Summary for ${patient.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Sharing link copied to device buffer clip matrix framework successfully!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Interaction Controls Header Menu */}
      <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Editor</span>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 rounded-lg transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Modify Script</span>
          </button>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 rounded-lg transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Document</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Prescription</span>
          </button>
        </div>
      </div>

      {/* Printable Paper Canvas Workspace block */}
      <div id="printable-prescription-canvas" className="bg-white border border-gray-300 rounded-xl shadow-md max-w-3xl mx-auto p-8 sm:p-12 print:border-0 print:shadow-none print:p-0">
        
        {/* Prescription Paper Header Layout */}
        <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">METRO CARE CLINICS INC.</h2>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">Internal Medicine & Endocrinology Centre</p>
            <p className="text-[11px] text-gray-400 mt-2">Contact: support@metrocareclinic.com | +91 22 5554 0199</p>
          </div>
          <div className="text-right">
            <h4 className="text-sm font-bold text-gray-900">Dr. Vikram Rathore, MD</h4>
            <p className="text-xs text-blue-600 font-medium">Reg No: BMC-992314-A</p>
          </div>
        </div>

        {/* Patient Parameters Meta Row Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/70 rounded-lg p-4 border border-gray-100 my-6 text-xs">
          <div><span className="text-gray-400 block uppercase font-bold text-[9px] tracking-wider">Patient Name</span><strong className="text-gray-800 text-sm">{patient.name}</strong></div>
          <div><span className="text-gray-400 block uppercase font-bold text-[9px] tracking-wider">Age / Gender</span><span className="text-gray-700 font-medium">{patient.age} Yrs / {patient.gender}</span></div>
          <div><span className="text-gray-400 block uppercase font-bold text-[9px] tracking-wider">Record Identifier</span><span className="text-gray-700 font-mono">{patient.id}</span></div>
          <div><span className="text-gray-400 block uppercase font-bold text-[9px] tracking-wider">Date issued</span><span className="text-gray-700 font-medium">{patient.date}</span></div>
        </div>

        {/* The Rx Symbol Frame Context */}
        <div className="text-3xl font-serif font-bold text-gray-900 mb-4 select-none italic">
          R<span className="text-xl font-sans font-normal -ml-1 text-gray-600">x</span>
        </div>

        {/* Active Medicine Table Grid */}
        <div className="min-h-[220px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-2 w-10">#</th>
                <th className="py-2">Medication Formulation details</th>
                <th className="py-2 text-center w-28">Dosage Pattern</th>
                <th className="py-2 w-40">Administration</th>
                <th className="py-2 text-right w-24">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {data.medicines.map((med, index) => (
                <tr key={med.id}>
                  <td className="py-4 font-bold text-gray-400">{index + 1}</td>
                  <td className="py-4 font-bold text-gray-900">{med.name || 'Unspecified Medicine Compound'}</td>
                  <td className="py-4 font-mono text-center text-blue-700 font-bold bg-blue-50/40 rounded-sm">{med.dosage}</td>
                  <td className="py-4 text-gray-600 pl-4">{med.instructions}</td>
                  <td className="py-4 text-right font-medium text-gray-800">{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes Advisory Section */}
        {data.notes && (
          <div className="mt-8 border-t border-gray-200 pt-4">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Clinical Advice & Notes</h5>
            <p className="text-xs text-gray-600 leading-relaxed bg-amber-50/40 border border-amber-100/60 p-3 rounded-lg">
              {data.notes}
            </p>
          </div>
        )}

        {/* Signature Area layout block */}
        <div className="mt-16 flex justify-end">
          <div className="text-center w-48 border-t border-gray-400 pt-2">
            <div className="font-bold text-sm text-gray-900">Dr. Vikram Rathore</div>
            <div className="text-[10px] text-gray-400 uppercase font-medium tracking-wider mt-0.5">Authorized Signature</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrescriptionPreview;
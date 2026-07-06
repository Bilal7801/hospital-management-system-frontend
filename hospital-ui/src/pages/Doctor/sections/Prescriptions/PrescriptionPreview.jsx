import React from 'react';
import { Printer, Share2, Edit2, ChevronLeft } from 'lucide-react';

const PrescriptionPreview = ({ patient, data, onEdit }) => {
  
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Prescription for ${patient.name}`,
        text: `Clinical Prescription - ${patient.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Prescription link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Editor</span>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button onClick={onEdit} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 rounded-lg">
            <Edit2 className="w-3.5 h-3.5" /> Modify Script
          </button>
          <button onClick={handleShare} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 rounded-lg">
            <Share2 className="w-3.5 h-3.5" /> Share Document
          </button>
          <button onClick={handlePrint} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg">
            <Printer className="w-3.5 h-3.5" /> Print Prescription
          </button>
        </div>
      </div>

      <div id="printable-prescription" className="bg-white border-2 border-gray-300 rounded-xl shadow-md max-w-3xl mx-auto p-8 print:shadow-none print:border-gray-400">
        <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">METRO CARE CLINICS</h2>
            <p className="text-sm text-gray-500">Internal Medicine & Endocrinology</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">Dr. Bilal</div>
            <div className="text-xs text-blue-600">Cardiology Specialist</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg mb-8 text-sm">
          <div><span className="text-xs text-gray-500 block">Patient Name</span><strong>{patient.name}</strong></div>
          <div><span className="text-xs text-gray-500 block">Age / Gender</span><span>{patient.age} Yrs / {patient.gender}</span></div>
          <div><span className="text-xs text-gray-500 block">Record ID</span><span className="font-mono">{patient.id}</span></div>
          <div><span className="text-xs text-gray-500 block">Date</span><span>{patient.date}</span></div>
        </div>

        <div className="text-4xl font-serif font-bold text-gray-900 mb-6">R<span className="text-2xl -ml-1 text-gray-500">x</span></div>

        <table className="w-full border-collapse mb-8">
          <thead>
            <tr className="border-b-2 border-gray-800 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
              <th className="py-3 w-8">#</th>
              <th className="py-3">Medication</th>
              <th className="py-3 text-center">Dosage</th>
              <th className="py-3">Instructions</th>
              <th className="py-3 text-right">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {data.medicines.map((med, index) => (
              <tr key={med.id || index}>
                <td className="py-4 font-medium text-gray-400">{index + 1}</td>
                <td className="py-4 font-semibold text-gray-900">{med.name}</td>
                <td className="py-4 text-center font-mono text-blue-700">{med.dosage}</td>
                <td className="py-4 text-gray-600">{med.instructions}</td>
                <td className="py-4 text-right font-medium">{med.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.notes && (
          <div className="bg-amber-50 border border-amber-100 p-5 rounded-lg mb-8">
            <h5 className="text-xs font-bold text-amber-700 uppercase mb-2">Clinical Advice</h5>
            <p className="text-sm text-gray-700 leading-relaxed">{data.notes}</p>
          </div>
        )}

        <div className="mt-12 flex justify-end">
          <div className="text-center border-t border-gray-400 pt-2 w-56">
            <div className="font-bold text-gray-900">Dr. Bilal</div>
            <div className="text-xs text-gray-400">Authorized Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPreview;
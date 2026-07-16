import React, { useState } from 'react';
import { Download, Mail, ShieldCheck, Share2, FileText, Check } from 'lucide-react';

const DownloadShareReports = () => {
  const [recipient, setRecipient] = useState("");
  const [shared, setShared] = useState(false);

  const reportsList = [
    { name: "Lipid Profile Panel - 28 May 2026", size: "2.4 MB", ext: "PDF" },
    { name: "MRI Chest Radiography - 16 May 2026", size: "18.5 MB", ext: "PDF / DICOM" },
    { name: "Complete Blood Count (CBC) - 14 Apr 2026", size: "1.9 MB", ext: "PDF" }
  ];

  const handleShare = (e) => {
    e.preventDefault();
    if (!recipient) return;
    setShared(true);
    setTimeout(() => {
      setShared(false);
      setRecipient("");
    }, 4000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Secure Export & Clinical Sharing</h3>
        <p className="text-sm text-gray-500 font-medium">Safely download print-ready diagnostic PDFs or forward files directly to external specialists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Reports list */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Reports Ready for Download</h4>
          
          <div className="space-y-3">
            {reportsList.map((file, idx) => (
              <div key={idx} className="p-4 border border-gray-100 rounded-xl hover:border-teal-200 bg-white hover:bg-teal-50/5 transition-all flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">{file.name}</h5>
                    <p className="text-xs text-gray-400 font-medium">{file.ext} • {file.size}</p>
                  </div>
                </div>

                <button className="p-2 hover:bg-teal-50 text-gray-400 hover:text-teal-700 rounded-xl transition-all border border-transparent hover:border-teal-100">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* HIPAA Compliance and Share Panel */}
        <div className="space-y-4">
          <div className="p-5 border border-teal-100 rounded-2xl bg-teal-50/20 space-y-4">
            <h4 className="text-xs font-extrabold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> HIPAA Secure Share
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">Forward reports directly to another clinic's electronic medical system via verified email.</p>

            <form onSubmit={handleShare} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Doctor's clinical email..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 outline-none font-medium"
              />
              <button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {shared ? <><Check className="w-4 h-4" /> Reports Forwarded</> : <><Mail className="w-4 h-4" /> Transmit Securely</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadShareReports;
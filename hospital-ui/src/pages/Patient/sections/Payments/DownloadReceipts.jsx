import React from 'react';
import { Download, FileCheck, Calendar, ArrowUpRight } from 'lucide-react';

const DownloadReceipts = () => {
  const receiptsList = [
    { name: "Receipt_TXN-9021_Dr_Johnson", size: "1.2 MB", date: "12 Apr 2026", cost: "$120.00" },
    { name: "Receipt_TXN-7104_Pathology_Lab", size: "850 KB", date: "11 Feb 2026", cost: "$45.00" },
    { name: "Receipt_TXN-6601_Outpatient_Knee", size: "1.5 MB", date: "10 Feb 2026", cost: "$150.00" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Receipt Download Center</h3>
        <p className="text-sm text-gray-500 font-medium">Export and verify physical billing documentation or digital tax statement receipts.</p>
      </div>

      <div className="space-y-3">
        {receiptsList.map((receipt, idx) => (
          <div key={idx} className="p-4 border border-gray-100 rounded-xl hover:border-red-200 bg-white hover:bg-red-50/5 transition-all flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-50 text-red-700 rounded-xl">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-gray-900">{receipt.name}</h5>
                <p className="text-xs text-gray-400 font-semibold flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3.5 h-3.5" /> Filed: {receipt.date} • {receipt.size} • <span className="text-red-700 font-bold">{receipt.cost}</span>
                </p>
              </div>
            </div>

            <button className="p-2.5 hover:bg-red-50 text-gray-400 hover:text-red-700 rounded-xl transition-all border border-transparent hover:border-red-100 flex items-center gap-1.5 font-bold text-xs">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadReceipts;
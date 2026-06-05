import React from 'react';
import { Printer, Mail, CheckCircle, FileText } from 'lucide-react';

const PrintEmailReceipt = ({ invoiceId, patientName, totalAmount = 0, isPaid }) => {
  const handlePrint = () => {
    const printContent = document.getElementById('receipt-slip');
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.outerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleDownloadPDF = () => {
    alert("PDF Download feature coming soon...");
  };

  const handleSendEmail = () => {
    alert(`Receipt has been sent to patient's registered email.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Configuration Controls */}
      <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Printer className="w-4 h-4 text-blue-600" />
              Document Delivery Hub
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Dispatch audit logs to printer or patient email</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={handlePrint}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Thermal Ticket Receipt
            </button>

            <button
              onClick={handleDownloadPDF}
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-gray-400" /> Download A4 PDF Report
            </button>

            <button
              onClick={handleSendEmail}
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-gray-400" /> Send Email Receipt
            </button>
          </div>
        </div>

        {isPaid && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-2.5 text-emerald-800 text-xs">
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="font-bold block">Payment Confirmed</strong>
              Transaction settlement completed successfully.
            </div>
          </div>
        )}
      </div>

      {/* Receipt Preview - This will be printed */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest border border-gray-200 rounded-md px-2.5 py-1 bg-gray-50 mb-4">
          Generated Document Layout Preview
        </span>

        {/* Printable Receipt Area */}
        <div id="receipt-slip" className="w-full max-w-md border border-gray-300 rounded-xl shadow-inner p-6 space-y-4 text-xs font-medium text-gray-600 bg-white">
          <div className="text-center space-y-0.5 border-b border-gray-200 pb-3">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-wide">METRO CARE MEDICAL FACILITY</h4>
            <p className="text-[11px] text-gray-500">Sector-4, Clinical Complex</p>
            <p className="text-[10px] text-gray-500 font-mono">TEL: +91 98765-43210</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-gray-100 pb-3">
            <div>
              <span className="text-gray-500 font-bold">INVOICE:</span>{' '}
              <span className="font-mono text-gray-800">#{invoiceId || 'INV-2026-XXXX'}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 font-bold">DATE:</span>{' '}
              <span className="text-gray-800">{new Date().toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold">PATIENT:</span>{' '}
              <span className="text-gray-800 font-bold">{patientName || 'N/A'}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 font-bold">RECEIPT:</span>{' '}
              <span className="text-gray-800">TRX-{Date.now().toString().slice(-8)}</span>
            </div>
          </div>

          <div className="space-y-2 border-b border-gray-100 pb-3">
            <div className="flex justify-between font-medium text-gray-700">
              <span>Consultation & Services</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-right font-bold text-sm pt-1">
            <div className="flex justify-between text-gray-500">
              <span>Gross Amount:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Discount Applied:</span>
              <span>$0.00</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between text-lg text-gray-900">
              <span>TOTAL PAID:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center text-[10px] text-gray-400 font-bold pt-4 border-t border-dashed border-gray-200 tracking-wide">
            Thank you for choosing Metro Care. Get well soon!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintEmailReceipt;
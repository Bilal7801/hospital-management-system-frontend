import React from 'react';
import { Printer, Mail, CheckCircle, FileText } from 'lucide-react';

const PrintEmailReceipt = () => {
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
            <p className="text-xs text-gray-400 mt-0.5">Dispatch audit logs directly to physical thermal printers or digital patient registers</p>
          </div>

          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <Printer className="w-4 h-4" /> Print Thermal Ticket Receipt (3-Inch)
            </button>
            <button className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <FileText className="w-4 h-4 text-gray-400" /> Save & Download full A4 PDF Report
            </button>
            <button className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <Mail className="w-4 h-4 text-gray-400" /> Dispatch Electronic Email Invoice
            </button>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2.5 text-emerald-800 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="font-bold block">Transaction Confirmed</strong>
            Transaction settlement logs match local registry accounts exactly.
          </div>
        </div>
      </div>

      {/* Styled Render Preview Container */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col items-center">
        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest border border-gray-200 rounded-md px-2.5 py-1 bg-gray-50 mb-4">
          Generated Document Layout Preview
        </span>

        {/* Paper Layout Emulation Card */}
        <div className="w-full max-w-md border border-gray-200 rounded-xl shadow-inner p-6 space-y-4 text-xs font-medium text-gray-600 bg-amber-50/5">
          <div className="text-center space-y-0.5 border-b border-gray-100 pb-3">
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-wide">Metro Care Medical Facility</h4>
            <p className="text-[11px] text-gray-400">Sector-4, Clinical Complex Core Hub</p>
            <p className="text-[10px] text-gray-400 font-mono">TEL: +91 98765-43210</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-gray-50 pb-3">
            <div><span className="text-gray-400 font-bold">INVOICE:</span> <span className="font-mono text-gray-800">#INV-2026-8941</span></div>
            <div className="text-right"><span className="text-gray-400 font-bold">DATE:</span> <span className="text-gray-800">21-May-2026</span></div>
            <div><span className="text-gray-400 font-bold">PATIENT:</span> <span className="text-gray-800 font-bold">Vikas Khanna</span></div>
            <div className="text-right"><span className="text-gray-400 font-bold">CASHIER DESK:</span> <span className="text-gray-800">Desk-01</span></div>
          </div>

          <div className="space-y-2 border-b border-gray-100 pb-3">
            <div className="flex justify-between font-bold text-gray-800">
              <span>Standard Consultation Base Rate</span>
              <span>₹800.00</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800">
              <span>ECG Diagnostic Screening Run</span>
              <span>₹1,500.00</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800">
              <span>Disposable Sterile Syringe Assembly Pack (x2)</span>
              <span>₹90.00</span>
            </div>
          </div>

          <div className="space-y-1.5 text-right font-bold text-[11px] pt-1">
            <div className="flex justify-between text-gray-400">
              <span>Gross Balance sum:</span>
              <span className="text-gray-700">₹2,390.00</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Deductions / Discounts:</span>
              <span className="text-gray-700">₹0.00</span>
            </div>
            <div className="flex justify-between text-sm font-black text-gray-800 pt-1 border-t border-gray-100">
              <span>TOTAL SETTLED AMOUNT:</span>
              <span className="text-blue-600 text-sm font-black">₹2,390.00</span>
            </div>
          </div>

          <div className="text-center text-[10px] text-gray-400 font-bold pt-4 border-t border-dashed border-gray-200 tracking-wide">
            Thank you for trusting Metro Care. Get well soon!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintEmailReceipt;
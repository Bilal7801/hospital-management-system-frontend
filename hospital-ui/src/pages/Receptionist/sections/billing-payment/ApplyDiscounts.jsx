import React, { useState } from 'react';
import { Percent, ShieldCheck } from 'lucide-react';

const ApplyDiscounts = () => {
  const [discountType, setDiscountType] = useState('none');
  const [authCode, setAuthCode] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Parameters Controls */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Percent className="w-4 h-4 text-blue-600" />
            Apply Authorized Deductions & Adjustments
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Inject valid corporate welfare matrices, senior waivers, or camp concessions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Concession Class Category</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-semibold cursor-pointer transition-all"
            >
              <option value="none">Zero Concessions Applied</option>
              <option value="senior">Senior Citizen Discount Tier (-10%)</option>
              <option value="corporate">Corporate Health Panel Partner (-15%)</option>
              <option value="welfare">Institutional Compassionate Waiver (-25%)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Manager Authorization Key Override</label>
            <input
              type="password"
              placeholder="••••••••"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-semibold shadow-inner"
            />
          </div>
        </div>

        <div className="pt-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-2 cursor-pointer">
            <ShieldCheck className="w-4 h-4" /> Lock Adjustment Token
          </button>
        </div>
      </div>

      {/* Financial Matrix Calculation Box */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between text-xs">
        <div className="space-y-4">
          <h4 className="font-bold uppercase text-[10px] tracking-wider text-gray-400 border-b border-gray-100 pb-2.5">
            Dynamic Ledger Computations
          </h4>
          <div className="space-y-3 font-semibold text-gray-600">
            <div className="flex justify-between">
              <span>Gross Balance:</span>
              <span className="text-gray-800">₹2,390.00</span>
            </div>
            <div className="flex justify-between text-rose-600 bg-rose-50/50 px-2 py-1.5 rounded-lg border border-rose-100/40">
              <span>Adjustment Markdown:</span>
              <span>- ₹0.00</span>
            </div>
            <div className="h-px bg-gray-100 my-2"></div>
            <div className="flex justify-between text-sm font-black text-gray-800 pt-1">
              <span>Net Adjusted Total:</span>
              <span className="text-blue-600">₹2,390.00</span>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 font-semibold leading-normal pt-4 border-t border-gray-50 mt-4">
          All manual discount line transactions map directly into administrative financial logs for daily audit.
        </p>
      </div>
    </div>
  );
};

export default ApplyDiscounts;
import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound } from 'lucide-react';

const ChangePasswordSection = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
          <KeyRound className="w-4 h-4 text-gray-400" /> Cryptographic Key Rotation Engine
        </h3>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">Enforce password updates at regular intervals to uphold compliance protocols.</p>
      </div>

      <div className="max-w-md space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Current Authorization Key</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="password" 
              placeholder="••••••••••••"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Generation Key (New)</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="password" 
              placeholder="••••••••••••"
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Verify Target Key Specification</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="password" 
              placeholder="••••••••••••"
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all">
          <ShieldCheck className="w-4 h-4" /> <span>Update Security Authorization</span>
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordSection;
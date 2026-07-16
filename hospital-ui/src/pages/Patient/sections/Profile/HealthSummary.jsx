import React from 'react';
import { Activity, Flame, GlassWater, Dumbbell } from 'lucide-react';

const HealthSummary = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Physiological Summary</h3>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Height</p>
          <p className="text-xl font-extrabold text-gray-900 mt-1">178 <span className="text-xs font-medium text-gray-400">cm</span></p>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weight</p>
          <p className="text-xl font-extrabold text-gray-900 mt-1">74 <span className="text-xs font-medium text-gray-400">kg</span></p>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">BMI Index</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1">23.3 <span className="text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-emerald-700 block mt-1 w-max mx-auto">Normal</span></p>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Blood Type</p>
          <p className="text-xl font-extrabold text-rose-600 mt-1">O-Negative</p>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Lifestyle Summary */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">Lifestyle Habits</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Activity Level</p>
            <p className="text-xs text-gray-500 mt-1">Exercises 4-5 times a week (Badminton, Home weight routine).</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
            <GlassWater className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Hydration</p>
            <p className="text-xs text-gray-500 mt-1">Averages 3.5 Liters of pure hydration daily.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSummary;
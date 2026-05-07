import React from 'react';
import { Users, UserPlus, Heart, AlertTriangle, Activity } from 'lucide-react';

const PatientStats = () => {
  const patientStats = [
    { label: 'Total Patients', value: '5,420', icon: Users, color: 'text-blue-600' },
    { label: 'New Patients', value: '320', icon: UserPlus, color: 'text-emerald-600' },
    { label: 'Active Patients', value: '4,900', icon: Activity, color: 'text-purple-600' },
    { label: 'Critical Cases', value: '45', icon: AlertTriangle, color: 'text-rose-600' },
  ];

  const ageGroups = [
    { range: '0-18 years', count: 420, percentage: 8 },
    { range: '18-30 years', count: 980, percentage: 18 },
    { range: '30-50 years', count: 2100, percentage: 39 },
    { range: '50-70 years', count: 1560, percentage: 29 },
    { range: '70+ years', count: 360, percentage: 6 },
  ];

  const genderDistribution = [
    { gender: 'Male', count: 2740, percentage: 51 },
    { gender: 'Female', count: 2680, percentage: 49 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Patient Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {patientStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Age Distribution</h3>
          <div className="space-y-3">
            {ageGroups.map((group, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{group.range}</p>
                  <p className="font-bold text-blue-600">{group.count}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${group.percentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{group.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Gender Distribution</h3>
          <div className="space-y-4 flex flex-col justify-center">
            {genderDistribution.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{item.gender}</p>
                  <p className="font-bold text-emerald-600">{item.count}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-pink-600'}`} style={{ width: `${item.percentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{item.percentage}% of total patients</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientStats;
import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Heart, AlertTriangle, Activity } from 'lucide-react';
import api from "../../../../../api/axios";

const PatientStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientStats();
  }, []);

  const fetchPatientStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/superadmin/reports/patients/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching patient stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading patient statistics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Patient Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Patients" value={stats.totalPatients} icon={Users} color="text-blue-600" />
          <StatCard label="New Patients" value={stats.newPatientsThisMonth} icon={UserPlus} color="text-emerald-600" />
          <StatCard label="Active Patients" value={stats.activePatients} icon={Activity} color="text-purple-600" />
          <StatCard label="Critical Cases" value={stats.criticalCases} icon={AlertTriangle} color="text-rose-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <div>
          <h3 className="text-lg font-bold mb-4">Age Distribution</h3>
          <div className="space-y-3">
            {stats.ageGroups?.map((group, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-white cursor-pointer hover:shadow-md transition-all">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">{group.range}</p>
                  <p className="font-bold text-blue-600">{group.count}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.round((group.count / stats.totalPatients) * 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender Distribution */}
        <div>
          <h3 className="text-lg font-bold mb-4">Gender Distribution</h3>
          <div className="space-y-4">
            {stats.genderDistribution?.map((item, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-white cursor-pointer hover:shadow-md transition-all">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">{item.gender}</p>
                  <p className="font-bold text-emerald-600">{item.count}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-pink-600'}`} 
                       style={{ width: `${Math.round((item.count / stats.totalPatients) * 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="p-5 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition-all cursor-pointer">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value || 0}</p>
  </div>
);

export default PatientStats;
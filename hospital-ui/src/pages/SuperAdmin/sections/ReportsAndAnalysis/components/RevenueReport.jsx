import React, { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import api from "../../../../../api/axios";

const RevenueReport = ({ period = "month" }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, [period]);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/superadmin/reports/revenue?period=${period}`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching revenue report:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading revenue data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Revenue Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Revenue" value={`Rs. ${(data.summary?.totalRevenue || 0).toLocaleString()}`} icon={DollarSign} color="text-emerald-600" />
          <StatCard label="Transactions" value={data.summary?.transactionCount || 0} icon={TrendingUp} color="text-blue-600" />
          <StatCard label="Avg Transaction" value={`Rs. ${(data.summary?.avgTransaction || 0).toFixed(0)}`} icon={Calendar} color="text-purple-600" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Revenue by Department</h3>
        <div className="space-y-3">
          {data.byDepartment?.map((dept, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-white cursor-pointer hover:shadow-md transition-all">
              <div className="flex justify-between mb-2">
                <p className="font-medium">{dept.department}</p>
                <p className="font-bold text-emerald-600">Rs. {dept.revenue.toLocaleString()}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dept.percentage || 0}%` }}></div>
              </div>
            </div>
          ))}
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
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default RevenueReport;
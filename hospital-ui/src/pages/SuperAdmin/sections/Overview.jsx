import React from 'react';
import { UserPlus, Users, Calendar, Activity, TrendingUp } from 'lucide-react';

const Overview = () => {
  const stats = [
    { title: "Total Doctors", count: "124", icon: UserPlus, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Patients", count: "1,250", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Avg. Appointments", count: "45", icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Active Surgeries", count: "12", icon: Activity, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
              <TrendingUp className="text-emerald-500 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Doctor</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">Patient #{i}042</td>
                  <td className="px-6 py-4 text-gray-700">Dr. Sarah Johnson</td>
                  <td className="px-6 py-4 text-gray-700">Oct 24, 2023</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      i % 2 === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {i % 2 === 0 ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
import React, { useState } from 'react';
import { ArrowLeft, Download, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RevenueReports = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedYear, setSelectedYear] = useState('2025');

  const monthlyData = [
    { month: 'January', revenue: 45000, transactions: 320, avg: 140 },
    { month: 'February', revenue: 52000, transactions: 380, avg: 137 },
    { month: 'March', revenue: 48000, transactions: 350, avg: 137 },
    { month: 'April', revenue: 61000, transactions: 420, avg: 145 },
    { month: 'May', revenue: 58500, transactions: 410, avg: 142 },
  ];

  const departmentRevenue = [
    { name: 'Cardiology', revenue: '$28,500', percentage: 28, trend: '+5.2%' },
    { name: 'Neurology', revenue: '$22,800', percentage: 22, trend: '+3.1%' },
    { name: 'Orthopedics', revenue: '$18,900', percentage: 19, trend: '-1.2%' },
    { name: 'Pediatrics', revenue: '$15,600', percentage: 15, trend: '+2.5%' },
    { name: 'General Surgery', revenue: '$14,700', percentage: 16, trend: '+4.3%' },
  ];

  const doctorRevenue = [
    { name: 'Dr. James Wilson', revenue: '$12,500', transactions: 85, avg: 147 },
    { name: 'Dr. Sarah Jenkins', revenue: '$11,200', transactions: 78, avg: 144 },
    { name: 'Dr. Robert Fox', revenue: '$9,800', transactions: 65, avg: 151 },
    { name: 'Dr. Emily Brown', revenue: '$8,500', transactions: 58, avg: 147 },
    { name: 'Dr. Michael Davis', revenue: '$7,600', transactions: 52, avg: 146 },
  ];

  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
  const totalTransactions = monthlyData.reduce((sum, m) => sum + m.transactions, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/billing')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Billing
      </button>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Revenue Reports
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Track revenue by department, doctor, and time period
          </p>
        </div>

        <button
          onClick={() => {}}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${(totalRevenue / 1000).toFixed(1)}K
          </p>
          <p className="text-xs text-green-600 mt-2 font-semibold">
            ↑ 8.5% from last period
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Total Transactions
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {totalTransactions}
          </p>
          <p className="text-xs text-green-600 mt-2 font-semibold">
            ↑ 5.2% from last period
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Average Transaction
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${(totalRevenue / totalTransactions).toFixed(0)}
          </p>
          <p className="text-xs text-green-600 mt-2 font-semibold">
            ↑ 3.1% from last period
          </p>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Monthly Revenue Trend
        </h3>

        <div className="space-y-4">
          {monthlyData.map((data, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center justify-between w-full gap-4">
                <span className="text-sm font-semibold text-gray-700 min-w-24">
                  {data.month}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-3 transition-all"
                    style={{
                      width: `${(data.revenue / 65000) * 100}%`,
                    }}
                  >
                    <span className="text-[11px] font-bold text-white">
                      ${(data.revenue / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 min-w-20 text-right">
                  {data.transactions} txn
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Revenue by Department
          </h3>

          <div className="space-y-4">
            {departmentRevenue.map((dept, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {dept.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {dept.revenue}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">
                      {dept.percentage}%
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      {dept.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Doctors by Revenue */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Top Doctors by Revenue
          </h3>

          <div className="space-y-3">
            {doctorRevenue.map((doctor, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {doctor.transactions} transactions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    {doctor.revenue}
                  </p>
                  <p className="text-xs text-gray-400">
                    Avg: ${doctor.avg}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default RevenueReports;

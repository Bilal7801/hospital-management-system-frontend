import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios'; // Using your existing axios instance

const RevenueReports = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // States to hold backend data
  const [reportStats, setReportStats] = useState(null);
  const [allPayments, setAllPayments] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both the summary report and the detailed payment list
      const [reportRes, paymentsRes] = await Promise.all([
        api.get('/superadmin/billing/revenue-report'),
        api.get('/superadmin/billing/payments')
      ]);

      setReportStats(reportRes.data);
      setAllPayments(paymentsRes.data);
    } catch (err) {
      setError('Failed to sync with financial records.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- DYNAMIC DATA MAPPING (Keeping your exact structure) ---

  // 1. Calculate Department Revenue
  const departmentRevenue = useMemo(() => {
    const depts = {};
    allPayments.forEach(p => {
      const name = p.departmentName || 'General';
      if (!depts[name]) depts[name] = { name, revenue: 0, count: 0 };
      depts[name].revenue += p.amount;
      depts[name].count += 1;
    });

    const total = Object.values(depts).reduce((sum, d) => sum + d.revenue, 0);

    return Object.values(depts)
      .map(d => ({
        name: d.name,
        revenue: `$${d.revenue.toLocaleString()}`,
        percentage: total > 0 ? Math.round((d.revenue / total) * 100) : 0,
        trend: '+0.0%' // Backend doesn't provide historical trend yet
      }))
      .sort((a, b) => parseFloat(b.revenue.replace('$', '')) - parseFloat(a.revenue.replace('$', '')));
  }, [allPayments]);

  // 2. Calculate Top Doctors
  const doctorRevenue = useMemo(() => {
    const docs = {};
    allPayments.forEach(p => {
      const name = p.doctorName || 'Staff';
      if (!docs[name]) docs[name] = { name, revenue: 0, transactions: 0 };
      docs[name].revenue += p.amount;
      docs[name].transactions += 1;
    });

    return Object.values(docs)
      .map(d => ({
        name: d.name,
        revenue: `$${d.revenue.toLocaleString()}`,
        transactions: d.transactions,
        avg: d.transactions > 0 ? Math.round(d.revenue / d.transactions) : 0
      }))
      .sort((a, b) => parseFloat(b.revenue.replace('$', '')) - parseFloat(a.revenue.replace('$', '')))
      .slice(0, 5);
  }, [allPayments]);

  // 3. Stats calculation
  const totalRevenue = reportStats?.totalRevenue || 0;
  const totalTransactions = reportStats?.totalPayments || 0;
  const avgTransaction = totalTransactions > 0 ? (totalRevenue / totalTransactions).toFixed(0) : 0;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

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
          onClick={() => window.print()} // Quick print functionality
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

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
            Real-time balance
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
            Completed: {reportStats?.completedPayments}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Average Transaction
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${avgTransaction}
          </p>
          <p className="text-xs text-green-600 mt-2 font-semibold">
            Per paid invoice
          </p>
        </div>
      </div>

      {/* Monthly Revenue Chart - Using dynamic monthlyRevenue from backend */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Current Month Revenue
        </h3>

        <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between w-full gap-4">
                <span className="text-sm font-semibold text-gray-700 min-w-24">
                  This Month
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end pr-3 transition-all"
                    style={{
                      width: `100%`, // Highlighted bar for current month
                    }}
                  >
                    <span className="text-[11px] font-bold text-white">
                      ${(reportStats?.monthlyRevenue / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 min-w-20 text-right">
                   Live Data
                </span>
              </div>
            </div>
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
import React, { useEffect, useMemo, useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Eye,
  Download,
  Calendar,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios';

const BillingAndPayment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revenueReport, setRevenueReport] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBillingDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        const [revenueRes, transactionsRes] = await Promise.all([
          api.get('/superadmin/billing/revenue-report'),
          api.get('/superadmin/billing/transactions'),
        ]);

        setRevenueReport(revenueRes.data);
        setTransactions(Array.isArray(transactionsRes.data) ? transactionsRes.data : []);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.response?.data ||
            'Failed to load billing dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBillingDashboard();
  }, []);

  const formatCurrency = (value) => {
    const numberValue = Number(value || 0);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(numberValue);
  };

  const handleUpdateTransactionStatus = async (transactionId, newStatus) => {
    try {
      setUpdatingId(transactionId);
      await api.patch(`/superadmin/billing/transactions/${transactionId}`, {
        status: newStatus,
      });
      
      setTransactions((prevTransactions) =>
        prevTransactions.map((t) =>
          t.id === transactionId ? { ...t, status: newStatus } : t
        )
      );
      
      setSuccessMessage(`Transaction updated to ${newStatus}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Failed to update transaction:', err);
      setError(
        err?.response?.data?.message || 'Failed to update transaction status.'
      );
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = useMemo(() => {
    const pendingTransactions = transactions.filter(
      (t) => t.status?.toLowerCase() === 'pending' || t.status?.toLowerCase() === 'processing'
    );
    
    return [
      {
        title: 'Total Revenue',
        amount: formatCurrency(revenueReport?.totalRevenue),
        change: '+12.5%',
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-50',
      },
      {
        title: 'Pending Payments',
        amount: String(pendingTransactions.length),
        change: `-${pendingTransactions.length} awaiting`,
        icon: CreditCard,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
      },
      {
        title: 'Completed Transactions',
        amount: String(revenueReport?.completedPayments ?? 0),
        change: '+8.1%',
        icon: TrendingUp,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
    ];
  }, [revenueReport, transactions]);

  const quickActions = [
    {
      label: 'View All Payments',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/dashboard/billing/payments',
    },
    {
      label: 'Revenue Reports',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      path: '/dashboard/billing/revenue',
    },
    {
      label: 'Payment Methods',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      path: '/dashboard/billing/methods',
    },
    {
      label: 'View Transactions',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      path: '/dashboard/billing/transactions',
    },
  ];

  const recentTransactions = useMemo(() => {
    return (transactions || []).slice(0, 4).map((transaction) => ({
      id: transaction.id,
      patient: transaction.patientName || '-',
      doctor: transaction.doctorName || '-',
      amount: formatCurrency(transaction.amount),
      date: transaction.transactionDate
        ? new Date(transaction.transactionDate).toISOString().split('T')[0]
        : '-',
      status: transaction.status || '-',
      type: transaction.paymentMethod || '-',
    }));
  }, [transactions]);

  const pendingTransactions = useMemo(() => {
    return (transactions || [])
      .filter((t) => t.status?.toLowerCase() === 'pending' || t.status?.toLowerCase() === 'processing')
      .map((transaction) => ({
        id: transaction.id,
        patient: transaction.patientName || '-',
        doctor: transaction.doctorName || '-',
        amount: formatCurrency(transaction.amount),
        date: transaction.transactionDate
          ? new Date(transaction.transactionDate).toISOString().split('T')[0]
          : '-',
        status: transaction.status || '-',
        type: transaction.paymentMethod || '-',
      }));
  }, [transactions]);

  const handleDownloadReport = async () => {
    try {
      const response = await api.get('/superadmin/billing/download-report', {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'billing-report');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      navigate('/dashboard/billing/transactions');
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-sm font-semibold text-gray-500">Loading billing dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Billing & Payment Management
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage payments, revenue reports, and transaction history
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600 flex items-center gap-2">
          <Check className="w-4 h-4" />
          {successMessage}
        </div>
      ) : null}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.amount}
                </p>
                <p className="text-xs text-green-600 mt-1 font-semibold">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => navigate(action.path)}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group"
          >
            <div
              className={`${action.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
            >
              <action.icon className={`${action.color} w-6 h-6`} />
            </div>
            <p className="text-sm font-semibold text-gray-900 text-left">
              {action.label}
            </p>
          </button>
        ))}
      </div>

      {/* Pending Payments Section */}
      {pendingTransactions.length > 0 && (
        <div className="bg-white border border-orange-200 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-orange-100 flex items-center justify-between gap-3 bg-orange-50">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Pending Payments ({pendingTransactions.length})
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Transactions awaiting confirmation or completion
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-[11px] uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4 text-left font-semibold">Patient</th>
                  <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                  <th className="px-6 py-4 text-left font-semibold">Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-center font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {transaction.patient}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.doctor}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-orange-50 text-orange-600 inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          handleUpdateTransactionStatus(transaction.id, 'Completed')
                        }
                        disabled={updatingId === transaction.id}
                        className="px-3 py-1 rounded-lg text-sm font-semibold bg-green-50 text-green-600 hover:bg-green-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 inline-flex cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        {updatingId === transaction.id ? 'Updating...' : 'Mark Complete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Recent Transactions
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Latest billing activity from the backend
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
            <Calendar className="w-4 h-4" />
            Live data
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-[11px] uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4 text-left font-semibold">Patient</th>
                <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                <th className="px-6 py-4 text-left font-semibold">Type</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {transaction.patient}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.doctor}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          transaction.status === 'Completed' || transaction.status === 'Success'
                            ? 'bg-emerald-50 text-emerald-600'
                            : transaction.status === 'Pending'
                              ? 'bg-orange-50 text-orange-600'
                              : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => navigate('/dashboard/billing/transactions')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            View All Transactions →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingAndPayment;

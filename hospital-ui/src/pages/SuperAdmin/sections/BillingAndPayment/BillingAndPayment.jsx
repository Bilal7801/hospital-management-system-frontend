import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Eye, Download, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BillingAndPayment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = [
    {
      title: "Total Revenue",
      amount: "$125,450",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Pending Payments",
      amount: "$24,890",
      change: "-3.2%",
      icon: CreditCard,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Completed Transactions",
      amount: "1,248",
      change: "+8.1%",
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  const quickActions = [
    {
      label: "View All Payments",
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      path: "/dashboard/billing/payments",
    },
    {
      label: "Revenue Reports",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      path: "/dashboard/billing/revenue",
    },
    {
      label: "Payment Methods",
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      path: "/dashboard/billing/methods",
    },
    {
      label: "View Transactions",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      path: "/dashboard/billing/transactions",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. James Wilson",
      amount: "$150",
      date: "2025-05-07",
      status: "Completed",
      type: "Consultation",
    },
    {
      id: 2,
      patient: "Jane Smith",
      doctor: "Dr. Sarah Jenkins",
      amount: "$200",
      date: "2025-05-06",
      status: "Completed",
      type: "Surgery",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      doctor: "Dr. Robert Fox",
      amount: "$75",
      date: "2025-05-05",
      status: "Pending",
      type: "Check-up",
    },
    {
      id: 4,
      patient: "Emily Brown",
      doctor: "Dr. James Wilson",
      amount: "$300",
      date: "2025-05-04",
      status: "Completed",
      type: "Procedure",
    },
  ];

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
          onClick={() => navigate('/dashboard/billing/transactions')}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

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
            <div className={`${action.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className={`${action.color} w-6 h-6`} />
            </div>
            <p className="text-sm font-semibold text-gray-900 text-left">
              {action.label}
            </p>
          </button>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            Recent Transactions
          </h3>
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
              {recentTransactions.map((transaction) => (
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
                        transaction.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
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

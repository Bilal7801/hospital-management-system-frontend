import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Filter, Eye, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const payments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. James Wilson",
      department: "Cardiology",
      amount: "$150",
      date: "2025-05-07",
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Jane Smith",
      doctor: "Dr. Sarah Jenkins",
      department: "Neurology",
      amount: "$200",
      date: "2025-05-06",
      method: "Debit Card",
      status: "Completed",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      doctor: "Dr. Robert Fox",
      department: "Orthopedics",
      amount: "$75",
      date: "2025-05-05",
      method: "Online Transfer",
      status: "Pending",
    },
    {
      id: 4,
      patient: "Emily Brown",
      doctor: "Dr. James Wilson",
      department: "Cardiology",
      amount: "$300",
      date: "2025-05-04",
      method: "Cash",
      status: "Completed",
    },
    {
      id: 5,
      patient: "Michael Davis",
      doctor: "Dr. Sarah Jenkins",
      department: "Neurology",
      amount: "$250",
      date: "2025-05-03",
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: 6,
      patient: "Sarah Wilson",
      doctor: "Dr. Robert Fox",
      department: "Orthopedics",
      amount: "$180",
      date: "2025-05-02",
      method: "Online Transfer",
      status: "Pending",
    },
  ];

  const filteredPayments =
    filterStatus === 'All'
      ? payments
      : payments.filter((p) => p.status === filterStatus);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const pageCount = Math.ceil(filteredPayments.length / pageSize);
  const displayedPayments = filteredPayments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const stats = [
    {
      label: "Total Payments",
      value: payments.length,
      color: "text-blue-600",
    },
    {
      label: "Completed",
      value: payments.filter((p) => p.status === 'Completed').length,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: payments.filter((p) => p.status === 'Pending').length,
      color: "text-orange-600",
    },
  ];

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
            All Payments
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            View and manage all payment transactions
          </p>
        </div>

        <button
          onClick={() => {}}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4"
          >
            <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Filter by Status:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Completed', 'Pending'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-[11px] uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4 text-left font-semibold">Patient</th>
                <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                <th className="px-6 py-4 text-left font-semibold">Department</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
                <th className="px-6 py-4 text-left font-semibold">Method</th>
                <th className="px-6 py-4 text-left font-semibold">Date</th>
                <th className="px-6 py-4 text-center font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {payment.patient}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payment.doctor}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payment.department}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payment.method}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                        payment.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}
                    >
                      {payment.status === 'Completed' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {}}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-all cursor-pointer"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing {displayedPayments.length} of {filteredPayments.length} payments
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === pageCount || pageCount === 0}
              onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
              className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Payments;

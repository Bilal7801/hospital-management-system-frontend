import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Download,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios';

const Payments = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const pageSize = 4;

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await api.get('/superadmin/billing/payments');

      const mappedPayments = Array.isArray(res.data)
        ? res.data.map((p) => ({
            id: p.id,
            patient: p.patientName || '-',
            doctor: p.doctorName || '-',
            department: p.departmentName || '-',
            amount:
              typeof p.amount === 'number'
                ? `$${p.amount.toFixed(2)}`
                : p.amount || '$0',
            date: p.paymentDate || '-',
            method: p.paymentMethod || '-',
            status: p.status || 'Pending',
          }))
        : [];

      setPayments(mappedPayments);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          'Failed to load payments.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

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
      label: 'Total Payments',
      value: payments.length,
      color: 'text-blue-600',
    },
    {
      label: 'Completed',
      value: payments.filter((p) => p.status === 'Completed').length,
      color: 'text-green-600',
    },
    {
      label: 'Pending',
      value: payments.filter((p) => p.status === 'Pending').length,
      color: 'text-orange-600',
    },
  ];

  const handleExport = async () => {
    try {
      const res = await api.get('/superadmin/billing/download-report', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'payments-report');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

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
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      ) : null}

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
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-sm text-gray-500">
                    <div className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading payments...
                    </div>
                  </td>
                </tr>
              ) : displayedPayments.length > 0 ? (
                displayedPayments.map((payment) => (
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
                        onClick={() => navigate(`/dashboard/billing/payments/${payment.id}`, { state: payment })}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-all cursor-pointer"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-sm text-gray-500">
                    No payments found.
                  </td>
                </tr>
              )}
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
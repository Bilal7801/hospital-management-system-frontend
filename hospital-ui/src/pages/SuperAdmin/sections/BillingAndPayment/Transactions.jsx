import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Filter, Search, Calendar, User, Building2, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    doctor: '',
    department: '',
    status: '',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    {
      id: 'TXN001',
      patient: 'John Doe',
      doctor: 'Dr. James Wilson',
      department: 'Cardiology',
      amount: '$150',
      date: '2025-05-07',
      time: '10:30 AM',
      method: 'Credit Card',
      status: 'Completed',
      reference: 'CHK-2025-001',
    },
    {
      id: 'TXN002',
      patient: 'Jane Smith',
      doctor: 'Dr. Sarah Jenkins',
      department: 'Neurology',
      amount: '$200',
      date: '2025-05-06',
      time: '02:15 PM',
      method: 'Debit Card',
      status: 'Completed',
      reference: 'CHK-2025-002',
    },
    {
      id: 'TXN003',
      patient: 'Robert Johnson',
      doctor: 'Dr. Robert Fox',
      department: 'Orthopedics',
      amount: '$75',
      date: '2025-05-05',
      time: '03:45 PM',
      method: 'Online Transfer',
      status: 'Pending',
      reference: 'CHK-2025-003',
    },
    {
      id: 'TXN004',
      patient: 'Emily Brown',
      doctor: 'Dr. James Wilson',
      department: 'Cardiology',
      amount: '$300',
      date: '2025-05-04',
      time: '11:00 AM',
      method: 'Cash',
      status: 'Completed',
      reference: 'CHK-2025-004',
    },
    {
      id: 'TXN005',
      patient: 'Michael Davis',
      doctor: 'Dr. Sarah Jenkins',
      department: 'Neurology',
      amount: '$250',
      date: '2025-05-03',
      time: '04:20 PM',
      method: 'Credit Card',
      status: 'Completed',
      reference: 'CHK-2025-005',
    },
    {
      id: 'TXN006',
      patient: 'Sarah Wilson',
      doctor: 'Dr. Robert Fox',
      department: 'Orthopedics',
      amount: '$180',
      date: '2025-05-02',
      time: '09:15 AM',
      method: 'Online Transfer',
      status: 'Pending',
      reference: 'CHK-2025-006',
    },
    {
      id: 'TXN007',
      patient: 'David Lee',
      doctor: 'Dr. James Wilson',
      department: 'Cardiology',
      amount: '$320',
      date: '2025-05-01',
      time: '01:30 PM',
      method: 'Debit Card',
      status: 'Completed',
      reference: 'CHK-2025-007',
    },
    {
      id: 'TXN008',
      patient: 'Lisa Anderson',
      doctor: 'Dr. Sarah Jenkins',
      department: 'Neurology',
      amount: '$275',
      date: '2025-04-30',
      time: '10:45 AM',
      method: 'Credit Card',
      status: 'Completed',
      reference: 'CHK-2025-008',
    },
  ];

  const doctors = [
    'All Doctors',
    'Dr. James Wilson',
    'Dr. Sarah Jenkins',
    'Dr. Robert Fox',
  ];

  const departments = [
    'All Departments',
    'Cardiology',
    'Neurology',
    'Orthopedics',
  ];

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDoctor =
      filters.doctor === '' || filters.doctor === 'All Doctors' || txn.doctor === filters.doctor;

    const matchesDepartment =
      filters.department === '' || filters.department === 'All Departments' ||
      txn.department === filters.department;

    const matchesStatus =
      filters.status === '' || txn.status === filters.status;

    const matchesDate =
      (filters.dateFrom === '' || txn.date >= filters.dateFrom) &&
      (filters.dateTo === '' || txn.date <= filters.dateTo);

    return (
      matchesSearch &&
      matchesDoctor &&
      matchesDepartment &&
      matchesStatus &&
      matchesDate
    );
  });

  const totalAmount = filteredTransactions.reduce(
    (sum, txn) => sum + parseInt(txn.amount.replace('$', '').replace(',', '')),
    0
  );

  const handleReset = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      doctor: '',
      department: '',
      status: '',
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  const pageCount = Math.ceil(filteredTransactions.length / pageSize);
  const displayedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleExport = () => {
    const csv = [
      ['Transaction ID', 'Patient', 'Doctor', 'Department', 'Amount', 'Date', 'Time', 'Status', 'Reference'].join(','),
      ...filteredTransactions.map((txn) =>
        [
          txn.id,
          txn.patient,
          txn.doctor,
          txn.department,
          txn.amount,
          txn.date,
          txn.time,
          txn.status,
          txn.reference,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
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
            View Transactions
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Filter and download transaction records
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Total Transactions
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {filteredTransactions.length}
          </p>
        </div>

        <div className="md:col-span-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Total Amount
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${totalAmount}
          </p>
        </div>

        <div className="md:col-span-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
            Average Transaction
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${filteredTransactions.length > 0 ? (totalAmount / filteredTransactions.length).toFixed(0) : 0}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </h3>
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              <Search className="w-4 h-4 inline mr-1" />
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Patient name / TXN ID"
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Date From */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              <Calendar className="w-4 h-4 inline mr-1" />
              From Date
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: e.target.value })
              }
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              To Date
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters({ ...filters, dateTo: e.target.value })
              }
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Doctor */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              <User className="w-4 h-4 inline mr-1" />
              Doctor
            </label>
            <select
              value={filters.doctor}
              onChange={(e) =>
                setFilters({ ...filters, doctor: e.target.value })
              }
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Doctors</option>
              {doctors.filter((d) => d !== 'All Doctors').map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              <Building2 className="w-4 h-4 inline mr-1" />
              Department
            </label>
            <select
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Departments</option>
              {departments
                .filter((d) => d !== 'All Departments')
                .map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-[11px] uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">Patient</th>
                <th className="px-6 py-4 text-left font-semibold">Doctor</th>
                <th className="px-6 py-4 text-left font-semibold">Department</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
                <th className="px-6 py-4 text-left font-semibold">Date & Time</th>
                <th className="px-6 py-4 text-left font-semibold">Method</th>
                <th className="px-6 py-4 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.length > 0 ? (
                displayedTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">
                      {txn.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {txn.patient}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {txn.doctor}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {txn.department}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {txn.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{txn.date}</div>
                      <div className="text-xs text-gray-400">{txn.time}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {txn.method}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                          txn.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-orange-50 text-orange-600'
                        }`}
                      >
                        {txn.status === 'Completed' ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <p className="text-gray-500 font-semibold">
                      No transactions found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing {displayedTransactions.length} of {filteredTransactions.length} transactions
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

export default Transactions;

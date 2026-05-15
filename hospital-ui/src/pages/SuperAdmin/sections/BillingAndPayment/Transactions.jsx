import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, Download, Filter, Search, Calendar, User, Building2, CheckCircle, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios'; // Import your axios instance

const Transactions = () => {
  const navigate = useNavigate();
  
  // States
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  // 1. Fetch Data from Backend
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/superadmin/billing/transactions');
      setTransactions(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load transaction history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // 2. Dynamic Filtering Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.transactionCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toString().includes(searchTerm);

      const matchesDoctor =
        filters.doctor === '' || txn.doctorName === filters.doctor;

      const matchesDepartment =
        filters.department === '' || txn.departmentName === filters.department;

      const matchesStatus =
        filters.status === '' || txn.status === filters.status;

      const matchesDate =
        (filters.dateFrom === '' || new Date(txn.transactionDate) >= new Date(filters.dateFrom)) &&
        (filters.dateTo === '' || new Date(txn.transactionDate) <= new Date(filters.dateTo));

      return matchesSearch && matchesDoctor && matchesDepartment && matchesStatus && matchesDate;
    });
  }, [transactions, searchTerm, filters]);

  // 3. Stats Calculations
  const totalAmount = useMemo(() => 
    filteredTransactions.reduce((sum, txn) => sum + (txn.amount || 0), 0)
  , [filteredTransactions]);

  // Extract unique doctors and departments for filter dropdowns
  const doctorList = useMemo(() => [...new Set(transactions.map(t => t.doctorName).filter(Boolean))], [transactions]);
  const deptList = useMemo(() => [...new Set(transactions.map(t => t.departmentName).filter(Boolean))], [transactions]);

  // 4. Pagination
  const pageCount = Math.ceil(filteredTransactions.length / pageSize);
  const displayedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleReset = () => {
    setFilters({ dateFrom: '', dateTo: '', doctor: '', department: '', status: '' });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Transaction Code', 'Patient', 'Doctor', 'Department', 'Amount', 'Date', 'Method', 'Status'].join(','),
      ...filteredTransactions.map((txn) =>
        [
          txn.id,
          txn.transactionCode,
          txn.patientName,
          txn.doctorName || 'N/A',
          txn.departmentName || 'N/A',
          txn.amount,
          new Date(txn.transactionDate).toLocaleDateString(),
          txn.paymentMethod,
          txn.status,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Back Button */}
      <button onClick={() => navigate('/dashboard/billing')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Billing
      </button>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-sm text-gray-400 mt-1">Real-time financial records from database</p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all cursor-pointer">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-sm border border-red-100">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Total Records</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{filteredTransactions.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Total Volume</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-gray-400 font-bold tracking-wider">Avg Ticket</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            ${filteredTransactions.length > 0 ? (totalAmount / filteredTransactions.length).toFixed(2) : 0}
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</h3>
          <button onClick={handleReset} className="text-sm text-blue-600 hover:text-blue-700 font-semibold">Reset</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Patient / Code..." className="p-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({...filters, dateFrom: e.target.value})} className="p-2 border border-gray-200 rounded-lg text-sm outline-none" />
          <input type="date" value={filters.dateTo} onChange={(e) => setFilters({...filters, dateTo: e.target.value})} className="p-2 border border-gray-200 rounded-lg text-sm outline-none" />
          
          <select value={filters.doctor} onChange={(e) => setFilters({...filters, doctor: e.target.value})} className="p-2 border border-gray-200 rounded-lg text-sm outline-none">
            <option value="">All Doctors</option>
            {doctorList.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select value={filters.department} onChange={(e) => setFilters({...filters, department: e.target.value})} className="p-2 border border-gray-200 rounded-lg text-sm outline-none">
            <option value="">All Departments</option>
            {deptList.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                <th className="px-6 py-4 text-left">Code</th>
                <th className="px-6 py-4 text-left">Patient</th>
                <th className="px-6 py-4 text-left">Medical Staff</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Method</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-blue-600">{txn.transactionCode}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{txn.patientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="font-medium">{txn.doctorName}</div>
                    <div className="text-[10px] uppercase text-gray-400">{txn.departmentName}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">${txn.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(txn.transactionDate).toLocaleDateString()}
                    <div className="text-xs text-gray-400">{new Date(txn.transactionDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.paymentMethod}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 mx-auto w-fit ${
                      txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {txn.status === 'Completed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center text-gray-400">No records found matching your filters.</div>
          )}
        </div>
        
        {/* Pagination Controls */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-500">Page {currentPage} of {pageCount || 1}</span>
            <div className="flex gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-3 py-1 border rounded bg-white text-xs disabled:opacity-50">Prev</button>
                <button disabled={currentPage === pageCount || pageCount === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="px-3 py-1 border rounded bg-white text-xs disabled:opacity-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
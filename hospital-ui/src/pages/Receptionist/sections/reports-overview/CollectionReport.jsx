import React, { useState, useEffect } from 'react';
import { Banknote, TrendingUp, CreditCard, Wallet, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const CollectionReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollectionReport = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/receptionist/reports/collection');
        setReportData(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load collection report");
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionReport();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
        <p className="mt-4 text-red-600">{error || "No collection data available"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-emerald-600" />
            Daily Cash & Digital Collection Audit Sheet
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Consolidated summary tracking desk point-of-sale settlements securely</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md flex items-center gap-1 font-sans shadow-sm">
            <TrendingUp className="w-3.5 h-3.5" /> 
            Total: ${reportData.totalCollection?.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>

      {/* Transaction Records Data Grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left">Transaction Ref ID</th>
              <th className="px-5 py-3 text-left">Settlement Method</th>
              <th className="px-5 py-3 text-left">Allocation Category</th>
              <th className="px-5 py-3 text-left">Timestamp</th>
              <th className="px-5 py-3 text-right">Settled Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {reportData.payments && reportData.payments.length > 0 ? (
              reportData.payments.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-gray-800">{log.transactionCode}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-700 flex items-center gap-1.5">
                    {log.method === 'Cash' || log.method?.toLowerCase().includes('cash') ? 
                      <Wallet className="w-3.5 h-3.5 text-amber-500" /> : 
                      <CreditCard className="w-3.5 h-3.5 text-blue-500" />}
                    {log.method || 'Unknown'}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 font-medium">{log.label || 'Service Charge'}</td>
                  <td className="px-5 py-3.5 text-gray-400 font-mono font-semibold">
                    {new Date(log.paymentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-5 py-3.5 text-right font-black text-gray-800 font-mono">
                    ${parseFloat(log.amount || 0).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-gray-400">
                  No transactions recorded today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionReport;
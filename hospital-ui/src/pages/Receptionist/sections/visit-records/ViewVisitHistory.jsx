import React, { useState, useEffect, useCallback } from 'react';
import { Search, Calendar, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';
import CaseDetailsView from './CaseDetailsView';

const ViewVisitHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Visit History
  const fetchVisitHistory = useCallback(async (search = '') => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get('/receptionist/visit-records/history', {
        params: {
          searchTerm: search,
          page: 1,
          pageSize: 50
        }
      });

      setVisits(response.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load visit history");
      setVisits([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + search
  useEffect(() => {
    fetchVisitHistory(searchQuery);
  }, [searchQuery, fetchVisitHistory]);

  if (selectedCaseId) {
    return <CaseDetailsView caseId={selectedCaseId} onBack={() => setSelectedCaseId(null)} />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          Patient Historical Encounter Log Engine
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Filter through previous multi-department visits</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Enter Patient Name, ID or Encounter ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 transition-all font-semibold shadow-inner"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-5 py-3.5 text-left">Encounter Date</th>
                <th className="px-5 py-3.5 text-left">Visit Classification</th>
                <th className="px-5 py-3.5 text-left">Assigned Attending</th>
                <th className="px-5 py-3.5 text-left">Clinical Unit</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {visits.length > 0 ? (
                visits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-blue-50/10 transition-colors group">
                    <td className="px-5 py-4 font-bold text-gray-800 font-mono">
                      {new Date(visit.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded border border-gray-200 text-[10px]">
                        {visit.noteType}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-700">
                      {visit.doctorName || 'N/A'}
                    </td>
                    <td className="px-5 py-4 text-blue-600 font-bold">General OPD</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border bg-emerald-50 text-emerald-700 border-emerald-100">
                        Completed
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button 
                        onClick={() => setSelectedCaseId(visit.id)}
                        className="text-gray-400 group-hover:text-blue-600 flex items-center justify-end gap-1 font-bold text-[11px] transition-colors cursor-pointer ml-auto"
                      >
                        View Case <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center text-gray-400">
                    No visit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewVisitHistory;
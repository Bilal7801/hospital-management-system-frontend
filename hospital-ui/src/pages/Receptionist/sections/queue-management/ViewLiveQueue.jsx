import React, { useState, useEffect, useCallback } from 'react';
import { Tv, Clock, RefreshCw, Layers, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const ViewLiveQueue = () => {
  const [queueData, setQueueData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filterDept, setFilterDept] = useState('All');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch Live Queue Data
  const fetchLiveQueue = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);
    
    setErrorMsg('');
    
    try {
      const response = await api.get('/receptionist/queue-management/live-queue');
      const data = response.data || [];
      
      setQueueData(data);

      // Extract unique departments dynamically
      const uniqueDepts = [...new Set(data.map(item => 
        item.dept || item.Dept || item.departmentName || item.DepartmentName
      ).filter(Boolean))];
      
      setDepartments(uniqueDepts);
    } catch (error) {
      console.error("Live queue fetch error:", error);
      setErrorMsg('Failed to sync live queue. Please check connection.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load + Auto-refresh every 15 seconds
  useEffect(() => {
    fetchLiveQueue();
    
    const interval = setInterval(() => {
      fetchLiveQueue(true);
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchLiveQueue]);

  // Filter data
  const filteredData = filterDept === 'All' 
    ? queueData 
    : queueData.filter(q => {
        const dept = q.dept || q.Dept || q.departmentName || q.DepartmentName || '';
        return dept === filterDept;
      });

  // Status Badge Styling
  const getStatusBadgeStyles = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('consultation') || s.includes('serving')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (s.includes('called')) {
      return 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';
    }
    return 'bg-gray-50 text-gray-600 border-gray-200/80';
  };

  if (isLoading && queueData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 shadow-sm flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Loading Live Queue...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Layers className="w-4 h-4 text-gray-400" />
          <select 
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
            className="w-full sm:w-56 px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-600 text-gray-800 font-medium cursor-pointer"
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => fetchLiveQueue(true)}
          disabled={isRefreshing}
          className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-700 flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          REFRESH LIVE QUEUE
        </button>
      </div>

      {/* Live Queue Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">Token ID</th>
                <th className="px-6 py-4 text-left">Patient Name</th>
                <th className="px-6 py-4 text-left">Doctor</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-left">Wait Time</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600">
                      {row.token || row.Token || row.TokenNumber}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {row.name || row.Name || row.walkInPatientName || row.WalkInPatientName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {row.doc || row.Doc || row.doctorName || row.DoctorName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {row.dept || row.Dept || row.departmentName || row.DepartmentName || 'General OPD'}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {row.wait || row.Wait || '0 Min'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeStyles(row.state || row.State || row.status)}`}>
                        {row.state || row.State || row.status || 'Waiting'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center text-gray-400">
                    No active patients in queue at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewLiveQueue;
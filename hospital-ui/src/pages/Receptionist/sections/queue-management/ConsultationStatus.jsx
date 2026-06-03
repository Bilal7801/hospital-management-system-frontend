import React, { useState, useEffect, useCallback } from 'react';
import { Activity, ArrowUpRight, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import api from '../../../../api/axios';

const ConsultationStatus = () => {
  const [activeRooms, setActiveRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch Room Statuses
  const fetchRoomStatuses = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);
    setErrorMsg('');

    try {
      const response = await api.get('/receptionist/queue-management/consultation-rooms');
      const data = response.data || [];
      setActiveRooms(data);
    } catch (error) {
      console.error("Room status fetch error:", error);
      setErrorMsg('Failed to fetch real-time room occupancy. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial Load + Auto Refresh
  useEffect(() => {
    fetchRoomStatuses();

    const interval = setInterval(() => {
      fetchRoomStatuses(true);
    }, 15000); // Refresh every 15 seconds

    return () => clearInterval(interval);
  }, [fetchRoomStatuses]);

  // Status Styling
  const getCardStyles = (status) => {
    const s = (status || '').toLowerCase();
    
    if (s.includes('consultation') || s.includes('busy') || s.includes('occupied')) {
      return {
        wrapper: 'border-blue-100 shadow-sm shadow-blue-50/20 bg-white',
        badge: 'bg-blue-50 text-blue-700 border-blue-200/60',
        icon: <ArrowUpRight className="w-4 h-4 text-blue-500" />
      };
    }
    if (s.includes('available') || s.includes('free') || s.includes('idle')) {
      return {
        wrapper: 'border-emerald-100 bg-white',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      };
    }
    return {
      wrapper: 'border-amber-100 bg-white',
      badge: 'bg-amber-50 text-amber-700 border-amber-200/60',
      icon: <AlertCircle className="w-4 h-4 text-amber-500" />
    };
  };

  if (isLoading && activeRooms.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Loading Room Occupancy...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <div className="border-b border-gray-100 pb-3 flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Clinical Consultation Status Tracker
          </h3>
          <p className="text-xs text-gray-400">Real-time room occupancy logs and session tracking matrices</p>
        </div>

        <button
          onClick={() => fetchRoomStatuses(true)}
          disabled={isRefreshing}
          className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200/60 hover:bg-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 text-blue-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 font-medium text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          {errorMsg}
        </div>
      )}

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeRooms.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400 text-sm font-medium">
            No active consultation rooms found for today.
          </div>
        ) : (
          activeRooms.map((room, idx) => {
            const status = room.Status || room.status || 'Idle';
            const design = getCardStyles(status);

            return (
              <div 
                key={idx} 
                className={`p-5 border rounded-2xl flex flex-col justify-between transition-all hover:shadow-md ${design.wrapper}`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                      {room.Room || room.room || 'OPD Desk'}
                    </div>
                    
                    <h4 className="font-bold text-gray-800 text-base leading-tight">
                      {room.Doctor || room.doctor || 'Unknown Doctor'}
                    </h4>

                    <p className="text-sm text-gray-600">
                      Patient: <span className="font-semibold text-gray-800">
                        {room.Patient || room.patient || 'None (Idle)'}
                      </span>
                    </p>
                  </div>
                  {design.icon}
                </div>

                <div className={`mt-4 text-xs font-bold uppercase tracking-widest text-center py-2 rounded-xl border ${design.badge}`}>
                  {status}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConsultationStatus;
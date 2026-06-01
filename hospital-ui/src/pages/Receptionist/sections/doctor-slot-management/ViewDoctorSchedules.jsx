// pages/Receptionist/sections/doctor-slot-management/ViewDoctorSchedules.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Clock, Users, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const ViewDoctorSchedules = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Doctors
  const fetchDoctors = useCallback(async () => {
    try {
      const response = await api.get('/receptionist/doctor-slot-management/doctors');
      if (response.data.success) {
        setDoctors(response.data.data || []);
        // Auto-select first doctor
        if (response.data.data.length > 0) {
          setSelectedDoctorId(response.data.data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
      setError('Failed to load doctors list');
    } finally {
      setLoadingDoctors(false);
    }
  }, []);

  // Fetch Schedules for Selected Doctor
  const fetchSchedules = useCallback(async (doctorId) => {
    if (!doctorId) return;
    
    setLoadingSchedules(true);
    setError(null);

    try {
      const response = await api.get(`/receptionist/doctor-slot-management/schedules?doctorId=${doctorId}`);
      
      if (response.data.success) {
        setSchedules(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to load schedules');
      }
    } catch (err) {
      console.error('Failed to fetch schedules:', err);
      setError(err.response?.data?.message || 'Failed to load doctor schedules');
      setSchedules([]);
    } finally {
      setLoadingSchedules(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Load schedules when doctor changes
  useEffect(() => {
    if (selectedDoctorId) {
      fetchSchedules(selectedDoctorId);
    }
  }, [selectedDoctorId, fetchSchedules]);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  return (
    <div className="space-y-5">
      {/* Header - Matching Style */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Doctor Duty Schedules</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Monitor weekly shift tracking, clinical time slots, and maximum patient capacities
        </p>
      </div>

      {/* Doctor Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <label className="block text-xs font-bold text-gray-700 mb-2">
          Select Medical Practitioner
        </label>
        {loadingDoctors ? (
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading doctors...
          </div>
        ) : (
          <select 
            value={selectedDoctorId || ''}
            onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
            className="w-full sm:w-96 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-medium cursor-pointer"
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} — {doc.specialty}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 flex gap-3">
          <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
            <button 
              onClick={() => selectedDoctorId && fetchSchedules(selectedDoctorId)}
              className="mt-3 px-5 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Schedules Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-800">
                {selectedDoctor ? selectedDoctor.name : 'Doctor'} Schedule
              </p>
              <p className="text-xs text-gray-500">
                {selectedDoctor?.department || 'Department'}
              </p>
            </div>
          </div>
          <div className="text-xs font-medium text-gray-500">
            {schedules.length} Working Days
          </div>
        </div>

        {loadingSchedules ? (
          <div className="p-16 flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500">Loading schedule...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Working Day</th>
                  <th className="px-6 py-4 text-left font-bold">Morning Shift</th>
                  <th className="px-6 py-4 text-left font-bold">Evening Shift</th>
                  <th className="px-6 py-4 text-left font-bold">Slot Duration</th>
                  <th className="px-6 py-4 text-left font-bold">Total Slots</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {schedules.length > 0 ? (
                  schedules.map((sched) => (
                    <tr key={sched.scheduleId} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-5 font-bold text-gray-800 flex items-center gap-3">
                        <CalendarDays className="w-4 h-4 text-blue-600" />
                        {sched.workingDays}
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-200">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {sched.startTime} - {sched.endTime}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-gray-600 font-medium">
                        {sched.breakStart && sched.breakEnd ? (
                          <span className="text-amber-600 text-sm">
                            Break: {sched.breakStart} - {sched.breakEnd}
                          </span>
                        ) : (
                          <span className="text-emerald-600">No Break</span>
                        )}
                      </td>
                      <td className="px-6 py-5 font-medium text-gray-600">
                        {sched.slotDuration} minutes
                      </td>
                      <td className="px-6 py-5 font-bold text-blue-600">
                        {sched.totalSlots || '—'} Slots
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-gray-400 font-medium">
                      No schedule found for this doctor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDoctorSchedules;
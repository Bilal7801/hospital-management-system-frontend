// pages/Receptionist/sections/doctor-slot-management/CheckSlotAvailability.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Calendar, Loader2, AlertCircle, Users } from 'lucide-react';
import api from '../../../../api/axios';

const CheckSlotAvailability = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Doctors
  const fetchDoctors = useCallback(async () => {
    try {
      const response = await api.get('/receptionist/doctor-slot-management/doctors');
      if (response.data.success) {
        setDoctors(response.data.data || []);
        if (response.data.data.length > 0) {
          setSelectedDoctorId(response.data.data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load doctors:', err);
      setError('Failed to load doctors list');
    } finally {
      setLoadingDoctors(false);
    }
  }, []);

  // Check Slot Availability
  const checkAvailability = useCallback(async () => {
    if (!selectedDoctorId || !selectedDate) return;

    setLoadingSlots(true);
    setError(null);

    try {
      const response = await api.get(
        `/receptionist/doctor-slot-management/slot-availability?doctorId=${selectedDoctorId}&date=${selectedDate}`
      );

      if (response.data.success) {
        setSlots(response.data.slots || []);
      } else {
        throw new Error(response.data.message || 'Failed to check availability');
      }
    } catch (err) {
      console.error('Availability check failed:', err);
      setError(err.response?.data?.message || 'Failed to fetch slot availability');
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [selectedDoctorId, selectedDate]);

  // Initial Load
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Auto-check when doctor or date changes
  useEffect(() => {
    if (selectedDoctorId && selectedDate) {
      checkAvailability();
    }
  }, [selectedDoctorId, selectedDate, checkAvailability]);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Check Slot Availability</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Verify live timeline matrices, check allocated sessions, and track real-time availability
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
        {/* Doctor Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">
            Assigned Medical Specialist
          </label>
          {loadingDoctors ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-3">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading specialists...
            </div>
          ) : (
            <select
              value={selectedDoctorId || ''}
              onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-medium cursor-pointer"
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

        {/* Date Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">
            Target Verification Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-medium"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 flex gap-3">
          <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={checkAvailability}
              className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Live Timeline Grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-semibold text-gray-800">
                Live Timeline Matrix — {selectedDoctor?.name || 'Doctor'}
              </h4>
              <p className="text-xs text-gray-500">
                {selectedDate} • {selectedDoctor?.department || ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span> Available
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span> Booked
            </span>
          </div>
        </div>

        {loadingSlots ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500">Checking slot availability...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {slots.length > 0 ? (
              slots.map((slot, index) => {
                const isAvailable = slot.status === 'Available';
                return (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-3 relative ${
                      isAvailable
                        ? 'bg-emerald-50 border-emerald-200 hover:shadow-md'
                        : 'bg-gray-50 border-gray-200 line-through'
                    }`}
                  >
                    <Clock className={`w-5 h-5 ${isAvailable ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <span className="font-bold text-gray-800 tracking-wide">{slot.time}</span>
                    <span
                      className={`text-xs font-bold uppercase px-4 py-1 rounded-lg tracking-widest ${
                        isAvailable
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {slot.status}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 font-medium">
                No slots available for the selected date.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckSlotAvailability;
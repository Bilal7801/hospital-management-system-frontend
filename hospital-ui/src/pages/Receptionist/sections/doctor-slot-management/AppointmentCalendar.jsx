// pages/Receptionist/sections/doctor-slot-management/AppointmentCalendar.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const AppointmentCalendar = () => {
  const [viewMode, setViewMode] = useState('Day');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Appointments for selected date
  const fetchAppointments = useCallback(async (date) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(
        `/receptionist/doctor-slot-management/appointment-calendar?date=${date}`
      );

      if (response.data.success) {
        setAppointments(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to load appointments');
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setError(err.response?.data?.message || 'Failed to load calendar');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data when date changes
  useEffect(() => {
    fetchAppointments(currentDate);
  }, [currentDate, fetchAppointments]);

  // Navigation Handlers
  const goToPreviousDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate.toISOString().split('T')[0]);
  };

  const goToNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate.toISOString().split('T')[0]);
  };

  const goToToday = () => {
    setCurrentDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Master Appointment Calendar</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Track live clinical timelines, toggle scheduling view modes, and monitor active appointments
        </p>
      </div>

      {/* Main Calendar Board */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
        
        {/* Navigation & View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={goToPreviousDay}
              className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 cursor-pointer text-gray-600 transition-all shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            
            <span className="text-sm font-bold text-gray-800 tracking-tight px-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              {new Date(currentDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>

            <button 
              onClick={goToNextDay}
              className="p-2 hover:bg-gray-50 rounded-xl border border-gray-200 cursor-pointer text-gray-600 transition-all shadow-sm"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button 
              onClick={goToToday}
              className="ml-2 px-3 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              Today
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="bg-gray-100 p-1 rounded-xl flex border border-gray-200/40">
            {['Day', 'Week', 'Month'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  viewMode === mode 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {mode} View
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 flex gap-3">
            <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error loading calendar</p>
              <p className="text-sm mt-1">{error}</p>
              <button 
                onClick={() => fetchAppointments(currentDate)}
                className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Appointments Timeline */}
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500">Loading appointments...</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <div 
                  key={appt.id} 
                  className="flex border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-all bg-white"
                >
                  {/* Time Column */}
                  <div className="bg-blue-50/40 border-r border-gray-200 text-blue-700 px-5 py-5 flex flex-col items-center justify-center min-w-25 font-bold text-sm gap-1 shadow-inner">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="tracking-wide">{appt.time}</span>
                  </div>

                  {/* Appointment Details */}
                  <div className="p-5 flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <span className="text-sm font-bold text-gray-800 block">{appt.task}</span>
                      <span className="text-xs text-gray-500 font-medium mt-1 block">
                        Patient: <span className="text-gray-700 font-bold">{appt.patient}</span> 
                        {' | '} 
                        Practitioner: <span className="text-blue-600 font-bold">{appt.doctor}</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-lg shadow-sm">
                        {appt.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No appointments scheduled for this date.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
// pages/Receptionist/sections/appointment-management/RescheduleAppointment.jsx
import React, { useState, useEffect } from 'react';
import { CalendarDays, Save, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const RescheduleAppointment = () => {
  const [formData, setFormData] = useState({
    appointmentId: '',
    newDate: '',
    newTime: '',
    notes: ''
  });

  const [appointments, setAppointments] = useState([]); // For dropdown
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch upcoming appointments for selection
  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await api.get('/receptionist/appointment/search', {
          params: { status: 'Upcoming', pageSize: 50 }
        });
        setAppointments(response.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpcomingAppointments();
  }, []);

  // Get selected appointment details
  const selectedAppointment = appointments.find(apt => apt.id === parseInt(formData.appointmentId));

  // Fetch doctor schedule when appointment and date are selected
  useEffect(() => {
    if (selectedAppointment && formData.newDate) {
      fetchDoctorScheduleAndSlots();
    }
  }, [formData.appointmentId, formData.newDate]);

  const fetchDoctorScheduleAndSlots = async () => {
    try {
      setLoadingSlots(true);

      // Fetch all schedules and find the one for this doctor
      const scheduleRes = await api.get('/superadmin/doctor-schedule');
      const allSchedules = scheduleRes.data?.data || scheduleRes.data || [];
      
      const doctorSchedule = allSchedules.find(sch => sch.doctorId === selectedAppointment.doctorId);

      if (!doctorSchedule) {
        setDoctorSchedule(null);
        setAvailableSlots([]);
        return;
      }

      setDoctorSchedule(doctorSchedule);

      // Generate available slots
      if (doctorSchedule && formData.newDate) {
        generateSlots(doctorSchedule, formData.newDate);
      }
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const generateSlots = async (schedule, date) => {
    try {
      // Check if this is a working day
      const appointmentDate = new Date(date);
      const dayName = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });
      const workingDays = schedule.workingDays 
        ? String(schedule.workingDays).split(',').map(d => d.trim())
        : [];

      if (!workingDays.includes(dayName)) {
        setAvailableSlots([]);
        return;
      }

      // Parse times
      const startTime = schedule.startTime ? String(schedule.startTime).slice(0, 5) : '09:00';
      const endTime = schedule.endTime ? String(schedule.endTime).slice(0, 5) : '17:00';
      const breakStart = schedule.breakStart ? String(schedule.breakStart).slice(0, 5) : null;
      const breakEnd = schedule.breakEnd ? String(schedule.breakEnd).slice(0, 5) : null;
      const slotDuration = schedule.slotDuration || 15;

      // Convert time to minutes
      const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const minutesToTime = (mins) => {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      };

      const startMins = timeToMinutes(startTime);
      const endMins = timeToMinutes(endTime);
      const breakStartMins = breakStart ? timeToMinutes(breakStart) : null;
      const breakEndMins = breakEnd ? timeToMinutes(breakEnd) : null;

      // Generate all slots
      const slots = [];
      for (let time = startMins; time < endMins; time += slotDuration) {
        const slotTime = minutesToTime(time);
        const slotEndTime = time + slotDuration;

        // Skip if slot is within break time
        if (breakStartMins && breakEndMins && time >= breakStartMins && time < breakEndMins) {
          continue;
        }
        if (breakStartMins && breakEndMins && slotEndTime > breakStartMins && slotEndTime <= breakEndMins) {
          continue;
        }

        slots.push({
          time: slotTime,
          startMinutes: time,
          endMinutes: slotEndTime,
          isBooked: false
        });
      }

      // Fetch booked appointments for this doctor on this date
      try {
        const bookedRes = await api.get('/receptionist/appointment/search', {
          params: {
            searchTerm: '',
            status: 'Upcoming',
            pageSize: 100
          }
        });

        const allAppointments = bookedRes.data?.data || [];

        // Filter appointments for this doctor and date
        const bookedAppointments = allAppointments.filter(apt => {
          if (apt.doctorId !== selectedAppointment.doctorId) return false;
          
          const aptDate = new Date(apt.appointmentDate);
          const selectedDate = new Date(date);
          
          aptDate.setHours(0, 0, 0, 0);
          selectedDate.setHours(0, 0, 0, 0);
          
          return aptDate.getTime() === selectedDate.getTime();
        });

        // Mark booked slots (excluding current appointment being rescheduled)
        slots.forEach(slot => {
          const isBooked = bookedAppointments.some(apt => {
            // Exclude the current appointment being rescheduled
            if (selectedAppointment && apt.id === selectedAppointment.id) return false;
            
            // Extract time from appointment date
            const aptTimeStr = String(apt.appointmentDate).slice(11, 16); // HH:mm format
            return aptTimeStr === slot.time;
          });
          slot.isBooked = isBooked;
        });
      } catch (err) {
        console.error("Error fetching booked appointments:", err);
        // Continue anyway, slots just won't show as booked
      }

      setAvailableSlots(slots);
    } catch (err) {
      console.error("Error generating slots:", err);
      setAvailableSlots([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const selectSlot = (slot) => {
    setFormData(prev => ({
      ...prev,
      newTime: slot.time
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.appointmentId || !formData.newDate || !formData.newTime) {
      setError("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const newAppointmentDate = `${formData.newDate}T${formData.newTime}`;

      await api.put('/receptionist/appointment/reschedule', {
        appointmentId: parseInt(formData.appointmentId),
        newAppointmentDate: newAppointmentDate,
        notes: formData.notes
      });

      setSuccess(true);
      
      // Reset form
      setFormData({
        appointmentId: '',
        newDate: '',
        newTime: '',
        notes: ''
      });
      setAvailableSlots([]);

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to reschedule appointment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Brand Blue Header Banner */}
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Shift Scheduled Timelines</h1>
        <p className="text-blue-100 text-sm mt-1">
          Move existing allocations to newly available slots
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold text-emerald-900">
            Appointment rescheduled successfully! All parties have been notified.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <p className="text-xs font-bold text-red-900">{error}</p>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Select Appointment */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Select Active Appointment <span className="text-red-500">*</span>
            </label>
            <select 
              name="appointmentId"
              value={formData.appointmentId}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 cursor-pointer text-gray-800 transition-all"
            >
              <option value="">Select appointment to reschedule...</option>
              {appointments.map(apt => (
                <option key={apt.id} value={apt.id}>
                  {apt.appointmentCode} — {apt.patientName} with Dr. {apt.doctorName} 
                  ({new Date(apt.appointmentDate).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          {/* New Date */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              New Appointment Date <span className="text-red-500">*</span>
            </label>
            <input 
              type="date" 
              name="newDate"
              value={formData.newDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 transition-all"
            />
          </div>

          {/* New Time */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              New Appointment Time <span className="text-red-500">*</span>
            </label>
            <input 
              type="time" 
              name="newTime"
              value={formData.newTime}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 transition-all"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Reason for Rescheduling (Optional)
            </label>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              placeholder="Doctor request, patient convenience, etc..."
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none bg-gray-50 focus:bg-white text-sm"
            />
          </div>
        </div>

        {/* Doctor Schedule & Available Slots */}
        {selectedAppointment && formData.newDate && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Available Slots for Dr. {selectedAppointment.doctorName}
            </h3>

            {loadingSlots ? (
              <div className="text-center py-6">
                <div className="animate-spin w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-xs text-gray-500 mt-2">Loading available slots...</p>
              </div>
            ) : doctorSchedule ? (
              <div className="space-y-4">
                {/* Schedule Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div>
                      <p className="text-gray-600 font-semibold">Working Hours</p>
                      <p className="text-gray-900 font-bold mt-1">
                        {String(doctorSchedule.startTime).slice(0, 5)} - {String(doctorSchedule.endTime).slice(0, 5)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">Break Time</p>
                      <p className="text-gray-900 font-bold mt-1">
                        {doctorSchedule.breakStart && doctorSchedule.breakEnd 
                          ? `${String(doctorSchedule.breakStart).slice(0, 5)} - ${String(doctorSchedule.breakEnd).slice(0, 5)}`
                          : 'No Break'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">Slot Duration</p>
                      <p className="text-gray-900 font-bold mt-1">{doctorSchedule.slotDuration} min</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold">Available Slots</p>
                      <p className="text-emerald-600 font-bold mt-1">
                        {availableSlots.filter(s => !s.isBooked).length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slots Grid */}
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => !slot.isBooked && selectSlot(slot)}
                        disabled={slot.isBooked}
                        className={`py-2.5 px-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                          slot.isBooked
                            ? 'bg-red-50 text-red-400 border border-red-200 cursor-not-allowed'
                            : formData.newTime === slot.time
                            ? 'bg-emerald-600 text-white border border-emerald-600'
                            : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p className="text-xs font-semibold">No available slots for this date. Doctor may be off or fully booked.</p>
                  </div>
                )}

                {/* Legend */}
                <div className="flex gap-4 text-xs pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <span className="text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-600">Booked</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 text-xs">
                Could not load schedule information
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900">
          <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Schedule Conflict Check</span>
            <p className="text-blue-700 font-medium leading-relaxed">
              System automatically validates available slots and checks for conflicts with the doctor's schedule before rescheduling.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button 
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl flex items-center gap-2 shadow-md shadow-blue-100 transition-all cursor-pointer font-semibold disabled:cursor-not-allowed"
          >
            <Save className={`w-4 h-4 ${submitting ? 'animate-pulse' : ''}`} />
            <span>{submitting ? 'Applying Shift...' : 'Apply Reschedule'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RescheduleAppointment;
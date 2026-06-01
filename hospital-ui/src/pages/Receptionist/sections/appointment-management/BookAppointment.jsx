// pages/Receptionist/sections/appointment-management/BookAppointment.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Save, CheckCircle, Search, Clock, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientSearch, setPatientSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [showPatientList, setShowPatientList] = useState(false);
  const [showDoctorList, setShowDoctorList] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const patientRef = useRef(null);
  const doctorRef = useRef(null);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [patientsRes, doctorsRes] = await Promise.all([
          api.get('/receptionist/patient/search?searchTerm=&page=1&pageSize=500'),
          api.get('/superadmin/doctors/search')
        ]);

        setPatients(patientsRes.data.data || []);
        setDoctors(doctorsRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (patientRef.current && !patientRef.current.contains(event.target)) {
        setShowPatientList(false);
      }
      if (doctorRef.current && !doctorRef.current.contains(event.target)) {
        setShowDoctorList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch doctor schedule and generate available slots
  useEffect(() => {
    if (formData.doctorId && formData.appointmentDate) {
      fetchDoctorScheduleAndSlots();
    }
  }, [formData.doctorId, formData.appointmentDate]);

  const fetchDoctorScheduleAndSlots = async () => {
    try {
      setLoadingSlots(true);

      // Fetch all schedules and find the one for this doctor
      const scheduleRes = await api.get('/superadmin/doctor-schedule');
      const allSchedules = scheduleRes.data?.data || scheduleRes.data || [];
      
      const doctorSchedule = allSchedules.find(sch => sch.doctorId === parseInt(formData.doctorId));

      if (!doctorSchedule) {
        setDoctorSchedule(null);
        setAvailableSlots([]);
        return;
      }

      setDoctorSchedule(doctorSchedule);

      // Generate available slots
      if (doctorSchedule && formData.appointmentDate) {
        generateSlots(doctorSchedule, formData.appointmentDate);
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
          if (apt.doctorId !== formData.doctorId) return false;
          
          const aptDate = new Date(apt.appointmentDate);
          const selectedDate = new Date(date);
          
          aptDate.setHours(0, 0, 0, 0);
          selectedDate.setHours(0, 0, 0, 0);
          
          return aptDate.getTime() === selectedDate.getTime();
        });

        // Mark booked slots
        slots.forEach(slot => {
          const isBooked = bookedAppointments.some(apt => {
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

  const filteredPatients = useMemo(() => 
    patients.filter(p => p.fullName?.toLowerCase().includes(patientSearch.toLowerCase())), 
    [patients, patientSearch]
  );

  const filteredDoctors = useMemo(() => 
    doctors.filter(d => 
      d.doctorName?.toLowerCase().includes(doctorSearch.toLowerCase()) || 
      d.specialization?.toLowerCase().includes(doctorSearch.toLowerCase())
    ), 
    [doctors, doctorSearch]
  );

  const selectPatient = (patient) => {
    setFormData(prev => ({ ...prev, patientId: patient.id }));
    setPatientSearch(patient.fullName);
    setShowPatientList(false);
  };

  const selectDoctor = (doctor) => {
    setFormData(prev => ({ ...prev, doctorId: doctor.doctorId }));
    setDoctorSearch(` ${doctor.doctorName}`);
    setShowDoctorList(false);
  };

  const selectSlot = (slot) => {
    setFormData(prev => ({
      ...prev,
      appointmentTime: slot.time
    }));
  };

  const handleSubmit = async (e) => { /* Your existing submit logic - unchanged */ 
    e.preventDefault();
    if (!formData.patientId || !formData.doctorId || !formData.appointmentDate || !formData.appointmentTime) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const appointmentDateTime = `${formData.appointmentDate}T${formData.appointmentTime}`;

      await api.post('/receptionist/appointment/book', {
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId),
        appointmentDate: appointmentDateTime,
        notes: formData.notes
      });

      setSuccess(true);
      setFormData({ patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '', notes: '' });
      setPatientSearch('');
      setDoctorSearch('');
      setAvailableSlots([]);

      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-600 rounded-xl px-5 py-6 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Book New Appointment</h1>
        <p className="text-blue-100 text-sm mt-1">Search and select patient & doctor</p>
      </div>

      {success && (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-xs font-bold text-emerald-900">Appointment booked successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Patient Search */}
          <div className="relative" ref={patientRef}>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Search Patient <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Type patient name..."
                value={patientSearch}
                onChange={(e) => {
                  setPatientSearch(e.target.value);
                  setShowPatientList(true);
                }}
                onFocus={() => setShowPatientList(true)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50"
              />
            </div>

            {showPatientList && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                {filteredPatients.length > 0 ? (
                  filteredPatients.slice(0, 15).map(p => (
                    <div
                      key={p.id}
                      onClick={() => selectPatient(p)}
                      className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm "
                    >
                      {p.fullName} <span className="text-gray-400">(PID-{p.id.toString().padStart(5, '0')})</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">No patient found</div>
                )}
              </div>
            )}
          </div>

          {/* Doctor Search */}
          <div className="relative" ref={doctorRef}>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Search Doctor <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Type doctor name or specialization..."
                value={doctorSearch}
                onChange={(e) => {
                  setDoctorSearch(e.target.value);
                  setShowDoctorList(true);
                }}
                onFocus={() => setShowDoctorList(true)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50"
              />
            </div>

            {showDoctorList && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.slice(0, 12).map(d => (
                    <div
                      key={d.doctorId}
                      onClick={() => selectDoctor(d)}
                      className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm "
                    >
                      {d.doctorName} — <span className="text-blue-600">{d.specialization}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">No doctor found</div>
                )}
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Appointment Date <span className="text-red-500">*</span></label>
            <input 
              type="date" 
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={(e) => setFormData(prev => ({...prev, appointmentDate: e.target.value}))}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Appointment Time <span className="text-red-500">*</span></label>
            <input 
              type="time" 
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={(e) => setFormData(prev => ({...prev, appointmentTime: e.target.value}))}
              required
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 bg-gray-50"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Additional Notes</label>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
              rows="3"
              placeholder="Any special instructions or patient concerns..."
              className="w-full px-3.5 py-2 border border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none bg-gray-50 focus:bg-white text-sm"
            />
          </div>
        </div>

        {/* Doctor Schedule & Available Slots */}
        {formData.doctorId && formData.appointmentDate && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Available Slots
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
                            : formData.appointmentTime === slot.time
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

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button 
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer font-semibold disabled:cursor-not-allowed"
          >
            <Save className={`w-4 h-4 ${submitting ? 'animate-pulse' : ''}`} />
            <span>{submitting ? 'Booking...' : 'Book Appointment'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
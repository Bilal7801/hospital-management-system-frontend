import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, CalendarDays, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axios';

const AddAppointment = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    departmentId: '',
    appointmentDate: '',
    appointmentTime: '',
    status: 'Upcoming',
    notes: ''
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch Patients and Doctors
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [patientsRes, doctorsRes] = await Promise.all([
          api.get('/superadmin/patients'),
          api.get('/superadmin/doctors')
        ]);

        setPatients(Array.isArray(patientsRes.data) ? patientsRes.data : []);
        setDoctors(Array.isArray(doctorsRes.data) ? doctorsRes.data : []);
      } catch (err) {
        console.error(err);
        setError('Failed to load patients or doctors');
      } finally {
        setLoadingData(false);
      }
    };

    fetchDropdownData();
  }, []);

  // Auto-fill DepartmentId when Doctor is selected (Hidden)
  useEffect(() => {
    if (formData.doctorId) {
      const selectedDoctor = doctors.find(d => d.doctorId === parseInt(formData.doctorId));
      if (selectedDoctor?.departmentId) {
        setFormData(prev => ({
          ...prev,
          departmentId: selectedDoctor.departmentId.toString()
        }));
      }
    }
  }, [formData.doctorId, doctors]);

  useEffect(() => {
    if (!formData.doctorId || !formData.appointmentDate) {
      setDoctorSchedule(null);
      setAvailableSlots([]);
      return;
    }

    fetchDoctorScheduleAndSlots();
  }, [formData.doctorId, formData.appointmentDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'doctorId' || name === 'appointmentDate') {
      setFormData(prev => ({ ...prev, [name]: value, appointmentTime: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const fetchDoctorScheduleAndSlots = async () => {
    try {
      setLoadingSlots(true);

      const scheduleRes = await api.get('/superadmin/doctor-schedule');
      const allSchedules = scheduleRes.data?.data || scheduleRes.data || [];
      const selectedSchedule = allSchedules.find(sch => sch.doctorId === parseInt(formData.doctorId));

      if (!selectedSchedule) {
        setDoctorSchedule(null);
        setAvailableSlots([]);
        return;
      }

      setDoctorSchedule(selectedSchedule);
      generateSlots(selectedSchedule, formData.appointmentDate);
    } catch (err) {
      console.error('Error fetching schedule:', err);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const generateSlots = async (schedule, date) => {
    try {
      const appointmentDate = new Date(date);
      const dayName = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });
      const workingDays = schedule.workingDays
        ? String(schedule.workingDays).split(',').map(d => d.trim())
        : [];

      if (!workingDays.includes(dayName)) {
        setAvailableSlots([]);
        return;
      }

      const startTime = schedule.startTime ? String(schedule.startTime).slice(0, 5) : '09:00';
      const endTime = schedule.endTime ? String(schedule.endTime).slice(0, 5) : '17:00';
      const breakStart = schedule.breakStart ? String(schedule.breakStart).slice(0, 5) : null;
      const breakEnd = schedule.breakEnd ? String(schedule.breakEnd).slice(0, 5) : null;
      const slotDuration = schedule.slotDuration || 15;

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

      const slots = [];
      for (let time = startMins; time < endMins; time += slotDuration) {
        const slotTime = minutesToTime(time);
        const slotEndTime = time + slotDuration;

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

      try {
        const appointmentsRes = await api.get('/superadmin/appointments');
        const allAppointments = Array.isArray(appointmentsRes.data)
          ? appointmentsRes.data
          : appointmentsRes.data?.data || [];

        const bookedAppointments = allAppointments.filter(apt => {
          if (parseInt(apt.doctorId) !== parseInt(formData.doctorId)) return false;
          if (apt.status === 'Cancelled') return false;

          const aptDate = new Date(apt.appointmentDate);
          const selectedDate = new Date(date);
          aptDate.setHours(0, 0, 0, 0);
          selectedDate.setHours(0, 0, 0, 0);

          return aptDate.getTime() === selectedDate.getTime();
        });

        slots.forEach(slot => {
          const isBooked = bookedAppointments.some(apt => {
            const aptTimeStr = new Date(apt.appointmentDate).toTimeString().slice(0, 5);
            return aptTimeStr === slot.time;
          });
          slot.isBooked = isBooked;
        });
      } catch (err) {
        console.error('Error fetching booked appointments:', err);
      }

      setAvailableSlots(slots);
    } catch (err) {
      console.error('Error generating slots:', err);
      setAvailableSlots([]);
    }
  };

  const selectSlot = (slot) => {
    setFormData(prev => ({ ...prev, appointmentTime: slot.time }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patientId || !formData.doctorId || !formData.appointmentDate || !formData.appointmentTime) {
      setError('Please select a patient, doctor, date, and available slot.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const appointmentDateTime = `${formData.appointmentDate}T${formData.appointmentTime}`;

      const payload = {
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId),
        departmentId: formData.departmentId ? parseInt(formData.departmentId) : null,
        appointmentDate: appointmentDateTime,
        status: formData.status,
        notes: formData.notes
      };

      await api.post('/superadmin/appointments', payload);

      alert('Appointment created successfully!');
      navigate('/dashboard/appointments');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create appointment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/dashboard/appointments')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Appointments
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Create New Appointment</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
              Select Patient *
            </label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
            >
              <option value="">-- Select Patient --</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
              Select Doctor *
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map(d => (
                <option key={d.doctorId} value={d.doctorId}>
                  {d.doctorName} - {d.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden Department Field */}
          <input type="hidden" name="departmentId" value={formData.departmentId} />

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
                Appointment Date *
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
                Selected Time *
              </label>
              <div className="w-full p-3 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-700">
                {formData.appointmentTime ? formData.appointmentTime : 'Select an available slot below'}
              </div>
            </div>
          </div>

          {formData.doctorId && formData.appointmentDate && (
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-900">Available Slots</h3>
              </div>

              {loadingSlots ? (
                <div className="text-center py-6">
                  <div className="animate-spin w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-xs text-gray-500 mt-2">Loading available slots...</p>
                </div>
              ) : doctorSchedule ? (
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
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
                        <p className="text-emerald-600 font-bold mt-1">{availableSlots.filter(s => !s.isBooked).length}</p>
                      </div>
                    </div>
                  </div>

                  {availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {availableSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => !slot.isBooked && selectSlot(slot)}
                          disabled={slot.isBooked}
                          className={`py-2.5 px-2 text-xs font-semibold rounded-xl transition-all ${
                            slot.isBooked
                              ? 'bg-red-50 text-red-400 border border-red-200 cursor-not-allowed'
                              : formData.appointmentTime === slot.time
                              ? 'bg-emerald-600 text-white border border-emerald-600'
                              : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
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

                  <div className="flex gap-4 text-xs pt-2">
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

          {!formData.doctorId && (
            <div className="text-sm text-gray-500">Select a doctor and appointment date to view available slots.</div>
          )}

          {/* Status */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none cursor-pointer"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes / Reason - Big Field */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500 block mb-2">
              Notes / Reason
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={6}                    // ← Bigger size
              placeholder="Enter reason, special instructions, or additional notes..."
              className="w-full p-4 border border-gray-200 rounded-xl text-sm outline-none resize-y min-h-35"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-all text-white py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Creating Appointment...' : 'Create Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
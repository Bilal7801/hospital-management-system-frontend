import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  User,
  CalendarDays,
  Activity,
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../api/axios';

const ViewPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const [patientRes, appointmentsRes, recordsRes] = await Promise.all([
          api.get(`/superadmin/patients/${id}`),
          api.get('/superadmin/appointments'),
          api.get('/superadmin/medical-records'),
        ]);

        const patientData = patientRes.data;
        const allAppointments = Array.isArray(appointmentsRes.data) ? appointmentsRes.data : [];
        const allRecords = Array.isArray(recordsRes.data) ? recordsRes.data : [];

        setPatient(patientData);

        // Filter appointments for this patient
        setAppointments(
          allAppointments.filter(
            (item) => Number(item.patientId) === Number(id)
          )
        );

        // Filter medical records for this patient
        setHistory(
          allRecords.filter((item) => Number(item.patientId) === Number(id))
        );
      } catch (err) {
        console.error(err);
        setError('Failed to load patient details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Get doctor name helper
  const getDoctorName = (doctor) => {
    if (!doctor) return 'Not Assigned';
    return doctor.doctorName || doctor.fullName || doctor.name || 'Not Assigned';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/patients')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </button>

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center text-gray-500">
          Loading patient details...
        </div>
      ) : error ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center text-rose-600">
          {error}
        </div>
      ) : patient ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Profile */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-7 h-7 text-blue-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {patient.fullName || 'N/A'}
                </h2>
                <p className="text-xs text-gray-400">Patient ID #{patient.id}</p>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-[11px] uppercase text-gray-400">Gender</p>
                <p className="font-semibold text-gray-800">{patient.gender || '-'}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase text-gray-400">Age</p>
                <p className="font-semibold text-gray-800">{patient.age ?? '-'} Years</p>
              </div>

              <div>
                <p className="text-[11px] uppercase text-gray-400">Assigned Doctor</p>
                <p className="font-semibold text-gray-800">
                  {getDoctorName(patient.assignedDoctor)}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-800">{patient.phone || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase text-gray-400">Email</p>
                  <p className="font-semibold text-gray-800">{patient.email || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase text-gray-400">Address</p>
                  <p className="font-semibold text-gray-800">{patient.address || '-'}</p>
                </div>
              </div>

              <div>
                <p className="text-[11px] uppercase text-gray-400">Status</p>
                <span className="inline-block mt-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold">
                  {patient.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Appointments & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointments History */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <CalendarDays className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-gray-900">Appointments History</h3>
              </div>

              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {getDoctorName(appointment.doctor)}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {formatDate(appointment.appointmentDate)}
                          <Clock className="w-3.5 h-3.5 ml-2" />
                          {formatTime(appointment.appointmentDate)}
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          appointment.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-600'
                            : appointment.status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-600'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {appointment.status || 'Upcoming'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 py-8 text-center">
                    No appointments found for this patient.
                  </div>
                )}
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-gray-900">Medical History</h3>
              </div>

              <div className="space-y-4">
                {history.length > 0 ? (
                  history.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {item.title || 'Medical Record'}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {formatDate(item.recordDate)}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mb-1">
                        Dr. {getDoctorName(item.doctor)}
                      </p>

                      <p className="text-sm text-gray-700">
                        {item.diagnosis && <strong>Diagnosis:</strong>} {item.diagnosis || ''}
                        {item.notes && <span className="block mt-1">{item.notes}</span>}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 py-8 text-center">
                    No medical history found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center text-gray-500">
          Patient not found.
        </div>
      )}
    </div>
  );
};

export default ViewPatient;
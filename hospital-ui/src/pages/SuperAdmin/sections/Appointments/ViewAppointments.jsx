import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  User,
  Stethoscope,
  Building2,
  CalendarDays,
  Clock,
  Activity,
  FileText,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../api/axios';

const ViewAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await api.get(`/superadmin/appointments/${id}`);
        setAppointment(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load appointment details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDoctorName = (doctor) => {
    if (!doctor) return 'Not Assigned';
    return doctor.doctorName || doctor.fullName || doctor.name || 'Unknown Doctor';
  };

  const getPatientName = (patient) => {
    if (!patient) return 'Unknown Patient';
    return patient.fullName || patient.name || 'Unknown';
  };

  const getDepartmentName = (department) => {
    if (!department) return 'N/A';
    return department.departmentName || department.name || 'N/A';
  };

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto min-h-screen">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center text-gray-500">
          Loading appointment details...
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="p-6 max-w-5xl mx-auto min-h-screen">
        <button
          onClick={() => navigate('/dashboard/appointments')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Appointments
        </button>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center text-rose-600">
          {error || 'Appointment not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/appointments')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Appointments
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Appointment Details #{appointment.id}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient */}
          <div className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-semibold text-gray-700">Patient</p>
            </div>
            <p className="text-lg font-medium text-gray-900">
              {getPatientName(appointment.patient)}
            </p>
          </div>

          {/* Doctor */}
          <div className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="w-5 h-5 text-emerald-600" />
              <p className="text-sm font-semibold text-gray-700">Doctor</p>
            </div>
            <p className="text-lg font-medium text-gray-900">
              {getDoctorName(appointment.doctor)}
            </p>
          </div>

          {/* Department */}
          <div className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-purple-600" />
              <p className="text-sm font-semibold text-gray-700">Department</p>
            </div>
            <p className="text-lg font-medium text-gray-900">
              {getDepartmentName(appointment.department)}
            </p>
          </div>

          {/* Date & Time */}
          <div className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-semibold text-gray-700">Schedule</p>
            </div>
            <p className="text-lg font-medium text-gray-900">
              {formatDate(appointment.appointmentDate)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {formatTime(appointment.appointmentDate)}
            </p>
          </div>

          {/* Status */}
          <div className="border border-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-rose-600" />
              <p className="text-sm font-semibold text-gray-700">Status</p>
            </div>
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                appointment.status === 'Completed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : appointment.status === 'Cancelled'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {appointment.status || 'Upcoming'}
            </span>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="border border-gray-100 rounded-xl p-5 md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <p className="text-sm font-semibold text-gray-700">Notes</p>
              </div>
              <p className="text-gray-700 leading-relaxed">{appointment.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
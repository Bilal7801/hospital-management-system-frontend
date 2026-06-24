import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import AppointmentTable from './AppointmentTable';
import RescheduleModal from './RescheduleModal';
import CancelModal from './CancelModal';
import api from '../../../../api/axios';

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalType, setModalType] = useState(null); // 'reschedule' | 'cancel'

  const canDoctorModifyAppointments = true;

  // Fetch Appointments from Backend
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/doctor/appointments?tab=${activeTab}`);
      setAppointments(res.data.data || []);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    fetchAppointments();
  }, [activeTab]);

  const handleCancelSubmit = async (id) => {
    try {
      await api.put(`/doctor/appointments/${id}/cancel`);
      fetchAppointments(); // Refresh the list
      closeModals();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment");
    }
  };

  const handleRescheduleSubmit = async (id, newDate, newTime) => {
    try {
      await api.put(`/doctor/appointments/${id}/reschedule`, { 
        NewDate: newDate, 
        NewTime: newTime 
      });
      fetchAppointments(); // Refresh the list
      closeModals();
    } catch (err) {
      console.error(err);
      alert("Failed to reschedule appointment");
    }
  };

  const closeModals = () => {
    setSelectedAppointment(null);
    setModalType(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Context Info Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Appointment Center</h1>
          <p className="text-gray-500 text-sm mt-1">Manage schedules, track dynamic waiting lines, and execute patient adjustments.</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border ${
          canDoctorModifyAppointments ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{canDoctorModifyAppointments ? "Full Modifications Access Allowed" : "View-Only Access Mode"}</span>
        </div>
      </div>

      {/* Main Tab Selection Bar */}
      <div className="flex border-b border-gray-200 bg-white px-4 pt-3 rounded-xl border shadow-sm">
        {['today', 'upcoming', 'past'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-medium text-sm transition-all border-b-2 capitalize ${
              activeTab === tab ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab === 'today' ? "Today's Schedule" : `${tab} appointments`}
          </button>
        ))}
      </div>

      {/* Isolated Presentation Table View */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <AppointmentTable 
          appointments={appointments}
          activeTab={activeTab}
          canModify={canDoctorModifyAppointments}
          onRescheduleClick={(apt) => { 
            setSelectedAppointment(apt); 
            setModalType('reschedule'); 
          }}
          onCancelClick={(apt) => { 
            setSelectedAppointment(apt); 
            setModalType('cancel'); 
          }}
        />
      </div>

      {/* Isolated Reschedule Dialog */}
      {modalType === 'reschedule' && selectedAppointment && (
        <RescheduleModal 
          appointment={selectedAppointment}
          onClose={closeModals}
          onSubmit={handleRescheduleSubmit}
        />
      )}

      {/* Isolated Cancel Dialog */}
      {modalType === 'cancel' && selectedAppointment && (
        <CancelModal 
          appointment={selectedAppointment}
          onClose={closeModals}
          onConfirm={handleCancelSubmit}
        />
      )}
    </div>
  );
};

export default DoctorAppointments;
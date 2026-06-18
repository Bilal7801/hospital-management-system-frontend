import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

// Flat relative imports (No sub-folders)
import AppointmentTable from './AppointmentTable';
import RescheduleModal from './RescheduleModal';
import CancelModal from './CancelModal';

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalType, setModalType] = useState(null); // 'reschedule' | 'cancel'

  const canDoctorModifyAppointments = true; 

  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Arjun Mehta", phone: "+91 98765 43210", date: "Today", time: "09:00 AM", type: "Checkup", status: "In Progress", category: "today" },
    { id: 2, patient: "Sana Khan", phone: "+91 87654 32109", date: "Today", time: "10:30 AM", type: "Follow-up", status: "Waiting", category: "today" },
    { id: 3, patient: "Rahul Verma", phone: "+91 76543 21098", date: "Today", time: "11:45 AM", type: "Report Review", status: "Waiting", category: "today" },
    { id: 4, patient: "Priya Sharma", phone: "+91 65432 10987", date: "June 18, 2026", time: "10:00 AM", type: "New Consultation", status: "Confirmed", category: "upcoming" },
    { id: 5, patient: "Amit Patel", phone: "+91 54321 09876", date: "June 19, 2026", time: "04:15 PM", type: "Routine Check", status: "Confirmed", category: "upcoming" },
    { id: 6, patient: "Kiran Rao", phone: "+91 43210 98765", date: "June 15, 2026", time: "11:00 AM", type: "Follow-up", status: "Completed", category: "past" },
    { id: 7, patient: "Vikram Singh", phone: "+91 32109 87654", date: "June 14, 2026", time: "02:30 PM", type: "Cancelled", status: "Cancelled", category: "past" }
  ]);

  const filteredAppointments = appointments.filter(apt => apt.category === activeTab);

  const handleCancelSubmit = (id) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: 'Cancelled', category: 'past' } : apt
    ));
    closeModals();
  };

  const handleRescheduleSubmit = (id, newDate, newTime) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, date: newDate, time: newTime, category: 'upcoming', status: 'Confirmed' } : apt
    ));
    closeModals();
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
          appointments={filteredAppointments}
          activeTab={activeTab}
          canModify={canDoctorModifyAppointments}
          onRescheduleClick={(apt) => { setSelectedAppointment(apt); setModalType('reschedule'); }}
          onCancelClick={(apt) => { setSelectedAppointment(apt); setModalType('cancel'); }}
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
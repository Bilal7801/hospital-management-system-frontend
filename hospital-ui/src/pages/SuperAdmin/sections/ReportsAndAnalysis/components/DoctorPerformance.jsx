import React from 'react';
import { Star, Users, TrendingUp } from 'lucide-react';

const DoctorPerformance = () => {
  const doctors = [
    { id: 1, name: 'Dr. James Wilson', rating: 4.8, patients: 320, appointments: 450, specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Sarah Jenkins', rating: 4.6, patients: 280, appointments: 380, specialization: 'Neurology' },
    { id: 3, name: 'Dr. Michael Brown', rating: 4.9, patients: 295, appointments: 420, specialization: 'Orthopedics' },
    { id: 4, name: 'Dr. Emily Davis', rating: 4.7, patients: 310, appointments: 410, specialization: 'Pediatrics' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Doctor Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-xl bg-white">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <p className="text-xs text-gray-500 font-medium">Average Rating</p>
            </div>
            <p className="text-2xl font-bold text-yellow-600">4.75 ⭐</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl bg-white">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <p className="text-xs text-gray-500 font-medium">Total Patients</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">1,205</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl bg-white">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <p className="text-xs text-gray-500 font-medium">Total Appointments</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600">1,660</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Doctor Rankings</h3>
        <div className="space-y-3">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{doctor.name}</p>
                <p className="text-xs text-gray-500">{doctor.specialization}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Patients</p>
                  <p className="font-bold text-blue-600">{doctor.patients}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Appointments</p>
                  <p className="font-bold text-emerald-600">{doctor.appointments}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="font-bold text-yellow-600">{doctor.rating} ⭐</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorPerformance;
import React from 'react';
import { Building2, Users, Stethoscope, TrendingUp } from 'lucide-react';

const DepartmentReport = () => {
  const departments = [
    { name: 'Cardiology', doctors: 5, patients: 1200, appointments: 450, status: 'Active', revenue: '$125,000' },
    { name: 'Neurology', doctors: 3, patients: 800, appointments: 320, status: 'Active', revenue: '$98,500' },
    { name: 'Orthopedics', doctors: 4, patients: 950, appointments: 380, status: 'Active', revenue: '$87,200' },
    { name: 'Pediatrics', doctors: 2, patients: 600, appointments: 250, status: 'Active', revenue: '$76,300' },
    { name: 'General Medicine', doctors: 6, patients: 870, appointments: 360, status: 'Active', revenue: '$133,000' },
  ];

  const totalDepartments = departments.length;
  const totalDoctors = departments.reduce((sum, dept) => sum + dept.doctors, 0);
  const totalPatients = departments.reduce((sum, dept) => sum + dept.patients, 0);
  const totalAppointments = departments.reduce((sum, dept) => sum + dept.appointments, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Department Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 font-medium">Total Departments</p>
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{totalDepartments}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 font-medium">Total Doctors</p>
              <Stethoscope className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{totalDoctors}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 font-medium">Total Patients</p>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">{totalPatients}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 font-medium">Total Appointments</p>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{totalAppointments}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Department Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Department</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Doctors</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Patients</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Appointments</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Revenue</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-all">
                  <td className="px-4 py-3 font-medium">{dept.name}</td>
                  <td className="px-4 py-3">{dept.doctors}</td>
                  <td className="px-4 py-3">{dept.patients}</td>
                  <td className="px-4 py-3">{dept.appointments}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">{dept.revenue}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                      {dept.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentReport;
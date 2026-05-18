import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import api from "../../../../../api/axios";

const DoctorPerformance = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchDoctorPerformance();
  }, []);

  const fetchDoctorPerformance = async () => {
    try {
      setLoading(true);
      const res = await api.get("/superadmin/reports/doctors/performance");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctor performance:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(doctors.length / itemsPerPage);
  const paginatedDoctors = doctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="text-center py-12">Loading doctor performance...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total Doctors" value={doctors.length} icon={Award} color="text-blue-600" />
          <StatCard label="Total Patients" value={doctors.reduce((sum, d) => sum + (d.totalPatients || 0), 0)} icon={Users} color="text-emerald-600" />
          <StatCard label="Total Appointments" value={doctors.reduce((sum, d) => sum + (d.totalAppointments || 0), 0)} icon={TrendingUp} color="text-purple-600" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Doctor Rankings</h3>
        
        <div className="space-y-3">
          {paginatedDoctors.map((doctor) => (
            <div 
              key={doctor.doctorId} 
              className="flex items-center justify-between p-5 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{doctor.doctorName}</p>
                <p className="text-sm text-gray-500">{doctor.specialization} • {doctor.departmentName}</p>
              </div>
              <div className="flex items-center gap-10 text-sm">
                <div className="text-center">
                  <p className="text-gray-500">Patients</p>
                  <p className="font-bold text-blue-600">{doctor.totalPatients || 0}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Appointments</p>
                  <p className="font-bold text-emerald-600">{doctor.totalAppointments || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="p-5 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition-all cursor-pointer">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default DoctorPerformance;
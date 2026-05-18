import React, { useEffect, useState } from 'react';
import { Building2, Users, Stethoscope, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import api from "../../../../../api/axios";

const DepartmentReport = () => {
  const [data, setData] = useState({ totalStats: {}, departments: [] });
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchDepartmentData();
  }, []);

  const fetchDepartmentData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/superadmin/reports/departments");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching department report:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(data.departments.length / itemsPerPage);
  const paginatedDepartments = data.departments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="text-center py-12">Loading department data...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4">Department Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Departments" value={data.totalStats.totalDepartments || 0} icon={Building2} color="text-blue-600" />
          <StatCard label="Total Doctors" value={data.totalStats.totalDoctors || 0} icon={Stethoscope} color="text-emerald-600" />
          <StatCard label="Total Patients" value={data.totalStats.totalPatients || 0} icon={Users} color="text-purple-600" />
          <StatCard label="Total Appointments" value={data.totalStats.totalAppointments || 0} icon={TrendingUp} color="text-orange-600" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Department Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Doctors</th>
                <th className="px-4 py-3 text-left">Patients</th>
                <th className="px-4 py-3 text-left">Appointments</th>
                <th className="px-4 py-3 text-left">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDepartments.map((dept, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-all cursor-pointer">
                  <td className="px-4 py-3 font-medium">{dept.departmentName}</td>
                  <td className="px-4 py-3">{dept.totalDoctors}</td>
                  <td className="px-4 py-3">{dept.totalPatients}</td>
                  <td className="px-4 py-3">{dept.totalAppointments}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600">
                    Rs. {dept.revenue ? dept.revenue.toLocaleString() : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-2">
            <button onClick={() => setCurrentPage(p => Math.max(p-1,1))} disabled={currentPage===1}
              className="flex items-center gap-1 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(p+1,totalPages))} disabled={currentPage===totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer">
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

export default DepartmentReport;
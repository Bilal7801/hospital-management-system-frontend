import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Calendar, FileText } from 'lucide-react';
import api from "../../../../api/axios";

const AddLeave = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    doctorId: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
  });

  const leaveTypes = [
    "Sick Leave",
    "Annual Leave",
    "Emergency Leave",
    "Casual Leave",
    "Maternity Leave",
    "Other"
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/Doctor');
        setDoctors(res.data || []);
      } catch (err) {
        console.error("Doctor fetch failed:", err);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post('/DoctorLeave', {
        doctorId: Number(form.doctorId),
        leaveType: form.leaveType,
        fromDate: form.fromDate,
        toDate: form.toDate,
        reason: form.reason
      });

      alert("Leave created successfully");
      navigate('/dashboard/doctor-schedule/manage-leave');

    } catch (err) {
      console.error(err);
      alert("Failed to create leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/doctor-schedule/manage-leave')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        {/* Heading */}
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-blue-600" />
          Create Doctor Leave Request
        </h2>

        <div className="space-y-5">

          {/* Doctor */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Select Doctor
            </label>

            <div className="relative mt-1">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl text-sm"
                value={form.doctorId}
                onChange={(e) =>
                  setForm({ ...form, doctorId: e.target.value })
                }
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d.doctorId} value={d.doctorId}>
                    {d.doctorName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Leave Type */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Leave Type
            </label>

            <select
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
              value={form.leaveType}
              onChange={(e) =>
                setForm({ ...form, leaveType: e.target.value })
              }
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-[11px] uppercase font-semibold text-gray-500">
                From Date
              </label>

              <input
                type="date"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
                value={form.fromDate}
                onChange={(e) =>
                  setForm({ ...form, fromDate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-[11px] uppercase font-semibold text-gray-500">
                To Date
              </label>

              <input
                type="date"
                className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
                value={form.toDate}
                onChange={(e) =>
                  setForm({ ...form, toDate: e.target.value })
                }
              />
            </div>

          </div>

          {/* Reason */}
          <div>
            <label className="text-[11px] uppercase font-semibold text-gray-500">
              Reason
            </label>

            <textarea
              rows={4}
              className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm"
              placeholder="Enter reason for leave..."
              value={form.reason}
              onChange={(e) =>
                setForm({ ...form, reason: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? "Submitting..." : "Submit Leave Request"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddLeave;
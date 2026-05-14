import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import api from "../../../../api/axios";

const EditReceptionist = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    shift: 'Morning',
    isActive: true,
  });

  // GET BY ID
  const fetchData = async () => {
    try {
      const res = await api.get(`/Receptionist/${id}`);

      setForm({
        name: res.data.name,
        email: res.data.email,
        shift: res.data.shift,
        isActive: res.data.isActive,
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // UPDATE
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await api.put(`/Receptionist/${id}`, form);

      alert("Updated successfully");
      navigate("/dashboard/receptionists");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate('/dashboard/receptionists')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Card */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Edit Receptionist #{id}
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Receptionist Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Email
          </label>

          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
          />
        </div>

        {/* Shift */}
        <div className="mb-4">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Shift
          </label>

          <select
            value={form.shift}
            onChange={(e) =>
              setForm({ ...form, shift: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-200 rounded-xl text-sm cursor-pointer"
          >
            <option>Morning</option>
            <option>Evening</option>
            <option>Night</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-[11px] font-semibold text-gray-500 uppercase">
            Status
          </label>

          <div className="flex gap-3 mt-2">

            <button
              onClick={() =>
                setForm({ ...form, isActive: true })
              }
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border cursor-pointer ${
                form.isActive
                  ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                  : "border-gray-200"
              }`}
            >
              Active
            </button>

            <button
              onClick={() =>
                setForm({ ...form, isActive: false })
              }
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl border cursor-pointer ${
                !form.isActive
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "border-gray-200"
              }`}
            >
              Inactive
            </button>

          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-blue-700 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
};

export default EditReceptionist;
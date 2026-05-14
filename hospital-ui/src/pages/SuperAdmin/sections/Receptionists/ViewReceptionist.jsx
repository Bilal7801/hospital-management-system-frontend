import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import api from "../../../../api/axios";

const ViewReceptionist = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [receptionist, setReceptionist] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get(`/Receptionist/${id}`);
      setReceptionist(res.data);
    } catch (err) {
      console.error("Failed to load receptionist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!receptionist) {
    return (
      <div className="p-6 text-center text-gray-400">
        Receptionist not found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen">

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

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <User className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">
            Receptionist Profile #{receptionist.receptionistId}
          </h2>
        </div>

        {/* Info */}
        <div className="space-y-4 text-sm">

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Name</p>
            <p className="font-semibold text-gray-800">
              {receptionist.name}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Email</p>
            <p className="font-semibold text-gray-800">
              {receptionist.email}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Shift</p>
            <p className="font-semibold text-gray-800">
              {receptionist.shift}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400 uppercase">Status</p>
            <span
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${
                receptionist.isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {receptionist.isActive ? "Active" : "Inactive"}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ViewReceptionist;
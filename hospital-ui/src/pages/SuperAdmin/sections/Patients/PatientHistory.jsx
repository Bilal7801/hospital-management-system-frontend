import React from 'react';
import {
  ArrowLeft,
  Activity,
  CalendarDays,
  User,
  Pill,
  FileText,
  HeartPulse,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const PatientHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy Patient Data
  const patient = {
    id,
    name: "Ahmed Raza",
    gender: "Male",
    age: 26,
    bloodGroup: "B+",
    doctor: "Dr. James Wilson",
  };

  // Dummy Medical History
  const history = [
    {
      id: 1,
      title: "General Checkup",
      doctor: "Dr. James Wilson",
      date: "10 Apr 2026",
      diagnosis: "Seasonal Flu",
      prescription: "Paracetamol + Rest",
      notes: "Patient had mild fever and flu symptoms.",
    },
    {
      id: 2,
      title: "Blood Pressure Review",
      doctor: "Dr. Sarah Jenkins",
      date: "25 Apr 2026",
      diagnosis: "High Blood Pressure",
      prescription: "BP Medication",
      notes: "Blood pressure improved after medication.",
    },
    {
      id: 3,
      title: "Orthopedic Consultation",
      doctor: "Dr. Robert Fox",
      date: "03 May 2026",
      diagnosis: "Knee Pain",
      prescription: "Painkiller + Exercise",
      notes: "Recommended light physiotherapy sessions.",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard/patients')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-6 mb-6">

        <div>

          <h2 className="text-xl font-bold text-gray-900">
            Patient Medical History
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Complete medical records and treatment history
          </p>

        </div>

      </div>

      {/* Patient Summary Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Left */}
          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>

            <div>

              <h3 className="text-lg font-bold text-gray-900">
                {patient.name}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Patient ID #{patient.id}
              </p>

            </div>

          </div>

          {/* Right */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Gender
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {patient.gender}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Age
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {patient.age} Years
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Blood Group
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {patient.bloodGroup}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Primary Doctor
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {patient.doctor}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* History Timeline */}
      <div className="space-y-6">

        {history.map((record) => (
          <div
            key={record.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6"
          >

            {/* Top */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">

              <div>

                <div className="flex items-center gap-2">

                  <Activity className="w-5 h-5 text-blue-600" />

                  <h3 className="text-base font-bold text-gray-900">
                    {record.title}
                  </h3>

                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">

                  <CalendarDays className="w-3.5 h-3.5" />
                  {record.date}

                  <span className="mx-1">•</span>

                  {record.doctor}

                </div>

              </div>

              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold w-fit">
                Medical Record
              </span>

            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Diagnosis */}
              <div className="border border-gray-100 rounded-xl p-4">

                <div className="flex items-center gap-2 mb-3">

                  <HeartPulse className="w-4 h-4 text-rose-500" />

                  <h4 className="text-sm font-semibold text-gray-900">
                    Diagnosis
                  </h4>

                </div>

                <p className="text-sm text-gray-700">
                  {record.diagnosis}
                </p>

              </div>

              {/* Prescription */}
              <div className="border border-gray-100 rounded-xl p-4">

                <div className="flex items-center gap-2 mb-3">

                  <Pill className="w-4 h-4 text-emerald-500" />

                  <h4 className="text-sm font-semibold text-gray-900">
                    Prescription
                  </h4>

                </div>

                <p className="text-sm text-gray-700">
                  {record.prescription}
                </p>

              </div>

            </div>

            {/* Notes */}
            <div className="mt-5 border border-gray-100 rounded-xl p-4">

              <div className="flex items-center gap-2 mb-3">

                <FileText className="w-4 h-4 text-blue-500" />

                <h4 className="text-sm font-semibold text-gray-900">
                  Doctor Notes
                </h4>

              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {record.notes}
              </p>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default PatientHistory;
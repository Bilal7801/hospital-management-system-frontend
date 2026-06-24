import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Clipboard,
  AlertTriangle
} from "lucide-react";

const PatientMedicalRecord = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState("profile");

  if (!patient) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-900 rounded-lg transition-colors bg-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              {patient.name}
            </h2>

            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              {patient.patientCode}
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-0.5">
            Clinical Dashboard Core EHR
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-4 pt-3 rounded-xl border shadow-sm">
        {[
          {
            id: "profile",
            label: "Patient Profile",
            icon: User
          },
          {
            id: "history",
            label: "Visits & Diagnosis",
            icon: Clipboard
          },
          {
            id: "allergies",
            label: "Allergies & Risks",
            icon: AlertTriangle
          }
        ].map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-4 font-medium text-sm transition-all border-b-2 flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[350px]">

        {/* Profile */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-gray-900 border-b pb-2">
              Demographic Framework
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Full Name
                </label>
                <div className="text-sm font-semibold text-gray-800 mt-1">
                  {patient.name}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Age / Gender
                </label>
                <div className="text-sm font-semibold text-gray-800 mt-1">
                  {patient.age} Years / {patient.gender}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Blood Group
                </label>
                <div className="text-sm font-semibold text-gray-800 mt-1">
                  {patient.bloodGroup || "N/A"}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Phone
                </label>
                <div className="text-sm font-semibold text-gray-800 mt-1">
                  {patient.phone || "N/A"}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Email
                </label>
                <div className="text-sm font-semibold text-gray-800 mt-1">
                  {patient.email || "N/A"}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Address
                </label>
                <div className="text-sm font-semibold text-gray-800 mt-1">
                  {patient.address || "N/A"}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Visit History */}
        {activeTab === "history" && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-b pb-2">
              Longitudinal Encounter History
            </h3>

            {patient.visitHistory?.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No medical records found.
              </div>
            ) : (
              <div className="relative border-l border-gray-200 pl-4 space-y-6 ml-2 pt-2">

                {patient.visitHistory?.map((visit, index) => (
                  <div key={index} className="relative">

                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-blue-600 rounded-full ring-4 ring-white" />

                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {visit.date}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mt-2 border border-gray-100">

                      <div className="text-sm font-bold text-gray-900">
                        Diagnosis: {visit.diagnosis}
                      </div>

                      <div className="text-xs text-gray-600 mt-2">
                        <strong>Treatment:</strong>{" "}
                        {visit.treatment}
                      </div>

                      <div className="text-[11px] text-gray-400 mt-3 border-t pt-2 italic">
                        Attending Doctor: {visit.doctor}
                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}
          </div>
        )}

        {/* Allergies */}
        {activeTab === "allergies" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <h3 className="text-base font-bold text-rose-700 border-b pb-2">
                Allergies
              </h3>

              {patient.allergies?.length === 0 ? (
                <p className="mt-3 text-sm text-gray-500">
                  No allergies recorded.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {patient.allergies.map((alg, i) => (
                    <li
                      key={i}
                      className="text-sm bg-rose-50 border border-rose-100 text-rose-800 px-3 py-2 rounded-lg font-medium"
                    >
                      ⚠️ {alg}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-amber-700 border-b pb-2">
                Medical Conditions
              </h3>

              {patient.conditions?.length === 0 ? (
                <p className="mt-3 text-sm text-gray-500">
                  No conditions recorded.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {patient.conditions.map((cond, i) => (
                    <li
                      key={i}
                      className="text-sm bg-amber-50 border border-amber-100 text-amber-800 px-3 py-2 rounded-lg font-medium"
                    >
                      📋 {cond}
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PatientMedicalRecord;
import React, { useEffect, useState } from "react";
import PatientList from "./PatientList";
import PatientMedicalRecord from "./PatientMedicalRecord";
import api from "../../../../api/axios";
import { Loader2 } from "lucide-react";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchPatients = async (search = "") => {
    try {
      setLoading(true);
      const res = await api.get("/doctor/patients", {
        params: { searchTerm: search }
      });
      setPatients(res.data.data || []);
    } catch (error) {
      console.error("Failed to load patients", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientDetails = async (patientId) => {
    try {
      setDetailLoading(true);
      const res = await api.get(`/doctor/patients/${patientId}`);

      if (res.data.success) {
        setSelectedPatient(res.data.data);
      } else {
        console.error("API returned success=false", res.data);
      }
    } catch (error) {
      console.error("Failed to load patient details", error);
    } finally {
      setDetailLoading(false);
    }
  };

  // Search with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPatients(searchQuery);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Initial load
  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="space-y-6 relative">
      {/* Loading Overlay for Detail View */}
      {detailLoading && (
        <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white px-5 py-3 rounded-xl shadow-lg border flex items-center gap-2 font-medium text-sm text-gray-700">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            Fetching Complete EHR Record...
          </div>
        </div>
      )}

      {!selectedPatient ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Patient Management Registry
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Search profiles, extract dynamic medical records, and track timeline logs.
              </p>
            </div>
            {loading && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
          </div>

          <PatientList
            patients={patients}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectPatient={fetchPatientDetails}   // ← Fixed: Pass function directly
          />
        </>
      ) : (
        <PatientMedicalRecord
          patient={selectedPatient}
          onBack={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default DoctorPatients;
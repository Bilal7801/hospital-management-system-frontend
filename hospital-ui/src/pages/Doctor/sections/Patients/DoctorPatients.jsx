import React, { useState } from 'react';
import PatientList from './PatientList';
import PatientMedicalRecord from './PatientMedicalRecord';

const DoctorPatients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Medical Database Grid 
  const [patientsData] = useState([
    {
      id: "P-1043",
      name: "Arjun Mehta",
      age: 42,
      gender: "Male",
      bloodGroup: "O+",
      phone: "+91 98765 43210",
      email: "arjun.mehta@email.com",
      allergies: ["Penicillin", "Dust Mites"],
      conditions: ["Hypertension (Stage 1)", "Type 2 Diabetes Control"],
      vitalsHistory: [
        { date: "Today", bp: "130/85", pulse: "74 bpm", temp: "98.6°F", spo2: "98%", weight: "78 kg" },
        { date: "May 12, 2026", bp: "138/88", pulse: "79 bpm", temp: "98.9°F", spo2: "97%", weight: "79 kg" },
        { date: "Mar 04, 2026", bp: "142/90", pulse: "82 bpm", temp: "98.4°F", spo2: "99%", weight: "81 kg" }
      ],
      visitHistory: [
        { date: "Today", diagnosis: "Routine diabetic checkup. Glucose levels steady.", treatment: "Continue Metformin 500mg, added daily walking regimen.", doctor: "You" },
        { date: "May 12, 2026", diagnosis: "Acute Rhino-Pharyngitis (Common Cold)", treatment: "Paracetamol 650mg, Cetirizine 10mg bedtime for 3 days.", doctor: "You" },
        { date: "Jan 15, 2026", diagnosis: "Gastroenteritis mild", treatment: "Oral rehydration salts, Probiotics for 5 days. Bland diet.", doctor: "Dr. Sunita Sharma (GP)" }
      ]
    },
    {
      id: "P-2089",
      name: "Sana Khan",
      age: 29,
      gender: "Female",
      bloodGroup: "A-",
      phone: "+91 87654 32109",
      email: "sana.khan@email.com",
      allergies: ["Sulfonamides", "Peanuts"],
      conditions: ["Mild Persistent Asthma"],
      vitalsHistory: [
        { date: "Today", bp: "118/75", pulse: "68 bpm", temp: "98.2°F", spo2: "99%", weight: "56 kg" },
        { date: "Feb 20, 2026", bp: "120/78", pulse: "72 bpm", temp: "101.2°F", spo2: "95%", weight: "55.5 kg" }
      ],
      visitHistory: [
        { date: "Today", diagnosis: "Asthma review. Inhaler compliance checked.", treatment: "Maintain Budesonide inhaler twice daily.", doctor: "You" },
        { date: "Feb 20, 2026", diagnosis: "Acute Bronchitis exacerbation", treatment: "Amoxicillin 500mg, Nebulization in clinic.", doctor: "Dr. R. K. Verma (Pulmonology)" }
      ]
    }
  ]);

  // Filter list based on search criteria
  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {!selectedPatient ? (
        <>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Patient Management Registry</h1>
            <p className="text-gray-500 text-sm mt-1">Search profiles, extract dynamic medical records, and track timeline logs.</p>
          </div>
          
          <PatientList 
            patients={filteredPatients} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectPatient={setSelectedPatient} 
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
import React from 'react';
import {
  ArrowLeft,
  User,
  CalendarDays,
  Activity,
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy Data
  const patient = {
    id,
    name: "Ahmed Raza",
    gender: "Male",
    age: 26,
    phone: "+92 300 1234567",
    email: "ahmedraza@gmail.com",
    address: "Sialkot, Punjab",
    doctor: "Dr. James Wilson",
    status: "Active",
  };

  const appointments = [
    {
      id: 1,
      date: "12 May 2026",
      time: "10:30 AM",
      doctor: "Dr. James Wilson",
      status: "Completed",
    },
    {
      id: 2,
      date: "18 May 2026",
      time: "02:00 PM",
      doctor: "Dr. Sarah Jenkins",
      status: "Upcoming",
    },
  ];

  const history = [
    {
      id: 1,
      title: "General Checkup",
      doctor: "Dr. James Wilson",
      date: "10 Apr 2026",
      notes: "Patient had mild fever and flu symptoms.",
    },
    {
      id: 2,
      title: "Blood Pressure Review",
      doctor: "Dr. Sarah Jenkins",
      date: "25 Apr 2026",
      notes: "Blood pressure improved after medication.",
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

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        {/* Patient Profile */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {patient.name}
              </h2>

              <p className="text-xs text-gray-400">
                Patient ID #{patient.id}
              </p>
            </div>
          </div>

          <div className="space-y-5 text-sm">

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Gender
              </p>

              <p className="font-semibold text-gray-800">
                {patient.gender}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Age
              </p>

              <p className="font-semibold text-gray-800">
                {patient.age} Years
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Assigned Doctor
              </p>

              <p className="font-semibold text-gray-800">
                {patient.doctor}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gray-400 mt-0.5" />

              <div>
                <p className="text-[11px] uppercase text-gray-400">
                  Phone
                </p>

                <p className="font-semibold text-gray-800">
                  {patient.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5" />

              <div>
                <p className="text-[11px] uppercase text-gray-400">
                  Email
                </p>

                <p className="font-semibold text-gray-800">
                  {patient.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />

              <div>
                <p className="text-[11px] uppercase text-gray-400">
                  Address
                </p>

                <p className="font-semibold text-gray-800">
                  {patient.address}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400">
                Status
              </p>

              <span className="inline-block mt-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold">
                {patient.status}
              </span>
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 space-y-6">

          {/* Appointments */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-2 mb-5">

              <CalendarDays className="w-5 h-5 text-blue-600" />

              <h3 className="text-base font-bold text-gray-900">
                Appointments History
              </h3>

            </div>

            <div className="space-y-4">

              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >

                  <div>

                    <h4 className="text-sm font-semibold text-gray-900">
                      {appointment.doctor}
                    </h4>

                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">

                      <CalendarDays className="w-3.5 h-3.5" />
                      {appointment.date}

                      <Clock className="w-3.5 h-3.5 ml-2" />
                      {appointment.time}

                    </div>

                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      appointment.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {appointment.status}
                  </span>

                </div>
              ))}

            </div>
          </div>

          {/* Medical History */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-2 mb-5">

              <Activity className="w-5 h-5 text-blue-600" />

              <h3 className="text-base font-bold text-gray-900">
                Medical History
              </h3>

            </div>

            <div className="space-y-4">

              {history.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-100 rounded-xl p-4"
                >

                  <div className="flex items-center justify-between mb-2">

                    <h4 className="text-sm font-semibold text-gray-900">
                      {item.title}
                    </h4>

                    <span className="text-xs text-gray-400">
                      {item.date}
                    </span>

                  </div>

                  <p className="text-xs text-gray-500 mb-2">
                    {item.doctor}
                  </p>

                  <p className="text-sm text-gray-700">
                    {item.notes}
                  </p>

                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
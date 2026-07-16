import React, { useState } from 'react';
import { Calendar, Clock, User, Award, CheckCircle } from 'lucide-react';

const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    department: "",
    doctor: "",
    date: "",
    slot: "",
    reason: ""
  });

  const slots = ["09:00 AM", "10:30 AM", "11:15 AM", "02:00 PM", "03:30 PM", "04:15 PM"];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-gray-900 font-sans">Book a New Appointment</h3>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Step {step} of 3</span>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Department</label>
            <select
              value={booking.department}
              onChange={(e) => setBooking({ ...booking, department: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
            >
              <option value="">-- Choose Department --</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Specialist</label>
            <select
              disabled={!booking.department}
              value={booking.doctor}
              onChange={(e) => setBooking({ ...booking, doctor: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-white disabled:bg-gray-50"
            >
              <option value="">-- Choose Doctor --</option>
              <option value="Dr. Aman Gupta">Dr. Aman Gupta (Senior Consultant)</option>
              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson (Chief Specialist)</option>
            </select>
          </div>

          <button
            disabled={!booking.doctor}
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 mt-4"
          >
            Continue to Schedule
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Appointment Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={booking.date}
                onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Available Time Slots</label>
            <div className="grid grid-cols-3 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setBooking({ ...booking, slot })}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    booking.slot === slot
                      ? 'bg-blue-600 border-transparent text-white shadow-md shadow-blue-500/10'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={handlePrev} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all">
              Back
            </button>
            <button
              disabled={!booking.date || !booking.slot}
              onClick={handleNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Review Booking
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200/50">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Specialist</span>
              <span className="text-sm font-bold text-gray-900">{booking.doctor}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200/50">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Department</span>
              <span className="text-sm font-semibold text-gray-700">{booking.department}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200/50">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Date & Time</span>
              <span className="text-sm font-bold text-blue-600">{booking.date} • {booking.slot}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Reason for Visit (Optional)</label>
            <textarea
              placeholder="Briefly explain your symptoms or consult reason..."
              value={booking.reason}
              onChange={(e) => setBooking({ ...booking, reason: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-24 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button onClick={handlePrev} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all">
              Back
            </button>
            <button
              onClick={() => {
                alert("Appointment Booked Successfully!");
                setStep(1);
                setBooking({ department: "", doctor: "", date: "", slot: "", reason: "" });
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-emerald-500/10"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
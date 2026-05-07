import React, { useMemo } from 'react';
import { Clock, Calendar, User } from 'lucide-react';

const SlotPreview = ({
  doctor = "Dr. James Wilson",
  department = "Cardiology",
  startTime = "09:00",
  endTime = "15:00",
  breakStart = "13:00",
  breakEnd = "13:30",
  slotDuration = 15,
}) => {

  // Convert time string to minutes
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  // Convert minutes back to time string
  const toTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const slots = useMemo(() => {
    const start = toMinutes(startTime);
    const end = toMinutes(endTime);
    const breakS = toMinutes(breakStart);
    const breakE = toMinutes(breakEnd);

    let result = [];

    for (let t = start; t < end; t += slotDuration) {
      const slotEnd = t + slotDuration;

      // Skip break time
      if (
        (t >= breakS && t < breakE) ||
        (slotEnd > breakS && slotEnd <= breakE)
      ) {
        continue;
      }

      result.push({
        start: toTime(t),
        end: toTime(slotEnd),
        status: "Available",
      });
    }

    return result;
  }, [startTime, endTime, breakStart, breakEnd, slotDuration]);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Slot Preview
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          Auto-generated appointment slots based on schedule
        </p>
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>

            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {doctor}
              </p>

              <p className="text-xs text-gray-400">
                {department}
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">

            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {startTime} - {endTime}
            </span>

            <span className="flex items-center gap-1">
              Break: {breakStart} - {breakEnd}
            </span>

            <span className="flex items-center gap-1">
              Slot: {slotDuration} min
            </span>

          </div>

        </div>

      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">

        {slots.map((slot, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-3 bg-white hover:bg-blue-50 transition-all cursor-pointer"
          >

            <p className="text-xs font-semibold text-gray-900">
              {slot.start} - {slot.end}
            </p>

            <p className="text-[11px] text-emerald-600 mt-1 font-semibold">
              {slot.status}
            </p>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {slots.length === 0 && (
        <div className="text-center text-gray-400 text-sm mt-10">
          No slots available for this schedule
        </div>
      )}

    </div>
  );
};

export default SlotPreview;
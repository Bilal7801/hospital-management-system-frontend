import React from 'react';
import { Clock, Beaker, ArrowRight, Shield } from 'lucide-react';

const TrackPendingTests = () => {
  const pending = [
    {
      id: "REQ-9901",
      test: "Thyroid Stimulating Hormone (TSH)",
      orderedBy: "Dr. Sarah Johnson",
      dateOrdered: "15 Jul 2026",
      eta: "18 Jul 2026",
      step: 2, // 1: Scheduled, 2: Sample Collected, 3: Processing, 4: Ready
    }
  ];

  const steps = ["Scheduled", "Sample Collected", "Processing", "Pathologist Review"];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Ongoing & Pending Assessments</h3>
        <p className="text-sm text-gray-500 font-medium">Monitor active lab requests and sample evaluation stages in real-time.</p>
      </div>

      <div className="space-y-6">
        {pending.length === 0 ? (
          <div className="p-8 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400">
            No active pending laboratory tests or imaging requests scheduled.
          </div>
        ) : (
          pending.map((item) => (
            <div key={item.id} className="p-6 border border-teal-100 rounded-2xl bg-teal-50/10 space-y-6">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-500 text-white rounded-xl">
                    <Beaker className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">{item.test}</h4>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Ordered By: <span className="text-gray-700">{item.orderedBy}</span> • Date: {item.dateOrdered}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Estimated Delivery</span>
                  <span className="text-xs font-bold text-teal-700 flex items-center sm:justify-end gap-1 mt-0.5"><Clock className="w-3.5 h-3.5" /> {item.eta}</span>
                </div>
              </div>

              {/* Progress Steps UI */}
              <div className="pt-4 border-t border-teal-100/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {steps.map((stepName, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < item.step;
                    const isActive = stepNumber === item.step;

                    return (
                      <div key={index} className="relative space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted ? 'bg-emerald-500 text-white' : 
                            isActive ? 'bg-teal-600 text-white ring-4 ring-teal-500/10' : 
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {stepNumber}
                          </div>
                          <span className={`text-xs font-bold ${
                            isActive ? 'text-teal-700' : 
                            isCompleted ? 'text-gray-700' : 'text-gray-400'
                          }`}>{stepName}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrackPendingTests;
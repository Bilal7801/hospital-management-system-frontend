import React from 'react';
import { Users2, Hourglass, Gauge, ArrowUpRight } from 'lucide-react';

const QueueReport = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <Users2 className="w-4 h-4 text-blue-600" />
          Queue Throughput & Diagnostics Monitor
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">Track real-time waiting metrics and optimize floor intake patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Statistics Block */}
        <div className="border border-gray-200 rounded-xl p-5 space-y-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block border-b border-gray-50 pb-2">
            Average Wait Time Diagnostics
          </span>
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl">
              <Hourglass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-800 font-mono">24.5 Mins</p>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Average wait duration before practitioner handshake</p>
            </div>
          </div>

          <div className="h-px bg-gray-100 my-2"></div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-800 font-mono">14.2 Mins</p>
              <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Average triage processing speed per client record</p>
            </div>
          </div>
        </div>

        {/* Live Active bottlenecks warning matrix */}
        <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 flex flex-col justify-between text-xs">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Floor Utilization Warnings
            </span>
            <div className="bg-white border border-gray-100 p-3.5 rounded-xl space-y-1 shadow-inner">
              <div className="flex items-center justify-between text-rose-600 font-bold">
                <span>Orthopedics Unit Peak Alert</span>
                <span className="font-mono text-[10px]">High Load</span>
              </div>
              <p className="text-gray-500 font-medium leading-relaxed text-[11px]">
                Waiting queues have surpassed the 45-minute threshold due to extended processing on diagnostic x-ray imports. Consider rerouting overflow arrivals to open waiting sections.
              </p>
            </div>
          </div>

          <button className="w-full mt-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-[11px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm">
            Access Live Queue Monitor <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueueReport;
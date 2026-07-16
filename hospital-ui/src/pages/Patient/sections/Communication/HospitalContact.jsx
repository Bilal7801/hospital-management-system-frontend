import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const HospitalContact = () => {
  const departments = [
    { title: "General Inquiry Desk", phone: "011-2345-6000", email: "info@myhealth.com", hours: "24/7 Support Desk" },
    { title: "Billing & Accounts", phone: "011-2345-6120", email: "billing@myhealth.com", hours: "Mon-Fri: 9 AM - 5 PM" },
    { title: "Laboratory Intake Wing", phone: "011-2345-6290", email: "labreports@myhealth.com", hours: "Daily: 7 AM - 9 PM" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Hospital Contact & Services Directory</h3>
        <p className="text-sm text-gray-500 font-medium">Instant department directories, address directions, and hours of outpatient operation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Address and Emergency Map Card */}
        <div className="p-5 border border-green-100 bg-green-50/10 rounded-2xl space-y-4 md:col-span-1">
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-green-900 uppercase tracking-widest">Main Campus Address</h4>
            <p className="text-sm font-bold text-gray-900 leading-relaxed mt-1 flex items-start gap-2">
              <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              100 Outpatient Parkway,<br />Suite 450, Health City
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-green-900 uppercase tracking-widest">General Operational Hours</h4>
            <p className="text-sm text-gray-700 font-semibold mt-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-green-600" /> Mon - Sat: 8:00 AM - 8:00 PM
            </p>
          </div>

          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-800 transition-colors pt-2 border-t border-green-150/50 w-full"
          >
            Launch Navigation Map <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Specialized Department Contact Directories */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Department Directories</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {departments.map((dep, idx) => (
              <div key={idx} className="p-4 bg-white border border-gray-150 rounded-xl space-y-3 hover:border-green-200 transition-all">
                <div>
                  <span className="text-xs font-extrabold text-gray-900">{dep.title}</span>
                  <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">{dep.hours}</span>
                </div>

                <div className="space-y-1.5 border-t border-gray-50 pt-3 text-xs font-semibold text-gray-600">
                  <a href={`tel:${dep.phone}`} className="flex items-center gap-2 hover:text-green-700">
                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {dep.phone}
                  </a>
                  <a href={`mailto:${dep.email}`} className="flex items-center gap-2 hover:text-green-700 mt-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {dep.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalContact;
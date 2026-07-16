import React, { useState } from 'react';
import { Phone, User, Heart, Check, Edit2 } from 'lucide-react';

const EmergencyContacts = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contacts, setContacts] = useState({
    primaryName: "Sunita Sharma",
    primaryRelation: "Mother",
    primaryPhone: "+92 301 9876543",
    secondaryName: "Amit Sharma",
    secondaryRelation: "Brother",
    secondaryPhone: "+92 322 1122334",
  });

  const handleChange = (e) => {
    setContacts({ ...contacts, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Emergency Contacts</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            isEditing 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4" /> Save Contacts
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" /> Edit Contacts
            </>
          )}
        </button>
      </div>

      <div className="space-y-8">
        {/* Primary Contact */}
        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100/50">
          <h4 className="text-sm font-bold text-rose-600 uppercase tracking-widest mb-4">Primary Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="primaryName"
                  disabled={!isEditing}
                  value={contacts.primaryName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Relationship</label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="primaryRelation"
                  disabled={!isEditing}
                  value={contacts.primaryRelation}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="primaryPhone"
                  disabled={!isEditing}
                  value={contacts.primaryPhone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Contact */}
        <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-200/50">
          <h4 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-4">Secondary Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="secondaryName"
                  disabled={!isEditing}
                  value={contacts.secondaryName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Relationship</label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="secondaryRelation"
                  disabled={!isEditing}
                  value={contacts.secondaryRelation}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="secondaryPhone"
                  disabled={!isEditing}
                  value={contacts.secondaryPhone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
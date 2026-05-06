import React, { useState } from "react";
import { Camera, Save } from "lucide-react";

const Profile = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "Bilal",
    lastName: "Ahmed",
    email: "admin@hms.com",
    phone: "+92 300 1234567",
    hospitalName: "City Care Hospital",
    licenseNo: "HMS-2026-001",
    emergencyContact: "+92 311 9876543",
    website: "www.citycarehospital.com",
    address: "Hospital Main Road, Sialkot, Pakistan",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-slate-800">
            Profile Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage administrator and hospital information
          </p>
        </div>

        {/* Profile Photo */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-5">
          <h2 className="text-base font-semibold text-slate-700 mb-4">
            Profile Photo
          </h2>

          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-slate-300">BA</span>
              )}
            </div>

            <label className="cursor-pointer px-4 py-2 text-sm bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-all flex items-center gap-2">
              <Camera size={16} />
              Change Photo
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
          {/* Personal Info */}
          <div>
            <h2 className="text-base font-semibold text-slate-700 mb-3">
              Administrator Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <InputField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Hospital Info */}
          <div className="pt-5 border-t border-slate-100">
            <h2 className="text-base font-semibold text-slate-700 mb-3">
              Hospital Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Hospital Name"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleInputChange}
              />
              <InputField
                label="License Number"
                name="licenseNo"
                value={formData.licenseNo}
                onChange={handleInputChange}
              />
              <InputField
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
              />
              <InputField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="pt-5 border-t border-slate-100">
            <h2 className="text-base font-semibold text-slate-700 mb-3">
              Address
            </h2>

            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none resize-none"
            />
          </div>

          {/* Save Button */}
          <div className="pt-5 border-t border-slate-100 flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all active:scale-95">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-xs font-medium text-slate-600 mb-1.5">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
    />
  </div>
);

export default Profile;
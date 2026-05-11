import React, { useEffect, useState } from "react";
import { Camera, Save } from "lucide-react";
import api from "../../../api/axios";

const API_BASE = "https://localhost:7203";

const Profile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    userId: 0,
    name: "",
    email: "",
    phone: "",
    hospitalId: 0,
    hospitalName: "",
    licenseNo: "",
    emergencyContact: "",
    website: "",
    address: "",
    profileImageUrl: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${API_BASE}${url}`;
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/superadmin/profile");
      const data = res.data;

      setFormData({
        userId: data.userId || 0,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        hospitalId: data.hospitalId || 0,
        hospitalName: data.hospitalName || "",
        licenseNo: data.licenseNo || "",
        emergencyContact: data.emergencyContact || "",
        website: data.website || "",
        address: data.address || "",
        profileImageUrl: data.profileImageUrl || "",
      });

      setImagePreview(getImageUrl(data.profileImageUrl));
    } catch (err) {
      console.log("Error fetching profile:", err?.response?.data || err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async () => {
    if (!selectedFile) return;

    const uploadFormData = new FormData();
    uploadFormData.append("file", selectedFile, selectedFile.name);

    const res = await api.post("/superadmin/profile/upload-image", uploadFormData);

    const fullUrl = getImageUrl(res.data.imageUrl);

    setFormData((prev) => ({
      ...prev,
      profileImageUrl: res.data.imageUrl,
    }));

    setImagePreview(fullUrl);
    setSelectedFile(null);

    return res.data.imageUrl;
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        hospitalId: formData.hospitalId,
        hospitalName: formData.hospitalName,
        licenseNo: formData.licenseNo,
        emergencyContact: formData.emergencyContact,
        website: formData.website,
        address: formData.address,
      };

      const res = await api.put("/superadmin/profile", payload);
      console.log("Save response:", res.data);

      if (selectedFile) {
        try {
          await uploadImage();
        } catch (imgErr) {
          console.log("Image upload failed:", imgErr?.response?.data || imgErr);
        }
      }

      await fetchProfile();
      alert("Profile updated successfully");
    } catch (err) {
      console.log("Error saving profile:", err?.response?.data || err);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="max-w-4xl mx-auto space-y-5">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            Profile Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage admin and hospital details
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-sm font-medium text-slate-700 mb-3">
            Profile Photo
          </h2>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              ) : (
                <span className="text-xl font-semibold text-slate-400">
                  {getInitials(formData?.name)}
                </span>
              )}
            </div>

            <label className="cursor-pointer px-3 py-1.5 text-xs bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition flex items-center gap-2">
              <Camera size={14} />
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

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-6">
          <div>
            <h2 className="text-sm font-medium text-slate-700 mb-3">
              Admin Information
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
              <InputField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <InputField
                label="Email"
                name="email"
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

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-sm font-medium text-slate-700 mb-3">
              Hospital Information
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
              <InputField
                label="Hospital Name"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleInputChange}
              />
              <InputField
                label="License No"
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

          <div className="pt-4 border-t border-slate-100">
            <h2 className="text-sm font-medium text-slate-700 mb-2">
              Address
            </h2>

            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-[11px] font-medium text-slate-600 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
    />
  </div>
);

export default Profile;
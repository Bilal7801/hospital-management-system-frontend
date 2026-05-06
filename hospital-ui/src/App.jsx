import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import Overview from "./pages/SuperAdmin/sections/Overview";

import Doctors from "./pages/SuperAdmin/sections/Doctors/Doctors";
import AddDoctor from "./pages/SuperAdmin/sections/Doctors/AddDoctor";
import EditDoctor from "./pages/SuperAdmin/sections/Doctors/EditDoctor";
import ViewDoctor from "./pages/SuperAdmin/sections/Doctors/ViewDoctors";

import Departments from "./pages/SuperAdmin/sections/Departments/Departments";

import AddDepartment from "./pages/SuperAdmin/sections/Departments/AddDepartment";
import EditDepartment from "./pages/SuperAdmin/sections/Departments/EditDepartment";
import AssignDoctors from "./pages/SuperAdmin/sections/Departments/AssignDoctors";


import Profile from "./pages/SuperAdmin/sections/Profile";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import ReceptionistDashboard from "./pages/Receptionist/ReceptionistDashboard";
import PatientDashboard from "./pages/Patient/PatientDashboard";


const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* SuperAdmin Nested Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="SuperAdmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />

          {/* Doctor Pages  */}
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/add" element={<AddDoctor />} />  
          <Route path="doctors/edit/:id" element={<EditDoctor />} />
          <Route path="doctors/view/:id" element={<ViewDoctor />} />

<Route path="departments" element={<Departments />} />
<Route path="departments/add" element={<AddDepartment />} />
<Route path="departments/edit/:id" element={<EditDepartment />} />
<Route path="departments/assign/:id" element={<AssignDoctors />} />


          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Other roles */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRole="Doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionist"
          element={
            <ProtectedRoute allowedRole="Receptionist">
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRole="Patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
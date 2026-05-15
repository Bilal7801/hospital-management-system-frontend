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

import Receptionists from "./pages/SuperAdmin/sections/Receptionists/Receptionists";
import AddReceptionist from "./pages/SuperAdmin/sections/Receptionists/AddReceptionist";
import EditReceptionist from "./pages/SuperAdmin/sections/Receptionists/EditRecetionist";
import ViewReceptionist from "./pages/SuperAdmin/sections/Receptionists/ViewReceptionist";

import Patients from "./pages/SuperAdmin/sections/Patients/Patients";
import PatientAppointments from "./pages/SuperAdmin/sections/Patients/PatientAppointments";
import PatientHistory from "./pages/SuperAdmin/sections/Patients/PatientHistory";
import ViewPatient from "./pages/SuperAdmin/sections/Patients/ViewPatient";

import AddAppointment from "./pages/SuperAdmin/sections/Appointments/AddAppointments";
import Appointments from "./pages/SuperAdmin/sections/Appointments/Appointments";
import EditAppointment from "./pages/SuperAdmin/sections/Appointments/EditAppointments";
import ViewAppointment from "./pages/SuperAdmin/sections/Appointments/ViewAppointments";


import DoctorSchedules from "./pages/SuperAdmin/sections/ScheduleManagement/DoctorSchedules";
import ViewSchedule from "./pages/SuperAdmin/sections/ScheduleManagement/ViewSchedule";
import EditSchedule from "./pages/SuperAdmin/sections/ScheduleManagement/EditSchedule";
import SetSchedule from "./pages/SuperAdmin/sections/ScheduleManagement/SetSchedule";
import ManageLeaves from "./pages/SuperAdmin/sections/ScheduleManagement/ManageLeaves";
import SlotPreview from "./pages/SuperAdmin/sections/ScheduleManagement/SlotPreview";
import AddLeave from "./pages/SuperAdmin/sections/ScheduleManagement/AddLeave";

import BillingAndPayment from "./pages/SuperAdmin/sections/BillingAndPayment/BillingAndPayment";
import Payments from "./pages/SuperAdmin/sections/BillingAndPayment/Payments";
import RevenueReports from "./pages/SuperAdmin/sections/BillingAndPayment/RevenueReports";
import PaymentMethods from "./pages/SuperAdmin/sections/BillingAndPayment/PaymentMethods";
import Transactions from "./pages/SuperAdmin/sections/BillingAndPayment/Transactions";
import ViewPayment from "./pages/SuperAdmin/sections/BillingAndPayment/ViewPayment";

import ReportsAnalytics from "./pages/SuperAdmin/sections/ReportsAndAnalysis/ReportsAnalytics";
import NoticeAndAnnouncements from "./pages/SuperAdmin/sections/NoticeAndAnnouncements/NoticeAndAnnouncements";



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

          {/* Department Pages */}

<Route path="departments" element={<Departments />} />
<Route path="departments/add" element={<AddDepartment />} />
<Route path="departments/edit/:id" element={<EditDepartment />} />
<Route path="departments/assign/:id" element={<AssignDoctors />} />

          {/* Receptionist Pages */}

          <Route path="receptionists" element={<Receptionists />} />
<Route path="receptionists/add" element={<AddReceptionist />} />
<Route path="receptionists/edit/:id" element={<EditReceptionist />} />
<Route path="receptionists/view/:id" element={<ViewReceptionist />} />

          {/* Patient Pages */}

          <Route path="patients" element={<Patients />} />
<Route path="patients/appointments" element={<PatientAppointments />} />
<Route path="patients/history" element={<PatientHistory />} />
<Route path="patients/view/:id" element={<ViewPatient />} />

          {/* Appointment Pages */}

          <Route path="appointments" element={<Appointments />} />
<Route path="appointments/add" element={<AddAppointment />} />
<Route path="appointments/edit/:id" element={<EditAppointment />} />
<Route path="appointments/view/:id" element={<ViewAppointment />} />

          {/* Schedule Management */}
          <Route path="doctor-schedule" element={<DoctorSchedules />} />
          <Route path="doctor-schedule/view-schedule/:id" element={<ViewSchedule />} />
          <Route path="doctor-schedule/edit/:id" element={<EditSchedule />} />
          <Route path="doctor-schedule/manage-leave" element={<ManageLeaves />} />
          <Route path="doctor-schedule/set-schedule" element={<SetSchedule />} />
          <Route path="doctor-schedule/slot-preview/:id" element={<SlotPreview />} />
          <Route path="doctor-schedule/add-leave" element={<AddLeave />} />

          {/* Billing & Payment */}
          <Route path="billing" element={<BillingAndPayment />} />
          <Route path="billing/payments" element={<Payments />} />
          <Route path="billing/payments/:id" element={<ViewPayment />} />
          <Route path="billing/revenue" element={<RevenueReports />} />
          <Route path="billing/methods" element={<PaymentMethods />} />
          <Route path="billing/transactions" element={<Transactions />} />
          {/* Reports & Analytics */}
          <Route path="reports" element={<ReportsAnalytics />} />

          {/* Notice & Announcements */}
          <Route path="notices" element={<NoticeAndAnnouncements />} />

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
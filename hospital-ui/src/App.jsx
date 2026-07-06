import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth Components
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

// SuperAdmin Components
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

// Receptionist Components
import ReceptionistDashboard, { DashboardHome } from "./pages/Receptionist/ReceptionistDashboard";
import PatientManagement from "./pages/Receptionist/sections/patient-management/PatientManagement";
import PatientDetails from "./pages/Receptionist/sections/patient-management/PatientDetails";
import AppointmentManagement from "./pages/Receptionist/sections/appointment-management/AppointmentManagement";
import DoctorSlotManagement from "./pages/Receptionist/sections/doctor-slot-management/DoctorSlotManagement";
import QueueManagement from "./pages/Receptionist/sections/queue-management/QueueManagement";
import BillingPayment from "./pages/Receptionist/sections/billing-payment/BillingPayment";
import VisitRecords from "./pages/Receptionist/sections/visit-records/VisitRecords";
import CommunicationHub from "./pages/Receptionist/sections/communication/CommunicationHub";
import ReportsOverview from "./pages/Receptionist/sections/reports-overview/ReportsOverview";
import NotificationsHub from "./pages/Receptionist/sections/notifications/NotificationsHub";
import ProfileAndPreferences from "./pages/Receptionist/sections/profile/ProfileAndPreferences";
import UpdatePatient from "./pages/Receptionist/sections/patient-management/UpdatePatient";

// Doctor Components
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/sections/Appointment/DoctorAppointments";
import DoctorPatients from "./pages/Doctor/sections/Patients/DoctorPatients";
import DoctorOverview from "./pages/Doctor/sections/DoctorOverview";
import DoctorConsultations from "./pages/Doctor/sections/Consultations/DoctorConsultations";
import DoctorPrescriptions from "./pages/Doctor/sections/Prescriptions/DoctorPrescriptions";
import DoctorLabImaging from "./pages/Doctor/sections/LabImaging/DoctorLabImaging";
import FollowUpDashboard from './pages/Doctor/sections/follow-ups/FollowUpDashboard';
import MedicalRecordsDashboard from './pages/Doctor/sections/medical-records/MedicalRecordsDashboard';
import TasksDashboard from './pages/Doctor/sections/tasks-reminders/TasksDashboard';
import CommunicationDashboard from './pages/Doctor/sections/communication/CommunicationDashboard';
import ReportsDashboard from './pages/Doctor/sections/reports/ReportsDashboard';
import ProfileSettingsDashboard from './pages/Doctor/sections/settings/ProfileSettingsDashboard';
import ActivateAccount from "./pages/Doctor/ActivateAccount";

// Patient Dashboard
import PatientDashboard from "./pages/Patient/PatientDashboard";

// ====================== FIXED PROTECTED ROUTE ======================
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole) {
    const normalizedUserRole = userRole?.trim().toLowerCase();
    const normalizedAllowedRole = allowedRole.trim().toLowerCase();

    if (normalizedUserRole !== normalizedAllowedRole) {
      console.warn(`🔴 Role mismatch - Expected: ${allowedRole}, Got: ${userRole}`);
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/doctor/activate" element={<ActivateAccount />} />

        {/* SuperAdmin Routes */}
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
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/add" element={<AddDoctor />} />
          <Route path="doctors/edit/:id" element={<EditDoctor />} />
          <Route path="doctors/view/:id" element={<ViewDoctor />} />
          <Route path="departments" element={<Departments />} />
          <Route path="departments/add" element={<AddDepartment />} />
          <Route path="departments/edit/:id" element={<EditDepartment />} />
          <Route path="departments/assign/:id" element={<AssignDoctors />} />
          <Route path="receptionists" element={<Receptionists />} />
          <Route path="receptionists/add" element={<AddReceptionist />} />
          <Route path="receptionists/edit/:id" element={<EditReceptionist />} />
          <Route path="receptionists/view/:id" element={<ViewReceptionist />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/appointments" element={<PatientAppointments />} />
          <Route path="patients/history" element={<PatientHistory />} />
          <Route path="patients/view/:id" element={<ViewPatient />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/add" element={<AddAppointment />} />
          <Route path="appointments/edit/:id" element={<EditAppointment />} />
          <Route path="appointments/view/:id" element={<ViewAppointment />} />
          <Route path="doctor-schedule" element={<DoctorSchedules />} />
          <Route path="doctor-schedule/view/:id" element={<ViewSchedule />} />
          <Route path="doctor-schedule/edit/:id" element={<EditSchedule />} />
          <Route path="doctor-schedule/manage-leave" element={<ManageLeaves />} />
          <Route path="doctor-schedule/set-schedule" element={<SetSchedule />} />
          <Route path="doctor-schedule/slot-preview/:id" element={<SlotPreview />} />
          <Route path="doctor-schedule/add-leave" element={<AddLeave />} />
          <Route path="billing" element={<BillingAndPayment />} />
          <Route path="billing/payments" element={<Payments />} />
          <Route path="billing/payments/:id" element={<ViewPayment />} />
          <Route path="billing/revenue" element={<RevenueReports />} />
          <Route path="billing/methods" element={<PaymentMethods />} />
          <Route path="billing/transactions" element={<Transactions />} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="notices" element={<NoticeAndAnnouncements />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Receptionist Routes */}
        <Route
          path="/receptionist"
          element={
            <ProtectedRoute allowedRole="Receptionist">
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="patient-management" element={<PatientManagement />} />
          <Route path="patient/details/:patientId" element={<PatientDetails />} />
          <Route path="appointment-management" element={<AppointmentManagement />} />
          <Route path="doctor-slot-management" element={<DoctorSlotManagement />} />
          <Route path="queue-checkin" element={<QueueManagement />} />
          <Route path="billing-invoice" element={<BillingPayment />} />
          <Route path="visit-records" element={<VisitRecords />} />
          <Route path="communication" element={<CommunicationHub />} />
          <Route path="reports" element={<ReportsOverview />} />
          <Route path="notifications" element={<NotificationsHub />} />
          <Route path="profile" element={<ProfileAndPreferences />} />
          <Route path="patient/edit/:patientId" element={<UpdatePatient />} />
        </Route>

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRole="Doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="appointments" replace />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="overview" element={<DoctorOverview />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="consultations" element={<DoctorConsultations />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
          <Route path="lab-imaging" element={<DoctorLabImaging />} />
          <Route path="follow-ups" element={<FollowUpDashboard />} />
          <Route path="medical-records" element={<MedicalRecordsDashboard />} />
          <Route path="tasks" element={<TasksDashboard />} />
          <Route path="communication" element={<CommunicationDashboard />} />
          <Route path="reports" element={<ReportsDashboard />} />
          <Route path="settings" element={<ProfileSettingsDashboard />} />
        </Route>

        {/* Patient Routes */}
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
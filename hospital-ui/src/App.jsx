import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SuperAdminDashboard from './pages/SuperAdmin/SuperAdminDashboard';
import DoctorDashboard from './pages/Doctor/DoctorDashboard'; 
import ReceptionistDashboard from './pages/Receptionist/ReceptionistDashboard'; 
import PatientDashboard from './pages/Patient/PatientDashboard';

// Role-based Protection Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />; // Ya kisi 'Unauthorized' page par bhej dein
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRole="SuperAdmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          } 
        />
        
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
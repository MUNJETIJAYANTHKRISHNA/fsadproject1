import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import StudentDashboard from './pages/student/Dashboard';
import ScholarshipList from './pages/student/ScholarshipList';
import ScholarshipDetail from './pages/student/ScholarshipDetail';
import MyApplications from './pages/student/MyApplications';
import FinancialAid from './pages/student/FinancialAid';
import ApplyScholarship from './pages/student/ApplyScholarship';
import StudentProfile from './pages/student/StudentProfile';
import AdminDashboard from './pages/admin/Dashboard';
import ManageScholarships from './pages/admin/ManageScholarships';
import ReviewApplications from './pages/admin/ReviewApplications';
import ManageFinancialAid from './pages/admin/ManageFinancialAid';
import './App.css';

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/student/dashboard" />;
  return children;
}

export default function App() {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to={isAdmin ? '/admin/dashboard' : '/student/dashboard'} /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/student/dashboard" /> : <Register />} />
      <Route path="/student" element={<ProtectedRoute><Layout role="student" /></ProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="scholarships" element={<ScholarshipList />} />
        <Route path="scholarships/:id" element={<ScholarshipDetail />} />
        <Route path="scholarships/:id/apply" element={<ApplyScholarship />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="financial-aid" element={<FinancialAid />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>
      <Route path="/admin" element={<ProtectedRoute adminOnly><Layout role="admin" /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="scholarships" element={<ManageScholarships />} />
        <Route path="applications" element={<ReviewApplications />} />
        <Route path="financial-aid" element={<ManageFinancialAid />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

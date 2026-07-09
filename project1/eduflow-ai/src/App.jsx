import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import RootLayout from './layouts/RootLayout';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import StudentLogin from './pages/auth/StudentLogin';
import FacultyLogin from './pages/auth/FacultyLogin';
import ParentLogin from './pages/auth/ParentLogin';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import OTPVerification from './pages/auth/OTPVerification';
import ResetPassword from './pages/auth/ResetPassword';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import Students from './pages/dashboard/Students';
import Teachers from './pages/dashboard/Teachers';
import Parents from './pages/dashboard/Parents';
import Classes from './pages/dashboard/Classes';
import Timetable from './pages/dashboard/Timetable';
import Attendance from './pages/dashboard/Attendance';
import Assignments from './pages/dashboard/Assignments';
import Exams from './pages/dashboard/Exams';
import QuestionPaper from './pages/dashboard/QuestionPaper';
import Reports from './pages/dashboard/Reports';
import Notifications from './pages/dashboard/Notifications';
import Certificates from './pages/dashboard/Certificates';
import Settings from './pages/dashboard/Settings';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

const DashboardIndex = () => {
  const { user } = useAuth();
  
  if (!user) return <AdminDashboard />; // fallback
  
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'parent':
      return <ParentDashboard />;
    default:
      return <AdminDashboard />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/faculty" element={<FacultyLogin />} />
            <Route path="/login/parent" element={<ParentLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
            
          {/* Protected Dashboard Routes - Outside of RootLayout so no header/footer */}
          <Route path="/dashboard" element={<MainLayout />}>
              <Route index element={<DashboardIndex />} />
              <Route path="faculty" element={<FacultyDashboard />} />
              <Route path="student" element={<StudentDashboard />} />
              <Route path="parent" element={<ParentDashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="parents" element={<Parents />} />
              <Route path="classes" element={<Classes />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="exams" element={<Exams />} />
              <Route path="question-paper" element={<QuestionPaper />} />
              <Route path="reports" element={<Reports />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

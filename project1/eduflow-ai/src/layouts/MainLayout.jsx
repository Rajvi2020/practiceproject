import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, BookOpen, Calendar, 
  Settings, Bell, Search, Menu, X, GraduationCap,
  LogOut, UserCircle, ClipboardCheck, FileText, BrainCircuit, BarChart3,
  Award, Trophy, UsersRound
} from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const allNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'faculty', 'student', 'parent'] },
    { name: 'Students', href: '/dashboard/students', icon: Users, roles: ['admin'] },
    { name: 'Teachers', href: '/dashboard/teachers', icon: Award, roles: ['admin'] },
    { name: 'Parents', href: '/dashboard/parents', icon: UsersRound, roles: ['admin'] },
    { name: 'Classes', href: '/dashboard/classes', icon: BookOpen, roles: ['admin', 'faculty'] },
    { name: 'Timetable', href: '/dashboard/timetable', icon: Calendar, roles: ['admin', 'faculty', 'student', 'parent'] },
    { name: 'Attendance', href: '/dashboard/attendance', icon: ClipboardCheck, roles: ['admin', 'faculty', 'student', 'parent'] },
    { name: 'Assignments', href: '/dashboard/assignments', icon: FileText, roles: ['admin', 'faculty', 'student', 'parent'] },
    { name: 'Exams', href: '/dashboard/exams', icon: Trophy, roles: ['admin', 'faculty', 'student', 'parent'] },
    { name: 'Question Paper', href: '/dashboard/question-paper', icon: BrainCircuit, roles: ['admin', 'faculty'] },
    { name: 'Reports', href: '/dashboard/reports', icon: BarChart3, roles: ['admin', 'faculty', 'parent'] },
    { name: 'Certificates', href: '/dashboard/certificates', icon: Award, roles: ['admin', 'student'] },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell, roles: ['admin', 'faculty', 'student', 'parent'] },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['admin', 'faculty', 'student', 'parent'] },
  ];

  const userRole = user?.role || 'admin';
  const navigation = allNavigation.filter(item => item.roles.includes(userRole));

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-gray-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className={`font-bold text-xl text-gray-900 ${!isSidebarOpen && 'hidden md:hidden lg:block'}`}>
            EduFlow
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
              <span className={`ml-3 font-medium ${!isSidebarOpen && 'hidden lg:block'}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div layoutId="active-indicator" className="absolute left-0 w-1 h-8 bg-primary-600 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className={`ml-3 ${!isSidebarOpen && 'hidden lg:block'}`}>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      {/* Desktop Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="hidden md:block fixed inset-y-0 left-0 z-20 h-screen"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-gray-900/50 z-30 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-40 w-64 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        
        {/* Universal Mobile Menu Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-10 p-2 bg-white rounded-lg shadow-sm text-gray-500 border border-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-16 md:pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

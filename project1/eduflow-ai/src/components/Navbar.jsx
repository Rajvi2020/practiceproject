import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, GraduationCap, Building2, User, ChevronDown, Users, Briefcase, LogOut, LayoutDashboard } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                EduFlow AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.path.startsWith('/') && !link.path.includes('#') ? (
                      <Link
                        to={link.path}
                        className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.path}
                        className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-3 border-l pl-6 border-gray-200 relative">
                {user ? (
                  // Logged-in state: show user profile + go to dashboard
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-200 hover:bg-primary-100 transition-colors text-primary-700"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-semibold">{user.name || 'User'}</span>
                      <LayoutDashboard className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  // Not logged in: show login dropdown
                  <>
                    <button
                      onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                      className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isLoginDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-1"
                        >
                          <Link to="/login/student" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary-600 transition-colors">
                            <GraduationCap className="w-4 h-4" /> Student Login
                          </Link>
                          <Link to="/login/faculty" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary-600 transition-colors">
                            <Briefcase className="w-4 h-4" /> Faculty Login
                          </Link>
                          <Link to="/login/parent" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary-600 transition-colors">
                            <Users className="w-4 h-4" /> Parent Login
                          </Link>
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <Link to="/login" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary-600 transition-colors">
                              <Building2 className="w-4 h-4" /> Admin Login
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      className="text-lg font-semibold text-gray-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Login Portals</p>
                <Link to="/login/student" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth className="justify-start"><GraduationCap className="w-4 h-4 mr-2" /> Student Login</Button>
                </Link>
                <Link to="/login/faculty" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth className="justify-start"><Briefcase className="w-4 h-4 mr-2" /> Faculty Login</Button>
                </Link>
                <Link to="/login/parent" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth className="justify-start"><Users className="w-4 h-4 mr-2" /> Parent Login</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

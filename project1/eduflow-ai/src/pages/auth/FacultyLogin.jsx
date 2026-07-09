import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Briefcase, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

const FacultyLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login({ email: formData.email, password: formData.password, role: 'faculty' });
      navigate('/dashboard/faculty');
    } catch (err) {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse bg-gray-50 font-sans">
      
      {/* Right side branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-800 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">EduFlow AI</span>
          </Link>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Faculty Workspace
          </h1>
          <p className="text-emerald-100 text-lg max-w-md leading-relaxed mb-8">
            Manage classes, automate grading, and generate resources instantly with our AI tools.
          </p>
        </div>

        <div className="relative z-10">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Supercharge Productivity</h3>
              <p className="text-sm text-emerald-50">Generate question papers and lesson plans in seconds instead of hours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Left side form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Faculty Login</h2>
            <p className="text-gray-500">Sign in to your educator account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Institutional Email"
              type="email"
              placeholder="faculty@school.edu"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" fullWidth disabled={isLoading} className="py-4 text-base bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg shadow-emerald-500/30">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Access Workspace <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 relative z-10">
            Don't have an account?{' '}
            <Link to="/register?role=faculty" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyLogin;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = () => {
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
      await login({ email: formData.email, password: formData.password, role: 'admin' });
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please check your username and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-primary-500/10 to-indigo-500/10 transform skew-y-6 origin-top-left" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white shadow-xl shadow-primary-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-2xl shadow-gray-200/50">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username or Email"
              type="text"
              placeholder="admin"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="mt-6 py-3.5 text-base"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              Create one now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

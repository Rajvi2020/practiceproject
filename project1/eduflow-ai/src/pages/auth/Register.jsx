import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, GraduationCap } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'student';
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: initialRole });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const nameParts = formData.name.trim().split(' ');
      const response = await fetch('http://localhost:8000/api/accounts/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
          first_name: nameParts[0] || '',
          last_name: nameParts.slice(1).join(' ') || ''
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-indigo-500/10 to-primary-500/10 transform -skew-y-6 origin-top-right" />
        <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-2xl shadow-gray-200/50">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500">Join EduFlow AI today</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm text-center">Account created! Redirecting to login...</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'student' })}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  formData.role === 'student'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'faculty' })}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  formData.role === 'faculty'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'parent' })}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                  formData.role === 'parent'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Parent
              </button>
            </div>

            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={User}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="john@eduflow.ai"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="mt-6 py-3.5 text-base"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Register <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

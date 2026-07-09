import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    // Simulate reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-2xl shadow-gray-200/50">
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Password</h2>
                <p className="text-gray-500">Your new password must be different from previous used passwords.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                    <>Reset Password <ArrowRight className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
              <p className="text-gray-500 mb-6">Your password has been successfully reset. Redirecting you to login...</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

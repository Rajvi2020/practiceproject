import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-2xl shadow-gray-200/50">
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
          </Link>

          {!isSent ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-500">Enter your email address and we'll send you a link to reset your password.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="admin@eduflow.ai"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    <>Send Reset Link <Send className="w-4 h-4 ml-2" /></>
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
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-500 mb-6">We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span></p>
              <Button variant="outline" fullWidth onClick={() => setIsSent(false)}>
                Try another email
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

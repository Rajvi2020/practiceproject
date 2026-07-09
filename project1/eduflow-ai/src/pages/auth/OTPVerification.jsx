import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';
import Button from '../../components/Button';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if there's a value
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some(digit => digit === '')) return;
    
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      navigate('/reset-password');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-2xl shadow-gray-200/50 text-center">
          <Link to="/forgot-password" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors absolute top-8 left-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>

          <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-6">
            <KeyRound className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
          <p className="text-gray-500 mb-8">We've sent a 6-digit code to your email. Enter it below to verify.</p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                />
              ))}
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading || otp.some(digit => digit === '')}
              className="py-3.5 text-base"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Verify Code <CheckCircle2 className="w-5 h-5 ml-2" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 text-sm text-gray-500">
            Didn't receive the code?{' '}
            <button className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
              Resend Code
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-lg"
      >
        <div className="mb-8 relative">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-indigo-600 drop-shadow-sm">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-50">
            <h1 className="text-9xl font-extrabold text-white">404</h1>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 text-lg">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" className="px-8 py-3">
              <Home className="w-5 h-5 mr-2" /> Back to Home
            </Button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

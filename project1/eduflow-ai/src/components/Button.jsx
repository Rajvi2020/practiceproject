import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  fullWidth = false,
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-lg shadow-primary-500/30",
    secondary: "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 shadow-sm",
    outline: "bg-transparent text-primary-600 border-2 border-primary-500 hover:bg-primary-50",
    glass: "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </motion.button>
  );
};

export default Button;

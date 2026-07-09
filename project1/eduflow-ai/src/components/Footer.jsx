import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MapPin, Phone, Globe, MessageCircle, Share2, Hash } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 font-sans mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">EduFlow AI</span>
            </Link>
            <p className="text-sm text-gray-400">
              Transforming academic institutions with AI-driven management and automation.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/solutions" className="hover:text-primary-400 transition-colors">Solutions</Link></li>
              <li><Link to="/features" className="hover:text-primary-400 transition-colors">Features</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400"><MapPin className="w-4 h-4" /> 123 Education Hub, Tech City</li>
              <li className="flex items-center gap-2 text-gray-400"><Phone className="w-4 h-4" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2 text-gray-400"><Mail className="w-4 h-4" /> support@eduflow.ai</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Globe className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Share2 className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Hash className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} EduFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

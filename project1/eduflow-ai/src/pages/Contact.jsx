import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, HelpCircle } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-primary-900 pt-32 pb-32 px-6 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-primary-100 max-w-2xl mx-auto"
        >
          We're here to help you transform your institution. Reach out to our team today.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl"><MapPin className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Institute Address</h3>
                <p className="text-gray-500 mt-1">123 Education Hub, Innovation Park<br/>Tech City, TX 75001</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl"><Phone className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Phone</h3>
                <p className="text-gray-500 mt-1">+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl"><Mail className="w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                <p className="text-gray-500 mt-1">support@eduflow.ai<br/>sales@eduflow.ai</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <Input type="text" placeholder="John" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <Input type="text" placeholder="Doe" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input type="email" placeholder="john@university.edu" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow outline-none resize-none"
                  rows="5"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              <Button variant="primary" className="w-full py-4 text-lg">
                <Send className="w-5 h-5 mr-2" /> Send Message
              </Button>
            </form>
          </motion.div>
        </div>

        {/* FAQ & Map */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <HelpCircle className="text-primary-600" /> FAQ & Support
            </h2>
            <div className="space-y-6">
              {[
                { q: "How long does deployment take?", a: "Most institutions are fully deployed within 2 weeks." },
                { q: "Do you offer custom integrations?", a: "Yes, our API seamlessly connects with legacy systems." },
                { q: "What are your support hours?", a: "We offer 24/7 priority support for premium tier clients." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h4>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Clock className="text-primary-600" /> Working Hours
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <ul className="space-y-4 text-gray-600">
                <li className="flex justify-between border-b pb-2"><span>Monday - Friday</span> <span className="font-medium text-gray-900">09:00 AM - 06:00 PM</span></li>
                <li className="flex justify-between border-b pb-2"><span>Saturday</span> <span className="font-medium text-gray-900">10:00 AM - 02:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="font-medium text-red-500">Closed</span></li>
              </ul>
            </div>
            
            {/* Google Map Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                 <MapPin className="w-12 h-12 text-gray-300 mb-2" />
                 <span className="absolute mt-16 font-medium text-gray-400 text-sm">Interactive Map Unavailable in Demo</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Users, ChartBar, BrainCircuit, Shield, Clock, Star, Check, GraduationCap, Mail, Phone, MapPin, CheckCircle2, FileText, BarChart3, Bell } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-[1px] rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 hover:from-primary-400 hover:via-indigo-400 hover:to-purple-400 transition-all group overflow-hidden shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-primary-500/20"
  >
    <div className="bg-white p-6 rounded-2xl h-full flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm flex-1">{description}</p>
    </div>
  </motion.div>
);

const StatCard = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="text-center"
  >
    <h3 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">{value}</h3>
    <p className="text-gray-400 mt-2 font-medium">{label}</p>
  </motion.div>
);

const TestimonialCard = ({ name, role, quote, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/30 flex flex-col h-full"
  >
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
    </div>
    <p className="text-gray-700 leading-relaxed flex-1 italic">"{quote}"</p>
    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden font-sans">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-60">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/30 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-gray-700">The Future of Education Management</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight"
          >
            Manage your institution with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">AI Intelligence</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Empower educators, engage students, and streamline administrative workflows all from one beautiful, intuitive platform powered by next-generation AI.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button variant="primary" className="px-8 py-4 text-lg w-full sm:w-auto">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" className="px-8 py-4 text-lg w-full sm:w-auto">
                Book a Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-indigo-900/50" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="500+" label="Institutions" delay={0} />
            <StatCard value="50K+" label="Active Students" delay={0.1} />
            <StatCard value="99.9%" label="Uptime" delay={0.2} />
            <StatCard value="4.9/5" label="User Rating" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Everything you need to succeed</motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Our comprehensive suite of tools ensures your institution operates at peak efficiency.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={CheckCircle2} title="AI Attendance Analytics" description="Automatically track attendance trends, predict dropouts, and send alerts to parents in real-time." delay={0.1} />
            <FeatureCard icon={FileText} title="Automated Assignment Evaluation" description="Use AI to auto-grade assignments, check for plagiarism, and provide instant feedback to students." delay={0.15} />
            <FeatureCard icon={BrainCircuit} title="AI Question Paper Generator" description="Generate tailored question papers instantly from any topic, difficulty level, and subject area." delay={0.2} />
            <FeatureCard icon={BarChart3} title="Student Performance Dashboard" description="360-degree view of student academics, identifying weak subjects and providing AI learning suggestions." delay={0.25} />
            <FeatureCard icon={Clock} title="Timetable Optimization" description="Intelligent timetable generation that avoids conflicts and optimizes resource utilization across campus." delay={0.3} />
            <FeatureCard icon={BookOpen} title="Academic Report Generator" description="Generate beautiful, comprehensive academic reports and transcripts with a single click." delay={0.35} />
            <FeatureCard icon={Users} title="Parent Communication Module" description="Seamless messaging channels ensuring parents are always updated on student progress and fee reminders." delay={0.4} />
            <FeatureCard icon={Shield} title="Accreditation Documentation" description="NAAC/NBA Documentation Assistant to automate report generation for regulatory compliance." delay={0.45} />
            <FeatureCard icon={ChartBar} title="Faculty Productivity Dashboard" description="Track faculty workload, research activities, and mentoring records in one unified dashboard." delay={0.5} />
            <FeatureCard icon={Bell} title="Smart Notification System" description="Automated reminders for meetings, assignments, exams, and attendance shortfalls." delay={0.55} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Loved by Educators Worldwide</motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">See what our community says about transforming their institutions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard name="Sarah Mitchell" role="Principal, Lincoln Academy" quote="EduFlow AI has completely transformed how we manage our school. The AI question paper generator alone saves our teachers 10+ hours per week." delay={0.1} />
            <TestimonialCard name="James Chen" role="Dean, Pacific University" quote="The analytics dashboard gives us insights we never had before. We can now predict at-risk students and intervene early. Absolutely game-changing." delay={0.2} />
            <TestimonialCard name="Priya Sharma" role="Head Teacher, Delhi Public School" quote="Parent communication has never been easier. The integrated messaging system and automated progress reports have increased parent satisfaction by 40%." delay={0.3} />
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 to-indigo-900/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to transform your institution?
          </motion.h2>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">Join 500+ schools and universities already using EduFlow AI to deliver better educational outcomes.</p>
          <Link to="/register">
            <Button variant="primary" className="px-10 py-4 text-lg shadow-2xl shadow-primary-500/40">
              Start Your Free 14-Day Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-gray-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl">EduFlow AI</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">Next-generation AI-powered education management for modern institutions.</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@eduflow.ai</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> San Francisco, CA</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2026 EduFlow AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

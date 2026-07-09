import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, BrainCircuit, FileText, CheckCircle2, Clock, BarChart3, 
  MessageSquare, ShieldCheck, Zap, Bell, ArrowRight, LayoutDashboard, 
  Download, Users, BookOpen, Fingerprint
} from 'lucide-react';
import Button from '../components/Button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});

const features = [
  { 
    category: "AI & Automation",
    items: [
      { icon: BrainCircuit, title: 'AI Question Paper Generator', description: 'Create balanced, syllabus-aligned question papers in seconds based on Bloom\'s Taxonomy.', color: 'text-purple-600 bg-purple-50 group-hover:bg-purple-600' },
      { icon: FileText, title: 'Automated Evaluation', description: 'Grade assignments instantly using advanced LLMs that provide line-by-line feedback and rubric scoring.', color: 'text-blue-600 bg-blue-50 group-hover:bg-blue-600' },
      { icon: Zap, title: 'Timetable Optimization', description: 'Smart collision-free scheduling algorithms that respect faculty availability and room constraints.', color: 'text-amber-600 bg-amber-50 group-hover:bg-amber-600' },
    ]
  },
  {
    category: "Analytics & Tracking",
    items: [
      { icon: CheckCircle2, title: 'Smart Attendance', description: 'Track and analyze student attendance patterns with intelligent anomaly detection and auto-alerts.', color: 'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600' },
      { icon: BarChart3, title: 'Performance Dashboard', description: '360-degree holistic view of student academics, participation, and extracurricular activities.', color: 'text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600' },
      { icon: Download, title: 'Academic Reports', description: 'One-click generation of comprehensive term-end reports, transcripts, and custom analytics.', color: 'text-rose-600 bg-rose-50 group-hover:bg-rose-600' },
    ]
  },
  {
    category: "Communication & Compliance",
    items: [
      { icon: MessageSquare, title: 'Parent Portal', description: 'Automated triggers for low attendance or poor performance to keep parents perfectly in the loop.', color: 'text-pink-600 bg-pink-50 group-hover:bg-pink-600' },
      { icon: ShieldCheck, title: 'Accreditation Ready', description: 'Automatically compile required reports and mapping for NBA, NAAC, or other accreditations.', color: 'text-teal-600 bg-teal-50 group-hover:bg-teal-600' },
      { icon: Bell, title: 'Smart Notifications', description: 'Real-time contextual alerts delivered to the right stakeholder via SMS, Email, or Push.', color: 'text-orange-600 bg-orange-50 group-hover:bg-orange-600' },
    ]
  }
];

const Features = () => {
  return (
    <div className="font-sans overflow-hidden bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-primary-900 to-slate-900 text-white pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" /> Everything You Need
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Powerful Features for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-indigo-300">Modern Institutions</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed mb-10">
            A comprehensive suite of AI-driven tools designed to eliminate administrative friction and amplify academic success.
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex gap-4 justify-center">
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-primary-900 font-bold rounded-2xl hover:bg-primary-50 transition-colors shadow-xl">
                Request Demo
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Grids by Category */}
      <section className="py-24 px-6 relative z-10 -mt-16">
        <div className="max-w-7xl mx-auto space-y-24">
          {features.map((category, catIdx) => (
            <div key={catIdx}>
              <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900">{category.category}</h2>
                <div className="h-px bg-gray-200 flex-1 mt-2"></div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    {...fadeUp(idx * 0.1)}
                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:text-white transition-colors duration-300`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                    <Link to="/solutions" className="inline-flex items-center text-sm font-bold text-gray-400 group-hover:text-primary-600 transition-colors">
                      Learn how it works <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Infrastructure Mini-section */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp(0)}>
            <Fingerprint className="w-16 h-16 text-primary-500 mx-auto mb-6" />
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Enterprise-Grade Security</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
              Your institution's data is sensitive. We protect it with state-of-the-art encryption, strict access controls, and regular compliance audits.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['End-to-End Encryption', 'Role-Based Access', 'Daily Backups', 'GDPR Compliant'].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 font-semibold text-gray-800">
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Features;

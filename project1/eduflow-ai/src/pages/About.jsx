import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, Target, Award, GraduationCap, BrainCircuit, 
  Shield, Zap, CheckCircle2, ArrowRight, Star, Globe, TrendingUp,
  BookOpen, MessageSquare, BarChart3
} from 'lucide-react';
import Button from '../components/Button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});

const About = () => {
  const teamMembers = [
    { initials: 'AR', name: 'Dr. Aryan Rao', role: 'Chief Executive Officer', color: 'bg-blue-500' },
    { initials: 'PS', name: 'Priya Sharma', role: 'Chief Technology Officer', color: 'bg-emerald-500' },
    { initials: 'MK', name: 'Michael Khan', role: 'Head of AI Research', color: 'bg-purple-500' },
    { initials: 'NG', name: 'Neha Gupta', role: 'Lead Product Designer', color: 'bg-rose-500' },
  ];

  const techStack = [
    { name: 'Django REST Framework', icon: Shield, color: 'text-green-600 bg-green-50' },
    { name: 'React + Vite', icon: Zap, color: 'text-blue-600 bg-blue-50' },
    { name: 'PostgreSQL', icon: Globe, color: 'text-sky-600 bg-sky-50' },
    { name: 'OpenAI GPT-4o', icon: BrainCircuit, color: 'text-purple-600 bg-purple-50' },
    { name: 'JWT Auth', icon: Shield, color: 'text-orange-600 bg-orange-50' },
    { name: 'Framer Motion', icon: TrendingUp, color: 'text-pink-600 bg-pink-50' },
  ];

  const benefits = [
    {
      role: 'Faculty',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      items: [
        'Auto-generate question papers in minutes',
        'AI-powered assignment evaluation',
        'Smart attendance tracking',
        'Automated accreditation documentation',
      ]
    },
    {
      role: 'Students',
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600',
      items: [
        'Personalized AI learning insights',
        'Real-time performance dashboard',
        'Assignment submission & feedback',
        'Certificate generation & download',
      ]
    },
    {
      role: 'Parents',
      icon: Users,
      color: 'from-fuchsia-500 to-purple-600',
      items: [
        'Live attendance notifications',
        'Assignment status & grades',
        'Direct faculty messaging',
        'Progress reports & analytics',
      ]
    },
  ];

  return (
    <div className="font-sans overflow-hidden">
      
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-indigo-900 text-white pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-medium mb-8">
            <Star className="w-4 h-4 text-amber-400" /> Founded 2026 · Transforming Education
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">EduFlow AI</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are on a mission to free educators from administrative burden using the power of Artificial Intelligence — so they can focus entirely on what they love: teaching.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp(0)}>
            <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To make world-class educational management accessible to every institution — regardless of size or budget — by building AI-first tools that save time, reduce errors, and elevate academic outcomes.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6">
              <Globe className="w-7 h-7" />
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A world where every teacher has an AI co-pilot, every student gets a personalized learning journey, and every institution operates at peak efficiency — powered by transparent, ethical AI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why EduFlow */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why EduFlow AI?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">We solve the real problems that institutional leaders face every day.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Saves 40+ hours/week', desc: 'Automate attendance, grading, reports, and documentation.', color: 'text-amber-600 bg-amber-50' },
              { icon: BrainCircuit, title: 'AI-Powered Insights', desc: 'Predict at-risk students, recommend interventions, generate analytics.', color: 'text-purple-600 bg-purple-50' },
              { icon: Shield, title: 'Enterprise-Grade Security', desc: 'JWT auth, role-based access control, and encrypted storage.', color: 'text-emerald-600 bg-emerald-50' },
              { icon: Users, title: 'Full Stakeholder Loop', desc: 'Faculty, students, and parents — all connected in one platform.', color: 'text-blue-600 bg-blue-50' },
              { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Live dashboards with performance trends and attendance tracking.', color: 'text-rose-600 bg-rose-50' },
              { icon: Award, title: 'Accreditation Ready', desc: 'Generate NBA/NAAC compliance documentation automatically.', color: 'text-indigo-600 bg-indigo-50' },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits by Role */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Built for Everyone</h2>
            <p className="text-gray-600 text-lg">Purpose-built features for every stakeholder in the academic ecosystem.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, idx) => (
              <motion.div key={idx} {...fadeUp(idx * 0.1)} className="rounded-3xl overflow-hidden shadow-xl">
                <div className={`bg-gradient-to-br ${b.color} p-8 text-white`}>
                  <b.icon className="w-10 h-10 mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold">{b.role} Benefits</h3>
                </div>
                <div className="bg-white p-8 space-y-4">
                  {b.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">Passionate experts united by the goal of better education.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div key={idx} {...fadeUp(idx * 0.1)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-gray-600 text-lg">Built on proven, scalable, modern technologies.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, idx) => (
              <motion.div key={idx} {...fadeUp(idx * 0.05)} className={`p-4 rounded-2xl ${tech.color} flex flex-col items-center gap-3 text-center`}>
                <tech.icon className="w-7 h-7" />
                <span className="text-xs font-bold leading-tight">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary-600 to-indigo-700 text-white">
        <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Ready to Transform Your Institution?</h2>
          <p className="text-primary-100 text-lg mb-10">Join hundreds of institutions already running on EduFlow AI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:bg-primary-50 transition-colors shadow-xl flex items-center gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white/10 backdrop-blur border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Contact Sales
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;

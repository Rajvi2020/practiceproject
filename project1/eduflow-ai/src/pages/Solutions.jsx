import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, CheckCircle2, FileText, BrainCircuit, BarChart3,
  MessageSquare, TrendingUp, Zap, ShieldCheck, Bell, ArrowRight,
  GraduationCap, Clock, Award, CalendarCheck, Building2
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});

const solutions = [
  {
    icon: CheckCircle2,
    title: 'Automated Attendance System',
    description:
      'Stop wasting 15 minutes every lecture on manual roll calls. EduFlow AI enables QR-based, biometric, or one-click digital attendance that automatically generates reports, tracks trends, and sends alerts to parents when attendance falls below threshold.',
    stats: [{ label: 'Time Saved', value: '15 min/class' }, { label: 'Accuracy', value: '99.8%' }, { label: 'Parent Alerts', value: 'Instant' }],
    color: 'from-emerald-500 to-teal-500',
    lightColor: 'bg-emerald-50 text-emerald-700',
    reverse: false,
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Assignment Evaluation',
    description:
      'Upload student submissions and let our GPT-4o engine evaluate them against rubrics in seconds. Generates detailed feedback, originality scores, marks, and flags potential plagiarism — all with one click. Faculty can review and approve with ease.',
    stats: [{ label: 'Grading Speed', value: '10x Faster' }, { label: 'Plagiarism Detection', value: '97%' }, { label: 'Feedback Quality', value: 'A+' }],
    color: 'from-purple-500 to-indigo-600',
    lightColor: 'bg-purple-50 text-purple-700',
    reverse: true,
  },
  {
    icon: FileText,
    title: 'Question Paper Generator',
    description:
      "Input your subject, difficulty level, topics, and marks distribution — and get a fully formatted, print-ready question paper in 60 seconds. Our AI ensures Bloom's Taxonomy compliance and automatic previous-year pattern analysis.",
    stats: [{ label: 'Generation Time', value: '< 60 sec' }, { label: "Bloom's Levels", value: 'All 6' }, { label: 'Question Bank', value: '50,000+' }],
    color: 'from-amber-500 to-orange-500',
    lightColor: 'bg-amber-50 text-amber-700',
    reverse: false,
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics & Reports',
    description:
      'Dynamic dashboards with real-time charts showing subject-wise performance, student comparison, faculty productivity, and department-level analytics. Export attendance reports, progress cards, and accreditation-ready documents as PDF or CSV with one click.',
    stats: [{ label: 'Report Types', value: '12+' }, { label: 'Export Formats', value: 'PDF & CSV' }, { label: 'Refresh Rate', value: 'Real-time' }],
    color: 'from-blue-500 to-cyan-500',
    lightColor: 'bg-blue-50 text-blue-700',
    reverse: true,
  },
  {
    icon: MessageSquare,
    title: 'Parent Communication Portal',
    description:
      'Keep parents informed and engaged. Send automatic SMS/email alerts for attendance, grades, exam schedules, and fee reminders. Parents get a dedicated portal to view their child\'s progress, message faculty, and download reports anytime.',
    stats: [{ label: 'Alert Channels', value: '3 Types' }, { label: 'Response Rate', value: '+65%' }, { label: 'Portal Access', value: '24/7' }],
    color: 'from-fuchsia-500 to-pink-500',
    lightColor: 'bg-fuchsia-50 text-fuchsia-700',
    reverse: false,
  },
  {
    icon: ShieldCheck,
    title: 'Accreditation & Compliance',
    description:
      'Generate NAAC, NBA, and NIRF documentation automatically from live academic data. Course outcomes, program outcomes, CO-PO mapping, and self-study reports are compiled in the required format — saving weeks of manual effort every accreditation cycle.',
    stats: [{ label: 'Frameworks', value: 'NAAC, NBA' }, { label: 'Doc Generation', value: 'Automated' }, { label: 'Time Saved', value: '3 weeks' }],
    color: 'from-rose-500 to-red-600',
    lightColor: 'bg-rose-50 text-rose-700',
    reverse: true,
  },
];

const Solutions = () => {
  return (
    <div className="font-sans overflow-hidden">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-primary-900 text-white pt-40 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-semibold mb-8">
            <Zap className="w-4 h-4 text-amber-400" /> AI-Powered Solutions
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Solutions Built for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400"> Modern Education</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Every solution is designed around a real pain point — automating the repetitive, enhancing the important, and empowering every stakeholder.
          </motion.p>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-8">
          {solutions.map((sol, idx) => (
            <motion.div
              key={idx}
              {...fadeUp(0.1)}
              className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col ${sol.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Icon / Visual Side */}
              <div className={`lg:w-2/5 bg-gradient-to-br ${sol.color} p-10 flex flex-col justify-between min-h-[280px]`}>
                <div>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <sol.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{sol.title}</h2>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-8">
                  {sol.stats.map((s, i) => (
                    <div key={i} className="bg-white/15 backdrop-blur rounded-xl p-3 text-center">
                      <p className="text-white font-extrabold text-lg">{s.value}</p>
                      <p className="text-white/70 text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-3/5 p-10 flex flex-col justify-center">
                <div className={`inline-flex w-max items-center gap-2 px-3 py-1.5 ${sol.lightColor} rounded-full text-sm font-semibold mb-4`}>
                  <sol.icon className="w-4 h-4" /> Solution #{idx + 1}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{sol.description}</p>
                <div className="flex gap-3">
                  <Link to="/features">
                    <button className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${sol.color} text-white text-sm font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity`}>
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/contact">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
                      Book Demo
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4">Impact at Scale</h2>
            <p className="text-primary-100 text-lg">Trusted by institutions across the country.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Institutions', icon: Building2 },
              { value: '2M+', label: 'Students', icon: GraduationCap },
              { value: '40hrs', label: 'Saved per Week', icon: Clock },
              { value: '99.8%', label: 'Uptime', icon: TrendingUp },
            ].map((stat, idx) => (
              <motion.div key={idx} {...fadeUp(idx * 0.1)} className="text-center">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-4xl font-extrabold">{stat.value}</p>
                <p className="text-primary-200 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gray-50">
        <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Find the Right Solution for Your Institution</h2>
          <p className="text-gray-600 text-lg mb-10">Our team will help you choose and configure the right modules for your specific needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-primary-500/30 transition-all flex items-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                <CalendarCheck className="w-5 h-5" /> Schedule a Demo
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Solutions;

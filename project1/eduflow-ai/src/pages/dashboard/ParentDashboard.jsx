import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Bell, CheckCircle2, TrendingUp, MessageSquare, AlertCircle, 
  CreditCard, Calendar, BarChart2, ShieldCheck, Mail, Clock
} from 'lucide-react';
import Button from '../../components/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar } from 'recharts';

// Removed dummy parent data

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();  
  const [stats, setStats] = useState({
    attendance: '96%',
    avgScore: '89%',
    pendingWork: '2',
    feeStatus: 'Paid'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const response = await fetch('http://localhost:8000/api/dashboard/stats/', { headers });
        if (response.ok) {
          const data = await response.json();
          setStats(prev => ({
            ...prev,
            attendance: data.avgAttendance,
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch parent stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parent Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome, {user?.name || 'Parent'}. Monitor your child's academic journey.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard/notifications')}><Calendar className="w-4 h-4 mr-2" /> Book Meeting</Button>
          <Button variant="primary" onClick={() => alert('Fee payment portal coming soon!')}><CreditCard className="w-4 h-4 mr-2" /> Pay Fees</Button>
        </div>
      </div>

      {/* Student Profile Selector */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xl relative">
            JD
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">John Doe</h3>
            <p className="text-sm text-gray-500">Grade 10 • Section A • Student ID: 202610A</p>
          </div>
        </div>
        <Button variant="outline" className="text-sm py-2">Switch Child</Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Attendance', value: stats.attendance, alert: 'Excellent', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { title: 'Average Score', value: stats.avgScore, alert: 'Improving', icon: BarChart2, color: 'text-blue-600 bg-blue-50' },
          { title: 'Pending Work', value: stats.pendingWork, alert: 'Due this week', icon: AlertCircle, color: 'text-orange-600 bg-orange-50' },
          { title: 'Fee Status', value: stats.feeStatus, alert: 'Next due: Oct', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div className={`p-2 w-max rounded-xl mb-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-500 mt-1">{stat.alert}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Progress Chart */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Academic Progress</h2>
              <Button variant="outline" className="text-xs py-1.5 h-8" onClick={() => {}}>Download Full Report</Button>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[]} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[0, 100]} />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Child Timetable & Upcoming Exams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-500" /> Today's Timetable
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <p className="font-bold text-sm text-gray-900">Mathematics</p>
                    <p className="text-xs text-gray-500">09:00 AM - 10:30 AM</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg">Attended</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <p className="font-bold text-sm text-gray-900">Physics Lab</p>
                    <p className="text-xs text-gray-500">11:00 AM - 12:30 PM</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">In Progress</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" /> Exam Results & Alerts
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl border border-gray-100">
                  <div>
                    <p className="font-bold text-sm text-gray-900">Mid-Term Math</p>
                    <p className="text-xs text-gray-500">Result published</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">92/100</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl border border-orange-200 bg-orange-50">
                  <div>
                    <p className="font-bold text-sm text-orange-900">Science Project Due</p>
                    <p className="text-xs text-orange-700">Tomorrow at 10 AM</p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-orange-500"/>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Right Col */}
        <div className="space-y-6">
          
          {/* Teacher Feedback / Communications */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-md font-bold text-gray-900">Faculty Messages</h2>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                    PA
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Prof. Anderson</h4>
                    <p className="text-xs text-gray-500">Math Teacher • 2h ago</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  John has shown excellent improvement in calculus this week. He is actively participating in class discussions.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" className="text-xs py-1.5 px-3 bg-white h-auto" onClick={() => navigate('/dashboard/notifications')}>Reply</Button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs flex-shrink-0">
                    SS
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Admin Office</h4>
                    <p className="text-xs text-gray-500">System • 1d ago</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Reminder: The upcoming Parent-Teacher meeting is scheduled for this Friday at 4:00 PM.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Fee Reminder Widget */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Fee Status</p>
                <h3 className="text-2xl font-bold mt-1">$1,250.00</h3>
                <p className="text-sm text-gray-300 mt-1">Due by Oct 15, 2026</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
            </div>
            <Button variant="primary" fullWidth className="mt-6 bg-white text-gray-900 hover:bg-gray-100 border-0" onClick={() => alert('Secure payment portal coming soon!')}>
              Pay Now Securely
            </Button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;

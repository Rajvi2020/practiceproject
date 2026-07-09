import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  BookOpen, Calendar, Clock, FileText, CheckCircle2, TrendingUp, Award, Download, 
  Lightbulb, BrainCircuit, Bell, Medal, AlertCircle 
} from 'lucide-react';
import Button from '../../components/Button';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar } from 'recharts';

// Removed dummy dashboard data

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD';
  const [stats, setStats] = useState({
    attendance: '96%',
    cgpa: '3.9',
    assignments: '4/5',
    upcomingExams: '2'
  });
  const [pendingAssignment, setPendingAssignment] = useState(null);

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
            cgpa: data.avgCgpa
          }));
        }

        const [assRes, subRes] = await Promise.all([
          fetch('http://localhost:8000/api/assignments/', { headers }),
          fetch('http://localhost:8000/api/submissions/', { headers })
        ]);
        if (assRes.ok) {
          const assData = await assRes.json();
          const subData = subRes.ok ? await subRes.json() : [];
          
          const allAssignments = assData.results || assData;
          const allSubmissions = subData.results || subData;
          
          // Find first pending assignment
          const unsubmitted = allAssignments.find(a => {
            const mySub = allSubmissions.find(s => s.assignment === a.id && s.student?.user?.id === user?.id);
            return !mySub || mySub.status === 'Pending';
          });
          setPendingAssignment(unsubmitted);
        }
      } catch (err) {
        console.warn('Failed to fetch student stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name || 'Student'}.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard/certificates')}><Medal className="w-4 h-4 mr-2" /> Certificates</Button>
          <Button variant="primary" onClick={() => navigate('/dashboard/reports')}><Download className="w-4 h-4 mr-2" /> Results</Button>
        </div>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Attendance", value: stats.attendance, sub: 'Target: 85%', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { title: 'Current CGPA', value: stats.cgpa, sub: 'Top 5% of class', icon: Award, color: 'text-amber-600 bg-amber-50' },
          { title: 'Assignments', value: stats.assignments, sub: '1 pending', icon: FileText, color: 'text-blue-600 bg-blue-50' },
          { title: 'Upcoming Exams', value: stats.upcomingExams, sub: 'Next in 3 days', icon: Calendar, color: 'text-rose-600 bg-rose-50' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm font-semibold text-gray-700">{stat.title}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Analytics & Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Performance Trend */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Performance Trend</h2>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[]} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[3.0, 4.0]} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="gpa" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGpa)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Subject Wise Marks */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Subject Wise Marks</h2>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[]} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <RechartsTooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="marks" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* AI Learning Suggestions */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-emerald-100 text-emerald-600">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Learning Insights</h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Your performance in <span className="font-bold">Computer Science</span> and <span className="font-bold">Math</span> is excellent (Strong Subjects). However, your scores in <span className="font-bold text-red-600">Chemistry</span> are dropping.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold flex items-center gap-1"><Lightbulb className="w-3 h-3"/> View Chemistry Study Plan</span>
                <span className="px-3 py-1 bg-white border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold flex items-center gap-1"><BookOpen className="w-3 h-3"/> Recommended Readings</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Col: Schedule & Actions */}
        <div className="space-y-6">
          
          {/* Class Timetable */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-md font-bold text-gray-900">Today's Timetable</h2>
              <span className="text-xs text-primary-600 font-semibold cursor-pointer hover:underline" onClick={() => navigate('/dashboard/timetable')}>View Full</span>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 relative before:absolute before:left-[11px] before:top-8 before:bottom-[-16px] before:w-[2px] before:bg-gray-100">
                <div className="w-6 h-6 rounded-full bg-primary-100 border-2 border-white z-10 flex shrink-0" />
                <div className="pb-1">
                  <p className="text-xs font-bold text-gray-500">09:00 AM - 10:30 AM</p>
                  <p className="font-semibold text-gray-900 text-sm">Data Structures & Algorithms</p>
                  <p className="text-xs text-gray-500">Lab 4 • Dr. Patel</p>
                </div>
              </div>
              <div className="flex gap-3 relative before:absolute before:left-[11px] before:top-8 before:bottom-[-16px] before:w-[2px] before:bg-gray-100">
                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white z-10 flex shrink-0" />
                <div className="pb-1">
                  <p className="text-xs font-bold text-gray-500">11:00 AM - 12:00 PM</p>
                  <p className="font-semibold text-gray-900 text-sm">Engineering Mathematics</p>
                  <p className="text-xs text-gray-500">Room 302 • Prof. Anderson</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white z-10 flex shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-500">02:00 PM - 04:00 PM</p>
                  <p className="font-semibold text-gray-900 text-sm">Computer Networks</p>
                  <p className="text-xs text-gray-500">Room 105 • Prof. Smith</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pending Assignments */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-md font-bold text-gray-900 mb-4">Pending Assignments</h2>
            
            {pendingAssignment ? (
              <div className="p-4 rounded-xl border border-orange-200 bg-orange-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-orange-400" />
                <div className="flex items-center gap-2 text-orange-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertCircle className="w-4 h-4" /> Action Required
                </div>
                <h4 className="font-bold text-gray-900 mb-1 text-sm">{pendingAssignment.title}</h4>
                <p className="text-xs text-gray-600 mb-3">Due: {new Date(pendingAssignment.deadline).toLocaleDateString()}</p>
                <Button variant="outline" className="w-full text-xs py-1.5 bg-white" onClick={() => navigate('/dashboard/assignments')}>Upload Work</Button>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <h4 className="font-bold text-emerald-900 text-sm">All Caught Up!</h4>
                <p className="text-xs text-emerald-700 mt-1">You have no pending assignments.</p>
              </div>
            )}
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-md font-bold text-gray-900 mb-4 flex items-center justify-between">
              Notifications <span className="w-5 h-5 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center cursor-pointer" onClick={() => navigate('/dashboard/notifications')}>2</span>
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Bell className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Library Book Due</p>
                  <p className="text-xs text-gray-500">Please return 'Operating Systems' by Friday.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Achievement Unlocked!</p>
                  <p className="text-xs text-gray-500">You maintained 100% attendance this month.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

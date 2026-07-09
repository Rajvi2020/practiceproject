import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  BookOpen, Users, Calendar, BrainCircuit, Clock, FileText, CheckCircle2, 
  BarChart3, Activity, AlertTriangle, Trophy, Star, MessageSquare, Plus,
  FileCheck, ShieldCheck, Zap
} from 'lucide-react';
import Button from '../../components/Button';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: '—',
    totalAssignments: '—',
    avgAttendance: '—',
    totalMeetings: '—',
    totalMentoring: '—',
    productivity: '—'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const [dashRes, stuRes, assRes] = await Promise.all([
          fetch('http://localhost:8000/api/dashboard/stats/', { headers }),
          fetch('http://localhost:8000/api/students/', { headers }),
          fetch('http://localhost:8000/api/assignments/', { headers }),
        ]);

        const updates = {};
        if (dashRes.ok) {
          const data = await dashRes.json();
          if (data.avgAttendance) updates.avgAttendance = data.avgAttendance;
        }
        if (stuRes.ok) {
          const stuData = await stuRes.json();
          const count = stuData.count || (stuData.results || stuData).length || 0;
          updates.totalStudents = String(count);
        }
        if (assRes.ok) {
          const assData = await assRes.json();
          const count = assData.count || (assData.results || assData).length || 0;
          updates.totalAssignments = String(count);
        }
        if (Object.keys(updates).length > 0) {
          setStats(prev => ({ ...prev, ...updates }));
        }
      } catch (err) {
        console.warn('Failed to fetch faculty stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Workspace</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name || 'Professor'}. AI is optimizing your workflow.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/dashboard/notifications')}><MessageSquare className="w-4 h-4 mr-2"/>Parent Comms</Button>
          <Button variant="primary" onClick={() => navigate('/dashboard/question-paper')}><BrainCircuit className="w-4 h-4 mr-2" /> AI Assistant</Button>
        </div>
      </div>

      {/* Top Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { title: "My Students", value: stats.totalStudents, icon: Users, color: 'text-blue-600 bg-blue-50' },
          { title: 'Assignments', value: stats.totalAssignments, icon: FileText, color: 'text-orange-600 bg-orange-50' },
          { title: 'Attendance Avg', value: stats.avgAttendance, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { title: 'Meetings', value: stats.totalMeetings, icon: Calendar, color: 'text-purple-600 bg-purple-50' },
          { title: 'Mentoring', value: stats.totalMentoring, icon: Star, color: 'text-indigo-600 bg-indigo-50' },
          { title: 'Productivity', value: stats.productivity, icon: Zap, color: 'text-rose-600 bg-rose-50' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className={`p-2 w-max rounded-lg mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-gray-500">{stat.title}</p>
            <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Schedule & Timetable Optimization */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Today's Schedule & Optimization</h2>
              <Button variant="outline" className="text-xs h-8"><Zap className="w-3 h-3 mr-1"/> Optimize</Button>
            </div>
            <div className="space-y-3">
              {[
                { time: '09:00 AM', subject: 'Mathematics 101', type: 'Lecture', room: 'Room 302', status: 'upcoming' },
                { time: '11:30 AM', subject: 'Physics Lab', type: 'Lab', room: 'Lab 4', status: 'upcoming' },
                { time: '02:00 PM', subject: 'Faculty Meeting', type: 'Meeting', room: 'Conference Hall', status: 'upcoming' },
              ].map((cls, idx) => (
                <div key={idx} className="flex gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white transition-colors">
                  <div className="w-16 flex-shrink-0 text-right">
                    <p className="font-bold text-gray-900 text-sm">{cls.time.split(' ')[0]}</p>
                    <p className="text-xs text-gray-500 font-medium">{cls.time.split(' ')[1]}</p>
                  </div>
                  <div className="w-1 bg-primary-500 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">{cls.subject}</h4>
                    <p className="text-xs text-gray-500 mt-1">{cls.type} • {cls.room}</p>
                  </div>
                  <Button variant="primary" className="px-3 py-1 text-xs h-8 self-center">Start</Button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analytics & Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary-600"/> Performance Graph
              </h2>
              <div className="h-40 bg-gray-50 rounded-xl flex items-end gap-2 p-4 justify-between">
                {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                  <div key={i} className="w-full bg-primary-200 rounded-t-sm" style={{ height: `${h}%` }}>
                    <div className="w-full bg-primary-500 rounded-t-sm transition-all" style={{ height: `${h * 0.8}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" fullWidth className="text-xs py-2" onClick={() => navigate('/dashboard/reports')}>Generate Report</Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary-600"/> Student Analytics
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <h4 className="text-xs font-bold text-red-700 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Weak Students Alert</h4>
                  <p className="text-xs text-red-600 mt-1">3 students below 40% in Math 101. Intervention needed.</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-1"><Trophy className="w-3 h-3"/> Top Performers</h4>
                  <p className="text-xs text-emerald-600 mt-1">5 students scored 95%+ in recent Physics test.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Modules Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto gap-3" onClick={() => navigate('/dashboard/assignments')}>
              <FileCheck className="w-8 h-8 text-primary-500"/>
              <span>AI Assignment Evaluation</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto gap-3" onClick={() => navigate('/dashboard/question-paper')}>
              <BrainCircuit className="w-8 h-8 text-purple-500"/>
              <span>Generate Question Paper</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-6 h-auto gap-3" onClick={() => navigate('/dashboard/reports')}>
              <ShieldCheck className="w-8 h-8 text-emerald-500"/>
              <span>NAAC/NBA Docs</span>
            </Button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Quick Actions & AI Action Center */}
          <div className="bg-gradient-to-br from-indigo-900 to-primary-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
              <BrainCircuit className="w-5 h-5 text-primary-300" /> AI Action Center
            </h2>
            <div className="space-y-2 relative z-10">
              <button className="w-full text-left bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 p-3 rounded-xl transition-colors" onClick={() => navigate('/dashboard/question-paper')}>
                <h4 className="font-semibold text-sm text-white">Generate Lesson Plan</h4>
              </button>
              <button className="w-full text-left bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 p-3 rounded-xl transition-colors" onClick={() => navigate('/dashboard/assignments')}>
                <h4 className="font-semibold text-sm text-white">Auto-Grade Submissions</h4>
              </button>
              <button className="w-full text-left bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 p-3 rounded-xl transition-colors" onClick={() => navigate('/dashboard/timetable')}>
                <h4 className="font-semibold text-sm text-white">Optimize Timetable</h4>
              </button>
            </div>
          </div>

          {/* Pending Tasks & Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-md font-bold text-gray-900 mb-4">Pending Tasks</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Upload Assignment 3</p>
                  <p className="text-xs text-gray-500">Due today</p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Internal Assessment Marks</p>
                  <p className="text-xs text-gray-500">Due tomorrow</p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-800">Research Activity Log</p>
                  <p className="text-xs text-gray-500">End of week</p>
                </div>
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-md font-bold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4"/>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Meeting Schedule Updated</p>
                  <p className="text-xs text-gray-500">Department meeting moved to 3 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4"/>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Question Paper History</p>
                  <p className="text-xs text-gray-500">Mid-term papers archived successfully.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;

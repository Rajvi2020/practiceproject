import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, UserCheck, TrendingUp,
  MoreVertical, Clock, CheckCircle2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

// Removed dummy chart data

const StatCard = ({ title, value, icon: Icon, trend, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
      <span className="text-emerald-500 font-medium">{trend}</span>
      <span className="text-gray-400 ml-2">vs last month</span>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: '—',
    activeStudents: '—',
    totalFaculty: '—',
    totalAssignments: '—',
    avgAttendance: '—',
    avgCgpa: '—'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const [stuRes, facRes, assRes] = await Promise.all([
          fetch('http://localhost:8000/api/students/', { headers }),
          fetch('http://localhost:8000/api/faculty/', { headers }),
          fetch('http://localhost:8000/api/assignments/', { headers }),
        ]);

        const updates = {};
        if (stuRes.ok) {
          const d = await stuRes.json();
          const list = d.results || d;
          updates.totalStudents = String(d.count || list.length || 0);
          updates.activeStudents = String(list.filter(s => s.status === 'Active').length || 0);
        }
        if (facRes.ok) {
          const d = await facRes.json();
          updates.totalFaculty = String(d.count || (d.results || d).length || 0);
        }
        if (assRes.ok) {
          const d = await assRes.json();
          updates.totalAssignments = String(d.count || (d.results || d).length || 0);
        }
        if (Object.keys(updates).length > 0) setStats(prev => ({ ...prev, ...updates }));
      } catch (err) {
        console.warn('Failed to fetch admin dashboard stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          trend="+12%"
          color="bg-blue-50 text-blue-600"
          delay={0.1}
        />
        <StatCard
          title="Total Faculty"
          value={stats.totalFaculty}
          icon={BookOpen}
          trend="+3%"
          color="bg-purple-50 text-purple-600"
          delay={0.2}
        />
        <StatCard
          title="Avg Attendance"
          value={stats.avgAttendance}
          icon={UserCheck}
          trend="+2.5%"
          color="bg-emerald-50 text-emerald-600"
          delay={0.3}
        />
        <StatCard
          title="Total Assignments"
          value={stats.totalAssignments}
          icon={Clock}
          trend="+5%"
          color="bg-orange-50 text-orange-600"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Performance & Attendance Trend</h2>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAttendance)" />
                <Area type="monotone" dataKey="performance" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPerformance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New student enrollment completed</p>
                  <p className="text-xs text-gray-500 mt-1">Today at {10 + i}:30 AM</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Filter, CheckCircle2, XCircle, AlertTriangle, TrendingDown, UserPlus, Zap, Loader2 } from 'lucide-react';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

// Removed dummy attendance data

const analyticsData = [
  { date: 'Mon', rate: 95 },
  { date: 'Tue', rate: 92 },
  { date: 'Wed', rate: 88 },
  { date: 'Thu', rate: 96 },
  { date: 'Fri', rate: 94 },
];

const columns = [
  { header: 'Student Name', accessor: 'name', cell: (row) => <span className="font-medium text-gray-900">{row.name}</span> },
  { header: 'Student ID', accessor: 'id', cell: (row) => <span className="font-mono text-gray-500">{row.id}</span> },
  { header: 'Date', accessor: 'date' },
  { header: 'Time In', accessor: 'timeIn' },
  { header: 'Status', accessor: 'status', cell: (row) => {
    let color = '';
    let Icon = null;
    if (row.status === 'Present') {
      color = 'bg-emerald-50 text-emerald-700';
      Icon = CheckCircle2;
    } else if (row.status === 'Absent') {
      color = 'bg-red-50 text-red-700';
      Icon = XCircle;
    } else {
      color = 'bg-orange-50 text-orange-700';
    }
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
        {Icon && <Icon className="w-3.5 h-3.5" />}
        {row.status}
      </span>
    );
  }}
];

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const response = await fetch('http://localhost:8000/api/attendance-records/', { headers });
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const mappedData = data.results.map(record => ({
            id: record.student.student_id || 'N/A',
            name: record.student.user ? `${record.student.user.first_name} ${record.student.user.last_name}`.trim() : 'Unknown',
            date: new Date(record.timestamp).toLocaleDateString(),
            status: record.status,
            timeIn: new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }));
          setAttendance(mappedData);
        } else if (Array.isArray(data)) {
          const mappedData = data.map(record => ({
            id: record.student.student_id || 'N/A',
            name: record.student.user ? `${record.student.user.first_name} ${record.student.user.last_name}`.trim() : 'Unknown',
            date: new Date(record.timestamp).toLocaleDateString(),
            status: record.status,
            timeIn: new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }));
          setAttendance(mappedData);
        } else {
          setAttendance([]);
        }
      } catch (err) {
        console.log('Failed to fetch attendance:', err);
        setAttendance([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Module</h1>
          <p className="text-gray-500 text-sm mt-1">AI-powered tracking, analytics, and risk management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Monthly Report
          </Button>
          <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700 border-0">
            <Zap className="w-4 h-4 mr-2" /> Quick Attendance
          </Button>
        </div>
      </div>

      {/* Top Section: Analytics & Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Graph */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">Weekly Analytics</h2>
            <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">This Week</div>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} domain={[0, 100]} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="rate" stroke="#10b981" fillOpacity={1} fill="url(#colorRate)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Risk Students */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">At-Risk Students</h2>
            <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Students below 75% threshold</p>
          <div className="space-y-3 flex-1">
            <div className="p-3 rounded-xl border border-red-100 bg-red-50 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Liam Wilson</h4>
                <p className="text-xs text-red-700 mt-1 font-semibold">Current: 68%</p>
                <p className="text-xs text-gray-500 mt-1">Absent last 3 days consecutively.</p>
                <Button variant="outline" className="text-xs py-1 px-3 h-auto mt-2 bg-white">Alert Parents</Button>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-orange-100 bg-orange-50 flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Sophia Chen</h4>
                <p className="text-xs text-orange-700 mt-1 font-semibold">Current: 74%</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      ) : (
      <Table 
        columns={columns} 
        data={attendance} 
        title="Today's Attendance List"
        onExport={() => alert('Exporting attendance report...')}
        searchPlaceholder="Search student by name or ID..."
      />
      )}
    </div>
  );
};

export default Attendance;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, BarChart2, PieChart as PieChartIcon, Users, BookOpen, GraduationCap, Building2, Briefcase, Loader2, RefreshCw } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import Button from '../../components/Button';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('academic');
  const [performanceData, setPerformanceData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('eduflow_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const [perfRes, summaryRes] = await Promise.all([
        fetch('http://localhost:8000/api/reports/performance_summary/', { headers }),
        fetch('http://localhost:8000/api/reports/academic_summary/', { headers }),
      ]);

      if (perfRes.ok) {
        const perfData = await perfRes.json();
        if (perfData.performance?.length > 0) setPerformanceData(perfData.performance);
      }

      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData.summary);
        if (summaryData.attendance_distribution?.length > 0) {
          setAttendanceData(summaryData.attendance_distribution);
        }
      }
    } catch (err) {
      console.log('Failed to fetch reports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, []);

  const tabs = [
    { id: 'academic', name: 'Academic Report', icon: GraduationCap },
    { id: 'performance', name: 'Performance Report', icon: BarChart2 },
    { id: 'attendance', name: 'Attendance Report', icon: PieChartIcon },
    { id: 'department', name: 'Department Report', icon: Building2 },
    { id: 'faculty', name: 'Faculty Report', icon: Briefcase },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics &amp; Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Generate comprehensive institutional reports.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchReports}><RefreshCw className="w-4 h-4 mr-2" />Refresh</Button>
          <Button variant="outline" onClick={() => {
            const csvContent = "data:text/csv;charset=utf-8,Subject,Score\n" + performanceData.map(e => `${e.subject},${e.score}`).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "performance_report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}><Download className="w-4 h-4 mr-2" />Export CSV</Button>
          <Button variant="primary" onClick={() => window.print()}><Download className="w-4 h-4 mr-2" />Export PDF</Button>
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: summary.total_students, cls: 'text-blue-600' },
            { label: 'Assignments', value: summary.total_assignments, cls: 'text-purple-600' },
            { label: 'Submissions', value: summary.total_submissions, cls: 'text-emerald-600' },
            { label: 'Graded', value: summary.graded_submissions, cls: 'text-orange-600' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-500 font-medium">{item.label}</p>
              <h3 className={`text-3xl font-bold mt-1 ${item.cls}`}>{item.value}</h3>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl w-max overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}>
            <tab.icon className="w-4 h-4 mr-2" />{tab.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={activeTab}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6 capitalize">{activeTab} — Subject Performance</h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                  <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Attendance Distribution</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {attendanceData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Historical Growth Trend</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} domain={['dataMin - 5', 'dataMax + 5']} />
                  <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="avg" stroke="#8b5cf6" strokeWidth={3} dot={{ strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Reports;

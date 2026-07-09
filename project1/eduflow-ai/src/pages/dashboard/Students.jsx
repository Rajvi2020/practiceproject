import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Download, Filter, TrendingUp, GraduationCap, AlertTriangle, Loader2 } from 'lucide-react';
import Table from '../../components/Table';
import Button from '../../components/Button';

// Removed dummy students data

const columns = [
  { header: 'Student ID', accessor: 'id', cell: (row) => <span className="font-mono text-gray-500 text-xs">{row.id}</span> },
  { header: 'Name', accessor: 'name', cell: (row) => (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs shrink-0">
        {row.name.charAt(0)}{row.name.split(' ')[1]?.charAt(0)}
      </div>
      <span className="font-medium text-gray-900">{row.name}</span>
    </div>
  )},
  { header: 'Grade', accessor: 'grade' },
  { header: 'Section', accessor: 'section', cell: (row) => (
    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold">{row.section}</span>
  )},
  { header: 'Attendance', accessor: 'attendance', cell: (row) => {
    const val = parseInt(row.attendance);
    const color = val >= 85 ? 'text-emerald-600' : val >= 75 ? 'text-orange-600' : 'text-red-600';
    return (
      <div className="flex items-center gap-2">
        <span className={`font-bold ${color}`}>{row.attendance}</span>
        {val < 75 && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
      </div>
    );
  }},
  { header: 'CGPA', accessor: 'cgpa', cell: (row) => <span className="font-bold text-gray-900">{row.cgpa}</span> },
  { header: 'Status', accessor: 'status', cell: (row) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
      row.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
      'bg-red-100 text-red-700'
    }`}>
      {row.status}
    </span>
  )}
];

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const response = await fetch('http://localhost:8000/api/students/', { headers });
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const mappedData = data.results.map(s => ({
            id: s.student_id,
            name: s.user ? `${s.user.first_name} ${s.user.last_name}`.trim() || s.user.username : 'Unknown',
            grade: s.grade,
            section: s.section,
            attendance: '100%', // Mocked for now, need attendance API
            cgpa: s.cgpa,
            status: s.status,
          }));
          setStudents(mappedData);
          setStudents(mappedData);
        } else if (Array.isArray(data)) {
          const mappedData = data.map(s => ({
            id: s.student_id,
            name: s.user ? `${s.user.first_name} ${s.user.last_name}`.trim() || s.user.username : 'Unknown',
            grade: s.grade,
            section: s.section,
            attendance: '100%',
            cgpa: s.cgpa,
            status: s.status,
          }));
          setStudents(mappedData);
        } else {
          setStudents([]);
        }
      } catch (err) {
        console.log('Failed to fetch students:', err);
        setStudents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students Directory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all enrolled students, track attendance & CGPA.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button variant="primary"><Plus className="w-4 h-4 mr-2" /> Add Student</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Enrolled', value: '2,845', icon: Users, bg: 'bg-blue-50 text-blue-600' },
          { label: 'Active Students', value: '2,780', icon: GraduationCap, bg: 'bg-emerald-50 text-emerald-600' },
          { label: 'At-Risk (<75%)', value: '24', icon: AlertTriangle, bg: 'bg-red-50 text-red-600' },
          { label: 'Avg CGPA', value: '3.42', icon: TrendingUp, bg: 'bg-purple-50 text-purple-600' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div className={`p-2.5 rounded-xl ${s.bg}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs font-medium text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      ) : (
      <Table 
        columns={columns} 
        data={students} 
        title="All Students"
        onExport={() => alert('Exporting data...')}
        searchPlaceholder="Search by name, ID, or grade..."
      />
      )}
    </div>
  );
};

export default Students;

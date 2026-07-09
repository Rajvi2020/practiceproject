import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Award, BookOpen, Download, Plus, Star, Clock } from 'lucide-react';
import Table from '../../components/Table';
import Button from '../../components/Button';

// Removed dummy teachers data

const columns = [
  { 
    header: 'Faculty', 
    accessor: 'name',
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
          {row.name.split(' ').pop()[0]}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.id} · {row.experience}</p>
        </div>
      </div>
    )
  },
  { header: 'Department', accessor: 'department', cell: (row) => (
    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">{row.department}</span>
  )},
  { 
    header: 'Contact', 
    accessor: 'email', 
    cell: (row) => (
      <div className="space-y-1">
        <p className="text-sm flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {row.email}</p>
        <p className="text-xs text-gray-500 flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400" /> {row.phone}</p>
      </div>
    ) 
  },
  { 
    header: 'Courses', 
    accessor: 'courses', 
    cell: (row) => (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium">
        <BookOpen className="w-3.5 h-3.5" /> {row.courses} Courses
      </span>
    )
  },
  {
    header: 'Rating',
    accessor: 'rating',
    cell: (row) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span className="font-bold text-gray-900">{row.rating}</span>
      </div>
    )
  },
  { 
    header: 'Status', 
    accessor: 'status', 
    cell: (row) => (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
        row.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
      }`}>
        {row.status === 'Active' ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> : <Clock className="w-3 h-3" />}
        {row.status}
      </span>
    )
  },
];

const Teachers = () => {
  const [facultyList, setFacultyList] = useState([]);
  
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const res = await fetch('http://localhost:8000/api/faculty/', { headers });
        if (res.ok) {
          const data = await res.json();
          const mapped = (data.results || data).map(fac => ({
            id: fac.faculty_id,
            name: fac.user ? `${fac.user.first_name} ${fac.user.last_name}` : 'Unknown',
            email: fac.user ? fac.user.email : '',
            department: fac.department,
            phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000), // mock
            courses: Math.floor(Math.random() * 5) + 1, // mock
            rating: fac.rating,
            experience: `${fac.experience_years} yrs`,
            status: fac.status
          }));
          setFacultyList(mapped.length > 0 ? mapped : []);
        } else {
            setFacultyList([]);
        }
      } catch (e) {
        setFacultyList([]);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Directory</h1>
          <p className="text-gray-500 text-sm mt-1">View, manage, and evaluate all teaching staff.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button variant="primary"><Plus className="w-4 h-4 mr-2" /> Add Faculty</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Faculty', value: '142', bg: 'bg-indigo-50 text-indigo-700' },
          { label: 'Departments', value: '8', bg: 'bg-blue-50 text-blue-700' },
          { label: 'Active Today', value: '136', bg: 'bg-emerald-50 text-emerald-700' },
          { label: 'On Leave', value: '6', bg: 'bg-amber-50 text-amber-700' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`px-5 py-4 rounded-2xl font-bold text-center ${s.bg}`}
          >
            <p className="text-2xl">{s.value}</p>
            <p className="text-xs font-medium mt-1 opacity-70">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <Table
        columns={columns}
        data={facultyList}
        title="All Faculty Members"
        searchPlaceholder="Search by name, department..."
      />
    </div>
  );
};

export default Teachers;

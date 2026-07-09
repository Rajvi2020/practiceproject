import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Filter, Mail, Phone, Edit2, Trash2 } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Table from '../../components/Table';
import { useAuth } from '../../context/AuthContext';

const Parents = () => {
  const [parents, setParents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch('http://localhost:8000/api/accounts/users/?role=parent', { headers });
        if (res.ok) {
          const data = await res.json();
          const list = (data.results || data).filter(u => u.role === 'parent').map((u, i) => ({
            id: `P00${i + 1}`,
            name: `${u.first_name} ${u.last_name}`.trim() || u.username,
            email: u.email,
            phone: u.phone || '—',
            student: 'Not linked',
            status: 'Active'
          }));
          setParents(list);
        } else {
          setParents([]);
        }
      } catch (err) {
        console.log('Failed to fetch parents:', err);
        setParents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParents();
  }, []);

  const columns = [
    { key: 'id', label: 'Parent ID' },
    { 
      key: 'name', 
      label: 'Name',
      render: (value, row) => (
        <div>
          <div className="font-bold text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      )
    },
    { key: 'phone', label: 'Phone' },
    { key: 'student', label: 'Linked Student' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          value === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parent Directory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage parent accounts and their linked students.</p>
        </div>
        <Button variant="primary">
          <UserPlus className="w-4 h-4 mr-2" /> Add Parent
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search parents by name, email, or student..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <Table 
          columns={columns} 
          data={parents.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.student.toLowerCase().includes(searchTerm.toLowerCase()))}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};

export default Parents;

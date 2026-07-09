import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, BookOpen, Clock, ChevronRight } from 'lucide-react';
import Button from '../../components/Button';

// Removed dummy classes data

const Classes = () => {
  const [view, setView] = useState('grid');
  const [classesList, setClassesList] = useState([]);
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const res = await fetch('http://localhost:8000/api/class-sessions/', { headers });
        if (res.ok) {
          const data = await res.json();
          // map backend class sessions to frontend format
          const mapped = (data.results || data).map(cls => ({
            id: `CLS-${cls.id}`,
            name: cls.course_name,
            teacher: cls.faculty?.user ? `${cls.faculty.user.first_name} ${cls.faculty.user.last_name}` : 'Unknown Faculty',
            students: Math.floor(Math.random() * 20) + 15, // Mock data
            schedule: cls.date,
            time: cls.time_in,
            room: `Room ${Math.floor(Math.random() * 300) + 100}`, // Mock data
            color: 'from-blue-500 to-indigo-600' // Mock data
          }));
          setClassesList(mapped.length > 0 ? mapped : []);
        } else {
            setClassesList([]);
        }
      } catch (e) {
        setClassesList([]);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-500 text-sm mt-1">Organize and manage all active classes and courses.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button onClick={() => setView('grid')} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>Grid</button>
            <button onClick={() => setView('list')} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>List</button>
          </div>
          <Button variant="primary"><Plus className="w-4 h-4 mr-2" /> Create Class</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Classes', value: '86', icon: BookOpen, bg: 'bg-blue-50 text-blue-600' },
          { label: 'Total Students', value: '2,845', icon: Users, bg: 'bg-emerald-50 text-emerald-600' },
          { label: 'Active Today', value: '24', icon: Clock, bg: 'bg-purple-50 text-purple-600' },
          { label: 'Avg Class Size', value: '28', icon: Users, bg: 'bg-orange-50 text-orange-600' },
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

      {/* Cards Grid */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classesList.map((cls, idx) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer"
            >
              <div className={`h-2 bg-gradient-to-r ${cls.color}`} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-mono mb-1">{cls.id}</p>
                    <h3 className="text-lg font-bold text-gray-900">{cls.name}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                </div>

                <p className="text-sm text-gray-600 mb-4">{cls.teacher}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{cls.students} students</span>
                  </div>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-700">{cls.room}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{cls.schedule}</span>
                  </div>
                  <span className="font-semibold">{cls.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
          {classesList.map((cls, idx) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-white`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{cls.name}</h4>
                  <p className="text-sm text-gray-500">{cls.teacher} · {cls.room}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="hidden sm:flex items-center gap-1.5"><Users className="w-4 h-4" /> {cls.students}</span>
                <span className="hidden md:flex items-center gap-1.5"><Clock className="w-4 h-4" /> {cls.schedule}</span>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;

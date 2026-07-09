import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trophy, Calendar, CheckCircle2, Clock, FileText, Download, BrainCircuit } from 'lucide-react';
import Button from '../../components/Button';
import Table from '../../components/Table';

// Removed dummy exams data

const columns = [
  {
    header: 'Exam',
    accessor: 'name',
    cell: (row) => (
      <div>
        <p className="font-semibold text-gray-900">{row.name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{row.subject}</p>
      </div>
    )
  },
  {
    header: 'Date & Time',
    accessor: 'date',
    cell: (row) => (
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
        <div>
          <p className="text-gray-900 font-medium">{row.date}</p>
          <p className="text-xs text-gray-500">{row.time} · {row.duration}</p>
        </div>
      </div>
    )
  },
  {
    header: 'Venue / Hall Ticket',
    accessor: 'room',
    cell: (row) => row.status === 'Upcoming' ? (
      <div className="text-sm">
        <p className="font-medium text-gray-900">{row.room}</p>
        <p className="text-xs text-primary-600 font-bold">{row.hallTicket}</p>
      </div>
    ) : <span className="text-xs text-gray-400 italic">N/A</span>
  },
  {
    header: 'Marks',
    accessor: 'totalMarks',
    cell: (row) => row.score ? (
      <div className="text-sm">
        <p className="font-bold text-gray-900">{row.score}/{row.totalMarks}</p>
        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">{row.grade}</span>
      </div>
    ) : <span className="text-gray-400 text-sm">/ {row.totalMarks}</span>
  },
  {
    header: 'Status',
    accessor: 'status',
    cell: (row) => {
      const style = row.status === 'Upcoming' ? 'bg-blue-50 text-blue-700' :
                    row.status === 'Completed' ? 'bg-orange-50 text-orange-700' :
                    'bg-emerald-50 text-emerald-700';
      const Icon = row.status === 'Upcoming' ? Clock :
                   row.status === 'Graded' ? CheckCircle2 : null;
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {row.status}
        </span>
      );
    }
  },
];

const Exams = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [examsList, setExamsList] = useState([]);
  
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const res = await fetch('http://localhost:8000/api/question-papers/', { headers });
        if (res.ok) {
          const data = await res.json();
          const mapped = (data.results || data).map(exam => ({
            id: exam.id,
            name: exam.topic,
            subject: exam.subject,
            date: new Date(exam.created_at).toLocaleDateString(),
            time: '10:00 AM', // mock
            duration: '2 hrs', // mock
            totalMarks: exam.total_marks,
            hallTicket: `HT-${exam.id}`,
            room: 'Hall A', // mock
            status: exam.difficulty === 'Hard' ? 'Upcoming' : 'Completed', // mock status
            score: exam.difficulty === 'Hard' ? null : Math.floor(exam.total_marks * 0.85),
            grade: exam.difficulty === 'Hard' ? null : 'A'
          }));
          setExamsList(mapped.length > 0 ? mapped : []);
        } else {
            setExamsList([]);
        }
      } catch (e) {
        setExamsList([]);
      }
    };
    fetchExams();
  }, []);

  const filtered = activeTab === 'all'
    ? examsList
    : examsList.filter(e => e.status.toLowerCase() === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exams & Grades</h1>
          <p className="text-gray-500 text-sm mt-1">Schedule, hall tickets, and AI-graded results.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Hall Ticket
          </Button>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" /> Schedule Exam
          </Button>
        </div>
      </div>

      {/* AI Performance Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-white border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm mb-1">AI Performance Prediction</h3>
          <p className="text-sm text-gray-600">Based on your study patterns, you are likely to score <span className="font-bold text-emerald-600">A (85-92%)</span> in the upcoming Math Mid-Term. Focus on Chapter 7 (Integration) for best results.</p>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Upcoming Exams', value: '2', icon: Clock, color: 'text-blue-600 bg-blue-50' },
          { title: 'Completed', value: '2', icon: FileText, color: 'text-orange-600 bg-orange-50' },
          { title: 'Fully Graded', value: '1', icon: Trophy, color: 'text-emerald-600 bg-emerald-50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl w-max">
        {['all', 'upcoming', 'completed', 'graded'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
              activeTab === tab
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Table
        columns={columns}
        data={filtered}
        title="Examination Schedule"
        searchPlaceholder="Search exams..."
      />
    </div>
  );
};

export default Exams;

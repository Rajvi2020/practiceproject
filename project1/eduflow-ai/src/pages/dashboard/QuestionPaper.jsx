import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Book, LayoutList, Download, Loader2, Clock, History, FileText, CheckCircle2 } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';

// Removed dummy history data

const QuestionPaper = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState('generator');
  const [historyData, setHistoryData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [facultyId, setFacultyId] = useState(null);
  const [formData, setFormData] = useState({
    subject: 'Computer Science',
    semester: 'Semester 4',
    unit: 'Unit 2: Data Structures',
    difficulty: 'Medium',
    marks: '50',
    type: 'Descriptive'
  });

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('eduflow_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      const response = await fetch('http://localhost:8000/api/question-papers/', { headers });
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setHistoryData(data.results.map(paper => ({
          id: paper.id,
          subject: paper.subject,
          type: paper.topic, // using topic as type
          date: new Date(paper.created_at).toLocaleDateString()
        })));
      } else {
        setHistoryData([]);
      }
    } catch (err) {
      console.log('Failed to fetch history:', err);
      setHistoryData([]);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
  }, [activeTab]);

  // Resolve faculty ID for logged-in faculty user
  useEffect(() => {
    if (user?.role === 'faculty') {
      const token = localStorage.getItem('eduflow_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      fetch('http://localhost:8000/api/faculty/', { headers })
        .then(r => r.json())
        .then(data => {
          const list = data.results || data;
          const myFac = list.find(f => f.user && f.user.id === user.id);
          if (myFac) setFacultyId(myFac.id);
          else if (list.length > 0) setFacultyId(list[0].id); // fallback
        })
        .catch(() => setFacultyId(1));
    } else {
      // Admin or others: use first available faculty
      const token = localStorage.getItem('eduflow_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      fetch('http://localhost:8000/api/faculty/', { headers })
        .then(r => r.json())
        .then(data => {
          const list = data.results || data;
          if (list.length > 0) setFacultyId(list[0].id);
        })
        .catch(() => setFacultyId(1));
    }
  }, [user]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate generation time for UX
    setTimeout(async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };
        
        // In a real app we'd send formData to an AI backend endpoint.
        // Here we just save the metadata to our standard CRUD endpoint.
        await fetch('http://localhost:8000/api/question-papers/', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            subject: formData.subject,
            topic: formData.type,
            difficulty: formData.difficulty,
            total_marks: parseInt(formData.marks) || 100,
            faculty: facultyId || 1
          })
        });
      } catch (err) {
        console.warn('Failed to save to backend API', err);
      }
      setIsGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Question Paper Module</h1>
        <p className="text-gray-500 text-sm mt-1">Generate subject-specific question papers instantly.</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl w-max">
        <button onClick={() => setActiveTab('generator')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${activeTab === 'generator' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
          <BrainCircuit className="w-4 h-4" /> Generator
        </button>
        <button onClick={() => setActiveTab('history')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
          <History className="w-4 h-4" /> History
        </button>
      </div>

      {activeTab === 'generator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Generator Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary-600" /> Configuration
              </h3>
              <form onSubmit={handleGenerate} className="space-y-4">
                <Input label="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} icon={Book} />
                <Input label="Semester" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} />
                <Input label="Unit / Topic" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} icon={LayoutList} />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Difficulty</label>
                    <select className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
                      <option>Easy</option><option>Medium</option><option>Hard</option><option>Mixed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Marks</label>
                    <input type="number" className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" value={formData.marks} onChange={(e) => setFormData({...formData, marks: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Question Type</label>
                  <select className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option>Descriptive</option><option>MCQ</option><option>Short Answer</option><option>Mixed</option>
                  </select>
                </div>

                <Button type="submit" fullWidth disabled={isGenerating} className="mt-4 py-3 bg-purple-600 hover:bg-purple-700 text-white border-0">
                  {isGenerating ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Paper...</> : <><BrainCircuit className="w-5 h-5 mr-2" /> Generate Paper</>}
                </Button>
              </form>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!generated ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
                  <BrainCircuit className="w-16 h-16 mb-4 text-purple-200" />
                  <p className="text-lg font-medium text-gray-600">Your AI-generated paper will appear here</p>
                  <p className="text-sm mt-2 max-w-sm text-center">Set your requirements and let our AI engine craft the perfect assessment for your students.</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 relative min-h-[500px]">
                  <div className="absolute top-6 right-6">
                    <Button variant="outline" className="text-purple-700 border-purple-200 bg-purple-50 hover:bg-purple-100" onClick={() => window.print()}>
                      <Download className="w-4 h-4 mr-2" /> Export PDF
                    </Button>
                  </div>
                  
                  <div className="text-center border-b border-gray-200 pb-6 mb-6 mt-4">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-widest">{formData.subject}</h2>
                    <p className="text-gray-500 mt-2 font-medium">{formData.semester} | {formData.unit}</p>
                    <div className="flex items-center justify-center gap-4 mt-2 text-sm font-semibold text-gray-600">
                      <span>Time: 3 Hours</span>
                      <span>Max Marks: {formData.marks}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-center italic text-sm text-gray-500 mb-6">Note: Answer all questions. All questions carry equal marks.</p>
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="group">
                        <div className="flex gap-4">
                          <span className="font-bold text-gray-900 text-lg">Q{num}.</span>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium leading-relaxed">
                              {num === 1 ? 'Explain the difference between an Array and a Linked List. Under what circumstances would you choose one over the other?' :
                               num === 2 ? 'Write a function to reverse a binary tree. What is the time and space complexity of your solution?' :
                               'Describe the concept of hashing. How do hash collisions occur and what are the common techniques to resolve them?'}
                            </p>
                            <p className="text-sm text-gray-400 mt-2 flex justify-between items-center">
                              <span className="font-semibold text-gray-600">[10 Marks]</span>
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-600 cursor-pointer text-xs font-semibold">Regenerate Question</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Generated Papers History</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {historyData.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.subject}</h4>
                    <p className="text-sm text-gray-500">{item.type} • Generated on {item.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="text-xs h-8 px-3">View</Button>
                  <Button variant="outline" className="text-xs h-8 px-3"><Download className="w-3 h-3 mr-1"/> PDF</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPaper;

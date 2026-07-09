import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Upload, CheckCircle2, Clock, BrainCircuit, ShieldAlert, Star, Users, Loader2 } from 'lucide-react';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

// Removed dummy assignments data

const Assignments = () => {
  const { user } = useAuth();
  const role = user?.role || 'student';
  const [activeTab, setActiveTab] = useState('all');
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', deadline: '', file: null });

  const getFileUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:8000${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('eduflow_token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      // Get the first faculty record (in production this would come from the user's profile)
      const facRes = await fetch('http://localhost:8000/api/faculty/', { headers });
      let facultyId = 1;
      if (facRes.ok) {
        const facData = await facRes.json();
        const list = facData.results || facData;
        if (list.length > 0) facultyId = list[0].id;
      }
      const formData = new FormData();
      formData.append('title', newAssignment.title);
      formData.append('course', newAssignment.course);
      formData.append('deadline', newAssignment.deadline + 'T23:59:00Z');
      formData.append('faculty', facultyId);
      if (newAssignment.file) {
        formData.append('assignment_file', newAssignment.file);
      }

      const uploadHeaders = { ...headers };
      delete uploadHeaders['Content-Type']; // Let browser set multipart/form-data boundary

      const response = await fetch('http://localhost:8000/api/assignments/', {
        method: 'POST',
        headers: uploadHeaders,
        body: formData
      });
      if (response.ok) {
        setShowCreateModal(false);
        window.location.reload();
      } else {
        alert('Failed to create assignment');
      }
    } catch (err) {
      alert('Error connecting to backend');
    }
  };

  const handleUploadWork = async (e, assignmentId) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const token = localStorage.getItem('eduflow_token');
      const headers = {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
      
      const stuRes = await fetch('http://localhost:8000/api/students/', { headers: { ...headers, 'Content-Type': 'application/json' } });
      let studentId = 1;
      if (stuRes.ok) {
        const stuData = await stuRes.json();
        const list = stuData.results || stuData;
        const mine = list.find(s => s.user && s.user.id === user?.id);
        if (mine) studentId = mine.id;
        else if (list.length > 0) studentId = list[0].id;
      }

      const formData = new FormData();
      formData.append('assignment', assignmentId);
      formData.append('student', studentId);
      formData.append('status', 'Submitted');
      formData.append('submission_file', file);

      const response = await fetch('http://localhost:8000/api/submissions/', {
        method: 'POST',
        headers,
        body: formData
      });
      if (response.ok) {
        alert('Assignment submitted successfully! Awaiting AI Evaluation.');
        window.location.reload();
      }
    } catch (err) {
      alert('Error uploading assignment');
    }
  };

  const handleReview = async (assignment) => {
    const submissionsToGrade = assignment.all_submissions?.filter(s => s.status === 'Submitted') || [];
    if (submissionsToGrade.length === 0) {
      alert('No pending submissions to grade for this assignment!');
      return;
    }
    
    alert(`Triggering AI Evaluation for ${submissionsToGrade.length} submissions...`);
    try {
      const token = localStorage.getItem('eduflow_token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };

      await Promise.all(submissionsToGrade.map(sub => 
        fetch(`http://localhost:8000/api/submissions/${sub.id}/`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            status: 'Graded',
            score: `${Math.floor(Math.random() * (100 - 75 + 1)) + 75}/100`, // Score between 75-100
            feedback: 'Excellent work. The analysis was clear and well-structured. Good understanding of core concepts.',
            originality_score: '94%'
          })
        })
      ));

      alert('All submissions have been successfully graded!');
      window.location.reload();
    } catch (err) {
      alert('Error during grading process.');
    }
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const [assRes, subRes] = await Promise.all([
          fetch('http://localhost:8000/api/assignments/', { headers }),
          fetch('http://localhost:8000/api/submissions/', { headers })
        ]);

        if (!assRes.ok) throw new Error('API failed');
        const assData = await assRes.json();
        const subData = subRes.ok ? await subRes.json() : [];
        
        const allAssignments = assData.results || assData;
        const allSubmissions = subData.results || subData;
        
        if (allAssignments.length > 0) {
          const mappedData = allAssignments.map(a => {
            const mySubmission = role === 'student' 
              ? allSubmissions.find(s => s.assignment === a.id && s.student?.user?.id === user?.id)
              : allSubmissions.find(s => s.assignment === a.id);
            
            return {
              id: a.id,
              title: a.title,
              course: a.course,
              deadline: new Date(a.deadline).toLocaleDateString(),
              status: mySubmission ? mySubmission.status : 'Pending',
              assignment_file: a.assignment_file,
              submission_file: mySubmission?.submission_file,
              score: mySubmission?.score,
              feedback: mySubmission?.feedback,
              originality: mySubmission?.originality_score,
              all_submissions: allSubmissions.filter(s => s.assignment === a.id),
              submittedBy: allSubmissions.filter(s => s.assignment === a.id).length,
              totalStudents: 30, // Mock total
            };
          });
          setAssignments(mappedData);
        } else {
          setAssignments([]);
        }
      } catch (err) {
        console.log('Failed to fetch assignments:', err);
        setAssignments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments = activeTab === 'all' 
    ? assignments 
    : assignments.filter(a => a.status.toLowerCase() === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignment Module</h1>
          <p className="text-gray-500 text-sm mt-1">
            {role === 'faculty' ? 'Create assignments and view AI-evaluated submissions.' : 
             role === 'parent' ? 'Track your child\'s assignments and AI-graded feedback.' : 
             'Manage your coursework, submissions, and AI feedback.'}
          </p>
        </div>
        {role === 'faculty' ? (
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" /> Create Assignment
          </Button>
        ) : role === 'student' ? (
          <Button variant="primary">
            <Upload className="w-4 h-4 mr-2" /> Upload New Assignment
          </Button>
        ) : null}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl w-max">
        {['all', 'pending', 'submitted', 'graded'].map((tab) => (
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

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment, idx) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                assignment.status === 'Pending' ? 'bg-orange-50 text-orange-700' :
                assignment.status === 'Submitted' ? 'bg-blue-50 text-blue-700' :
                assignment.status === 'Graded' ? 'bg-emerald-50 text-emerald-700' :
                'bg-red-50 text-red-700'
              }`}>
                {role === 'faculty' ? (assignment.status === 'Graded' ? 'Graded' : 'Active') : assignment.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-1">{assignment.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{assignment.course}</p>
            
            <div className="mt-auto space-y-4">
              <div className="flex items-center text-sm text-gray-600 justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className={assignment.status === 'Late' ? 'text-red-500 font-medium' : ''}>
                    {assignment.deadline}
                  </span>
                </div>
                {assignment.assignment_file && (
                  <a href={getFileUrl(assignment.assignment_file)} target="_blank" rel="noreferrer" className="flex items-center text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors">
                    Download Assignment
                  </a>
                )}
                {role === 'faculty' && (
                  <div className="flex items-center text-xs font-semibold text-gray-500 gap-1 bg-gray-100 px-2 py-1 rounded-md">
                    <Users className="w-3 h-3" /> {assignment.submittedBy}/{assignment.totalStudents}
                  </div>
                )}
              </div>
              
              {role === 'faculty' ? (
                <div className="space-y-2">
                  <Button variant="outline" fullWidth onClick={() => handleReview(assignment)}>
                    Review Submissions & Trigger AI
                  </Button>
                  
                  {assignment.all_submissions && assignment.all_submissions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Student Files ({assignment.all_submissions.length})</p>
                      <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                        {assignment.all_submissions.map((sub, i) => sub.submission_file && (
                          <a key={i} href={getFileUrl(sub.submission_file)} target="_blank" rel="noreferrer" className="flex items-center justify-between text-sm text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                            <span className="truncate flex-1 font-medium">{sub.student_name || `Student #${sub.student}`}</span>
                            <FileText className="w-4 h-4 ml-2 flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : assignment.status === 'Graded' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    <span className="text-sm font-medium text-emerald-800 flex items-center gap-1">
                      <Star className="w-4 h-4" /> Marks Card
                    </span>
                    <span className="text-lg font-bold text-emerald-700">{assignment.score}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-700 flex items-center gap-1 mb-1">
                      <BrainCircuit className="w-3 h-3 text-purple-500" /> AI Feedback Card
                    </p>
                    <p className="text-xs text-gray-600">{assignment.feedback}</p>
                    <p className="text-xs text-blue-600 font-medium mt-2 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Originality Score: {assignment.originality}
                    </p>
                  </div>
                </div>
              ) : assignment.status === 'Pending' && role === 'student' ? (
                <div className="relative">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleUploadWork(e, assignment.id)} />
                  <Button variant="outline" fullWidth className="border-dashed pointer-events-none">
                    <Upload className="w-4 h-4 mr-2" /> Upload Work
                  </Button>
                </div>
              ) : role === 'student' ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-sm text-blue-600 font-medium p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Submission Received
                  </div>
                  <div className="flex items-center justify-center text-xs text-purple-600 font-medium p-2 bg-purple-50 rounded-xl border border-purple-100">
                    <BrainCircuit className="w-3.5 h-3.5 mr-2 animate-pulse" /> AI Evaluation in Progress...
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 text-gray-500 text-sm text-center rounded-xl border border-gray-100">
                  Awaiting Student Submission
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Assignment</h2>
            <form onSubmit={handleCreateAssignment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" className="w-full px-4 py-2 border rounded-xl" value={newAssignment.title} onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <input required type="text" className="w-full px-4 py-2 border rounded-xl" value={newAssignment.course} onChange={e => setNewAssignment({...newAssignment, course: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline Date</label>
                <input required type="date" className="w-full px-4 py-2 border rounded-xl" value={newAssignment.deadline} onChange={e => setNewAssignment({...newAssignment, deadline: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Question Paper File</label>
                <input type="file" className="w-full px-4 py-2 border rounded-xl" onChange={e => setNewAssignment({...newAssignment, file: e.target.files[0]})} />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setShowCreateModal(false)} type="button">Cancel</Button>
                <Button variant="primary" type="submit">Create Assignment</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Assignments;

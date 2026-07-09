import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Filter, CheckCircle2, MessageSquare, AlertCircle, FileText, Check, Calendar, Users, Briefcase } from 'lucide-react';
import Button from '../../components/Button';

// Removed dummy notifications data

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('eduflow_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const response = await fetch('http://localhost:8000/api/notifications/', { headers });
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const mappedData = data.results.map(n => ({
            id: n.id,
            type: n.type,
            title: n.title,
            message: n.message,
            time: new Date(n.created_at).toLocaleDateString(),
            read: n.read
          }));
          setNotifications(mappedData);
        } else if (Array.isArray(data)) {
          const mappedData = data.map(n => ({
            id: n.id,
            type: n.type,
            title: n.title,
            message: n.message,
            time: new Date(n.created_at).toLocaleDateString(),
            read: n.read
          }));
          setNotifications(mappedData);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.log('Failed to fetch notifications:', err);
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'exam': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'assignment': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'meeting': return <Users className="w-5 h-5 text-indigo-600" />;
      case 'attendance': return <Calendar className="w-5 h-5 text-orange-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'exam': return 'bg-red-100';
      case 'assignment': return 'bg-blue-100';
      case 'meeting': return 'bg-indigo-100';
      case 'attendance': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  const markAllRead = async () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    // Also persist to backend if token available
    const token = localStorage.getItem('eduflow_token');
    if (token) {
      try {
        await fetch('http://localhost:8000/api/notifications/', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ mark_all_read: true })
        });
      } catch {}
    }
  };

  const markOneRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filteredNotifs = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.message.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'unread') return matchesSearch && !n.read;
    return matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-100 text-primary-600 rounded-xl relative">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Smart Notifications
            </h1>
            <p className="text-gray-500 text-sm mt-1">AI-prioritized alerts and reminders.</p>
          </div>
        </div>
        <Button variant="outline" onClick={markAllRead}>
          <Check className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'all' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${filter === 'unread' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Unread <span className="ml-1 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">{unreadCount}</span>
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search reminders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all w-full sm:w-64"
            />
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          <AnimatePresence>
            {filteredNotifs.length > 0 ? (
              filteredNotifs.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-6 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50/30' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${getColor(notif.type)}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-sm font-bold ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4 font-semibold">{notif.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notif.message}</p>
                  </div>
                  {!notif.read && (
                    <div className="flex-shrink-0 self-center" onClick={() => markOneRead(notif.id)}>
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full shadow-sm shadow-primary-500/50 cursor-pointer hover:bg-gray-400 transition-colors" title="Mark as read" />
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p>No reminders found matching your criteria.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

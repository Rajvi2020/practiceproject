import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users, Building, Zap } from 'lucide-react';
import Button from '../../components/Button';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

const scheduleData = [
  { day: 'Monday', time: '09:00 AM', subject: 'Mathematics 101', type: 'Lecture', duration: 2, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { day: 'Monday', time: '11:00 AM', subject: 'Physics Lab', type: 'Lab', duration: 2, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { day: 'Tuesday', time: '08:00 AM', subject: 'Computer Science', type: 'Lecture', duration: 1, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { day: 'Wednesday', time: '10:00 AM', subject: 'World History', type: 'Lecture', duration: 1, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { day: 'Thursday', time: '01:00 PM', subject: 'Advanced Chemistry', type: 'Lecture', duration: 2, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { day: 'Friday', time: '09:00 AM', subject: 'Physical Education', type: 'Activity', duration: 1, color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

const Timetable = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  const getEvent = (day, time) => {
    return scheduleData.find(s => s.day === day && s.time === time);
  };

  const tabs = [
    { id: 'weekly', name: 'Weekly Timetable', icon: CalendarIcon },
    { id: 'faculty', name: 'Faculty Availability', icon: Users },
    { id: 'rooms', name: 'Room Allocation', icon: Building },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timetable Optimization</h1>
          <p className="text-gray-500 text-sm mt-1">Manage schedules, rooms, and faculty allocation.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="text-purple-700 border-purple-200 hover:bg-purple-50">
            <Zap className="w-4 h-4 mr-2" /> AI Optimize Schedule
          </Button>
          <Button variant="primary">Add Event</Button>
        </div>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl w-max overflow-x-auto max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-white text-primary-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" /> {tab.name}
          </button>
        ))}
      </div>

      {activeTab === 'weekly' ? (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Current Week</h3>
            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 text-sm font-medium text-gray-700">Oct 12 - Oct 16, 2026</span>
              <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-6 border-b border-gray-100 bg-gray-50/80">
              <div className="p-4 flex items-center justify-center border-r border-gray-100">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              {days.map((day, idx) => (
                <div key={idx} className="p-4 text-center border-r border-gray-100 last:border-0">
                  <span className="font-semibold text-gray-900">{day}</span>
                </div>
              ))}
            </div>

            {/* Grid Body */}
            <div className="divide-y divide-gray-100">
              {timeSlots.map((time, timeIdx) => (
                <div key={timeIdx} className="grid grid-cols-6">
                  {/* Time Column */}
                  <div className="p-4 text-sm font-medium text-gray-500 text-center border-r border-gray-100 bg-gray-50/30 flex items-center justify-center">
                    {time}
                  </div>
                  
                  {/* Day Columns */}
                  {days.map((day, dayIdx) => {
                    const event = getEvent(day, time);
                    return (
                      <div key={dayIdx} className={`p-2 border-r border-gray-100 last:border-0 min-h-[100px] relative transition-colors hover:bg-gray-50/50`}>
                        {event && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute inset-x-2 top-2 p-3 rounded-xl border shadow-sm ${event.color} z-10 overflow-hidden flex flex-col`}
                            style={{ height: `calc(${event.duration * 100}% - 16px)` }}
                          >
                            <p className="font-bold text-sm truncate">{event.subject}</p>
                            <p className="text-xs opacity-80 mt-1 font-medium truncate">{event.type}</p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm text-center">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Module Under Construction</h2>
          <p className="text-gray-500 mt-2">{activeTab === 'faculty' ? 'Faculty availability matrix' : 'Room allocation visualization'} will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default Timetable;

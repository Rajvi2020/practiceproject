import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Save, Globe } from 'lucide-react';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ').slice(1).join(' ') || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');

  const handleSaveProfile = async () => {
    try {
      if (!user?.id) return alert("User ID not found");
      const token = localStorage.getItem('eduflow_token');
      const response = await fetch(`http://localhost:8000/api/accounts/users/${user.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone
        })
      });
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'language', name: 'Language & Region', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account preferences and personal information.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <Button variant="outline" className="mb-2">Change Avatar</Button>
                      <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Input label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input label="Phone Number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <Button variant="primary" onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Language & Region</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Language</label>
                    <select className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Time Zone</label>
                    <select className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Greenwich Mean Time (GMT)</option>
                      <option>Indian Standard Time (IST)</option>
                    </select>
                  </div>
                  <Button variant="primary" className="mt-4" onClick={() => alert("Settings saved!")}>Save Preferences</Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Notification Preferences</h3>
                {['Email Notifications', 'Push Notifications', 'Weekly Reports', 'New Assignments', 'Meeting Reminders'].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{item}</p>
                      <p className="text-sm text-gray-500">Receive updates about {item.toLowerCase()}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 2} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Update Password</h3>
                <div className="space-y-4 max-w-md">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                  <Button variant="primary" className="mt-4" onClick={() => alert("Password updated!")}>Update Password</Button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Theme Preference</h3>
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-primary-500 bg-primary-50">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">☀️</div>
                    <span className="text-sm font-medium text-primary-700">Light</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent bg-gray-50 hover:bg-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gray-900 shadow-sm flex items-center justify-center">🌙</div>
                    <span className="text-sm font-medium text-gray-600">Dark</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent bg-gray-50 hover:bg-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-900 shadow-sm flex items-center justify-center">💻</div>
                    <span className="text-sm font-medium text-gray-600">System</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

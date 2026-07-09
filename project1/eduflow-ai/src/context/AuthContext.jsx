import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eduflow_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (userData) => {
    try {
      // In a real app, userData contains { email/username, password }
      // For now, if it's the dummy login form, we'll try to hit the API, 
      // but if the API fails (e.g. backend not running), we'll fallback to dummy data.
      let userObj = null;
      let token = null;

      try {
        const response = await fetch('http://localhost:8000/api/accounts/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: userData.email, // using email as username
            password: userData.password
          })
        });

        if (response.ok) {
          const data = await response.json();
          token = data.access;
          localStorage.setItem('eduflow_token', token);
          
          const decoded = jwtDecode(token);
          userObj = {
            id: decoded.user_id,
            name: decoded.username || 'User',
            email: userData.email,
            role: decoded.role || userData.role || 'student',
            avatar: null,
          };
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (err) {
        console.error('Backend API login failed:', err);
        throw err;
      }

      setUser(userObj);
      localStorage.setItem('eduflow_user', JSON.stringify(userObj));
      return userObj;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduflow_user');
    localStorage.removeItem('eduflow_token');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;

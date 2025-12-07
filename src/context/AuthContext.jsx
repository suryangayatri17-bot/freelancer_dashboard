import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Mock user data for UI demo
const mockUser = {
  id: 12,
  name: 'Jane Developer',
  email: 'jane@example.com',
  role: 'freelancer',
  avatar: 'JD',
  title: 'Senior React Developer',
  rating: 4.9,
  bio: '5+ years experience with React, Django, and cloud platforms',
  isAuthenticated: true,
  profile_id: 1,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    // Mock login
    setUser(mockUser);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, theme, toggleTheme, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

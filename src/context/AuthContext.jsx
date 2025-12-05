import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Gayathri suryan',
    email: 'suryan@freelancer.com',
    role: 'freelancer',
    avatar: 'GS',
    title: 'freelancer dashboard',
    rating: 4.8,
    isAuthenticated: true,
  });

  const [theme, setTheme] = useState('light');

  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  const updateUserRole = (newRole) => {
    setUser({ ...user, role: newRole });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const value = {
    user,
    logout,
    updateUserRole,
    theme,
    toggleTheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

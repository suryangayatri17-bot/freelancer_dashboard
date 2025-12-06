import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (token in localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/profiles/me/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser({
              id: data.user_id,
              name: data.first_name || data.user.username,
              email: data.user.email,
              role: data.role,
              avatar: (data.first_name || data.user.username).substring(0, 2).toUpperCase(),
              title: data.title || 'Professional',
              rating: data.rating || 0,
              bio: data.bio || '',
              isAuthenticated: true,
              profile_id: data.id,
            });
          } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null);
          }
        } catch (err) {
          console.error('Auth check failed:', err);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      // Fetch user profile
      const profileResponse = await fetch(`${API_BASE_URL}/profiles/me/`, {
        headers: {
          'Authorization': `Bearer ${data.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUser({
          id: profileData.user_id,
          name: profileData.first_name || profileData.user.username,
          email: profileData.user.email,
          role: profileData.role,
          avatar: (profileData.first_name || profileData.user.username).substring(0, 2).toUpperCase(),
          title: profileData.title || 'Professional',
          rating: profileData.rating || 0,
          bio: profileData.bio || '',
          isAuthenticated: true,
          profile_id: profileData.id,
        });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      console.error('Token refresh failed:', err);
      logout();
      return false;
    }
  };

  const updateProfile = async (updates) => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(`${API_BASE_URL}/profiles/update_profile/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const data = await response.json();
        setUser((prev) => ({
          ...prev,
          title: data.title || prev.title,
          bio: data.bio || prev.bio,
          rating: data.rating || prev.rating,
        }));
        return data;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateUserRole = (newRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const value = {
    user,
    login,
    logout,
    refreshToken,
    updateProfile,
    updateUserRole,
    theme,
    toggleTheme,
    loading,
    error,
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

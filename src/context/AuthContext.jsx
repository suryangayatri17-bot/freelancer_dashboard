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

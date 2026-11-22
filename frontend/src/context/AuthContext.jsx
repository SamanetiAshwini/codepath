import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check saved session on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('codepath_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.getProfile();
        if (res.success && res.profile) {
          setUser({ ...res.profile, progress: res.progress });
        } else {
          localStorage.removeItem('codepath_token');
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
        localStorage.removeItem('codepath_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res.success) {
      localStorage.setItem('codepath_token', res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || 'Login failed' };
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success) {
      localStorage.setItem('codepath_token', res.token);
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('codepath_token');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.getProfile();
      if (res.success && res.profile) {
        setUser({ ...res.profile, progress: res.progress });
      }
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        refreshUser
      }}
    >
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

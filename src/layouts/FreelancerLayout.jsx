import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function FreelancerLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

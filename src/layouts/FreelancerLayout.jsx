import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function FreelancerLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Sidebar />
        </div>

        {/* Main dashboard placeholder */}
        <div className="col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

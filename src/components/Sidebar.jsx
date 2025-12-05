import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const stats = {
    earningsThisMonth: 4362,
    openProjects: 4,
    rating: 4.8,
  };

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/proposals', label: 'Proposals', icon: '💼' },
    { path: '/contracts', label: 'Contracts', icon: '📋' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-24 space-y-4">
      {/* Profile */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            {user.avatar}
          </div>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.title}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-500">Earnings</div>
            <div className="font-medium">${stats.earningsThisMonth}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Projects</div>
            <div className="font-medium">{stats.openProjects}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Rating</div>
            <div className="font-medium">{stats.rating}★</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4 text-sm text-gray-700 uppercase">Navigation</h3>
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3 text-sm text-gray-700">Quick Actions</h3>
        <div className="flex flex-col gap-2">
          <button className="text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium transition">
            + New Proposal
          </button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium transition">
            📄 Create Invoice
          </button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-50 text-sm font-medium transition">
            💬 Message Client
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3 text-sm text-gray-700">Recent Activity</h3>
        <ul className="text-sm space-y-2 text-gray-600">
          <li className="text-xs">
            <span className="font-medium text-gray-700">✅ Proposal accepted</span>
            <p className="text-gray-500 mt-0.5">BrightStart Co. • 2h ago</p>
          </li>
          <li className="text-xs">
            <span className="font-medium text-gray-700">💰 Payment received</span>
            <p className="text-gray-500 mt-0.5">$1,200 from GreenLeaf • 1d ago</p>
          </li>
          <li className="text-xs">
            <span className="font-medium text-gray-700">⭐ Review posted</span>
            <p className="text-gray-500 mt-0.5">FitLab (5★ rating) • 3d ago</p>
          </li>
        </ul>
      </div>

      {/* User Role Badge */}
      <div className="bg-indigo-50 rounded-lg p-3 text-center border border-indigo-100">
        <p className="text-xs text-gray-600 mb-1">Your Role</p>
        <p className="font-semibold text-indigo-700 capitalize">{user.role}</p>
      </div>
    </div>
  );
}

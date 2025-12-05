import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, theme, toggleTheme } = useAuth();
  const [query, setQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white shadow p-4 mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-xl font-semibold hover:bg-gray-100 p-2 rounded">☰</button>
          <div>
            <h1 className="text-2xl font-bold">Freelancer Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome, {user.name} • {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search projects, clients or IDs"
            />
            {query && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl hover:bg-gray-100 p-2 rounded transition"
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Notifications */}
          <button className="relative text-xl hover:bg-gray-100 p-2 rounded transition" title="Notifications">
            🔔
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded transition"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">Hello,</div>
                <div className="font-medium">{user.name.split(' ')[0]}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                {user.avatar}
              </div>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <div className="p-4 border-b">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-indigo-600 font-medium mt-1">{user.title}</p>
                </div>
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                    👤 Profile Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                    ⚙️ Account Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                    📊 Analytics
                  </button>
                  <div className="border-t my-2"></div>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600 font-medium"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');

  return (
    <header className="bg-white shadow p-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="text-xl font-semibold">☰</button>
          <div>
            <h1 className="text-2xl font-bold">Freelancer Dashboard</h1>
            <p className="text-sm text-gray-500">
              Overview of your projects & activity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border rounded-md px-3 py-2 w-64"
              placeholder="Search projects, clients or IDs"
            />
            {query && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-gray-500">Hello,</div>
              <div className="font-medium">You</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">GS</div>
          </div>
        </div>
      </div>
    </header>
  );
}

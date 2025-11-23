import React from 'react';

export default function Sidebar() {
  const stats = {
    earningsThisMonth: 4362,
    openProjects: 4,
    rating: 4.8,
  };

  return (
    <div className="sticky top-6 space-y-4">
      {/* Profile */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl">
           GS 
          </div>
          <div>
            <div className="font-semibold">You</div>
            <div className="text-sm text-gray-500">Senior Frontend Developer</div>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Quick Actions</h3>
        <div className="flex flex-col gap-2">
          <button className="text-left px-3 py-2 rounded hover:bg-gray-50">+ New Proposal</button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-50">Create Invoice</button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-50">Message Client</button>
        </div>
      </div>

      {/* Activity */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-2">Activity</h3>
        <ul className="text-sm space-y-2 text-gray-600">
          <li>• Proposal accepted by BrightStart. <span className="text-xs text-gray-400">2h ago</span></li>
          <li>• Payment of $1200 received. <span className="text-xs text-gray-400">1d ago</span></li>
          <li>• Client left a review for FitLab. <span className="text-xs text-gray-400">3d ago</span></li>
        </ul>
      </div>
    </div>
  );
}

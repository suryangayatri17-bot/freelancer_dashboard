import React, { useState } from 'react';

export default function FreelancerDashboard() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = {
    earningsThisMonth: 4362,
    openProjects: 4,
    proposalsSent: 12,
    rating: 4.8,
  };

  const projects = [
    {
      id: 'P-101',
      title: 'React + Tailwind Website',
      client: 'BrightStart Co.',
      budget: 1200,
      status: 'In Progress',
      progress: 65,
      due: 'Dec 05, 2025',
    },
    {
      id: 'P-102',
      title: 'Mobile App UI (Figma)',
      client: 'GreenLeaf',
      budget: 800,
      status: 'Awaiting Feedback',
      progress: 40,
      due: 'Nov 30, 2025',
    },
    {
      id: 'P-103',
      title: 'E-commerce Backend (Node.js)',
      client: 'MarketHub',
      budget: 2200,
      status: 'Pending',
      progress: 5,
      due: 'Jan 10, 2026',
    },
    {
      id: 'P-104',
      title: 'Landing Page Conversion Rate Test',
      client: 'FitLab',
      budget: 450,
      status: 'Completed',
      progress: 100,
      due: 'Oct 20, 2025',
    },
  ];

  const filtered = projects.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.client.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Earnings (This Month)" value={`$${stats.earningsThisMonth}`} />
        <StatCard title="Open Projects" value={stats.openProjects} />
        <StatCard title="Proposals Sent" value={stats.proposalsSent} />
        <StatCard title="Average Rating" value={`${stats.rating} ★`} />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Projects</h2>
          <div className="text-sm text-gray-500">{filtered.length} result(s)</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-xs text-gray-500 border-b">
              <tr>
                <th className="py-2 px-3">Project</th>
                <th className="py-2 px-3">Client</th>
                <th className="py-2 px-3">Budget</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Progress</th>
                <th className="py-2 px-3">Due</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-3">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-400">{p.id}</div>
                  </td>
                  <td className="py-3 px-3">{p.client}</td>
                  <td className="py-3 px-3">${p.budget}</td>
                  <td className="py-3 px-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3 px-3 w-48">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${p.progress}%`, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)' }} />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{p.progress}%</div>
                  </td>
                  <td className="py-3 px-3">{p.due}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-sm border rounded">View</button>
                      <button className="px-2 py-1 text-sm border rounded">Manage</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Insights</h3>
          <p className="text-sm text-gray-600 mb-4">Quick visual of earnings and activity.</p>

          <div className="flex gap-6">
            <div className="flex-1">
              <MiniChart title="Earnings (Last 6 months)" points={[1200, 1500, 900, 2200, 1800, 2400]} />
            </div>
            <div className="w-56">
              <h4 className="font-medium">Top Clients</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-2">
                <li>BrightStart Co. — $2,400</li>
                <li>MarketHub — $1,900</li>
                <li>GreenLeaf — $800</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">Recent Messages</h3>
          <div className="text-sm text-gray-600 space-y-3">
            <div>
              <div className="font-medium">BrightStart Co.</div>
              <div className="text-xs text-gray-400">Can you provide an ETA for the homepage? · 4h ago</div>
            </div>
            <div>
              <div className="font-medium">GreenLeaf</div>
              <div className="text-xs text-gray-400">Left feedback on the Figma draft. · 1d ago</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Freelancer Dashboard — built with ❤️</footer>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Awaiting Feedback': 'bg-blue-100 text-blue-800',
    Pending: 'bg-gray-100 text-gray-800',
    Completed: 'bg-green-100 text-green-800',
  };
  return <span className={`px-2 py-1 rounded text-xs ${map[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
}

function MiniChart({ title, points = [] }) {
  const w = 240;
  const h = 60;
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const step = points.length > 1 ? w / (points.length - 1) : w;
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - ((p - min) / (max - min || 1)) * h}`)
    .join(' ');

  return (
    <div>
      <div className="text-sm text-gray-500">{title}</div>
      <svg width={w} height={h} className="mt-2">
        <path d={path} fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

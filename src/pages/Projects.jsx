import React, { useState } from 'react';

export default function Projects() {
  const [projects] = useState([
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
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Awaiting Feedback':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Projects</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + New Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.client}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Progress</span>
                <span className="font-semibold">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="font-semibold">${project.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Due Date</p>
                  <p className="font-semibold text-sm">{project.due}</p>
                </div>
                <div className="text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

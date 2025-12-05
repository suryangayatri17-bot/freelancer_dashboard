import React, { useState } from 'react';

export default function Contracts() {
  const [contracts] = useState([
    {
      id: 'C-301',
      title: 'Long-term UI/UX Design Services',
      client: 'DesignHub Pro',
      value: 25000,
      status: 'Active',
      startDate: 'Nov 01, 2025',
      endDate: 'May 31, 2026',
      milestones: 6,
      completedMilestones: 2,
    },
    {
      id: 'C-302',
      title: 'Full Stack Development Contract',
      client: 'StartupX',
      value: 15000,
      status: 'Active',
      startDate: 'Oct 15, 2025',
      endDate: 'Feb 28, 2026',
      milestones: 4,
      completedMilestones: 1,
    },
    {
      id: 'C-303',
      title: 'Content Writing & SEO Optimization',
      client: 'BlogMaster',
      value: 8000,
      status: 'Completed',
      startDate: 'Sep 01, 2025',
      endDate: 'Nov 30, 2025',
      milestones: 3,
      completedMilestones: 3,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Contracts</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + New Contract
        </button>
      </div>

      <div className="grid gap-4">
        {contracts.map((contract) => (
          <div key={contract.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{contract.title}</h3>
                <p className="text-gray-600 text-sm">{contract.client}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contract.status)}`}>
                {contract.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Contract Value</p>
                  <p className="font-semibold text-lg">${contract.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="font-semibold text-sm">{contract.startDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="font-semibold text-sm">{contract.endDate}</p>
                </div>
                <div className="text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    View Details →
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">Milestones Progress</span>
                  <span className="text-sm font-semibold">
                    {contract.completedMilestones} / {contract.milestones}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(contract.completedMilestones / contract.milestones) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

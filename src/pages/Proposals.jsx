import React, { useState } from 'react';

export default function Proposals() {
  const [proposals] = useState([
    {
      id: 'PROP-201',
      title: 'AI-Powered Analytics Dashboard',
      client: 'DataViz Inc.',
      amount: 3500,
      status: 'Under Review',
      submittedOn: 'Dec 03, 2025',
      deadline: 'Dec 10, 2025',
    },
    {
      id: 'PROP-202',
      title: 'WordPress Theme Customization',
      client: 'StyleWeb',
      amount: 650,
      status: 'Accepted',
      submittedOn: 'Nov 28, 2025',
      deadline: 'Dec 15, 2025',
    },
    {
      id: 'PROP-203',
      title: 'Python Automation Script',
      client: 'TechFlow',
      amount: 1200,
      status: 'Waiting for Client Response',
      submittedOn: 'Nov 25, 2025',
      deadline: 'Dec 08, 2025',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Waiting for Client Response':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Proposals</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Send Proposal
        </button>
      </div>

      <div className="grid gap-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{proposal.title}</h3>
                <p className="text-gray-600 text-sm">{proposal.client}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                {proposal.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Bid Amount</p>
                <p className="font-semibold text-lg">${proposal.amount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Submitted</p>
                <p className="font-semibold text-sm">{proposal.submittedOn}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Response Deadline</p>
                <p className="font-semibold text-sm">{proposal.deadline}</p>
              </div>
              <div className="text-right">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

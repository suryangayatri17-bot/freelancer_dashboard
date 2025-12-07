// src/services/api.js
// Mock API service for UI demo - no backend required

const mockProjects = [
  {
    id: 'P-101',
    title: 'React + Tailwind Website',
    description: 'Build a full-stack e-commerce platform with React and Django',
    client: 'BrightStart Co.',
    budget: 1200,
    status: 'In Progress',
    progress: 65,
    due: 'Dec 05, 2025',
  },
  {
    id: 'P-102',
    title: 'Mobile App UI (Figma)',
    description: 'Design a mobile app for fitness tracking',
    client: 'GreenLeaf',
    budget: 800,
    status: 'Awaiting Feedback',
    progress: 40,
    due: 'Nov 30, 2025',
  },
  {
    id: 'P-103',
    title: 'E-commerce Backend (Node.js)',
    description: 'Redesign the admin dashboard for better UX',
    client: 'MarketHub',
    budget: 2200,
    status: 'Pending',
    progress: 5,
    due: 'Jan 10, 2026',
  },
];

const mockProposals = [
  {
    id: 'PROP-001',
    project: 'E-commerce Platform',
    client: 'BrightStart Co.',
    amount: 13000,
    status: 'accepted',
    timeline: 50,
  },
  {
    id: 'PROP-002',
    project: 'Mobile App Design',
    client: 'GreenLeaf',
    amount: 7500,
    status: 'pending',
    timeline: 40,
  },
];

const mockContracts = [
  {
    id: 'C-001',
    project: 'E-commerce Platform',
    client: 'BrightStart Co.',
    value: 13000,
    status: 'active',
    startDate: '2025-11-27',
    endDate: '2026-01-15',
  },
];

export const projectsApi = {
  list: async () => Promise.resolve(mockProjects),
  get: async (id) => Promise.resolve(mockProjects.find(p => p.id === id)),
};

export const proposalsApi = {
  list: async () => Promise.resolve(mockProposals),
};

export const contractsApi = {
  list: async () => Promise.resolve(mockContracts),
};

export const profilesApi = {
  me: async () => Promise.resolve({
    id: 1,
    user: { id: 12, username: 'freelancer1', email: 'jane@example.com' },
    role: 'freelancer',
    title: 'Senior React Developer',
    rating: 4.9,
  }),
};
    const response = await fetch(`${API_BASE_URL}/proposals/${id}/reject/`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

export const contractsApi = {
  list: async () => {
    const response = await fetch(`${API_BASE_URL}/contracts/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  get: async (id) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateMilestone: async (id, milestoneIndex, progress) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}/update_milestone/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ milestone_index: milestoneIndex, progress }),
    });
    return handleResponse(response);
  },
};

export const profilesApi = {
  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/profiles/me/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateProfile: async (data) => {
    const response = await fetch(`${API_BASE_URL}/profiles/update_profile/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

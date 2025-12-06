// src/services/api.js
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
};

export const projectsApi = {
  list: async () => {
    const response = await fetch(`${API_BASE_URL}/projects/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  get: async (id) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/projects/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  assignFreelancer: async (id, freelancerId) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/assign_freelancer/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ freelancer_id: freelancerId }),
    });
    return handleResponse(response);
  },
};

export const proposalsApi = {
  list: async () => {
    const response = await fetch(`${API_BASE_URL}/proposals/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  get: async (id) => {
    const response = await fetch(`${API_BASE_URL}/proposals/${id}/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/proposals/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  accept: async (id) => {
    const response = await fetch(`${API_BASE_URL}/proposals/${id}/accept/`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  reject: async (id) => {
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

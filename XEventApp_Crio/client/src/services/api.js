import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
console.log(API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH APIs ====================

export const authAPI = {
  // Signup
  signup: async (data) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  // Login
  login: async (data) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// ==================== USER APIs ====================

export const userAPI = {
  // Get profile
  getProfile: async () => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.put('/api/users/profile', data);
    return response.data;
  },

  // Update profile with avatar (FormData)
  updateProfileWithAvatar: async (formData) => {
    const response = await api.put('/api/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Request organizer role
  requestOrganizerRole: async (reason) => {
    const response = await api.put('/api/users/request-organizer', { reason });
    return response.data;
  },
};

// ==================== ADMIN APIs ====================

export const adminAPI = {
  // Get all organizer requests
  getOrganizerRequests: async (status) => {
    const url = status
      ? `/api/admin/organizer-requests?status=${status}`
      : '/api/admin/organizer-requests';
    const response = await api.get(url);
    return response.data;
  },

  // Approve organizer request
  approveOrganizerRequest: async (requestId, adminComments) => {
    const response = await api.put(
      `/api/admin/organizer-requests/${requestId}/approve`,
      { adminComments }
    );
    return response.data;
  },

  // Reject organizer request
  rejectOrganizerRequest: async (requestId, adminComments) => {
    const response = await api.put(
      `/api/admin/organizer-requests/${requestId}/reject`,
      { adminComments }
    );
    return response.data;
  },

  // Approve user as organizer by user ID
  approveUserAsOrganizer: async (userId) => {
    const response = await api.put(
      `/api/admin/users/${userId}/approve-organizer`
    );
    return response.data;
  },

  // Get event registrations
  getEventRegistrations: async (eventId) => {
    const response = await api.get(
      `/api/admin/events/${eventId}/registrations`
    );
    return response.data;
  },
};

// ==================== EVENT APIs ====================

export const eventAPI = {
  // Get all events with filters
  getAllEvents: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params.append(key, filters[key]);
    });
    const response = await api.get(`/api/events?${params.toString()}`);
    return response.data;
  },

  // Get event by ID
  getEventById: async (eventId) => {
    const response = await api.get(`/api/events/${eventId}`);
    return response.data;
  },

  // Create event
  createEvent: async (data) => {
    const response = await api.post('/api/events', data);
    return response.data;
  },

  // Create event with image (FormData)
  createEventWithImage: async (formData) => {
    const response = await api.post('/api/events', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update event
  updateEvent: async (eventId, data) => {
    const response = await api.put(`/api/events/${eventId}`, data);
    return response.data;
  },

  // Update event with image (FormData)
  updateEventWithImage: async (eventId, formData) => {
    const response = await api.put(`/api/events/${eventId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete event
  deleteEvent: async (eventId) => {
    const response = await api.delete(`/api/events/${eventId}`);
    return response.data;
  },

  // Get organizer's events
  getOrganizerEvents: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params.append(key, filters[key]);
    });
    const response = await api.get(
      `/api/events/organizer/get?${params.toString()}`
    );
    return response.data;
  },
};

// ==================== REGISTRATION APIs ====================

export const registrationAPI = {
  // Register for event
  registerForEvent: async (eventId) => {
    const response = await api.post(`/api/registration/${eventId}`);
    return response.data;
  },

  // Cancel registration
  cancelRegistration: async (eventId, reason) => {
    const response = await api.delete(`/api/registration/${eventId}`, {
      data: { reason },
    });
    return response.data;
  },

  // Get my registrations
  getMyRegistrations: async (status) => {
    const url = status
      ? `/api/registration/my-registrations?status=${status}`
      : '/api/registration/my-registrations';
    const response = await api.get(url);
    return response.data;
  },

  // Check if registered
  isRegistered: async (eventId) => {
    const response = await api.get(
      `/api/registration/is-registered/${eventId}`
    );
    return response.data;
  },
};

export default api;

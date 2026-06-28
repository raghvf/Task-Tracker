import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400 && data.errors) {
        const messages = data.errors.map((e) => e.message).join(', ');
        error.validationMessage = messages;
      } else if (status === 404) {
        error.message = data.message || 'Resource not found';
      } else if (status >= 500) {
        error.message = data.message || 'Server error. Please try again later.';
      } else {
        error.message = data.message || 'Something went wrong';
      }
    } else if (error.request) {
      error.message = 'Network error. Please check your connection.';
    } else {
      error.message = error.message || 'An unexpected error occurred';
    }

    return Promise.reject(error);
  }
);

export const taskAPI = {
  getAll: (params) => api.get('/tasks', { params }),
  getById: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
};

export const showErrorToast = (error) => {
  const message =
    error.validationMessage || error.message || 'An error occurred';
  toast.error(message);
};

export default api;

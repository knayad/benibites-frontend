import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
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

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
    changePassword: (data) => api.put('/auth/change-password', data),
    verifyEmployee: (data) => api.post('/auth/verify-employee', data),
    logout: () => api.post('/auth/logout'),
};

// Restaurants API
export const restaurantsAPI = {
    getAll: (params) => api.get('/restaurants', { params }),
    search: (params) => api.get('/restaurants/search', { params }),
    getById: (id) => api.get(`/restaurants/${id}`),
    create: (data) => api.post('/restaurants', data),
    update: (id, data) => api.put(`/restaurants/${id}`, data),
    delete: (id) => api.delete(`/restaurants/${id}`),
    getBenefits: (id) => api.get(`/restaurants/${id}/benefits`),
    updateBenefits: (id, data) => api.put(`/restaurants/${id}/benefits`, data),
    getStats: (id) => api.get(`/restaurants/${id}/stats`),
};

// Reviews API
export const reviewsAPI = {
    getByRestaurant: (restaurantId) => api.get(`/reviews/business/${restaurantId}`),
    create: (data) => api.post('/reviews', data),
    update: (id, data) => api.put(`/reviews/${id}`, data),
    delete: (id) => api.delete(`/reviews/${id}`),
    vote: (id, voteType) => api.post(`/reviews/${id}/vote`, { voteType }),
    report: (id, reason) => api.post(`/reviews/${id}/report`, { reason }),
};

// User Verification API
export const verificationAPI = {
    getStatus: () => api.get('/user-verification/status'),
    verifyIdentity: (data) => api.post('/user-verification/identity', data),
    verifyEmployment: (data) => api.post('/user-verification/employment', data),
    verifyBusiness: (data) => api.post('/user-verification/business', data),
    verifyUser: (userId, data) => api.post(`/user-verification/${userId}/verify`, data),
    getHistory: (userId) => api.get(`/user-verification/${userId}/history`),
};

// Business Attributes API
export const businessAttributesAPI = {
    getByBusiness: (businessId) => api.get(`/business-attributes/business/${businessId}`),
    getByCategory: (category) => api.get(`/business-attributes/category/${category}`),
    create: (data) => api.post('/business-attributes', data),
    addFeedback: (id, data) => api.post(`/business-attributes/${id}/feedback`, data),
    verify: (id, data) => api.post(`/business-attributes/${id}/verify`, data),
    getStats: (businessId) => api.get(`/business-attributes/stats/${businessId}`),
};

// Reports API
export const reportsAPI = {
    create: (data) => api.post('/reports', data),
    getByBusiness: (businessId) => api.get(`/reports/business/${businessId}`),
    getUserReports: () => api.get('/reports/user'),
    getBusinessAttributes: (businessId) => api.get(`/reports/business/${businessId}/attributes`),
    getBusinessDetails: (businessId) => api.get(`/reports/business/${businessId}/details`),
    getBusinessStats: (businessId) => api.get(`/reports/business/${businessId}/stats`),
};

// Payment API
export const paymentAPI = {
    addPaymentMethod: (data) => api.post('/payment/methods', data),
    getPaymentMethods: () => api.get('/payment/methods'),
    createTransaction: (data) => api.post('/payment/transaction', data),
    setDefaultMethod: (id) => api.post(`/payment/methods/${id}/default`),
    blockMethod: (id) => api.post(`/payment/methods/${id}/block`),
    unblockMethod: (id) => api.post(`/payment/methods/${id}/unblock`),
};

export default api; 
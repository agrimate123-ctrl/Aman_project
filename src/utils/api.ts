import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  getServices: async () => {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;
  },

  signup: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    address?: string;
  }) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  createBooking: async (bookingData: {
    user_id: string;
    service_id: string;
    email: string;
    pickup_date: string;
    pickup_time: string;
    address: string;
  }) => {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  },

  getUserBookings: async (email: string) => {
    const response = await axios.get(`${API_URL}/bookings/${email}`);
    return response.data;
  },

  getAllBookings: async () => {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  },

  updateBooking: async (id: string, updates: any) => {
    const response = await axios.patch(`${API_URL}/bookings/${id}`, updates);
    return response.data;
  },

  getProfile: async (email: string) => {
    const response = await axios.get(`${API_URL}/profile/${email}`);
    return response.data;
  },
};

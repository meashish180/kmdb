import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

export default API;
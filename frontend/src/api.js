import axios from 'axios';

const API = axios.create({
  baseURL: 'https://lex-port.onrender.com/api/v1/user',
});

// Added JWT token to every request 
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("⏳ Sending request with headers:", config.headers);
 // Standard header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;

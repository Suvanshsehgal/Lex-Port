import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:7000/api/v1/user', // Set base for auth routes
});

export default API;
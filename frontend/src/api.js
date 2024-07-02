import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Change this to your Flask backend URL if different
});

export default api;
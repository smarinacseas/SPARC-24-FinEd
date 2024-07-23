import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  withCredentials: true,
  headers: {
    'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  }
});

export default api;
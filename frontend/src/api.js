import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD ? '/finance' : 'http://localhost:8081/finance',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

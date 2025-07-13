import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // ✅ Sends cookies with requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default API;

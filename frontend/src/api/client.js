import axios from 'axios';

// Centralized HTTP client
const baseURL =
  process.env.REACT_APP_API_BASE ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://mahadbt-awareness-portal.onrender.com');

const client = axios.create({
  baseURL,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
});

export default client;



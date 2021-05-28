import axios from 'axios';
const baseURL =
  process.env.REACT_APP_BASE_URL || 'https://api.vachanengine.org/v2/';
export const API = axios.create({ baseURL: baseURL, timeout: 45000 });
export const CancelToken = axios.CancelToken;

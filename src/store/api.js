import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL || 'http://206.189.131.230/v2/';
export const API = axios.create({ baseURL: baseURL, timeout: 15000 });
export const CancelToken = axios.CancelToken;

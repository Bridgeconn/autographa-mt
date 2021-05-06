import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL || 'http://128.199.18.6/v2/';
export const API = axios.create({ baseURL: baseURL, timeout: 15000 });
export const CancelToken = axios.CancelToken;

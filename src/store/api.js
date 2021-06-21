import axios from 'axios';
// const baseURL =
//   process.env.REACT_APP_BASE_URL || 'https://api.vachanengine.org/v2/';
const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000/v2/';
export const API = axios.create({ baseURL: baseURL, timeout: 45000 });
export const CancelToken = axios.CancelToken;

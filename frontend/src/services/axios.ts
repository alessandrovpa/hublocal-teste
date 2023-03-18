import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

console.log(import.meta.url);
console.log(import.meta.env.BASE_URL);

export const api = axios.create({
  baseURL: apiUrl,
});

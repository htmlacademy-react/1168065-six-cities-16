import axios, { AxiosInstance } from 'axios';

const API_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';

const API_URL = 'https://16.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // добавляем токен к запросу
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  // вывод сообщений об общих ошибках
  api.interceptors.response.use(null, (error) => {
    if (isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        toast.error('Network connection error');
      }

      if (error.response && error.response.status >= 500) {
        toast.error('Server response error');
      }
    }
  });

  return api;
};

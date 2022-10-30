import axios, { AxiosError } from 'axios';
import { paths } from 'routes/routes';
import { TOKEN_STORAGE_KEY } from 'utils/html';

export const api = axios.create();
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      window.location.href = paths.loginPage;
    }
    return Promise.reject(error);
  }
);

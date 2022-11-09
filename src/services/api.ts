import axios, { AxiosError } from 'axios';
import { TokenType } from 'models/usuario';
import { useSnackbar } from 'notistack';
import { paths } from 'routes/routes';
import { TOKEN_STORAGE_KEY } from 'utils/html';

export const api = axios.create();
api.interceptors.request.use((config) => {
  const strToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (strToken) {
    const token = JSON.parse(strToken) as TokenType;
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token.access_token}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { enqueueSnackbar } = useSnackbar();
    if (
      error.response?.status === 401 &&
      localStorage.getItem(TOKEN_STORAGE_KEY)
    ) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.location.href = paths.loginPage;
      if (typeof enqueueSnackbar === 'function') {
        enqueueSnackbar('Você foi desconectado!', {
          variant: 'error',
        });
      }
    }
    return Promise.reject(error);
  }
);

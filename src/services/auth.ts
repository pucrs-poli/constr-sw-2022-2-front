import { TokenType, UsuarioType } from 'models/usuario';
import { toRequest } from 'utils/request';
import { api } from './api';
import { getAuthEndpoint } from './endpoints';

export const postLogin = (username: string, encriptedPassword: string) => {
  const url = `${getAuthEndpoint()}/login`;
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', window.atob(encriptedPassword));
  return toRequest<TokenType>(
    api.post,
    [
      url,
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    ],
    'login'
  );
};

export const getUserInfo = () => {
  const url = `${getAuthEndpoint()}/user-info`;
  return toRequest<UsuarioType>(api.get, [url], 'userInfo');
};

export const postRefreshToken = (refreshToken: string) => {
  const url = `${getAuthEndpoint()}/refresh-token`;
  return toRequest<TokenType>(api.post, [url, refreshToken], 'refreshToken');
};

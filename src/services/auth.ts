import { TokenType, UsuarioType } from 'models/usuario';
import { toRequest } from 'utils/request';
import { api } from './api';
import { authEndpoint } from './endpoints';

export const postLogin = (username: string, encriptedPassword: string) => {
  const url = `${authEndpoint}/login`;
  return toRequest<TokenType>(
    api.post,
    [url, { username, password: window.atob(encriptedPassword) }],
    'login'
  );
};

export const postUserInfo = () => {
  const url = `${authEndpoint}/login`;
  return toRequest<UsuarioType>(api.post, [url], 'userInfo');
};

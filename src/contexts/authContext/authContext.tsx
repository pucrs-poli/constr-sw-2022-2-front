import { Permission, userPermissionByGroup } from 'models/permission';
import { UsuarioType } from 'models/usuario';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';
import { postLogin, postUserInfo } from 'services/auth';
import { REDIRECT_URL_KEY, TOKEN_STORAGE_KEY } from 'utils/html';

interface Auth {
  permission?: Permission;
  loading: boolean;
  loadingUserData: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<Auth>({
  loading: true,
  loadingUserData: false,
  login: Promise.reject,
  logout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [permission, setPermission] = useState<Permission>();
  const history = useHistory();

  const userReceivedData = useCallback(
    (data: UsuarioType) => {
      console.log('userinfo', data);
      const p = userPermissionByGroup(data.groups[0]);

      if (p) {
        setPermission(p);
      } else {
        throw new Error('Usuário sem permissão');
      }
      let redirect = sessionStorage.getItem(REDIRECT_URL_KEY) ?? paths.homePage;
      sessionStorage.removeItem(REDIRECT_URL_KEY);

      if (
        redirect === paths.loginPage ||
        !Object.values(paths).some((p) => p === redirect)
      ) {
        redirect = paths.homePage;
      }
      history.replace(redirect);
    },
    [history]
  );

  const login = useCallback(
    async (username: string, encryptedPassword: string) => {
      setLoadingUserData(true);
      try {
        const login = await postLogin(username, encryptedPassword);
        sessionStorage.setItem(TOKEN_STORAGE_KEY, login.data.access_token);
        console.log('token', login);
        const userinfo = await postUserInfo();
        userReceivedData(userinfo.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUserData(false);
      }
    },
    [userReceivedData]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    history.push(paths.loginPage);
  }, [history]);

  useEffect(() => {
    if (sessionStorage.getItem(TOKEN_STORAGE_KEY)) {
      setLoadingUserData(true);
      setLoading(false);
      postUserInfo()
        .then((resp) => {
          userReceivedData(resp.data);
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoadingUserData(false);
        });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ permission, loading, loadingUserData, login, logout }}
    >
      {loading ? <div>...loading</div> : children}
    </AuthContext.Provider>
  );
}

import { Backdrop, CircularProgress } from '@mui/material';
import { Permission, userPermissionByGroup } from 'models/permission';
import { TokenType, UsuarioType } from 'models/usuario';
import { useSnackbar } from 'notistack';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';
import { postLogin, getUserInfo, postRefreshToken } from 'services/auth';
import { REDIRECT_URL_KEY, TOKEN_STORAGE_KEY } from 'utils/html';

interface Auth {
  userData?: UsuarioType;
  loadingUserData: boolean;
  permission?: Permission;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<Auth>({
  userData: undefined,
  loadingUserData: false,
  login: Promise.reject,
  logout: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UsuarioType>();
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [permission, setPermission] = useState<Permission>();
  const history = useHistory();
  const timerRef = useRef<NodeJS.Timeout | undefined>();

  const { enqueueSnackbar } = useSnackbar();

  const userReceivedData = useCallback(
    (data: UsuarioType) => {
      const p = userPermissionByGroup(data.groups);
      if (p) {
        setUserData(data);
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

  const logout = useCallback(() => {
    setPermission(undefined);
    setUserData(undefined);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    history.push(paths.loginPage);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, [history]);

  const handleRefreshToken = useCallback(
    (token: TokenType) => {
      console.log('token expires in ', token.expires_in);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        try {
          const req = await postRefreshToken(token.refresh_token);
          localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(req.data));
          handleRefreshToken(req.data);
        } catch (err) {
          enqueueSnackbar(
            (err as any)?.response?.data ?? 'Você foi desconectado!',
            {
              variant: 'error',
            }
          );
          logout();
        }
      }, token.expires_in * 1000 - 600);
    },
    [enqueueSnackbar, logout]
  );

  const login = useCallback(
    async (username: string, encryptedPassword: string) => {
      setLoadingUserData(true);
      try {
        const login = await postLogin(username, encryptedPassword);
        handleRefreshToken(login.data);
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(login.data));
        const userinfo = await getUserInfo();
        userReceivedData(userinfo.data);
      } catch (err) {
        enqueueSnackbar((err as any)?.response?.data ?? 'Erro ao fazer login', {
          variant: 'error',
        });
      } finally {
        setLoadingUserData(false);
      }
    },
    [enqueueSnackbar, handleRefreshToken, userReceivedData]
  );

  useEffect(() => {
    console.log('token: ', localStorage.getItem(TOKEN_STORAGE_KEY));
    if (localStorage.getItem(TOKEN_STORAGE_KEY)) {
      setLoadingUserData(true);
      getUserInfo()
        .then((resp) => {
          userReceivedData(resp.data);
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
          setLoadingUserData(false);
        });
    } else {
      setLoading(false);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ permission, userData, loadingUserData, login, logout }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || loadingUserData}
      >
        <CircularProgress color='secondary' />
      </Backdrop>
      {!loading && children}
    </AuthContext.Provider>
  );
}

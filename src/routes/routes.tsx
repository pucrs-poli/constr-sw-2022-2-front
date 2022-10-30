import { AuthContext } from 'contexts/authContext/authContext';
import { Permission } from 'models/permission';
import Forbidden from 'pages/forbidden/forbidden';
import HomePage from 'pages/homePage/homePage';
import Login from 'pages/login/login';
import NotFound from 'pages/notFound/notFound';
import { ComponentProps, Fragment, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { REDIRECT_URL_KEY } from 'utils/html';

interface RouteProps extends ComponentProps<typeof Route> {
  accesso?: (p: Permission) => boolean;
}

export const paths = {
  homePage: '/',
  loginPage: '/login',
  cadastro: '/cadastro',
};

const routes: RouteProps[] = [];

// Home Page
routes.push({
  path: paths.homePage,
  component: HomePage,
  exact: true,
});

routes.push({
  path: paths.cadastro,
  component: () => <div>Cadastro</div>,
  exact: true,
  accesso: (p) => p.cadastro.acesso,
});

// Not Found - Deixar esta por último!
routes.push({
  path: '*',
  component: NotFound,
  exact: true,
});

sessionStorage.setItem(REDIRECT_URL_KEY, window.location.pathname);
export default function Routes() {
  const { permission } = useContext(AuthContext);

  return (
    <Switch>
      {permission ? (
        routes.map((r, i) => {
          const component =
            !r.accesso || r.accesso(permission) ? r.component : Forbidden;
          return <Route {...r} key={i} component={component} />;
        })
      ) : (
        <Fragment>
          <Route path={paths.loginPage} component={Login} />
          <Redirect to={paths.loginPage} />
        </Fragment>
      )}
    </Switch>
  );
}

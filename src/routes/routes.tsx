import { Container } from '@mui/material';
import { AuthContext } from 'contexts/authContext/authContext';
import { Permission } from 'models/permission';
import Forbidden from 'pages/forbidden/forbidden';
import HomePage from 'pages/homePage/homePage';
import Login from 'pages/login/login';
import NotFound from 'pages/notFound/notFound';
import Predio from 'pages/predio/predio';
import PrediosSalas from 'pages/prediosSalas/prediosSalas';
import Recursos from 'pages/recursos/recursos';
import { ComponentProps, Fragment, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { REDIRECT_URL_KEY } from 'utils/html';

interface RouteProps extends ComponentProps<typeof Route> {
  acesso?: (p: Permission) => boolean;
}

export const paths = {
  homePage: '/',
  loginPage: '/login',
  prediosSalas: '/predios-salas',
  predio: '/predios-salas/adicionar',
  editarPredio: '/predios-salas/:id',
  recursos: '/recursos',
  disciplinas: '/disciplinas',
  turmas: '/turmas',
  aulas: '/aulas',
  reservas: '/reservas',
  // Exemplo:
  cadastro: '/cadastro',
};

const routes: RouteProps[] = [];

// Home Page (rota aberta para usuarios LOGADOS)
routes.push({
  path: paths.homePage,
  component: HomePage,
  exact: true,
});

// ... inicio Rotas dos Grupos
routes.push({
  path: paths.prediosSalas,
  component: PrediosSalas,
  exact: true,
});

routes.push({
  path: [paths.predio, paths.editarPredio],
  component: Predio,
  exact: true,
});

routes.push({
  path: paths.recursos,
  component: Recursos,
  exact: true,
});

// ... fim Rotas dos Grupos

// Rota privada (só quem tem acesso)
routes.push({
  path: paths.cadastro,
  component: () => <Container>Cadastro</Container>,
  exact: true,
  acesso: (p) => p.cadastro.acesso,
});

// Not Found - Deixar esta por último!
routes.push({
  path: '*',
  component: NotFound,
});

sessionStorage.setItem(REDIRECT_URL_KEY, window.location.pathname);
export default function Routes() {
  const { permission } = useContext(AuthContext);

  return (
    <Switch>
      {permission ? (
        routes.map((r, i) => {
          const component =
            typeof r.acesso === 'undefined' || r.acesso(permission)
              ? r.component
              : Forbidden;
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

import 'assets/styles/index.scss';
import AuthProvider from 'contexts/authContext/authContext';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/routes';
import { loadEnvironment } from 'services/environment';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

loadEnvironment().then(() => {
  root.render(
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
});

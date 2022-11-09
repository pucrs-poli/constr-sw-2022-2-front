import 'assets/styles/index.scss';
import Layout from 'components/layout/layout';
import AuthProvider from 'contexts/authContext/authContext';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/routes';
import { loadEnvironment } from 'services/environment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  spacing: 8,
  shape: { borderRadius: 8 },
  palette: {
    primary: {
      light: '#1fbbea',
      main: '#108bb1',
      dark: '#0c6783',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ecf9fd',
      main: '#daf4fc',
      dark: '#b4e8f8',
      contrastText: '#100c06',
    },
  },
});

loadEnvironment().then(() => {
  root.render(
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={4} autoHideDuration={5000}>
        <BrowserRouter>
          <AuthProvider>
            <Layout>
              <Routes />
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
});

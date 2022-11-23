import { LoginRounded } from '@mui/icons-material';
import { Button, CircularProgress, Grid, Input } from '@mui/material';
import Logo from 'assets/icons/logo';
import { AuthContext } from 'contexts/authContext/authContext';
import { useContext, useState } from 'react';
import styles from './login.scss';
const { rootClassName } = styles;

export default function Login() {
  const { login, loadingUserData } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Grid
      container
      gap={1}
      padding={1}
      flexDirection='column'
      className={rootClassName}
    >
      <Grid
        display='flex'
        alignItems='center'
        justifyContent='center'
        marginTop={3}
        marginBottom={3}
      >
        <Logo width='300' />
      </Grid>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          login(username, window.btoa(password));
        }}
      >
        <Grid className={`${rootClassName}-item`}>
          <Input
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Email'
            type='email'
            inputMode='email'
          />
        </Grid>
        <Grid className={`${rootClassName}-item`}>
          <Input
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Senha'
            type='password'
          />
        </Grid>
        <Grid className={`${rootClassName}-item`}>
          <Button
            fullWidth
            startIcon={
              loadingUserData ? (
                <CircularProgress color='secondary' size={20} />
              ) : (
                <LoginRounded />
              )
            }
            disabled={!username || !password}
            type='submit'
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

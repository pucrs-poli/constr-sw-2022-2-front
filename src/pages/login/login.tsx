import { Button, Container } from '@mui/material';
import { AuthContext } from 'contexts/authContext/authContext';
import { useContext } from 'react';

export default function Login() {
  const { login } = useContext(AuthContext);
  return (
    <Container>
      login page
      <Button
        onClick={() => {
          login('usuario', window.btoa('senha'));
        }}
      >
        Login
      </Button>
    </Container>
  );
}

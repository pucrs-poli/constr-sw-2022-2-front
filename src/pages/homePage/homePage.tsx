import { Button, Container, Grid } from '@mui/material';
import { AuthContext } from 'contexts/authContext/authContext';
import { useContext } from 'react';

export default function HomePage() {
  const { logout } = useContext(AuthContext);
  return (
    <Container>
      <Grid>
        HomePage
        <Button variant='outlined' onClick={logout}>
          Sair
        </Button>
      </Grid>
    </Container>
  );
}

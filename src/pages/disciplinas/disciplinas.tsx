import { Breadcrumbs, Grid, Link, Typography, Container, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';

export default function Disciplinas() {
  const history = useHistory();
  return (
    <Grid container gap={1} padding={1} flexDirection='column'>
      <Grid item>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link
            underline='hover'
            color='primary'
            onClick={(e) => {
              e.preventDefault();
              history.push(paths.homePage);
            }}
          >
            Página inicial
          </Link>
          <Typography color='text.primary'>Disciplinas</Typography>
        </Breadcrumbs>
      </Grid>
      <Container maxWidth="md">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
        <img src="src/pages/disciplinas/scroll-disciplinas.png" alt="776tgekjf" />
      </Container>
    </Grid>
  );
}

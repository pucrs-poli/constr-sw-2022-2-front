import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';

export default function PrediosSalas() {
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
          <Typography color='text.primary'>Prédios e salas</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid>Conteúdo da página</Grid>
      <Grid>Conteúdo da página</Grid>
      <Grid>Conteúdo da página</Grid>
    </Grid>
  );
}

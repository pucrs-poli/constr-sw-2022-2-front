import { Breadcrumbs, Grid, Link, Typography, Card } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SpeedDialCustom from './components/speedDialCustom';
import RecursosData from './mock/mockRecursos.json';

import { paths } from 'routes/routes';

export default function Recursos() {
  const history = useHistory();
  return (
    <>
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
            <Typography color='text.primary'>Recursos</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid
          container
          flexDirection='column'
          // justifyContent={'space-between'}
          gap={5}
          padding={1}
        >
          <Grid container flexDirection='row'>
            <h1>Recursos</h1>
          </Grid>
          {RecursosData.map((rec) => {
            return (
              <Card>
                <h3>{rec.name}</h3>
                <h3>{rec.descricao}</h3>
              </Card>
            );
          })}
        </Grid>
      </Grid>
      <SpeedDialCustom />
    </>
  );
}

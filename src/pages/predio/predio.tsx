import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { paths } from 'routes/routes';

export default function Predio() {
  const history = useHistory();
  const param = useParams<{ id: string }>();

  console.log(param);
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
          <Link
            underline='hover'
            color='primary'
            onClick={(e) => {
              e.preventDefault();
              history.push(paths.homePage);
            }}
          >
            Prédios e Salas
          </Link>
          <Typography color='text.primary'>Prédio</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid>
        <Typography color='text.primary' variant='h4'>
          Prédio
        </Typography>
      </Grid>
      <Grid>teste</Grid>
      <Grid>Conteúdo da página</Grid>
    </Grid>
  );
}

import {
  Breadcrumbs,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { Predio } from 'models/prediosSalas';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';
import { getAllPredios } from 'services/prediosSalas';

export default function PrediosSalas() {
  const history = useHistory();
  const [predios, setPredios] = useState<Predio[]>([]);
  const [loadingPredios, setLoadingPredios] = useState<boolean>(true);

  const loadPredios = useCallback(async () => {
    setLoadingPredios(true);
    try {
      const req = await getAllPredios();
      setPredios(req.data);
    } catch (err) {
      // TODO: ERR MESSAGE
      console.log('ALERTA DE ERRO', err);
    } finally {
      setLoadingPredios(false);
    }
  }, []);

  useEffect(() => {
    loadPredios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Grid>
        <Typography color='text.primary' variant='h4'>
          Prédios e salas
        </Typography>
      </Grid>
      <Grid>{loadingPredios && <CircularProgress color='secondary' />}</Grid>
      <Grid>
        {predios.map((p, i) => {
          return <div key={i}>{p._id}</div>;
        })}
      </Grid>
    </Grid>
  );
}

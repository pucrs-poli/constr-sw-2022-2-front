import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { Predio as PredioType } from 'models/prediosSalas';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { paths } from 'routes/routes';
import { getPredioByID } from 'services/prediosSalas';

export default function Predio() {
  const history = useHistory();
  const param = useParams<{ id: string }>();

  const [predio, setPredio] = useState<PredioType>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadPredio = useCallback(async () => {
    setLoading(true);
    try {
      const req = await getPredioByID(param.id);
      setPredio(req.data);
    } catch (error) {
      // TODO: ERROR MESSAGE
    } finally {
      setLoading(false);
    }
  }, [param.id]);

  useEffect(() => {
    loadPredio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const name = useMemo(() => {
    if (!param.id) {
      return 'Novo prédio';
    }

    if (loading) {
      return 'Carregando...';
    }

    if (predio) {
      return predio.name;
    }

    return '';
  }, [loading, param.id, predio]);

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
              history.push(paths.prediosSalas);
            }}
          >
            Prédios e Salas
          </Link>
          <Typography color='text.primary'>{name}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid>
        <Typography color='text.primary' variant='h4'>
          {name}
        </Typography>
      </Grid>
      <Grid>teste</Grid>
      <Grid>Conteúdo da página</Grid>
    </Grid>
  );
}

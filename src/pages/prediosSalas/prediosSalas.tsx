import { AddRounded, SearchRounded } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import ConfirmModal from 'components/confirmModal/confirmModal';
import { Predio } from 'models/prediosSalas';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';
import { getAllPredios } from 'services/prediosSalas';
import PredioItem from './components/predioItem/predioItem';

export default function PrediosSalas() {
  const history = useHistory();
  const [predios, setPredios] = useState<Predio[]>([]);
  const [loadingPredios, setLoadingPredios] = useState<boolean>(true);
  const [filtro, setFiltro] = useState<string>('');
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const prediosFiltrados = useMemo(
    () =>
      predios.filter(
        (p) =>
          !filtro ||
          p.name.trim().toLowerCase().includes(filtro.trim().toLowerCase()) ||
          p.number
            .toString()
            .trim()
            .toLowerCase()
            .includes(filtro.trim().toLowerCase())
      ),
    [filtro, predios]
  );

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
      <Grid item>
        <TextField
          label='Pesquisar...'
          variant='standard'
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton color='default'>
                <SearchRounded />
              </IconButton>
            ),
          }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </Grid>
      <Grid>{loadingPredios && <CircularProgress color='secondary' />}</Grid>
      <Grid display='flex' flexDirection='column' item gap={1}>
        {prediosFiltrados.map((p, i) => {
          return (
            <PredioItem
              key={i}
              predio={p}
              onDeleteClick={() => setModalOpened(true)}
            />
          );
        })}
      </Grid>
      <Grid>
        {!predios.length || (filtro && !prediosFiltrados.length) ? (
          <>Nenhum prédio encontrado!</>
        ) : (
          ''
        )}
      </Grid>
      <Box position='fixed' right={12} bottom={12}>
        <Fab color='primary' aria-label='add'>
          <AddRounded />
        </Fab>
      </Box>
      <ConfirmModal
        onCancel={() => setModalOpened(false)}
        onClose={() => setModalOpened(false)}
        opened={modalOpened}
        title='Remover prédio'
        text='Você deseja realmente remover este prédio?'
        onConfirm={() => {}}
        destructive
      />
    </Grid>
  );
}

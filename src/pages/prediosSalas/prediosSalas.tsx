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
import { closeModal, openModal } from 'components/modalManager/modalManager';
import { Predio } from 'models/prediosSalas';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';
import { deletePredios, getAllPredios } from 'services/prediosSalas';
import PredioItem from './components/predioItem/predioItem';

export default function PrediosSalas() {
  const history = useHistory();
  const [predios, setPredios] = useState<Predio[]>([]);
  const [loadingPredios, setLoadingPredios] = useState<boolean>(true);
  const [filtro, setFiltro] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar(
        (err as any)?.response?.data ?? 'Erro ao carregar prédios!',
        {
          variant: 'error',
        }
      );
    } finally {
      setLoadingPredios(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    loadPredios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDeleteModal = useCallback(
    (id: string) => {
      openModal(ConfirmModal, {
        onCancel: () => closeModal(),
        onClose: () => closeModal(),
        title: 'Remover prédio',
        text: 'Você deseja realmente remover este prédio?',
        onConfirm: () => {
          return deletePredios(id)
            .then(() => {
              loadPredios();
            })
            .finally(() => {
              closeModal();
            });
        },
        destructive: true,
      });
    },
    [loadPredios]
  );

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
      <Grid display='flex' alignItems='center' justifyContent='center'>
        {loadingPredios && <CircularProgress color='secondary' />}
      </Grid>
      <Grid display='flex' flexDirection='column' item gap={1}>
        {prediosFiltrados.map((p, i) => {
          return (
            <PredioItem
              key={i}
              predio={p}
              onDeleteClick={() => openDeleteModal(p._id)}
            />
          );
        })}
      </Grid>
      <Grid>
        {!loadingPredios &&
        (!predios.length || (filtro && !prediosFiltrados.length)) ? (
          <>Nenhum prédio encontrado!</>
        ) : (
          ''
        )}
      </Grid>
      <Box position='fixed' right={12} bottom={12}>
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => {
            history.push(paths.predio);
          }}
        >
          <AddRounded />
        </Fab>
      </Box>
    </Grid>
  );
}

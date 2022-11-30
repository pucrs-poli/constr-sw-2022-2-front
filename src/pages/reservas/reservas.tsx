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

import { Reserva } from 'models/reserva';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReservaItem from './components/reservaItem/reservaItem';

import { paths } from 'routes/routes';
import { toRequest } from 'utils/request';
import AddIcon from '@mui/icons-material/Add';
import ConfirmModal from 'components/confirmModal/confirmModal';
import ReservaService from '../../services/reservas/ReservaService';
import ReservaApiStub from '../../services/reservas/ReservaApiStub';

export default function Reservas() {
  const history = useHistory();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loadingReservas, setLoadingReservas] = useState<boolean>(true);
  const [filtro, setFiltro] = useState<string>('');
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const reservasServiceBack = new ReservaService(new ReservaApiStub());
  const [deleteId, setDeleteId ] = useState<number>(0);

  const getReservas = async () => {
    const response = await reservasServiceBack.getAll();
    setReservas(response);
    setLoadingReservas(false);
    console.log(response);
  };

  const deleteItem = async (reserva: any) => {
    setModalOpened(true)
    setDeleteId(reserva.id);
  };

  const closeModal = async () => {
    await reservasServiceBack.delete(deleteId);
    getReservas();
    setModalOpened(false);
  };

  useEffect(() => {
    setLoadingReservas(true);
    getReservas();
    
  }, []);

  const reservasFiltradas = useMemo(
    () =>
      reservas.filter(
        (p) =>
          !filtro ||
          p.resource.description.trim().toLowerCase().includes(filtro.trim().toLowerCase()) ||
          p.observation
            .trim()
            .toLowerCase()
            .includes(filtro.trim().toLowerCase())
      ),
    [filtro, reservas]
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
          <Typography color='text.primary'>Reservas</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid container flexDirection='row'>  
        <Grid item xs={7} marginTop={2}>
          <Typography color='text.primary' variant='h4'>
            Reservas
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            label='Pesquisar...'
            variant='outlined'
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
      </Grid>
      <Grid container flexDirection='row'>
        <Typography variant='h5' sx={{fontWeight: "bold", marginTop: "25px", marginBottom: "15px", color: "#575757"}}>Lista de turmas</Typography>
        <Grid marginLeft={116} marginTop={2.5}>
          <Fab color="secondary" aria-label="add" size="small" onClick={() =>{
            history.push(paths.criarReservas);
          }}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <Grid>{loadingReservas && <CircularProgress color='secondary' />}</Grid>
      <Grid display='flex' flexDirection='column' item gap={1}>
        {reservasFiltradas.map((p, i) => {
          return (
            <ReservaItem
              key={i}
              reserva={p}
              onDeleteClick={() => deleteItem(p)}
            />
          );
        })}
      </Grid>
      <Grid>
        {!reservas.length || (filtro && !reservasFiltradas.length) ? (
          <>Nenhuma reserva encontrada!</>
        ) : (
          ''
        )}
      </Grid>
      <ConfirmModal
        onCancel={() => setModalOpened(false)}
        onClose={() => setModalOpened(false)}
        opened={modalOpened}
        title='Remover prédio'
        text='Você deseja realmente remover este prédio?'
        onConfirm={() => {closeModal()}}
        destructive
      />
    </Grid>
  );
}
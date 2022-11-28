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


export default function Reservas() {
  const history = useHistory();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loadingReservas, setLoadingReservas] = useState<boolean>(true);
  const [filtro, setFiltro] = useState<string>('');
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const reservasFiltradas = useMemo(
    () =>
      reservas.filter(
        (p) =>
          !filtro ||
          p.recurso.name.trim().toLowerCase().includes(filtro.trim().toLowerCase()) ||
          p.observacao
            .trim()
            .toLowerCase()
            .includes(filtro.trim().toLowerCase())
      ),
    [filtro, reservas]
  );

  const loadReservas = useCallback(async () => {
    setLoadingReservas(true);
    try {
      // const req = await getAllReservas();
      setReservas([
        {
          _id: '1234',
          observacao: 'Alocação recurso 1',
          aula: '1234',
          recurso: {
            name: 'Recurso 1'
          },
          data: '20/02/2023',
          active: true,
        },
        {
          _id: '1234',
          observacao: 'Alocação recurso 2',
          aula: '1234',
          recurso: {
            name: 'Recurso 2'
          },
          data: '20/02/2023',
          active: true,
        },
        {
          _id: '1234',
          observacao: 'Alocação recurso 3',
          aula: '1234',
          recurso: {
            name: 'Recurso 3'
          },
          data: '20/02/2023',
          active: true,
        },
      ]);
    } catch (err) {
      // TODO: ERR MESSAGE
      console.log('ALERTA DE ERRO', err);
    } finally {
      setLoadingReservas(false);
    }
  }, []);

  useEffect(() => {
    loadReservas();
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
              onDeleteClick={() => setModalOpened(true)}
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
        onConfirm={() => {setModalOpened(false)}}
        destructive
      />
    </Grid>
  );
}
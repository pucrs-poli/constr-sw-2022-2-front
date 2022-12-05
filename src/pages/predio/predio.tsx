import {
  AddCircleOutlineRounded,
  CheckCircleOutlineRounded,
  HighlightOffRounded,
} from '@mui/icons-material';
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import ConfirmModal from 'components/confirmModal/confirmModal';
import { closeModal, openModal } from 'components/modalManager/modalManager';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { paths } from 'routes/routes';
import { getCEPInfo } from 'services/cep';
import {
  deleteSalas,
  getPredioByID,
  postPutPredio,
  postSala,
  putSala,
} from 'services/prediosSalas';
import { formatCEP, getUnmaskedNumber } from 'utils/format';
import { getUniqueKey } from 'utils/html';
import CadastroSalaModal from './components/cadastroSalaModal/cadastroSalaModal';
import ItemSala from './components/itemSala/ItemSala';
import PredioReducer, { PredioInitialState } from './predioReducer';

export default function Predio() {
  const history = useHistory();
  const param = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(PredioReducer, PredioInitialState);
  const { enqueueSnackbar } = useSnackbar();

  const loadPredio = useCallback(async () => {
    dispatch({ type: 'setLoading', payload: true });
    try {
      const req = await getPredioByID(param.id);
      dispatch({ type: 'setCampo', payload: req.data });
    } catch (err) {
      enqueueSnackbar(
        (err as any)?.response?.data ?? 'Erro ao carregar prédio!',
        {
          variant: 'error',
        }
      );
      history.push(paths.prediosSalas);
    } finally {
      dispatch({ type: 'setLoading', payload: false });
    }
  }, [enqueueSnackbar, history, param.id]);

  useEffect(() => {
    if (param.id) {
      loadPredio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = useMemo(() => {
    if (!param.id) {
      return 'Novo prédio';
    }
    return 'Editar Prédio';
  }, [param.id]);

  const handleSave = useCallback(async () => {
    dispatch({ type: 'setLoading', payload: true });
    try {
      const hasid = Boolean(state.predio._id);
      const req = await postPutPredio({
        ...state.predio,
        classrooms: state.predio.classrooms
          .filter((s) => s._id)
          .map((s) => s._id),
      } as any);

      // Aqui vamos atualizar as salas
      const novasSalas = state.predio.classrooms.filter((s) => !s._id);
      await Promise.all(
        novasSalas.map((ns) => {
          return postSala({ ...ns, building: req.data._id });
        })
      );

      if (state.editedClassRooms.length) {
        const editadas = state.predio.classrooms.filter(
          (s) => s._id && state.editedClassRooms.includes(s._id)
        );

        await Promise.all(
          editadas.map((se) => {
            return putSala(se);
          })
        );
      }

      if (state.deletedClassrooms.length) {
        await deleteSalas(...state.deletedClassrooms);
      }

      dispatch({ type: 'setCampo', payload: req.data });
      enqueueSnackbar(
        hasid ? 'Alterações salvas!' : 'Prédio criado com sucesso!',
        {
          variant: 'success',
        }
      );
      history.push(paths.prediosSalas);
    } finally {
      dispatch({ type: 'setLoading', payload: false });
    }
  }, [
    enqueueSnackbar,
    history,
    state.deletedClassrooms,
    state.editedClassRooms,
    state.predio,
  ]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'clearSalaHistory' });
    };
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
          <Link
            underline='hover'
            color='primary'
            onClick={(e) => {
              e.preventDefault();
              history.push(paths.prediosSalas);
            }}
          >
            Prédios e salas
          </Link>
          <Typography color='text.primary'>{title}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid>
        <Typography color='text.primary' variant='h4'>
          {title}
        </Typography>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Informações básicas:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Nome'
            variant='standard'
            fullWidth
            value={state.predio.name ?? ''}
            onChange={(e) => {
              dispatch({ type: 'setCampo', payload: { name: e.target.value } });
            }}
            disabled={state.loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Número'
            variant='standard'
            fullWidth
            value={String(state.predio.number || '') ?? ''}
            onChange={(e) => {
              dispatch({
                type: 'setCampo',
                payload: { number: parseInt(e.target.value) || undefined },
              });
            }}
            disabled={state.loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Endereço:</Typography>
        </Grid>
        <Grid item xs={7} sm={2}>
          <TextField
            label='CEP'
            variant='standard'
            fullWidth
            value={formatCEP(state.predio.address.zipCode || '') ?? ''}
            disabled={state.loading || state.loadingAddress}
            InputProps={{
              endAdornment: state.loadingAddress ? (
                <CircularProgress size={20} />
              ) : undefined,
            }}
            onChange={async (e) => {
              const val = getUnmaskedNumber(e.target.value);
              dispatch({
                type: 'setEndereco',
                payload: { zipCode: val },
              });
              if (val.length === 8) {
                dispatch({ type: 'setLoadingAddress', payload: true });
                try {
                  const req = await getCEPInfo(val);
                  if ('error' in req.data) {
                    // TODO: Error Message
                    console.error(req.data);
                  } else {
                    dispatch({
                      type: 'setEndereco',
                      payload: {
                        street: req.data?.logradouro,
                        complement: req.data?.complemento,
                        neighborhood: req.data?.bairro,
                        city: req.data?.localidade,
                        state: req.data?.uf,
                      },
                    });
                  }
                } finally {
                  dispatch({ type: 'setLoadingAddress', payload: false });
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={5} sm={2}>
          <TextField
            disabled={state.loading}
            label='Estado'
            variant='standard'
            fullWidth
            value={String(state.predio.address.state ?? '').toUpperCase()}
            onChange={(e) => {
              dispatch({
                type: 'setEndereco',
                payload: { state: e.target.value.toUpperCase() },
              });
            }}
            inputProps={{ maxLength: 2 }}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            disabled={state.loading}
            label='Cidade'
            variant='standard'
            fullWidth
            value={state.predio.address.city ?? ''}
            onChange={(e) => {
              dispatch({
                type: 'setEndereco',
                payload: { city: e.target.value },
              });
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            disabled={state.loading}
            label='Bairro'
            variant='standard'
            fullWidth
            value={state.predio.address.neighborhood ?? ''}
            onChange={(e) => {
              dispatch({
                type: 'setEndereco',
                payload: { neighborhood: e.target.value },
              });
            }}
            inputProps={{ maxLength: 2 }}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            disabled={state.loading}
            label='Número'
            variant='standard'
            fullWidth
            value={String(state.predio.address.number || '') ?? ''}
            onChange={(e) => {
              dispatch({
                type: 'setEndereco',
                payload: {
                  number:
                    parseInt(getUnmaskedNumber(e.target.value)) || undefined,
                },
              });
            }}
          />
        </Grid>
        <Grid item xs={8} sm={10}>
          <TextField
            disabled={state.loading}
            label='Logradouro'
            variant='standard'
            fullWidth
            value={state.predio.address.street ?? ''}
            onChange={(e) => {
              dispatch({
                type: 'setEndereco',
                payload: { street: e.target.value },
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled={state.loading}
            label='Complemento'
            variant='standard'
            fullWidth
            value={state.predio.address.complement ?? ''}
            onChange={(e) => {
              dispatch({
                type: 'setEndereco',
                payload: { complement: e.target.value },
              });
            }}
          />
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12}>
          <Button
            startIcon={<AddCircleOutlineRounded />}
            disabled={state.loading}
            onClick={() => {
              const mk = `modal_${getUniqueKey()}`;
              openModal(CadastroSalaModal, {
                onConfirm: (sala) => {
                  dispatch({ type: 'addSala', payload: sala });
                  closeModal(mk);
                },
                onCancel: () => {
                  closeModal(mk);
                },
                onClose: () => {
                  closeModal(mk);
                },
                key: mk,
              });
            }}
          >
            Adicionar sala
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          gap={1}
        >
          {state.predio.classrooms && state.predio.classrooms.length
            ? state.predio.classrooms
                .map((s, index) => {
                  return { sala: s, index };
                })
                .filter((s) => !state.deletedClassrooms.includes(s.sala._id))
                .map((s) => {
                  return (
                    <ItemSala
                      sala={s.sala}
                      key={
                        s.sala._id ??
                        `${s.sala.floor}-${s.sala.number}-${s.index}`
                      }
                      onEditClick={() => {
                        const mk = `modal_${getUniqueKey()}`;
                        openModal(CadastroSalaModal, {
                          sala: s.sala,
                          onConfirm: (sala) => {
                            dispatch({
                              type: 'editSala',
                              payload: { sala, index: s.index },
                            });
                            closeModal(mk);
                          },
                          onCancel: () => {
                            closeModal(mk);
                          },
                          onClose: () => {
                            closeModal(mk);
                          },
                          key: mk,
                        });
                      }}
                      onDeleteClick={() => {
                        const mk = `modal_${getUniqueKey()}`;
                        openModal(ConfirmModal, {
                          key: mk,
                          onCancel: () => closeModal(mk),
                          onClose: () => closeModal(mk),
                          title: 'Remover sala',
                          text: 'Você deseja realmente remover esta sala? Essa alteração só será confirmada quando você salvar as alterações.',
                          onConfirm: () => {
                            dispatch({
                              type: 'deleteSala',
                              payload: { id: s.sala._id, index: s.index },
                            });
                            closeModal(mk);
                          },
                          destructive: true,
                        });
                      }}
                    />
                  );
                })
            : 'Nenhuma sala!'}
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        gap={1}
        justifyContent='flex-end'
        paddingTop={2}
      >
        <Button
          disabled={state.loading}
          startIcon={<HighlightOffRounded />}
          color='inherit'
          onClick={() => {
            dispatch({ type: 'clearSalaHistory' });
            history.push(paths.prediosSalas);
          }}
        >
          Cancelar
        </Button>
        <Button
          disabled={state.loading}
          variant='contained'
          startIcon={
            state.loading ? (
              <CircularProgress size={20} color='inherit' />
            ) : (
              <CheckCircleOutlineRounded />
            )
          }
          onClick={handleSave}
        >
          Confirmar
        </Button>
      </Grid>
    </Grid>
  );
}

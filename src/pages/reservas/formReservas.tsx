import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { Reserva, Reserva as ReservaType } from 'models/reserva';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { paths } from 'routes/routes';
import { AddRounded, SearchRounded } from '@mui/icons-material';
import ResourcesService from 'services/recursos/ResourcesService';
import ResourcesAPIStub from '../../services/recursos/ResourcesAPIStub';
import ReservaService from '../../services/reservas/ReservaService';
import ReservaApiStub from '../../services/reservas/ReservaApiStub';
import { Resource, ResourceType } from 'models/resource';

import {
    TextField, Select, MenuItem, FormControl, InputLabel, Button, Snackbar, Alert
  } from '@mui/material';

import ConfirmModal from 'components/confirmModal/confirmModal';

export default function FormReserva() {
  const history = useHistory();
  const param = useParams<{ id: string }>();
  const resourcesServiceBack = new ResourcesService(new ResourcesAPIStub());
  const reservasServiceBack = new ReservaService(new ReservaApiStub());
  const [reserva, setReserva] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [observacao, setObservacao] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [aulas, setAulas] = useState<any>([]);
  const [recurso, setRecurso ] = useState<any>({});
  const [aula, setAula ] = useState<any>({});
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [errorOpened, setErrorOpened] = useState<boolean>(false);
  const getAllResources = async () => {
    const response = await resourcesServiceBack.getAll();
    setResources(response);
    console.log(response);
  };
  const getReserva = async () => {
    const response = await reservasServiceBack.getOne(parseInt(param.id));
    console.log(response);
    if(response !== undefined){
      setReserva(response);
      setRecurso(response.resource);
      setAula(response.class);
      setObservacao(response.observation);
      setData(response.data);
    }
  };

  const loadReserva = useCallback(async () => {
    setLoading(true);
    try {
      // const req = await getreservaByID(param.id);
      const req = {
        _id: '1234',
        observation: 'Alocação recurso 1',
        class: {"name": "Algoritmos 1"},
        resource: {
          description: 'Recurso 1',
        },
        data: '20/02/2023',
        active: true,
      };

      setReserva(req);
      setRecurso(req.resource);
      setAula(req.class);
      setObservacao(req.observation);
      setData(req.data);
    } catch (error) {
      // TODO: ERROR MESSAGE
    } finally {
      setLoading(false);
    }
  }, [param.id]);

  useEffect(() => {
    if(param.id){
        getReserva();
    }
    getAllResources();
    setAulas([
        {"name": "Algoritmos 1", "id":"1"},
        {"name": "Calculo 1", "id":"2"},
        {"name": "Paralela 1", "id":"3"},
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var name = useMemo(() => {
    if (!param.id) {
      return 'Nova Reserva';
    }

    if (loading) {
      return 'Carregando...';
    }

    if (reserva) {
      console.log(reserva);
      return reserva.resource.description + ' - ' +reserva.data;
    }

    return '';
  }, [loading, param.id, reserva]);

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
              history.push(paths.reservas);
            }}
          >
            Reservas
          </Link>
          <Typography color='text.primary'>{name}</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid marginTop={2}>
        <Typography color='text.primary' variant='h4'>
          {name}
        </Typography>
      </Grid>
      <Grid container flexDirection='column'>
        <Grid marginTop={2}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Recurso....</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={recurso.name}
            onChange={(e) => setRecurso(e.target.value)}

            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {
                resources.map((r:any,i:number) => {
                    return (
                        <MenuItem key={i} value={r}>
                            {r.description}
                        </MenuItem>
                    );
                })
            }
            </Select>
        </FormControl>
        </Grid>
        <Grid marginTop={2}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Aula....</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={aula.name}
            onChange={(e) => setRecurso(e.target.value)}

            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {
                aulas.map((r:any,i:number) => {
                    return (
                        <MenuItem key={i} value={r}>
                            {r.name}
                        </MenuItem>
                    );
                })
            }
            </Select>
        </FormControl>
        </Grid>
        
        <Grid marginTop={2}>
            <TextField
                        label='Data da Reserva...'
                        variant='outlined'
                        fullWidth
                        value={data}
                        multiline
                        onChange={(e) => setData(e.target.value)}
                />
        </Grid>
        <Grid marginTop={2}>
            <TextField
                    label='Observações...'
                    variant='outlined'
                    fullWidth
                    value={observacao}
                    multiline
                    minRows={3}
                    onChange={(e) => setObservacao(e.target.value)}
            />
        </Grid>
        <Grid marginTop={3} marginLeft={132}>
            <Button variant="contained" color="success" onClick={() => setModalOpened(true)}>
                Salvar
            </Button>
        </Grid>
       
      </Grid>
      <ConfirmModal
        onCancel={() => setModalOpened(false)}
        onClose={() => setModalOpened(false)}
        opened={modalOpened}
        title='Salvar Alterações'
        text='Você deseja realmente salvar as alterações?'
        onConfirm={() => {
            var payload = {};
            if(data.length === 0 || aula.length === 0 || recurso.name === undefined){
                setErrorOpened(true);
            }else if(param.id){
                payload= {
                    id: reserva.id,
                    observation: observacao,
                    class_id: 1,
                    resource_id: recurso.id,
                    data: data,
                    active: true,
                };
                const response = reservasServiceBack.update(payload);
                history.push(paths.reservas);
            }else if(!param.id) {
                payload = {
                    observation: observacao,
                    class_id: 1,
                    resource_id: recurso.id,
                    data: data,
                    active: true,
                }
                const response = reservasServiceBack.create(payload);
                history.push(paths.reservas);
            }
            //to do: enviar o post para salvar a reserva no backend
            setModalOpened(false)
        }}
        destructive
      />
      <Snackbar open={errorOpened} autoHideDuration={6000} onClose={()=> setErrorOpened(false)} sx={{ width: '96%' }}>
        <Alert onClose={()=> setErrorOpened(false)} severity="error" sx={{ width: '100%' }}>
          É necessário preencher o formulário inteiro para prosseguir!
        </Alert>
      </Snackbar>
    </Grid>
  );
}
import {
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  Card,
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useHistory } from 'react-router-dom';
import SpeedDialCustom from './components/speedDialCustom';
import { paths } from 'routes/routes';
import ResourcesService from 'services/resources';
import APIStub from './api/APIStub';
import API from './api/API';
import { useEffect, useState } from 'react';
import { Resource, ResourceType } from 'models/resource';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

export default function Recursos() {
  /*
    Using stub for mocks, chage APIStub to API when using real API.
  */
  const resourcesService = new ResourcesService(new APIStub());
  const resourcesServiceBack = new ResourcesService(new API());

  const [resourcesList, setResourcesList] = useState<Resource[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  useEffect(() => {
    const getAllResources = async () => {
      const response = await resourcesService.getAll();
      // const response = await resourcesServiceBack.getAll();
      setResourcesList(response);
      setResources(response);
    };
    getAllResources();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedResource, setSelectedResource] = useState<Resource>();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [resourceTypeId, setResourceTypeId] = useState('');
  const [resourceType, setResourceType] = useState('');

  const [createModal2Open, setCreateModal2Open] = useState(false);

  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const [name, setName] = useState('');

  const [filterName, setFilterName] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setFilterName(event.target.value as string);
  };

  const resourceTypesNames = Array.from(
    new Set(resourcesList.map((rec) => rec.resourceType.name))
  );

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
        <Grid container flexDirection='column' gap={5} padding={1}>
          <Grid
            container
            flexDirection='row'
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h1
              style={{
                marginBottom: 0,
              }}
            >
              Recursos
            </h1>
            <IconButton
              onClick={() => {
                setFilterModalOpen(true);
              }}
            >
              <FilterAltIcon style={{ color: 'Black', fontSize: 20 }} />
            </IconButton>
          </Grid>
          {resources.map((rec) => {
            return (
              <Card
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                }}
                onClick={() => {
                  setSelectedResource(rec);
                  setModalOpen(true);
                }}
              >
                <Grid
                  container
                  spacing={5}
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Grid item>
                    <h3>{rec.description}</h3>
                    <p>Tipo do Recurso: {rec.resourceType.name}</p>
                  </Grid>
                  <Grid item>
                    {/* Quando clica no botao ele ta pegando o card que esta atras */}
                    <IconButton
                      onClick={() => {
                        console.log('errado');
                      }}
                    >
                      <EditIcon style={{ color: 'Grey', fontSize: 30 }} />
                    </IconButton>
                    <Button
                      onClick={() => {
                        console.log('errado2');
                        resourcesServiceBack.delete(rec.id!);
                      }}
                    >
                      <DeleteIcon style={{ color: 'red', fontSize: 30 }} />
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
        </Grid>
      </Grid>
      <SpeedDialCustom
        onResourceCreation={() => {
          setCreateModalOpen(true);
        }}
        onResourceTypeCreation={() => {
          setCreateModal2Open(true);
        }}
      />
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {selectedResource?.description}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <p>Tipo do Recurso: {selectedResource?.resourceType.name}</p>
            <p>Status: {selectedResource?.status}</p>
            <h4>Detalhes:</h4>
            {selectedResource?.details?.map((detail) => {
              return <p>{detail.name}</p>;
            })}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
        }}
      >
        <Box sx={style}>
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Criar Recurso
            </Typography>
            <TextField
              style={{ marginTop: '30px', width: '100%' }}
              label='Descrição'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></TextField>
            <TextField
              style={{ marginTop: '30px', width: '100%' }}
              label='Status'
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            ></TextField>
            <TextField
              style={{ marginTop: '30px', width: '100%' }}
              label='Id do Tipo de Recurso'
              value={resourceTypeId}
              onChange={(e) => {
                setResourceTypeId(e.target.value);
              }}
            ></TextField>
            <TextField
              style={{ marginTop: '30px', width: '100%' }}
              label='Tipo do Recurso'
              value={resourceType}
              onChange={(e) => {
                setResourceType(e.target.value);
              }}
            ></TextField>
            <Button
              style={{ marginTop: '30px', width: '100%' }}
              variant='contained'
              onClick={() => {
                const newResource: Resource = {
                  description,
                  status,
                  resourceType: {
                    id: Number(resourceTypeId),
                    name: resourceType,
                  },
                };
                try {
                  resourcesServiceBack.create([newResource]);
                  setCreateModalOpen(false);
                } catch (error) {
                  alert('Erro ao criar recurso!');
                }
              }}
            >
              Criar
            </Button>
          </>
        </Box>
      </Modal>
      <Modal
        open={createModal2Open}
        onClose={() => {
          setCreateModal2Open(false);
        }}
      >
        <Box sx={style}>
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Criar Tipo de Recurso
            </Typography>
            <TextField
              style={{ marginTop: '30px', width: '100%' }}
              label='Nome'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></TextField>
            <Button
              style={{ marginTop: '30px', width: '100%' }}
              variant='contained'
              onClick={() => {
                const newResourceType: ResourceType = {
                  name: description,
                };
                try {
                  // resourcesService.createResourceType(newResourceType);
                  setCreateModal2Open(false);
                } catch (error) {
                  alert('Erro ao criar tipo de recurso!');
                }
              }}
            >
              Criar
            </Button>
          </>
        </Box>
      </Modal>
      <Modal
        open={filterModalOpen}
        onClose={() => {
          setFilterModalOpen(false);
        }}
      >
        <Box sx={style}>
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Filtrar por Tipo de Recurso
            </Typography>
            <InputLabel
              style={{ marginTop: '10px' }}
              id='demo-simple-select-label'
              size='normal'
            >
              Tipo
            </InputLabel>
            <Select
              style={{ width: '100%' }}
              autoWidth={true}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={filterName}
              label='Tipo'
              onChange={handleChange}
            >
              {resourceTypesNames.map((rec) => {
                return <MenuItem value={rec}>{rec}</MenuItem>;
              })}
            </Select>
            <Button
              style={{ marginTop: '30px', width: '100%' }}
              variant='contained'
              onClick={() => {
                try {
                  console.log(filterName);
                  setResources(
                    resourcesList.filter((element) => {
                      return element.resourceType.name === filterName;
                    })
                  );
                  setFilterModalOpen(false);
                } catch (error) {
                  alert('Erro ao criar tipo de recurso!');
                }
              }}
            >
              Pesquisar
            </Button>
          </>
        </Box>
      </Modal>
    </>
  );
}

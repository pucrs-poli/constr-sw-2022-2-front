import { Breadcrumbs, Grid, Link, Typography, Card } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SpeedDialCustom from './components/speedDialCustom';
import { paths } from 'routes/routes';
import ResourcesService from 'services/resources';
import APIStub from './api/APIStub';
import { useEffect, useState } from 'react';
import { Resource } from 'models/resource';

export default function Recursos() {
  /*
    Using stub for mocks, chage APIStub to API when using real API.
  */
  const resourcesService = new ResourcesService(new APIStub());
  const [resources, setResources] = useState<Resource[]>([]);
  useEffect(() => {
    const getAllResources = async () => {
      const response = await resourcesService.getAll();
      setResources(response);
    };
    getAllResources();
  }, []);
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
          <Grid container flexDirection='row'>
            <h1
              style={{
                marginBottom: 0,
              }}
            >
              Recursos
            </h1>
          </Grid>
          {resources.map((rec) => {
            return (
              <Card
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                }}
                onClick={() => {
                  history.push(paths.recursos + '/' + rec.id);
                }}
              >
                <h3>{rec.description}</h3>
                <p>Tipo do Recurso: {rec.resourceType.name}</p>
                <p>Status: {rec.status}</p>
                <h4>Detalhes:</h4>
                {rec.details.map((detail) => {
                  return <p>{detail.name}</p>;
                })}
              </Card>
            );
          })}
        </Grid>
      </Grid>
      <SpeedDialCustom
        onResourceCreation={() => {
          alert('onResourceCreation');
        }}
        onResourceTypeCreation={() => {
          alert('onResourceTypeCreation');
        }}
      />
    </>
  );
}

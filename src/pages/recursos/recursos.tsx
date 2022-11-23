import { Breadcrumbs, Grid, Link, Typography, Card } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SpeedDialCustom from './components/speedDialCustom';
import RecursosData from './mock/mockRecursos.json';
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
        <Grid
          container
          flexDirection='column'
          // justifyContent={'space-between'}
          gap={5}
          padding={1}
        >
          <Grid container flexDirection='row'>
            <h1>Recursos</h1>
          </Grid>
          {resources.map((rec) => {
            return (
              <Card>
                <h3>{rec.name}</h3>
              </Card>
            );
          })}
        </Grid>
      </Grid>
      <SpeedDialCustom />
    </>
  );
}

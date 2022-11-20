import { Breadcrumbs, Grid, Link, Typography, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';
import CusmtomAccordion from './components/customAccordion';
import SearchHeader from './components/searchHeader';

export default function Disciplinas() {
  const history = useHistory();
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
          <Typography color='text.primary'>Disciplinas</Typography>
        </Breadcrumbs>
      </Grid>
      <Container maxWidth='md'>
        <Grid container>
          <SearchHeader />
        </Grid>
        <CusmtomAccordion />
      </Container>
    </Grid>
  );
}

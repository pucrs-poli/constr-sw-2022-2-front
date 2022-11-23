import { Breadcrumbs, Grid, Link, Typography, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';
import CustomAccordion from './components/customAccordion';
import SearchHeader from './components/searchHeader';

export default function Turmas() {
  const history = useHistory();
  return (
    <Grid container gap={1} padding={1} margin={2} flexDirection='column'>
      <Grid item xs={12}>
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
          <Typography color='text.primary'>Turmas</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth='md' sx={{ backgroundColor: '#f5f5f5', paddingTop: "20px", paddingBottom: "20px", borderRadius: "1%"}}>
          <SearchHeader />
          <CustomAccordion />
        </Container>
      </Grid>
    </Grid>
  );
}

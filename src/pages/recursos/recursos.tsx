import { Breadcrumbs, Grid, Link, Typography, Box, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';

export default function Recursos() {
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
          <Typography color='text.primary'>Recursos</Typography>
        </Breadcrumbs>
      </Grid>
            {/* <Grid>
        <Container maxWidth='md' sx={{ backgroundColor: '#f5f5f5', paddingTop: "20px", paddingBottom: "20px", borderRadius: "1%"}}>
          <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <h1>Custom Accordion</h1>
          </Box>
        </Container>
      </Grid> */}
    </Grid>
  );
}

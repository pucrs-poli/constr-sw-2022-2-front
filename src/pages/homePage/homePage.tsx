import { Breadcrumbs, Grid, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Grid container gap={1} padding={1} flexDirection='column'>
      <Grid item>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography color='text.primary'>Página inicial</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item>Conteúdo da página inicial</Grid>
    </Grid>
  );
}

import { Button, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';

export default function Forbidden() {
  const history = useHistory();
  return (
    <Grid container gap={1} padding={1} flexDirection='column'>
      <Grid display='flex' alignItems='center' justifyContent='center'>
        Sem permissão
      </Grid>
      <Grid display='flex' alignItems='center' justifyContent='center'>
        <Button onClick={() => history.replace(paths.homePage)}>
          Página inicial
        </Button>
      </Grid>
    </Grid>
  );
}

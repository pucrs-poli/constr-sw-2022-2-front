import { Breadcrumbs, Grid, Link, Typography, Container, Fab } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Turma } from 'models/turmas';
import { paths } from 'routes/routes';
import TurmaItem from './components/turmaItem';
import SearchHeader from './components/searchHeader';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllTurmas } from 'services/turmas';

//const mocks = require('../../../public/assets/mock/turmas.json');

export default function Turmas() {
  const history = useHistory();
  const [turma, setTurmas] = useState<Turma[]>([]);
  const [filtro, setFiltro] = useState<string>('');

  const turmaFiltradas = useMemo(
    () =>
      turma.filter(
        (p) =>
          !filtro ||
          p.name.trim().toLowerCase().includes(filtro.trim().toLowerCase()) ||
          p.number
            .toString()
            .trim()
            .toLowerCase()
            .includes(filtro.trim().toLowerCase())
      ),
    [filtro, turma]
  );

  //var loadTurmas: Array<{Turma: any}> = mocks;


  
  const loadTurmas = useCallback(async () => {
    try {
      const req = await getAllTurmas();
      setTurmas(req.data);
    } catch (err) {
      // TODO: ERR MESSAGE
      console.log('ALERTA DE ERRO', err);
    }
  }, []);
  

  useEffect(() => {
    loadTurmas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTurmas]);

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
          <Grid display='flex' flexDirection='column' item gap={1}>
        {turmaFiltradas.map((t, i) => {
          return (
            <TurmaItem
              key={i}
              turma={t}
            />
          );
        })}
      </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}

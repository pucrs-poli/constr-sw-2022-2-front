import { Breadcrumbs, Grid, Link, Typography, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { paths } from 'routes/routes';
import CusmtomAccordion from './components/customAccordion';
import SearchHeader from './components/searchHeader';

export interface ICurriculo {
  idCurriculo: number;
  nomeCurso: string;
  dataInicioVigencia: string;
  dataFimVigencia: string;
}

export interface IDisciplina {
  id: string;
  nome: string;
  creditos: number;
  programa: string;
  itensBlibliograficos: string[];
  curriculo: ICurriculo;
}

export default function Disciplinas() {
  const history = useHistory();

  const disciplinas: IDisciplina[] = [
    {
      id: '1',
      nome: 'Construção de Software',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '2',
      nome: 'Engenharia Experimental de Software',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '3',
      nome: 'Paralela e Distribuida',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '4',
      nome: 'Banco de Dados II',
      creditos: 2,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '5',
      nome: 'Intrudução a Inteligência Artificial',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '6',
      nome: 'Design de Iteração',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
    {
      id: '7',
      nome: 'Lógica de Programação',
      creditos: 4,
      programa: 'Programa da disciplina',
      itensBlibliograficos: [
        'Livro de Engenharia de Software 1',
        'Livro de Engenharia de Software 2',
      ],
      curriculo: {
        idCurriculo: 100,
        nomeCurso: 'Engenharia de Software',
        dataInicioVigencia: '01/01/2021',
        dataFimVigencia: '31/12/2021',
      },
    },
  ];

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
          <Typography color='text.primary'>Disciplinas</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Container
          maxWidth='md'
          sx={{
            backgroundColor: '#f5f5f5',
            paddingTop: '20px',
            paddingBottom: '20px',
            borderRadius: '1%',
            height: '',
          }}
        >
          <SearchHeader />
          <CusmtomAccordion disciplinas={disciplinas} />
        </Container>
      </Grid>
    </Grid>
  );
}

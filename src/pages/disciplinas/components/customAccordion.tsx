import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import { IDisciplina } from '../disciplinas';
import { useState } from 'react';

const CusmtomAccordion = (disciplinas: any) => {
  var listaDisciplinas: IDisciplina[] = disciplinas.disciplinas;

  const [disciplinasState, setDisciplinaState] =
    useState<IDisciplina[]>(listaDisciplinas);

  const handleDelete = (id: string) => {
    const disciplinas = disciplinasState.filter((disciplina) => disciplina.id !== id);
    setDisciplinaState(disciplinas);
  };

  return (
    <div style={{ marginTop: '10px' }}>
      {disciplinasState.map((dis, i) => {
        return (
          <Accordion key={i}>
            <AccordionSummary
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Grid container>
                <Grid item xs={10.5}>
                  <Typography variant='h6'>{`${dis.nome} - ${dis.creditos} créditos`}</Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <IconButton onClick={() => alert('Edit Me!')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(dis.id)}>
                    <DeleteIcon color='warning' />
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <b>Programa da Disciplina:</b>
                  <Typography variant='subtitle1'>{dis.programa}</Typography>
                  <b>Itens Bibliográficos:</b>
                  {dis.itensBlibliograficos.map((item, i) => {
                    return <div key={i}>{`- ${item}`}</div>;
                  })}
                </Grid>
                <Grid item xs={2} />
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <b>CodCred:</b> {dis.curriculo.idCurriculo}
                <br />
                <b>Curso:</b> {dis.curriculo.nomeCurso}
                <br />
                <b>Período:</b> {dis.curriculo.dataInicioVigencia} -{' '}
                {dis.curriculo.dataFimVigencia}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CusmtomAccordion;

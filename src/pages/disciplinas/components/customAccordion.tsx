import { Grid, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from 'react';
import { DisciplinasContext } from 'contexts/disciplinasContext/disciplinasContext';

const CusmtomAccordion = () => {
  const { disciplinas, updateDisciplinas } = useContext(DisciplinasContext);

  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => setIsEditing(!isEditing);

  const handleDelete = (id: string) => {
    const discip = disciplinas.filter((disciplina) => disciplina.id !== id);
    updateDisciplinas(discip);
  };

  return (
    <div style={{ marginTop: '10px' }}>
      {disciplinas.map((dis, i) => {
        return (
          <Accordion key={i}>
            <AccordionSummary
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Grid container>
                <Grid item xs={10.5}>
                  {
                    isEditing && <>
                      <TextField id="campo-nome" label="Nome" variant="standard" sx={{ paddingRight: "20px" }} />
                      <TextField id="campo-creditos" label="Créditos" variant="standard" />
                    </>
                  }
                  {
                    !isEditing && <Typography variant='h6'>{`${dis.nome} - ${dis.creditos} créditos`}</Typography>
                  }
                </Grid>
                <Grid item xs={1.5}>
                  <IconButton onClick={() => toggleIsEditing()}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(dis.id)}>
                    <DeleteIcon color='warning' />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  {
                    isEditing && <TextField id="campo-programa" label="Programa da Disciplina" variant="standard" />
                  }
                  {
                    !isEditing && <>
                      <b>Programa da Disciplina:</b>
                      <br />
                      <Typography variant='subtitle1'>{dis.programa}</Typography>
                    </>
                  }
                </Grid>
                <Grid item xs={12}>
                  {
                    isEditing && dis.itensBlibliograficos.map((item, i) => {
                      return <>
                        <br/>
                        <TextField id="campo-biblio" label="Itens Bibliográficos" variant="standard" />
                      </>
                    })
                  }
                  {
                    !isEditing && <>
                      <b>Itens Bibliográficos:</b>
                      <br />
                      {dis.itensBlibliograficos.map((item, i) => {
                        return <div key={i}>{`- ${item}`}</div>;
                      })}
                    </>
                  }
                </Grid>
                <Grid item xs={2} />
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {
                isEditing && <>
                  <TextField id="campo-codcred" label="CodCred" variant="standard" />
                  <br />
                  <TextField id="campo-curso" label="Curso" variant="standard" />
                  <br />
                  <TextField id="campo-periodo" label="Período" variant="standard" />
                </>
              }
              {
                !isEditing && <>
                  <Typography>
                    <b>CodCred:</b> {dis.curriculo.idCurriculo}
                    <br />
                    <b>Curso:</b> {dis.curriculo.nomeCurso}
                    <br />
                    <b>Período:</b> {dis.curriculo.dataInicioVigencia} -{' '}
                    {dis.curriculo.dataFimVigencia}
                  </Typography>
                </>
              }
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CusmtomAccordion;
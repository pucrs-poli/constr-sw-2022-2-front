import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from 'react';
import {
  DisciplinasContext,
  ICurriculo,
} from 'contexts/disciplinasContext/disciplinasContext';
import React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CusmtomAccordion = () => {
  const { disciplinas, store, setDisciplinas, setStore } =
    useContext(DisciplinasContext);

  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => setIsEditing(!isEditing);

  const [open, setOpen] = React.useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  // Editable fields states
  interface IEditableFields {
    nome: string[];
    creditos: number[];
    programa: string[];
  }

  const [fieldsOnEdit, setFieldsOnEdit] = useState<IEditableFields>({
    nome: [],
    creditos: [],
    programa: [],
  });

  const handleDelete = (id: string) => {
    const discip = disciplinas.filter((disciplina) => disciplina.id !== id);
    const removeFromStore = store.filter((disciplina) => disciplina.id !== id);
    setDisciplinas(discip);
    setStore(removeFromStore);
  };

  useEffect(() => {
    setFieldsOnEdit({
      nome: disciplinas.map((disciplina) => disciplina.nome),
      creditos: disciplinas.map((disciplina) => disciplina.creditos),
      programa: disciplinas.map((disciplina) => disciplina.programa),
    });
  }, [isEditing]);

  useEffect(() => {
    disciplinas.map((disciplina, index) => {
      disciplina.nome =
        fieldsOnEdit.nome.length > 0
          ? fieldsOnEdit.nome[index]
          : disciplina.nome;
      disciplina.creditos =
        fieldsOnEdit.creditos.length > 0
          ? fieldsOnEdit.creditos[index]
          : disciplina.creditos;
      disciplina.programa =
        fieldsOnEdit.programa.length > 0
          ? fieldsOnEdit.programa[index]
          : disciplina.programa;
    });
  }, [fieldsOnEdit]);

  const [newICurriculo, setNewICurriculo] = useState<ICurriculo>({
    idCurriculo: 0,
    nomeCurso: '',
    dataFimVigencia: '',
    dataInicioVigencia: '',
  });

  const [currendDisId, setCurrendDisId] = useState('');

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
                  {isEditing && (
                    <>
                      <TextField
                        id='campo-nome'
                        label='Nome'
                        variant='standard'
                        sx={{ paddingRight: '20px' }}
                        value={fieldsOnEdit.nome[i]}
                        onChange={(e) => {
                          setFieldsOnEdit({
                            ...fieldsOnEdit,
                            nome: fieldsOnEdit.nome.map((nome, index) =>
                              index === i ? e.target.value : nome
                            ),
                          });
                        }}
                      />
                      <TextField
                        id='campo-creditos'
                        label='Créditos'
                        variant='standard'
                        value={fieldsOnEdit.creditos[i]}
                        onChange={(e) => {
                          setFieldsOnEdit({
                            ...fieldsOnEdit,
                            creditos: fieldsOnEdit.creditos.map(
                              (creditos, index) =>
                                index === i ? Number(e.target.value) : creditos
                            ),
                          });
                        }}
                      />
                    </>
                  )}
                  {!isEditing && (
                    <Typography variant='h6'>{`${dis.nome} - ${dis.creditos} créditos`}</Typography>
                  )}
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
                  {isEditing && (
                    <TextField
                      id='campo-programa'
                      label='Programa da Disciplina'
                      variant='standard'
                      value={fieldsOnEdit.programa[i]}
                      onChange={(e) => {
                        setFieldsOnEdit({
                          ...fieldsOnEdit,
                          programa: fieldsOnEdit.programa.map(
                            (programa, index) =>
                              index === i ? e.target.value : programa
                          ),
                        });
                      }}
                    />
                  )}
                  {!isEditing && (
                    <>
                      <b>Programa da Disciplina:</b>
                      <br />
                      <Typography variant='subtitle1'>
                        {dis.programa}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {isEditing &&
                    dis.itensBlibliograficos.map((_, ind) => {
                      return (
                        <>
                          <br />
                          <TextField
                            key={`1-${i}-${ind}`}
                            id={`campo-biblio-${ind}`}
                            label='Itens Bibliográficos'
                            variant='standard'
                          />
                        </>
                      );
                    })}
                  {!isEditing && (
                    <>
                      <b>Itens Bibliográficos:</b>
                      <br />
                      {dis.itensBlibliograficos.map((item, ind) => {
                        return (
                          <div
                            key={`2-${i}-${ind}`}
                            id={`read-campo-biblio-${ind}`}
                          >
                            {' '}
                            {`- ${item}`}
                          </div>
                        );
                      })}
                    </>
                  )}
                </Grid>
                <Grid item xs={2} />
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {isEditing && (
                <Grid container>
                  <Grid xs={6}>
                    <TextField
                      id='campo-codcred'
                      label='CodCred'
                      variant='standard'
                    />
                    <br />
                    <TextField
                      id='campo-curso'
                      label='Curso'
                      variant='standard'
                    />
                    <br />
                    <TextField
                      id='campo-periodo'
                      label='Período'
                      variant='standard'
                    />
                  </Grid>
                  <Grid xs={6} />
                </Grid>
              )}
              {!isEditing && (
                <>
                  <Grid container>
                    <Grid item xs={6}>
                      {dis.curriculo.map((c, idx) => {
                        return (
                          <Typography
                            key={`${idx}-curriculo`}
                            sx={{ padding: '20px' }}
                          >
                            <b>CodCred:</b> {c.idCurriculo}
                            <br />
                            <b>Curso:</b> {c.nomeCurso}
                            <br />
                            <b>Período:</b> {c.dataInicioVigencia} -{' '}
                            {c.dataFimVigencia}
                          </Typography>
                        );
                      })}
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant='contained'
                        color='success'
                        endIcon={<AddIcon />}
                        onClick={() => {
                          // console.log(dis.id);
                          setCurrendDisId(dis.id);
                          handleModal();
                        }}
                      >
                        Adicionar Curriculo
                      </Button>
                      <Modal open={open} onClose={handleModal}>
                        <Box sx={{ ...style, width: 600 }}>
                          <Typography variant='h6'>
                            Adicionar Curriculo:
                          </Typography>
                          <TextField
                            id='campo-codcred'
                            label='CodCred'
                            variant='standard'
                            value={newICurriculo.idCurriculo}
                            onChange={(e) => {
                              setNewICurriculo({
                                ...newICurriculo,
                                idCurriculo: Number(e.target.value),
                              });
                            }}
                          />
                          <br />
                          <TextField
                            id='campo-curso'
                            label='Curso'
                            variant='standard'
                            value={newICurriculo.nomeCurso}
                            onChange={(e) => {
                              setNewICurriculo({
                                ...newICurriculo,
                                nomeCurso: e.target.value,
                              });
                            }}
                          />
                          <br />
                          <TextField
                            id='campo-periodo'
                            label='Período'
                            variant='standard'
                            value={newICurriculo.dataInicioVigencia}
                            onChange={(e) => {
                              setNewICurriculo({
                                ...newICurriculo,
                                dataInicioVigencia: e.target.value,
                              });
                            }}
                          />
                          <br />
                          <TextField
                            id='campo-periodo'
                            label='Período'
                            variant='standard'
                            value={newICurriculo.dataFimVigencia}
                            onChange={(e) => {
                              setNewICurriculo({
                                ...newICurriculo,
                                dataFimVigencia: e.target.value,
                              });
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              const findDisciplina = disciplinas.find(
                                (d) => d.id === currendDisId
                              );

                              findDisciplina?.curriculo.push(newICurriculo);

                              handleModal();
                            }}
                          >
                            <CheckIcon
                              color='success'
                              sx={{ height: '50px', width: '50px' }}
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleModal();
                              // setNewDisciplina(initialDisciplina);
                            }}
                          >
                            <CloseIcon
                              color='warning'
                              sx={{ height: '50px', width: '50px' }}
                            />
                          </IconButton>
                        </Box>
                      </Modal>
                    </Grid>
                  </Grid>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CusmtomAccordion;

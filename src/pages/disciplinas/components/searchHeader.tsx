import {
  Typography,
  Box,
  Grid,
  Button,
  Modal,
  TextField,
  IconButton,
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import SearchField from './searchField';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  DisciplinasContext,
  IDisciplina,
} from 'contexts/disciplinasContext/disciplinasContext';

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

export default function SearchHeader() {
  const { disciplinas, setDisciplinas } = useContext(DisciplinasContext);

  const [open, setOpen] = React.useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  const initialDisciplina: IDisciplina = {
    id: '',
    nome: '',
    creditos: 0,
    programa: '',
    itensBlibliograficos: [],
    curriculo: [
      {
        idCurriculo: 0,
        nomeCurso: '',
        dataInicioVigencia: '',
        dataFimVigencia: '',
      },
    ],
  };

  const [newDisciplina, setNewDisciplina] = React.useState<IDisciplina>({
    id: '',
    nome: '',
    creditos: 0,
    programa: '',
    itensBlibliograficos: [],
    curriculo: [
      {
        idCurriculo: 0,
        nomeCurso: '',
        dataInicioVigencia: '',
        dataFimVigencia: '',
      },
    ],
  });

  return (
    <Box sx={{ width: 'inherit', heigth: 'inherit' }}>
      <Grid container>
        <Grid item xs={1}>
          <BookIcon color='primary' sx={{ fontSize: '50px' }} />
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant='h4'
            sx={{ fontWeight: 'bold', marginTop: '11px' }}
          >
            Disciplinas
          </Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <SearchField />
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant='h5'
            sx={{ fontWeight: 'bold', marginTop: '25px', color: '#575757' }}
          >
            Lista de disciplinas
          </Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={8}>
          <Button
            variant='contained'
            color='success'
            endIcon={<AddIcon />}
            onClick={handleModal}
          >
            Adicionar Disciplina
          </Button>
          <Modal open={open} onClose={handleModal}>
            <Box sx={{ ...style, width: 600 }}>
              <Typography variant='h6'>Adicionar Disciplina:</Typography>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    id='campo-nome'
                    label='Nome'
                    variant='standard'
                    value={newDisciplina.nome}
                    onChange={(e) => {
                      setNewDisciplina({
                        ...newDisciplina,
                        nome: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id='campo-creditos'
                    label='Créditos'
                    variant='standard'
                    value={newDisciplina.creditos}
                    onChange={(e) => {
                      setNewDisciplina({
                        ...newDisciplina,
                        creditos: Number(e.target.value),
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id='campo-programa'
                    label='Programa da Disciplina'
                    variant='standard'
                    value={newDisciplina.programa}
                    onChange={(e) => {
                      setNewDisciplina({
                        ...newDisciplina,
                        programa: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={6}>
                  <TextField
                    id='campo-itensBibliograficos'
                    label='Itens Bibliográficos'
                    variant='standard'
                    sx={{ paddingBottom: '50px' }}
                    value={newDisciplina.itensBlibliograficos}
                    onChange={(e) => {
                      setNewDisciplina({
                        ...newDisciplina,
                        itensBlibliograficos: [e.target.value],
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={6}>
                  {newDisciplina.curriculo.map((curriculo, idx) => {
                    return (
                      <div key={`${idx}-curriHead`}>
                        <TextField
                          id='campo-codcred'
                          label='CodCred'
                          variant='standard'
                          value={curriculo.idCurriculo}
                          onChange={(e) => {
                            setNewDisciplina({
                              ...newDisciplina,
                              curriculo: [...newDisciplina.curriculo],
                            });
                          }}
                        />
                        <br />
                        <TextField
                          id='campo-curso'
                          label='Curso'
                          variant='standard'
                          value={curriculo.nomeCurso}
                          onChange={(e) => {
                            setNewDisciplina({
                              ...newDisciplina,
                              curriculo: {
                                ...newDisciplina.curriculo,
                              },
                            });
                          }}
                        />
                        <br />
                        <TextField
                          id='campo-periodo'
                          label='Período'
                          variant='standard'
                          value={curriculo.dataInicioVigencia}
                          onChange={(e) => {
                            setNewDisciplina({
                              ...newDisciplina,
                              curriculo: {
                                ...newDisciplina.curriculo,
                              },
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                </Grid>
                <Grid item xs={6}>
                  <IconButton
                    onClick={() => {
                      setDisciplinas([...disciplinas, newDisciplina]);
                      handleModal();
                      setNewDisciplina(initialDisciplina);
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
                      setNewDisciplina(initialDisciplina);
                    }}
                  >
                    <CloseIcon
                      color='warning'
                      sx={{ height: '50px', width: '50px' }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
}

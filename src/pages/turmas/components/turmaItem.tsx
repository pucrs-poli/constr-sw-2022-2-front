import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Turma } from 'models/turmas';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

export default function TurmaItem({turma}:{turma:Turma}) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    const history = useHistory();


    return (
      <div>
        <div>{turma.name}</div>
        <div>{turma.number}</div>
        <div>{turma.semester}</div>
        <div>{turma.year}</div>
        <div>{turma.schedule}</div>
        <div>{turma.subject}</div>
        <div>
          <IconButton
            color='default'
            onClick={() => { alert('clicked'); }}
          >
            <EditRounded />
          </IconButton>
          <IconButton color='error' onClick={() => { alert('clicked'); }}>
            <DeleteRounded />
          </IconButton>
        </div>
      </div>
    );


    // onClick={() => { history.push(paths.editarTurmas.replace(':id', turma.number));}}

    /*

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Turma 1
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Turma de Algoritmos
          </Typography>
          <IconButton sx={{ position: 'absolute', right: '90px', bottom: '3px' }} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton sx={{ position: 'absolute', right: '50px', bottom: '3px' }} color="error"  onClick={() => {
    alert('clicked');
  }}>
            <DeleteIcon />
          </IconButton>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Numero: 1
          </Typography>
          <Typography>
            Semestre: 2
          </Typography>
          <Typography>
            Ano: 1
          </Typography>
          <Typography>
            Horário:  2JK4JK
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
  */
}

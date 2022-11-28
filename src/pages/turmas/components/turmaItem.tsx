import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TurmaItem() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
}

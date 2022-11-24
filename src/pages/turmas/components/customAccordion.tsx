import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function CustomAccordion() {
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
          <IconButton sx={{ position: 'absolute', right: '50px', bottom: '3px' }} color="error">
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
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Turma 2
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Turma de Linguagens
          </Typography>
          <IconButton sx={{ position: 'absolute', right: '90px', bottom: '3px' }} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton sx={{ position: 'absolute', right: '50px', bottom: '3px' }} color="error">
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
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Turma 3
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Turma de Programação
          </Typography>
          <IconButton sx={{ position: 'absolute', right: '90px', bottom: '3px' }} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton sx={{ position: 'absolute', right: '50px', bottom: '3px' }} color="error">
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
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Turma 4
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Turma de Construção
          </Typography>
          <IconButton sx={{ position: 'absolute', right: '90px', bottom: '3px' }} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton sx={{ position: 'absolute', right: '50px', bottom: '3px' }} color="error">
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

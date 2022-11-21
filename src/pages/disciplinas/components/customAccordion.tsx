import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';

export default function CusmtomAccordion() {
  return (
    <div style={{ marginTop: "10px" }}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container>
            <Grid item xs={10.5}>
              < Typography variant='h6'>Disciplina X</Typography>
            </Grid>
            <Grid item xs={1.5}>
              <IconButton>
                <EditIcon onClick={() => alert("Edit Me!")} />
              </IconButton>
              <IconButton>
                <DeleteIcon color='warning' onClick={() => alert("Delete Me!")} />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='subtitle1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
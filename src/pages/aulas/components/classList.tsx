import { Box, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { Class } from "models/class";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export interface ClassListProps {
  classes?: Class[];
  onEditClick?: (classe: Class) => void;
  onDeleteClick?: (classe: Class) => void;
}

export default function ClassList({ classes, onEditClick, onDeleteClick }: ClassListProps) {
  return (
    <Grid>
      {(!classes || classes.length === 0) ? (
        <Typography>Nenhuma aula encontrada.</Typography>
      ) : (
        classes.map((it, i) => (
          <>
            <Card key={i} sx={{ minWidth: 275 }}>
              <CardContent >
                <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="top"
                  mb={2}>
                  <Typography variant="h5" component="div">
                    {it.group.subject?.name}
                  </Typography>
                  <Grid>
                    <IconButton onClick={() => onEditClick?.(it)}>
                      <CreateRoundedIcon />
                    </IconButton >
                    <IconButton onClick={() => onDeleteClick?.(it)}>
                      <DeleteRoundedIcon color='error' />
                    </IconButton >
                  </Grid>
                </Grid>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Turma: {it.group?.numGroup}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Reserva: {it.reservations.map(reservation => reservation.resource.name).join(', ')}
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ m: 2 }} />
          </>
        ))
      )}
    </Grid>
  );
}

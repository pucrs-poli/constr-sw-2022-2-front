import { Typography, Box, Grid, Fab } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import SearchField from './searchField';
import AddIcon from '@mui/icons-material/Add';

export default function SearchHeader() {
  return (
    <Box sx={{ width: 'inherit', heigth: 'inherit' }}>
      <Grid container>
        <Grid item xs={1}>
          <BookIcon color='primary' sx={{ fontSize: '50px' }} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h4' sx={{fontWeight: "bold", marginTop: "11px"}}>Turmas</Typography>
        </Grid>
        <Grid item xs={4}/>
        <Grid item xs={4}>
            <SearchField/>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' sx={{fontWeight: "bold", marginTop: "25px", marginBottom: "15px", color: "#575757"}}>Lista de turmas</Typography>
        </Grid>
        <Grid item xs={4}/>
        <Grid item xs={4}>
          <Fab sx={{marginTop: '20px', left: '110%', marginBottom: '20px'}} color="secondary" aria-label="add" size="small">
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
}

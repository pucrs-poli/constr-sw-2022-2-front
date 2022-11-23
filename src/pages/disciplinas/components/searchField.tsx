import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import disciplinasContext from 'contexts/disciplinasContext/disciplinasContext';

export default function SearchField() {
  const {disciplinas, setDisciplinas} = disciplinasContext();

  return (
    <TextField
      id='search-field'
      label='Nome da Disciplina'
      variant='outlined'
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => setDisciplinas([])}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}
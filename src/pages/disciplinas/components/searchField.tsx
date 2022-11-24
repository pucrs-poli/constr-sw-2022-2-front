import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DisciplinasContext } from 'contexts/disciplinasContext/disciplinasContext';
import { useContext } from 'react';

export default function SearchField() {
  const { updateDisciplinas } = useContext(DisciplinasContext);

  return (
    <TextField
      id='search-field'
      label='Nome da Disciplina'
      variant='outlined'
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => updateDisciplinas([])}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}

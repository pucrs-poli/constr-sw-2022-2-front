import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DisciplinasContext } from 'contexts/disciplinasContext/disciplinasContext';
import { useContext, useState } from 'react';

export default function SearchField() {
  const { searchDisciplinas } = useContext(DisciplinasContext);

  const [searchField, setSearchField] = useState('');

  return (
    <TextField
      id='search-field'
      label='Nome da Disciplina'
      variant='outlined'
      fullWidth={true}
      value={searchField}
      onChange={(e) => setSearchField(e.target.value)}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => {
            searchDisciplinas(searchField);
            setSearchField('');
          }}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}

import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchField() {
  return (
    <TextField
      id='search-field'
      label='Nome da Disciplina'
      variant='outlined'
      fullWidth={true}
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}
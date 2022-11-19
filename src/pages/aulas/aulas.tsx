import { Breadcrumbs, Grid, Typography, Link, Input, TextField, Card, CardContent, CardActions, Button, CardHeader, InputAdornment, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

export default function Aulas() {
  const [classes, setClasses] = useState<any[]>();
  const history = useHistory();

  useEffect(() => {
    setClasses([
      {
        name: "Construção de Software",
        group: "123",
        resource: "notebook x12"
      }
    ])
  }, [])

  return (
    <Grid container gap={1} padding={1} flexDirection='column'>
      <Grid item>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link
            underline='hover'
            color='primary'
            onClick={(e) => {
              e.preventDefault();
              history.push(paths.homePage);
            }}
          >
            Página inicial
          </Link>
          <Typography color='text.primary'>Aulas</Typography>
        </Breadcrumbs>
      </Grid>
      <Box sx={{ m: 2 }} />

      <Grid container
        direction="row"
        justifyContent="space-between"
        alignItems="top"
      // xs={20}
      >
        <Grid container
          direction="row"
          wrap='wrap'
          alignItems="center"
          width={"50%"}
        // xs={20}
        >
          <MenuBookRoundedIcon fontSize='large' />
          <Typography fontWeight={600} fontSize={34}> Aulas</Typography>
        </Grid>
        <TextField InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }} placeholder="Pesquisar aula" />
      </Grid>

      <Box sx={{ m: 2 }} />
      <Grid>

        {classes?.map((it) => {
          return (
            <Card sx={{ minWidth: 275 }}>
              <CardContent >
                <Grid container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="top"
                  mb={2}>
                  <Typography variant="h5" component="div">
                    {it.name}
                  </Typography>
                  <Grid>
                    <IconButton >
                      <CreateRoundedIcon />
                    </IconButton >
                    <IconButton>
                      <DeleteRoundedIcon color='error' />
                    </IconButton >

                  </Grid>
                </Grid>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Turma: {it.group}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Reserva: {it.resource}
                </Typography>
              </CardContent>
            </Card>
          )
        })}


      </Grid>
    </Grid>
  );
}
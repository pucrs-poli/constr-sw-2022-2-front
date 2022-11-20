import { Breadcrumbs, Grid, Typography, Link, TextField, Card, CardContent, Button, InputAdornment, IconButton, Modal, Select, MenuItem, InputLabel } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AddIcon from '@mui/icons-material/Add';

interface Class {
  name: string,
  group: string,
  resource: string
}

export default function Aulas() {
  const [classes, setClasses] = useState<any[]>();
  const [searchKey, setSearchKey] = useState<string>("");
  const [createClass, setCreateClass] = useState<boolean>(false);
  const [editClass, ediClass] = useState<Class>();
  const [reservation, setReservation] = useState<number>()

  const history = useHistory();


  useEffect(() => {
    setClasses([
      {
        name: "Construção de Software",
        group: "123",
        resource: "notebook x12"
      },
      {
        name: "Dasein",
        group: "123",
        resource: "notebook x12"
      },
      {
        name: "Dasein",
        group: "123",
        resource: "notebook x12"
      },
      {
        name: "Dasein",
        group: "123",
        resource: "notebook x12"
      },
      {
        name: "Dasein",
        group: "123",
        resource: "notebook x12"
      }
    ])
  }, [])

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    py: 4,
    px: 4,
  };

  const postClass = async () => {

  }

  return (
    <Grid container flexDirection='column'>
      <Grid container gap={1} padding={1} flexDirection='column' maxWidth={"90%"}>

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
        >
          <Grid container
            direction="row"
            wrap='wrap'
            alignItems="center"
            width={"50%"}
          >
            <MenuBookRoundedIcon fontSize='large' /><Box mr={1} />
            <Typography fontWeight={600} fontSize={34}>  Aulas</Typography>
          </Grid>
          <TextField InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
            value={searchKey}
            onChange={(e) => { setSearchKey(e.target.value) }}
            placeholder="Pesquisar aula" />
        </Grid>

        <Box sx={{ m: 2 }} />
        <Modal
          open={createClass}
          onClose={() => setCreateClass(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Grid sx={{ ...style, maxWidth: "50%" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MenuBookRoundedIcon fontSize='large' /><Box mr={1} />
              <Typography fontWeight={600} fontSize={34}>  Aulas</Typography>
            </div>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Cadastrar aula
            </Typography>
            <TextField label="Disciplina" fullWidth />
            <Box m={2} />
            <TextField label="Número da Turma" fullWidth />
            <Box m={2} />
            <InputLabel id="reservation-select-label">Reserva</InputLabel>
            <Select
              id="reservation-select"
              labelId='reservation-select-label'
              value={reservation}
              label="Reserva"
              fullWidth
              onChange={(e) => setReservation(e.target.value as number)}
            >
              <MenuItem value={10}>Note Positivo</MenuItem>
              <MenuItem value={20}>Mouse Multilaser</MenuItem>
              <MenuItem value={30}>Fone Camelô</MenuItem>
            </Select>
            <Box m={16} />
            <Grid container justifyContent={"end"}>
              <Button onClick={() => setCreateClass(false)}>Cancelar</Button>
              <Button onClick={async () => await postClass()}>Criar</Button>
            </Grid>

          </Grid>
        </Modal>

        <Grid>
          {classes?.map((it) => {
            return (
              <>
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
                        <IconButton onClick={() => { console.log("Dasein") }}>
                          <CreateRoundedIcon />
                        </IconButton >
                        <IconButton onClick={() => { console.log("Dasein") }}>
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
                <Box sx={{ m: 2 }} />
              </>
            )
          })}
        </Grid>
      </Grid>
      <Grid position={"absolute"} left={"85%"} top={"90%"}>
        <Button onClick={() => { setCreateClass(true) }} style={{ position: "fixed", background: "#108BB1", color: "#F1F1F1", height: "5%", width: "10%", borderRadius: "20px" }}> <AddIcon /> CRIAR</Button>
      </Grid>
    </Grid>
  );
}
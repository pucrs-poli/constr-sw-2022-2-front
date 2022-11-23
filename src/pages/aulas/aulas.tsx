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

import { createClass, deleteClass, getClasses } from 'services/classes';
import { Class, CreateClass } from 'models/class';

export default function Aulas() {
  const [classes, setClasses] = useState<Class[]>();
  const [searchKey, setSearchKey] = useState<string>("");
  const [isCreatingClass, setIsCreatingClass] = useState<boolean>(false);
  const [editClass, setEditClass] = useState<CreateClass>();
  const [excludeClassId, setExcludeClassId] = useState<string>();

  const history = useHistory();


  useEffect(() => {
    getClasses().then(response => response.data).then(setClasses);
    
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

  const onCreateClass = async () => { 
    await createClass({      
      roomId: '0',
      groupId: '0',
      date: new Date(),
      content: "string",
      resourcesReservations: [
      {
        id: '0'     

      }]
    } as CreateClass)
    closeModal()
    getClasses().then(response => response.data).then(setClasses)
    
  }
  const patchClass = async () => { }
  const onDeleteClass = async () => { 
    await deleteClass(excludeClassId!)
    closeModal()
    getClasses().then(response => response.data).then(setClasses)

   }


  const closeModal = () => {
    setIsCreatingClass(false)
    setEditClass(undefined)
    setExcludeClassId(undefined)
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
            <Typography fontWeight={600} fontSize={34}> Aulas</Typography>
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
          open={isCreatingClass || !!editClass || !!excludeClassId}
          onClose={closeModal}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Grid sx={{ ...style, maxWidth: "50%" }}>
            {excludeClassId ?
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MenuBookRoundedIcon fontSize='large' /><Box mr={1} />
                  <Typography fontWeight={600} fontSize={34}>  Aulas</Typography>
                </div>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Excluir aula
                </Typography>
                <Box m={2} />
                <Typography >
                  Tem certeza que deseja excluir esta aula?
                </Typography>
                <Box m={16} />
                <Grid container justifyContent={"end"}>
                  <Button onClick={closeModal}>Cancelar</Button>
                  <Button style={{ color: "#B00020" }} onClick={async () => await onDeleteClass()}>Deletar</Button>
                </Grid>
              </>
              :
              <>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MenuBookRoundedIcon fontSize='large' /><Box mr={1} />
                  <Typography fontWeight={600} fontSize={34}>  Aulas</Typography>
                </div>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {isCreatingClass ? "Cadastrar " : "Editar "}  aula
                </Typography>
                <TextField label="Disciplina" fullWidth value={editClass?.group?.subject?.name} onChange={(e) => {/* Filer options on groups textfield */}} />
                <Box m={2} />
                <TextField label="Número da Turma" fullWidth value={editClass?.group?.numGroup} onChange={(e) => setEditClass({ ...editClass!, group: { id: e.target.value } })} />
                <Box m={2} />
                <InputLabel id="reservation-select-label">Reserva</InputLabel>
                <Select
                  id="reservation-select"
                  labelId='reservation-select-label'
                  value={editClass?.resourcesReservations?.[0]?.id}
                  label="Reserva"
                  fullWidth
                  onChange={(e) => setEditClass({ ...editClass!, resourcesReservations: [{ id: e.target.value }]})}
                >
                  <MenuItem value={10}>Note Positivo</MenuItem>
                  <MenuItem value={20}>Mouse Multilaser</MenuItem>
                  <MenuItem value={30}>Fone Camelô</MenuItem>
                </Select>
                <Box m={16} />
                <Grid container justifyContent={"end"}>
                  <Button onClick={() => setIsCreatingClass(false)}>Cancelar</Button>
                  {isCreatingClass ? <Button onClick={async () => await onCreateClass()}>Criar</Button> : <Button onClick={async () => await patchClass()}>Criar</Button>}
                </Grid>
              </>
            }
          </Grid>
        </Modal>

        <Grid>
          {classes?.map((it,i) => {
            return (
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
                        <IconButton onClick={() => { setEditClass({ ...it, resourcesReservations: it.reservations.map(x => x.resource), roomId:it.room!.id, groupId:it.group.id}) }}>
                          <CreateRoundedIcon />
                        </IconButton >
                        <IconButton onClick={() => { setExcludeClassId(it.id) }}>
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
            )
          })}
        </Grid>
      </Grid>
      <Grid position={"absolute"} left={"85%"} top={"90%"}>
        <Button onClick={() => { setIsCreatingClass(true) }} style={{ position: "fixed", background: "#108BB1", color: "#F1F1F1", height: "5%", width: "10%", borderRadius: "20px" }}> <AddIcon /> CRIAR</Button>
      </Grid>
    </Grid>
  );
}
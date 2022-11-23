import { Grid, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AddIcon from '@mui/icons-material/Add';
import { createClass, deleteClass, getClasses, updateClass } from 'services/classes';
import { Class, CreateClass } from 'models/class';
import ClassPageBreadcrumbs from './components/breadcrumbs';
import ClassList from './components/classList';
import ClassPageEditModal from './components/editModal';
import ClassPageDeleteModal from './components/deleteModal';

export default function Aulas() {
  const [classes, setClasses] = useState<Class[]>();
  const [searchKey, setSearchKey] = useState<string>("");
  const [isCreatingClass, setIsCreatingClass] = useState<boolean>(false);
  const [editClass, setEditClass] = useState<CreateClass>();
  const [excludeClassId, setExcludeClassId] = useState<string>();

  const loadList = () => getClasses().then(response => response.data).then(setClasses);

  useEffect(() => {
    loadList()
  }, [])

  const onCreateClass = async () => { 
    await createClass({      
      roomId: '0',
      groupId: '0',
      date: new Date(),
      content: "string",
      resourcesReservations: [{ id: '0' }]
    } as CreateClass)
    closeModal()
    loadList()
  }

  const onUpdateClass = async () => {
    /*await updateClass({
      id: editClass?.id,
      roomId: '0',
      groupId: '0',
      date: new Date(),
      content: "string",
      resourcesReservations: [{ id: '0' }]
    } as CreateClass)*/
    closeModal()
    loadList()
  }

  const onDeleteClass = async () => { 
    await deleteClass(excludeClassId!)
    closeModal()
    loadList()
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
          <ClassPageBreadcrumbs />
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

        <ClassList 
          classes={classes}
          onEditClick={classe => setEditClass({
            ...classe,
            resourcesReservations: classe.reservations.map(x => x.resource),
            roomId: classe.room!.id,
            groupId: classe.group.id
          })}
          onDeleteClick={classe => setExcludeClassId(classe.id)}
        />

        <ClassPageEditModal
          open={isCreatingClass || !!editClass}
          editClass={editClass}
          isCreating={isCreatingClass}
          onChange={setEditClass}
          onClose={closeModal}
          onCreateRequest={onCreateClass}
          onUpdateRequest={onUpdateClass}
        />

        <ClassPageDeleteModal
          open={!!excludeClassId}
          classId={excludeClassId}
          onClose={closeModal}
          onDeleteRequest={onDeleteClass}
        />

      </Grid>
      <Grid position={"absolute"} left={"85%"} top={"90%"}>
        <Button onClick={() => { setIsCreatingClass(true) }} style={{ position: "fixed", background: "#108BB1", color: "#F1F1F1", height: "5%", width: "10%", borderRadius: "20px" }}> <AddIcon /> CRIAR</Button>
      </Grid>
    </Grid>
  );
}
import { Grid, Typography, TextField, Button, Modal, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { CreateClass } from 'models/class';
import { classPageModalStyle } from './modalStyle';
import { useEffect, useState } from 'react';
import { Group } from 'models/group';
import { Subject } from 'models/subject';
import { getSubjects } from 'services/subjects';
import { getGroupsBySubject } from 'services/groups';

export interface ClassPageModalProps {
  isCreating: boolean;
  open: boolean;
  editClass?: CreateClass;
  onClose?: () => void;
  onChange?: (editClass: CreateClass) => void;
  onCreateRequest?: () => void;
  onUpdateRequest?: () => void;
}

export default function ClassPageEditModal({ isCreating, open, editClass, onClose, onChange, onCreateRequest, onUpdateRequest }: ClassPageModalProps) {
  const [subjectId, setSubjectId] = useState<string>();
  const [subjects, setSubjects] = useState<Subject[]>()
  const [groups, setGroups] = useState<Group[]>();

  const loadSubjects = () => getSubjects().then(res => res.data).then(setSubjects);
  const loadGroups = () => subjectId !== undefined && getGroupsBySubject(subjectId).then(res => res.data).then(setGroups);

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    loadGroups();
  }, [subjectId]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Grid sx={{ ...classPageModalStyle, maxWidth: "50%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <MenuBookRoundedIcon fontSize='large' /><Box mr={1} />
          <Typography fontWeight={600} fontSize={34}>  Aulas</Typography>
        </div>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {isCreating ? "Cadastrar " : "Editar "}  aula
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="subject-select-label">Disciplina</InputLabel>
          <Select
            id="subject-select"
            labelId='subject-select-label'
            value={subjectId}
            label="Disciplina"
            fullWidth
            onChange={(e) => setSubjectId(e.target.value) }
          >
            {
              subjects?.map((subject, i) => (
                <MenuItem value={subject.id} key={i}>{subject.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Box m={2} />
        <FormControl fullWidth>
          <InputLabel id="group-select-label">Número da Turma</InputLabel>
          <Select
            disabled={subjectId === undefined}
            id="group-select"
            labelId='group-select-label'
            value={editClass?.groupId}
            label="Número da Turma"
            fullWidth
            onChange={(e) => onChange?.({ ...editClass!, groupId: e.target.value })}
          >
            {
              groups?.map((group, i) => (
                <MenuItem value={group.id} key={i}>{group.numGroup}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Box m={2} />
        <FormControl fullWidth>
          <InputLabel id="reservation-select-label">Reserva</InputLabel>
          <Select
            id="reservation-select"
            labelId='reservation-select-label'
            value={editClass?.resourcesReservations?.[0]?.id}
            label="Reserva"
            fullWidth
            onChange={(e) => onChange?.({ ...editClass!, resourcesReservations: [{ id: e.target.value }] })}
          >
            <MenuItem value={10}>Notebook 1</MenuItem>
            <MenuItem value={20}>Notebook 2</MenuItem>
            <MenuItem value={30}>Mouse</MenuItem>
          </Select>
        </FormControl>
        <Box m={2} />
        <Grid container justifyContent={"flex-end"}>
          <Button onClick={() => onClose?.()}>Cancelar</Button>
          {isCreating && <Button onClick={() => onCreateRequest?.()}>Criar</Button>}
          {!isCreating && <Button onClick={() => onUpdateRequest?.()}>Atualizar</Button>}
        </Grid>
      </Grid>
    </Modal>
  );
}

import { Grid, Typography, TextField, Button, Modal, Select, MenuItem, InputLabel } from '@mui/material';
import { Box } from '@mui/system';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { CreateClass } from 'models/class';
import { classPageModalStyle } from './modalStyle';

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
        <TextField label="Disciplina" fullWidth value={editClass?.group?.subject?.name} onChange={(e) => {/* Filer options on groups textfield */ }} />
        <Box m={2} />
        <TextField label="Número da Turma" fullWidth value={editClass?.group?.numGroup} onChange={(e) => onChange?.({ ...editClass!, group: { id: e.target.value } })} />
        <Box m={2} />
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
        <Box m={16} />
        <Grid container justifyContent={"end"}>
          <Button onClick={() => onClose?.()}>Cancelar</Button>
          {isCreating && <Button onClick={() => onCreateRequest?.()}>Criar</Button>}
          {!isCreating && <Button onClick={() => onUpdateRequest?.()}>Atualizar</Button>}
        </Grid>
      </Grid>
    </Modal>
  );
}

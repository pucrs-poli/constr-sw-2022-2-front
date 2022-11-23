import { Grid, Typography, Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { classPageModalStyle } from './modalStyle';

export interface ClassPageModalProps {
  open: boolean;
  classId?: string;
  onClose?: () => void;
  onDeleteRequest?: () => void;
}

export default function ClassPageDeleteModal({ open, classId, onClose, onDeleteRequest }: ClassPageModalProps) {
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
          Excluir aula
        </Typography>
        <Box m={2} />
        <Typography >
          Tem certeza que deseja excluir esta aula?
        </Typography>
        <Box m={16} />
        <Grid container justifyContent={"end"}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button style={{ color: "#B00020" }} onClick={() => onDeleteRequest?.()}>Deletar</Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

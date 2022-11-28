import {
  CheckCircleOutlineRounded,
  HighlightOffRounded,
} from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

interface CadastroSalaProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  title: string;
}
export default function CadastroSalaModal(props: CadastroSalaProps) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>CONTEUDO EM</DialogContent>
      <DialogActions>
        <Button
          onClick={props.onCancel}
          startIcon={<HighlightOffRounded />}
          color='inherit'
          variant='text'
        >
          Cancelar
        </Button>
        <Button
          color='primary'
          startIcon={
            loading ? (
              <CircularProgress color='primary' size={20} />
            ) : (
              <CheckCircleOutlineRounded />
            )
          }
          onClick={() => {
            setLoading(true);
            const call = props.onConfirm();
            if (call) {
              call.finally(() => setLoading(false));
            } else {
              setLoading(false);
            }
          }}
          autoFocus
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

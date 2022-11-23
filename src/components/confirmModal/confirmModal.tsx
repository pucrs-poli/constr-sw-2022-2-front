import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  destructive?: boolean;
  text: string;
  title: string;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Dialog
      open={props.opened}
      onClose={props.onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onCancel}
          startIcon={<HighlightOffRoundedIcon />}
          color='inherit'
          variant='text'
        >
          Cancelar
        </Button>
        <Button
          color={props.destructive ? 'error' : 'primary'}
          startIcon={
            loading ? (
              <CircularProgress
                color={props.destructive ? 'error' : 'primary'}
                size={20}
              />
            ) : (
              <CheckCircleOutlineRoundedIcon />
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

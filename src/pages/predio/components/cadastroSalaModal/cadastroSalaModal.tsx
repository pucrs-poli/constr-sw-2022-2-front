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
  Grid,
  TextField,
} from '@mui/material';
import { Sala } from 'models/prediosSalas';
import { useState } from 'react';

interface CadastroSalaProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (sala: Partial<Sala>) => void | Promise<void>;
  onCancel: () => void;
  sala?: Partial<Sala>;
}
export default function CadastroSalaModal(props: CadastroSalaProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const [num, setNum] = useState<number>(props.sala?.number || undefined);
  const [capacity, setCapacity] = useState<number>(
    props.sala?.capacity || undefined
  );
  const [floor, setFloor] = useState<number>(props.sala?.floor || undefined);
  const [resource, setResource] = useState<string>(props.sala?.resource || '');

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{props.sala ? 'Editar Sala' : 'Cadastrar Sala'}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid padding={1} item xs={6}>
            <TextField
              label='Andar'
              variant='standard'
              fullWidth
              inputProps={{ maxLength: 3 }}
              inputMode='numeric'
              value={floor ?? ''}
              onChange={(e) => {
                const val = e.target.value.replaceAll(/\D/g, '');
                setFloor(val ? parseInt(val) : undefined);
              }}
              disabled={loading}
              error={sent && floor === undefined}
            />
          </Grid>
          <Grid padding={1} item xs={6}>
            <TextField
              inputProps={{ maxLength: 5 }}
              label='Número da sala'
              variant='standard'
              fullWidth
              inputMode='numeric'
              value={num ?? ''}
              onChange={(e) => {
                const val = e.target.value.replaceAll(/\D/g, '');
                setNum(val ? parseInt(val) : undefined);
              }}
              error={sent && num === undefined}
              disabled={loading}
            />
          </Grid>
          <Grid padding={1} item xs={12} sm={6}>
            <TextField
              inputProps={{ maxLength: 4 }}
              label='Capacidade'
              variant='standard'
              inputMode='numeric'
              fullWidth
              value={capacity ?? ''}
              onChange={(e) => {
                const val = e.target.value.replaceAll(/\D/g, '');
                setCapacity(val ? parseInt(val) : undefined);
              }}
              error={sent && capacity === undefined}
              disabled={loading}
            />
          </Grid>
          <Grid padding={1} item xs={12} sm={6}>
            <TextField
              inputProps={{ maxLength: 100 }}
              label='Recurso'
              variant='standard'
              fullWidth
              value={resource ?? ''}
              onChange={(e) => {
                setResource(e.target.value);
              }}
              error={sent && !resource}
              disabled={loading}
            />
          </Grid>
        </Grid>
      </DialogContent>
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
            setSent(true);
            if (!num || !capacity || !floor || !resource) {
              return;
            }
            setLoading(true);
            const call = props.onConfirm({
              ...(props.sala || {}),
              number: num,
              capacity,
              floor,
              resource,
            });
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

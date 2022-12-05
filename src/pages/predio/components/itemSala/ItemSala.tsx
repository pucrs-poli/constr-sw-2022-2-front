import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { Sala } from 'models/prediosSalas';
import styles from './ItemSala.scss';
const { rootClassName } = styles;
interface ItemSalaProps {
  sala: Partial<Sala>;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export default function ItemSala(props: ItemSalaProps) {
  return (
    <Grid item xs={12} className={rootClassName}>
      <div className={`${rootClassName}-info`}>
        <div>
          {props.sala.floor}° Andar - Sala{props.sala.number}
        </div>
        <div className={`${rootClassName}-capacity`}>
          Capacidade: {props.sala.capacity}
        </div>
      </div>
      <div className={`${rootClassName}-actions`}>
        <IconButton color='default' onClick={props.onEditClick}>
          <EditRounded />
        </IconButton>
        <IconButton color='error' onClick={props.onDeleteClick}>
          <DeleteRounded />
        </IconButton>
      </div>
    </Grid>
  );
}

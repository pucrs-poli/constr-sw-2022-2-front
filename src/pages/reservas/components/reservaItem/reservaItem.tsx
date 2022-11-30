import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Reserva } from 'models/reserva';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';
import styles from './reservaItem.scss';
const { rootClassName } = styles;

export default function ReservaItem({
  reserva,
  onDeleteClick,
}: {
  reserva: Reserva;
  onDeleteClick: () => void;
}) {
  const history = useHistory();

  return (
    <div className={rootClassName}>
      <div className={`${rootClassName}-info`}>
        <div>{reserva.resource.description} - {reserva.data}</div>
        <div className={`${rootClassName}-rooms`}>
            {reserva.observation}
        </div>
      </div>
      <div className={`${rootClassName}-actions`}>
        <IconButton
          color='default'
          onClick={() => {
           history.push(paths.editarReservas.replace(':id', reserva.resource.id));
          }}
        >
          <EditRounded />
        </IconButton>
        <IconButton color='error' onClick={onDeleteClick}>
          <DeleteRounded />
        </IconButton>
      </div>
    </div>
  );
}
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Predio } from 'models/prediosSalas';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';
import styles from './predioItem.scss';
const { rootClassName } = styles;

export default function PredioItem({
  predio,
  onDeleteClick,
}: {
  predio: Predio;
  onDeleteClick: () => void;
}) {
  const history = useHistory();

  return (
    <div className={rootClassName}>
      <div className={`${rootClassName}-info`}>
        <div>{predio.name}</div>
        <div className={`${rootClassName}-rooms`}>
          {predio.classrooms.length ?? 0}{' '}
          {predio.classrooms.length !== 1 ? 'Salas' : 'Sala'}
        </div>
      </div>
      <div className={`${rootClassName}-actions`}>
        <IconButton
          color='default'
          onClick={() => {
            history.push(paths.editarPredio.replace(':id', predio._id));
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

import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';

export default function Forbidden() {
  const history = useHistory();
  return (
    <div>
      Forbidden
      <button onClick={() => history.replace(paths.homePage)}>
        página inicial
      </button>
    </div>
  );
}

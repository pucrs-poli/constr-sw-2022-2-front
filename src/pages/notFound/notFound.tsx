import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';

export default function NotFound() {
  const history = useHistory();
  return (
    <div>
      Page not found
      <button onClick={() => history.replace(paths.homePage)}>
        página inicial
      </button>
    </div>
  );
}

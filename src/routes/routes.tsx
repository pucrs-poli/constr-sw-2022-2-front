import HomePage from 'pages/homePage/homePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='' component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

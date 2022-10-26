import HomePage from 'pages/homePage/homePage';
import NotFound from 'pages/notFount/notFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='*' component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

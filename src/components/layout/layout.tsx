import { Container } from '@mui/material';
import Header from 'components/header/header';
import { Fragment } from 'react';

export default function Layout(props: { children?: JSX.Element }) {
  return (
    <Fragment>
      <Header />
      <Container>{props.children}</Container>
    </Fragment>
  );
}

import {
  ApartmentRounded,
  CableRounded,
  CategoryRounded,
  EventRepeatRounded,
  FormatListNumberedRounded,
  GroupsRounded,
  HomeRounded,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';
import { Permission } from 'models/permission';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';

type MenuItens = {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
  permission?: (p: Permission) => boolean;
};

export default function LeftMenu({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (value: boolean) => void;
}) {
  // const { permission } = useContext(AuthContext);
  const history = useHistory();

  const itens = useMemo(() => {
    return [
      {
        icon: <HomeRounded />,
        text: 'Página inicial',
        onClick: () => {
          history.push(paths.homePage);
          setOpened(false);
        },
      },
      {
        icon: <ApartmentRounded />,
        text: 'Prédios e salas',
        onClick: () => {
          history.push(paths.prediosSalas);
          setOpened(false);
        },
      },
      {
        icon: <CableRounded />,
        text: 'Recursos',
        onClick: () => {
          history.push(paths.recursos);
          setOpened(false);
        },
      },
      {
        icon: <CategoryRounded />,
        text: 'Disciplinas',
        onClick: () => {
          history.push(paths.disciplinas);
          setOpened(false);
        },
      },
      {
        icon: <FormatListNumberedRounded />,
        text: 'Turmas',
        onClick: () => {
          history.push(paths.turmas);
          setOpened(false);
        },
      },
      {
        icon: <GroupsRounded />,
        text: 'Aulas',
        onClick: () => {
          history.push(paths.aulas);
          setOpened(false);
        },
      },
      {
        icon: <EventRepeatRounded />,
        text: 'Reservas',
        onClick: () => {
          history.push(paths.reservas);
          setOpened(false);
        },
      },
    ] as MenuItens[];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SwipeableDrawer
      anchor='left'
      open={opened}
      onClose={() => setOpened(false)}
      onOpen={() => setOpened(true)}
    >
      <List>
        {itens.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* <Divider /> */}
      </List>
    </SwipeableDrawer>
  );
}

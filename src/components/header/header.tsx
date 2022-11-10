import { AccountCircleRounded, MenuRounded } from '@mui/icons-material';
import { Button, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import HeaderLogo from 'assets/icons/headerLogo';
import LeftMenu from 'components/leftMenu/leftMenu';
import { AuthContext } from 'contexts/authContext/authContext';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { paths } from 'routes/routes';
import styles from './header.scss';
const { rootClassName } = styles;

export default function Header() {
  const { userData, logout } = useContext(AuthContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const history = useHistory();

  return (
    <header className={rootClassName}>
      <LeftMenu opened={menuOpened} setOpened={setMenuOpened} />
      <Grid gap={1} className={`${rootClassName}-left-content`}>
        {!!userData && (
          <IconButton
            color='secondary'
            onClick={() => {
              setMenuOpened(!menuOpened);
            }}
          >
            <MenuRounded />
          </IconButton>
        )}
        <Button
          color='secondary'
          onClick={() => {
            history.push(paths.homePage);
          }}
          disabled={!userData}
        >
          <HeaderLogo height={18} />
        </Button>
      </Grid>
      {!!userData && (
        <IconButton
          color='secondary'
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setUserMenuOpened(!userMenuOpened);
          }}
        >
          <AccountCircleRounded />
        </IconButton>
      )}
      <Menu
        open={!!userData && userMenuOpened}
        anchorEl={anchorEl}
        onClose={() => setUserMenuOpened(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>{userData?.name}</MenuItem>
        <MenuItem
          onClick={() => {
            setUserMenuOpened(false);
            setTimeout(logout, 100);
          }}
        >
          Sair
        </MenuItem>
      </Menu>
    </header>
  );
}

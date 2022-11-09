import { AccountCircleRounded } from '@mui/icons-material';
import { Button, Grid, IconButton, Popover } from '@mui/material';
import Logo from 'assets/icons/logo';
import { AuthContext } from 'contexts/authContext/authContext';
import { useContext, useState } from 'react';
import styles from './header.scss';
const { rootClassName } = styles;

export default function Header() {
  const { userData, logout } = useContext(AuthContext);
  const [menuOpened, setMenuOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <header className={rootClassName}>
      <Logo height={35} />
      {!!userData && (
        <IconButton
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setMenuOpened(!menuOpened);
          }}
        >
          <AccountCircleRounded color='secondary' />
        </IconButton>
      )}
      <Popover
        open={!!userData && menuOpened}
        anchorEl={anchorEl}
        onClose={() => setMenuOpened(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Grid className={`${rootClassName}-menu-item`}>
          <Button variant='text' disabled>
            {userData?.name}
          </Button>
        </Grid>
        <Grid className={`${rootClassName}-menu-item`}>
          <Button
            variant='text'
            onClick={() => {
              setMenuOpened(false);
              setTimeout(logout, 100);
            }}
          >
            Sair
          </Button>
        </Grid>
      </Popover>
    </header>
  );
}

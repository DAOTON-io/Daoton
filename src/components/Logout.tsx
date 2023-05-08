import React, {useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import {Avatar, Grid, IconButton, Theme, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useNavigate} from 'react-router-dom';
import {useTonAddress, useTonConnectUI} from '@tonconnect/ui-react';

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    padding: '4px',
    color: 'white',
    cursor: 'pointer',
  },
  logoutlistItemSmall: {
    marginBottom: '0.6rem',
    '&:hover': {
      borderRadius: 4,
    },
  },
  item: {
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'Signika Negative',
  },
}));

const Logout: React.FC = () => {
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const [tonConnectUI] = useTonConnectUI();
  const navigate = useNavigate();
  const address = useTonAddress(false);
  const classes = useStyles();

  return (
    <div className={classes.listItem}>
      <Grid className={classes.logoutlistItemSmall} container spacing={1}>
        {!showLogout ? (
          <Grid
            item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.3rem',
            }}
            onClick={() => {
              setShowLogout(true);
            }}>
            <Avatar
              src="/broken-image.jpg"
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#EC7D31',
                marginRight: '0.5rem',
              }}
            />
            <Typography className={classes.item}>
              {address.slice(0, 8) + '...' + address.slice(-4)}{' '}
            </Typography>
          </Grid>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <IconButton
              aria-label="back"
              component="label"
              style={{color: 'white'}}
              onClick={() => {
                setShowLogout(false);
              }}>
              <ArrowBackIcon />
            </IconButton>
            <Grid item>
              <Typography className={classes.item}>
                {address.slice(0, 8) + '...' + address.slice(-4)}
              </Typography>
            </Grid>
            <IconButton
              aria-label="back"
              component="label"
              style={{color: 'white'}}
              onClick={() => {
                tonConnectUI.disconnect();
                navigate('/login');
              }}>
              <LogoutIcon />
            </IconButton>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default Logout;

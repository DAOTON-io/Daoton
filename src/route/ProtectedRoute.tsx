import React, {useEffect, useState} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {Card, Grid, LinearProgress} from '@mui/material';
import {makeStyles} from '@mui/styles';
import SideMenu from '../components/SideMenu';
import DrawerAppBar from '../components/MobilMenu';
import GoogleFontLoader from 'react-google-font-loader';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '2rem',
    overflow: 'scrool',
    [theme.breakpoints.down('md')]: {
      padding: '1rem',
    },
  },
}));

export const ProtectedRoute = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);

  const classes = useStyles();

  useEffect(() => {
    tonConnectUI.connectionRestored.then(() => {
      setConnected(tonConnectUI.connected);
      setloading(false);
    });
  }, [tonConnectUI, tonConnectUI.connected, tonConnectUI.connectionRestored]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <LinearProgress color="inherit" style={{width: '80%'}} />
      </div>
    );
  }

  return connected ? (
    <div
      style={{
        backgroundColor: '#E7EBF1',
      }}
      className={classes.container}>
      <Grid container spacing={2}>
        <Grid item lg={2} md={3}>
          <SideMenu />
        </Grid>
        <Grid item lg={10} md={9} xs={12}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item>
              <DrawerAppBar />
            </Grid>
            <Grid item sx={{width: '100%'}}>
              <Card
                sx={{
                  borderRadius: '40px',
                }}>
                <GoogleFontLoader
                  fonts={[
                    {font: 'Raleway', weights: [700, '700i', 500, '500i']},
                  ]}
                  subsets={['cyrillic-ext', 'greek']}
                />
                <div>
                  <Outlet />
                </div>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

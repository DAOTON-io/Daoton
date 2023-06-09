import React from 'react';
import {Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';

import ResponsiveAppBar from './header';
import SideMenu from './SideMenu';

const useStyles = makeStyles({
  container: {
    padding: '1rem',
  },
  card: {
    backgroundColor: '#2D6495',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    height: '90vh',
    color: 'white',
    padding: '10px',
    borderRadius: '1rem',
  },
  listItem: {
    padding: '10px',
    color: 'white',
  },
  listItemSmall: {
    marginBottom: '1rem',
    '&:hover': {
      borderRadius: 4,
      backgroundColor: '#1689c5',
    },
  },

  divider: {
    backgroundColor: 'white',
    color: 'white',
  },
  title: {
    color: 'white',
    marginBottom: '0.5rem',
    fontSize: '14px',
  },
  item: {
    color: 'white',
  },
});

const MenuPage = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <SideMenu />
          </Grid>
          <Grid item md={8}>
            <ResponsiveAppBar />
            {/* <StickyHeadTable daoId={undefined} tokenContract={undefined} /> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MenuPage;

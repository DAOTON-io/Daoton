import React from 'react';
import {Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useParams} from 'react-router-dom';
import {Button} from 'reactstrap';
import DrawerAppBar from '../components/MobilMenu';
import {OwnerCard} from '../components/OwnerCard';
import SideMenu from '../components/SideMenu';
import {StickyHeadTable} from '../components/Table';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '1rem',
  },
}));

const ContractList = () => {
  const classes = useStyles();
  let {daoId} = useParams();

  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <SideMenu />
      </Grid>
      <Grid item md={10}>
        <DrawerAppBar />
        <OwnerCard daoId={daoId || ''} />
        <Grid container alignItems={'end'} spacing={2}>
          <Grid item>
            <p className={classes.title}>Proposals</p>
          </Grid>
          <Grid item>
            <a href={'/create-contract/' + daoId}>
              <Button
                style={{
                  marginRight: '5px',
                  backgroundColor: '#ff761c',
                  color: 'white',
                  textTransform: 'none',
                  borderRadius: '10px',
                  padding: '0.5rem',
                  fontSize: '0.8rem',
                  border: 'none',
                }}>
                Create Proposal
              </Button>
            </a>
          </Grid>
        </Grid>
        <StickyHeadTable daoId={daoId || ''} tokenContract={''} />
      </Grid>
    </Grid>
  );
};

export default ContractList;

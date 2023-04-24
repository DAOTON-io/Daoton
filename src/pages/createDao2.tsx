import React, {useState} from 'react';
import {Grid} from '@mui/material';
import DrawerAppBar from '../components/mobilMenu';
import SideMenu from '../components/sideMenu';
import {makeStyles} from '@mui/styles';
import {DaoTypes} from './CreateDao/DaoTypes';
import {Steps} from './CreateDao/Steps';

const useStyles = makeStyles(theme => ({
  cardDiv: {
    marginTop: '8rem',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
}));

export const CreateDao2: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const classes = useStyles();

  return (
    <div
      style={{
        backgroundColor: '#E7EBF1',
        height: '100%',
      }}>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <SideMenu />
        </Grid>
        <Grid item md={10}>
          <DrawerAppBar />
          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              height: '80vh',
            }}>
            <Steps activeStep={activeStep} />
            <div className={classes.cardDiv}>
              {activeStep === 1 && (
                <>
                  {' '}
                  <DaoTypes activeStepOnChange={setActiveStep} />
                </>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

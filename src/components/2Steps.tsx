import React from 'react';
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/material';
import {CustomStep} from './CustomStep';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'fixed',
    marginTop: '2rem',
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem',
    },
  },
  cardDiv: {
    marginTop: '8rem',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
}));

type Props = {
  allSteps:string[];
  activeStep: number;
};

export const NewSteps: React.FC<Props> = ({allSteps,activeStep}) => {
  const classes = useStyles();

  return (
    <div className={classes.appBar}>
      <CustomStep steps={allSteps} activeStep={activeStep} />
    </div>
  );
};

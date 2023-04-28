import React from 'react';
import {makeStyles} from '@mui/styles';
import {CustomStep} from '../../components/customStep';
import {Theme} from '@mui/material';

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

const steps = [
  'Choose DAO Type',
  'Your Dao Informations',
  'Token Detail',
  'Review',
];

type Props = {
  activeStep: number;
};

export const Steps: React.FC<Props> = ({activeStep}) => {
  const classes = useStyles();

  return (
    <div className={classes.appBar}>
      <CustomStep steps={steps} activeStep={activeStep} />
    </div>
  );
};

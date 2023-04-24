import React from 'react';
import {makeStyles} from '@mui/styles';
import {CustomStep} from '../../components/customStep';

const steps = [
  'Choose DAO Type',
  'Your Dao Informations',
  'Token Detail',
  'Review',
];

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'fixed',
    marginTop: '2rem',
    width: '90%',
  },
  cardDiv: {
    marginTop: '8rem',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
}));

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

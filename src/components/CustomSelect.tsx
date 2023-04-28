import React from 'react';
import {Select, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    fontFamily: 'Raleway',
    width: '100%',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1D252C',
    border: 'none',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    backgroundColor: '#A2C5E3',
    padding: '10px',
    borderRadius: '0.5rem',
    height: '3rem',
    marginBottom: '1rem',
  },
}));

type Props = {
  onChange: any;
  values?: any;
  children: any;
};

export const CustomSelect: React.FC<Props> = ({onChange, values, children}) => {
  const classes = useStyles();

  return (
    <Select
      className={classes.select}
      onChange={onChange}
      value={values}
      variant="outlined"
      size="small"
      fullWidth>
      {children}
    </Select>
  );
};

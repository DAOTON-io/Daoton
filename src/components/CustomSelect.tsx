import React from 'react';
import {Select, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    fontFamily: 'Raleway',
    width: '100%',
    height: '44px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#1D252C',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    backgroundColor: '#A2C5E3 !important',
    padding: '10px',
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
      inputProps={{
        className: classes.select,
      }}
      sx={{
        '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select':
          {
            height: '27px',
            borderRadius: '1rem',
          },
        '& .MuiOutlinedInput-notchedOutline': {
          border: '1px solid #A2C5E3',
          borderRadius: '1rem',
        },
      }}
      onChange={onChange}
      value={values}
      variant="outlined"
      size="small"
      fullWidth>
      {children}
    </Select>
  );
};

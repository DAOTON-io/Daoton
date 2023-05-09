import React, {useState} from 'react';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/material';
import moment, {Moment} from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: '400px',
    color: '#767D86',
    boxShadow: 'none',
    fontSize: '1rem',
    fontFamily: 'Raleway',
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
      minWidth: '300px',
    },
  },
}));

type Props = {
  label: string;
  value: any;
  onChange: any;
};

export const CustomDateTime: React.FC<Props> = ({label, value, onChange}) => {
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '1rem',
            border: '1px solid #2D6495',
            '&:hover': {
              borderColor: ' #2AABEE',
            },
          },
          '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
            height: '11px',
          },
          label: {
            color: '#2D6495',
          },
          '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
            ';-webkit-transform': 'translate(14px, 12px) scale(1)',
          },
          '& .MuiOutlinedInput-input': {
            padding: '10.5px 5px',
          },
          '& ..css-1b8s10m-MuiStack-root': {
            margin: '0',
          },
        }}
        className={classes.input}
        label={label}
        value={moment.unix(value)}
        onChange={onChange}
        disablePast
      />
    </LocalizationProvider>
  );
};

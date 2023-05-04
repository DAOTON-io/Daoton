import React from 'react';
import {TextField, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    width: '400px',
    maxHeight: '44px',
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
  placeholder: string;
  label: string;
  id: string;
  name: string;
  value: string | number;
  onChange: any;
  style?: any;
};

export const CustomInput: React.FC<Props> = ({
  placeholder,
  label,
  id,
  name,
  value,
  onChange,
  style,
}) => {
  const classes = useStyles();

  return (
    <TextField
      inputProps={{
        className: classes.input,
      }}
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
      }}
      placeholder={placeholder}
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      required
      type="text"
      style={style}
    />
  );
};

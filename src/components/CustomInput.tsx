import {TextField, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    maxWidth: '400px',
    maxHeight: '44px',
    borderRadius: '1rem',
    border: '1px solid #A2C5E3',
    color: '#767D86',
    boxShadow: 'none',
    fontSize: '1rem',
    fontFamily: 'Raleway',
    // left: '0px',
    // top: '0px',
    // padding: '10px 20px 10px 20px',
    // boxSizing: 'border-box',
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    // flex: 'none',
    // order: 0,
    // flexGrow: 0,
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
      minWidth: '300px',
    },
  },
}));

type Props = {
  placeholder: string;
  id: string;
  name: string;
  value: string;
  onChange: any;
};

export const CustomInput: React.FC<Props> = ({
  placeholder,
  id,
  name,
  value,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required
      type="text"
    />
  );
};

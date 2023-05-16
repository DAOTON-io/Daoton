import React from 'react';
import {Button, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: '10px',
    backgroundColor: '#2D6495',
    color: '#E7F4FF',
    border: 'none',
    borderRadius: '16px',
    minWidth: '235px',
    minHeight: '44px',
    fontFamily: 'Raleway',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      minWidth: '200px',
    },
  },
}));

type Props = {
  onClick: any;
  disabled?: boolean;
  label: string;
  className?: string;
};

export const CustomButton: React.FC<Props> = ({
  onClick,
  disabled,
  label,
  className,
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={className ? className : classes.button}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </Button>
  );
};

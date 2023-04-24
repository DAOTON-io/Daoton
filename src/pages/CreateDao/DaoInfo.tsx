import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Grid, Stack} from '@mui/material';
import {ImageUpload} from '../../components/imageUpload';

const useStyles = makeStyles(theme => ({
  label: {
    color: 'grey',
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },
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
  input: {
    borderRadius: '16px',
    borderColor: '#A2C5E3',
    borderWidth: '1px',
    maxWidth: '400px',
    color: '#767D86',
    minHeight: '44px',
    padding: '12px',
    boxShadow: 'none',
    fontSize: '16px',
    fontFamily: 'Raleway',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      minWidth: '300px',
    },
  },
  center: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  container: {
    marginBottom: 6,
    marginTop: 6,
    padding: '64px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
  },
  buttonContainer: {
    paddingRight: '32px',
    paddingLeft: '32px',
    textAlign: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '16px',
      paddingLeft: '16px',
    },
  },
}));

type Props = {
  activeStepOnChange: (activeStep: number) => void;
};
export const DaoInfo: React.FC<Props> = ({activeStepOnChange}) => {
  const [data, setData] = useState({name: '', desc: '', image: ''});

  const classes = useStyles();

  const createDao = () => {
    console.log(data);
  };

  return (
    <Grid item>
      <Stack spacing={2} maxWidth={'400px'} marginTop={4}>
        <input
          className={classes.input}
          placeholder="DAO Name"
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={e => setData({...data, name: e.target.value})}></input>
        <input
          className={classes.input}
          placeholder="Description"
          type="text"
          id="desc"
          name="desc"
          value={data.desc}
          onChange={e => setData({...data, desc: e.target.value})}></input>
        <Grid container className={classes.buttonContainer}>
          <Grid item justifyContent={'flex-start'}>
            <label>DAO Image : </label>
          </Grid>
          <Grid item justifyContent={'flex-end'}>
            <ImageUpload onChange={() => {}} onClear={() => {}}></ImageUpload>
          </Grid>
        </Grid>
        <Grid paddingTop={2} container justifyContent={'center'}>
          <button
            className={classes.button}
            onClick={() => {
              createDao();
              activeStepOnChange(3);
            }}>
            Generate
          </button>
        </Grid>
      </Stack>
    </Grid>
  );
};

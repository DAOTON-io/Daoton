import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Button, Grid, Stack, Theme} from '@mui/material';
import {ImageUpload} from '../../components/imageUpload';
import {InfoType} from '../../utils/types';
import {CustomInput} from '../../components/CustomInput';

type Props = {
  activeStepOnChange: (activeStep: number) => void;
  daoInfoOnChange: (daoInfo: InfoType) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
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
    width: '19rem',
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
    //   paddingRight: '32px',
    //   paddingLeft: '32px',
    textAlign: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    // [theme.breakpoints.down('sm')]: {
    //   paddingRight: '16px',
    //   paddingLeft: '16px',
    // },
  },
}));

export const DaoInfo: React.FC<Props> = ({
  activeStepOnChange,
  daoInfoOnChange,
}) => {
  const [data, setData] = useState<InfoType>({name: '', desc: '', image: ''});

  const classes = useStyles();

  const createDao = () => {
    activeStepOnChange(3);
    daoInfoOnChange(data);
  };

  return (
    <Grid container className={classes.container}>
      <Stack direction="column" spacing={2} maxWidth={'400px'} marginTop={4}>
        <CustomInput
          placeholder="DAO Name"
          id="name"
          name="name"
          value={data.name}
          onChange={(e: any) => setData({...data, name: e.target.value})}
        />
        <CustomInput
          placeholder="Description"
          id="description"
          name="description"
          value={data.desc}
          onChange={(e: any) => setData({...data, desc: e.target.value})}
        />
        <Grid container className={classes.buttonContainer}>
          <Grid item justifyContent={'flex-start'}>
            <label>DAO Image : </label>
          </Grid>
          <Grid item justifyContent={'flex-end'}>
            <ImageUpload onChange={() => {}} onClear={() => {}}></ImageUpload>
          </Grid>
        </Grid>
        <Grid paddingTop={2} container justifyContent={'center'}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={createDao}
            disabled={!(data.name && data.desc)}>
            Generate
          </Button>
        </Grid>
      </Stack>
    </Grid>
  );
};

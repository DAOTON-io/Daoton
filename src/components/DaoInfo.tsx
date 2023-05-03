import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Grid, Stack, Theme} from '@mui/material';
import {InfoType} from '../utils/types';
import {CustomButton} from './CustomButton';
import {CustomInput} from './CustomInput';
import {ImageUpload} from './imageUpload';

type Props = {
  activeStepOnChange: (activeStep: number) => void;
  daoInfoOnChange: (daoInfo: InfoType) => void;
  daoInfo: InfoType;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: 6,
    marginTop: 6,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
    display: 'flex',
    justifyContent: 'center',
    overflow: 'auto',
  },
  buttonContainer: {
    textAlign: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
}));

export const DaoInfo: React.FC<Props> = ({
  activeStepOnChange,
  daoInfoOnChange,
  daoInfo,
}) => {
  const [data, setData] = useState<InfoType>({name: '', desc: '', image: ''});

  const classes = useStyles();

  useEffect(() => {
    if (daoInfo) setData(daoInfo);
  }, [daoInfo]);

  const createDao = () => {
    activeStepOnChange(3);
    daoInfoOnChange(data);
  };

  const backStep = () => {
    activeStepOnChange(1);
    daoInfoOnChange(data);
  };

  return (
    <Grid container className={classes.container}>
      <Stack direction="column" spacing={4} minWidth={'400px'} marginTop={4}>
        <CustomInput
          placeholder="DAO Name"
          label="DAO Name"
          id="name"
          name="name"
          value={data.name}
          onChange={(e: any) => setData({...data, name: e.target.value})}
        />
        <CustomInput
          placeholder="Description"
          label="Description"
          id="description"
          name="description"
          value={data.desc}
          onChange={(e: any) => setData({...data, desc: e.target.value})}
        />
        <Grid container className={classes.buttonContainer}>
          <Grid
            item
            justifyContent={'flex-start'}
            style={{marginRight: '1rem'}}>
            <label>DAO Image : </label>
          </Grid>
          <Grid item justifyContent={'flex-end'}>
            <ImageUpload
              onChange={(value: string) =>
                setData({
                  ...data,
                  image: value,
                })
              }
              onClear={() => {}}></ImageUpload>
          </Grid>
        </Grid>
        <Grid
          paddingTop={2}
          container
          justifyContent={'space-between'}
          width={'100%'}>
          <CustomButton onClick={backStep} disabled={false} label="BACK" />
          <CustomButton
            onClick={createDao}
            disabled={!(data.name && data.desc)}
            label="NEXT"
          />
        </Grid>
      </Stack>
    </Grid>
  );
};

import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Grid, Stack, Theme} from '@mui/material';
import {ImageUpload} from '../../components/imageUpload';
import {InfoType} from '../../utils/types';
import {CustomInput} from '../../components/CustomInput';
import {CustomButton} from '../../components/CustomButton';

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
      <Stack direction="column" spacing={2} maxWidth={'400px'} marginTop={4}>
        <CustomInput
          placeholder="DAO Name"
          label="DAO Name"
          id="name"
          name="name"
          value={data.name}
          onChange={(e: any) => {
            setData({...data, name: e.target.value});
            daoInfoOnChange({...data, name: e.target.value});
          }}
        />
        <CustomInput
          placeholder="Description"
          label="Description"
          id="description"
          name="description"
          value={data.desc}
          onChange={(e: any) => {
            setData({...data, desc: e.target.value});
            daoInfoOnChange({...data, desc: e.target.value});
          }}
        />
        <Grid container className={classes.buttonContainer}>
          <Grid item justifyContent={'flex-start'}>
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

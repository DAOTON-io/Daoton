import React from 'react';
import {InfoType, TokenDetailType} from '../../utils/types';
import {Grid, Stack, Theme} from '@mui/material';
import {CustomButton} from '../../components/CustomButton';
import {makeStyles} from '@mui/styles';

type Props = {
  selectedCategory: number;
  daoInfo: InfoType;
  tokenDetail: TokenDetailType;
  activeStepOnChange: (activeStep: number) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: 6,
    marginTop: 6,
    padding: '64px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const Review: React.FC<Props> = ({
  selectedCategory,
  daoInfo,
  tokenDetail,
  activeStepOnChange,
}) => {
  const classes = useStyles();

  console.log('category in review', selectedCategory);
  console.log('daoInfo in review', daoInfo);
  console.log('tokenDetail in review', tokenDetail);

  const save = () => {
    console.log('category in review', selectedCategory);
    console.log('daoInfo in review', daoInfo);
    console.log('tokenDetail in review', tokenDetail);
  };

  const backStep = () => {
    activeStepOnChange(3);
  };

  return (
    <Grid container className={classes.container}>
      <Stack direction="column" spacing={2} maxWidth={'400px'} marginTop={4}>
        <Grid
          paddingTop={2}
          container
          justifyContent={'space-between'}
          width={'100%'}>
          <CustomButton onClick={backStep} disabled={false} label="BACK" />
          <CustomButton onClick={save} disabled={false} label="NEXT" />
        </Grid>
      </Stack>
    </Grid>
  );
};

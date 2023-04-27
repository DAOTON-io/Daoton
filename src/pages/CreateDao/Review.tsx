import React from 'react';
import {InfoType, TokenDetailType} from '../../utils/types';
import {Grid} from '@mui/material';
import {CustomButton} from '../../components/CustomButton';

type Props = {
  selectedCategory: number;
  daoInfo: InfoType;
  tokenDetail: TokenDetailType;
  activeStepOnChange: (activeStep: number) => void;
};

export const Review: React.FC<Props> = ({
  selectedCategory,
  daoInfo,
  tokenDetail,
  activeStepOnChange,
}) => {
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
    <Grid item>
      <Grid paddingTop={2} container justifyContent={'center'}>
        <CustomButton onClick={backStep} disabled={false} label="BACK" />
        <CustomButton onClick={save} disabled={false} label="NEXT" />
      </Grid>
    </Grid>
  );
};

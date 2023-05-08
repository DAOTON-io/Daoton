import React, {useState} from 'react';
import {Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {DaoCategories} from '../components/DaoCategories';
import {
  CategoryType,
  InfoType,
  NftDetailType,
  TokenDetailType,
} from '../utils/types';
import {TOKEN_TYPES} from '../utils/enums';
import {TokenDetail} from '../components/TokenDetail';
import {DaoInfo} from '../components/DaoInfo';
import {Steps} from '../components/Steps';
import {Review} from '../components/Review';

const useStyles = makeStyles((theme: Theme) => ({
  cardDiv: {
    marginTop: '8rem',
    display: 'flex',
    alignItem: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: '9rem',
      overflow: 'auto',
    },
  },
}));

export const CreateDao: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({
    id: 0,
    label: '',
    icon: undefined,
  });
  const [daoInfo, setDaoInfo] = useState<InfoType>({
    name: '',
    desc: '',
    image: '',
  });
  const [tokenDetail, setTokenDetail] = useState<TokenDetailType>({
    type: TOKEN_TYPES.NEW_TOKEN,
    name: '',
    description: '',
    symbol: '',
    amount: '',
    decimal: '',
    pausableContract: false,
    stackableContract: false,
    image: '',
  });
  const [nftDetail, setNftDetail] = useState<NftDetailType>({
    type: TOKEN_TYPES.NEW_NFT,
    name: '',
    description: '',
    level: '',
    collectionAddress: '',
    image: '',
  });

  const classes = useStyles();

  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        height: '80vh',
        marginBottom: '1rem',
        minWidth: '21rem',
        padding: '1rem',
      }}>
      <Steps activeStep={activeStep} />
      <div className={classes.cardDiv}>
        {activeStep === 1 && (
          <>
            {' '}
            <DaoCategories
              activeStepOnChange={setActiveStep}
              selectedCategoryOnChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </>
        )}
        {activeStep === 2 && (
          <>
            {' '}
            <DaoInfo
              activeStepOnChange={setActiveStep}
              daoInfoOnChange={setDaoInfo}
              daoInfo={daoInfo}
            />
          </>
        )}
        {activeStep === 3 && (
          <>
            {' '}
            <TokenDetail
              activeStepOnChange={setActiveStep}
              tokenDetailOnChange={setTokenDetail}
              tokenDetail={tokenDetail}
              nftDetailOnChange={setNftDetail}
              nftDetail={nftDetail}
            />
          </>
        )}
        {activeStep === 4 && (
          <>
            {' '}
            <Review
              selectedCategory={selectedCategory}
              daoInfo={daoInfo}
              tokenDetail={tokenDetail}
              nftDetail={nftDetail}
              activeStepOnChange={setActiveStep}
            />
          </>
        )}
      </div>
    </div>
  );
};

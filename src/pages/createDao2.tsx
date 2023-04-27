import React, {useState} from 'react';
import {Card, Grid, Theme} from '@mui/material';
import DrawerAppBar from '../components/mobilMenu';
import SideMenu from '../components/sideMenu';
import {makeStyles} from '@mui/styles';
import {Steps} from './CreateDao/Steps';
import {DaoInfo} from './CreateDao/DaoInfo';
import GoogleFontLoader from 'react-google-font-loader';
import {DaoCategories} from './CreateDao/DaoCategories';
import {TokenDetail} from './CreateDao/TokenDetail';
import {Review} from './CreateDao/Review';
import {InfoType, NftDetailType, TokenDetailType} from '../utils/types';
import {TOKEN_TYPES} from '../utils/enums';

const useStyles = makeStyles((theme: Theme) => ({
  cardDiv: {
    marginTop: '8rem',
    display: 'flex',
    alignItem: 'center',
    width: '100%',
  },
}));

export const CreateDao2: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
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
        backgroundColor: '#E7EBF1',
        height: '100%',
      }}>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <SideMenu />
        </Grid>
        <Grid item md={10}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item>
              <DrawerAppBar />
            </Grid>
            <Grid item>
              <Card
                style={{width: '100%'}}
                sx={{
                  borderRadius: '40px',
                }}>
                <GoogleFontLoader
                  fonts={[
                    {
                      font: 'Raleway',
                      weights: [700, '700i', 500, '500i'],
                    },
                  ]}
                  subsets={['cyrillic-ext', 'greek']}
                />
                <div
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                    height: '80vh',
                    marginBottom: '1rem',
                  }}>
                  <Steps activeStep={activeStep} />
                  <div className={classes.cardDiv}>
                    {activeStep === 1 && (
                      <>
                        {' '}
                        <DaoCategories
                          activeStepOnChange={setActiveStep}
                          selectedCategoryOnChange={setSelectedCategory}
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
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

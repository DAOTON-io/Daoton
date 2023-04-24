import React, {useState} from 'react';
import {Card, Grid} from '@mui/material';
import DrawerAppBar from '../components/mobilMenu';
import SideMenu from '../components/sideMenu';
import {makeStyles} from '@mui/styles';
import {Steps} from './CreateDao/Steps';
import {DaoInfo} from './CreateDao/DaoInfo';
import GoogleFontLoader from 'react-google-font-loader';
import {DaoCategories} from './CreateDao/DaoCategories';

const useStyles = makeStyles(theme => ({
  cardDiv: {
    marginTop: '8rem',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
}));

export const CreateDao2: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

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
                          selectedCategory={selectedCategory}
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

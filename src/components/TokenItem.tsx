/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {Grid, Box, IconButton} from '@mui/material';
import {makeStyles} from '@mui/styles';
import GoogleFontLoader from 'react-google-font-loader';
import {Card} from 'reactstrap';
import {CopyAll} from '@mui/icons-material';

const useStyles = makeStyles({
  container: {
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    borderRadius: '0.5rem',
    padding: '20px',
    minHeight: '40vh',
  },
  name: {
    color: 'white',
    justifyContent: 'center !important ',
    alignItems: 'center !important',
    display: 'flex',
    width: '100%',
    margin: '10px',
    fontFamily: 'Signika Negative',
    backgroundColor: '#ff761c',
    borderRadius: '0.5rem',
    padding: '5px',
  },
  date: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: '12px',
    marginBottom: '10px',
    fontFamily: 'Signika Negative',
  },
  description: {
    align: 'center !important',
    color: 'black',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    display: 'flex',
    fontSize: '14px',
    fontFamily: 'Signika Negative',
  },
  value: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Signika Negative',
    fontSize: '1rem',
  },
});

type Props = {
  name: string;
  description: string;
  value: string;
  image?: string;
};

export const TokenItem: React.FC<Props> = ({
  name,
  description,
  value,
  image,
}) => {
  const classes = useStyles();

  return (
    <div>
      <GoogleFontLoader
        fonts={[
          {
            font: 'Signika Negative',
            weights: [400, '400i'],
          },
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />
      <div className={classes.container}>
        <a
          style={{
            textDecoration: 'none',
          }}
          // href="/listContracts"
        >
          {' '}
          <Card className={classes.card}>
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}>
              <Grid item>
                <div>
                  <div
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      height: '6rem',
                    }}>
                    <img
                      style={{objectFit: 'contain', width: '100%'}}
                      width={200}
                      height={200}
                      src={image || '/images/logo.jpeg'}
                    />
                  </div>
                </div>
                <div style={{marginTop: '1rem'}}>
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Grid container>
                      <p className={classes.name}>{name}</p>
                    </Grid>
                  </div>
                  <p className={classes.date}>Token Details</p>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <div style={{width: '80%'}}>
                        <p className={classes.description}>
                          {description.slice(0, 16) +
                            '...' +
                            description.slice(-3)}
                        </p>
                      </div>
                      <div style={{width: '20%'}}>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          onClick={() => {
                            navigator.clipboard.writeText(description);
                          }}>
                          <CopyAll />
                        </IconButton>
                      </div>
                    </div>
                  </Box>
                  <br />
                  <p className={classes.value}>{value}</p>
                </div>
              </Grid>
            </div>
          </Card>
        </a>
      </div>
    </div>
  );
};

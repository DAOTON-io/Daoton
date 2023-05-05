import React from 'react';
import {Card, Divider, Grid, Theme, Typography} from '@mui/material';
import GoogleFontLoader from 'react-google-font-loader';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {makeStyles} from '@mui/styles';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FitbitIcon from '@mui/icons-material/Fitbit';
import TokenIcon from '@mui/icons-material/Token';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import {PAGES_NAME} from '../utils/enums';
import Logout from './Logout';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: '#2D6495 !important',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    height: '92vh',
    color: 'white',
    padding: '10px',
    borderRadius: '1rem',
    // add breakpoint
    [theme.breakpoints.down('md')]: {
      visible: 'none',
      display: 'none',
    },
  },
  listItem: {
    padding: '4px',
    color: 'white',
    cursor: 'pointer',
  },
  listItemSmall: {
    marginBottom: '0.6rem',
    '&:hover': {
      borderRadius: 4,
      backgroundColor: '#A2C5E3',
    },
  },
  divider: {
    backgroundColor: 'white',
    color: 'white',
  },
  title: {
    color: 'white',
    marginBottom: '0.5rem',
    fontSize: '14px',
  },
  item: {
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'Signika Negative',
  },
}));

const SideMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <div
          style={{
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}>
          <GoogleFontLoader
            fonts={[
              {
                font: 'Signika Negative',
                weights: [400, '400i'],
              },
            ]}
            subsets={['cyrillic-ext', 'greek']}
          />
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '2rem',
              marginBottom: '1rem',
            }}>
            {PAGES_NAME.TITLE}
          </Typography>
          {/* <img width={'80%'} src="logo/logobg.png" /> */}
        </div>

        <div>
          <Grid item md={12}>
            {' '}
            <div className={classes.listItem}>
              <p className={classes.title}>{PAGES_NAME.DAO}</p>

              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <ViewHeadlineIcon />
                </Grid>
                <Grid item>
                  <Typography>
                    <a className={classes.item} href="view-dao">
                      {PAGES_NAME.VIEW_DAOS}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid className={classes.listItemSmall} container spacing={1}>
          <Grid item>
            <RemoveRedEyeIcon />
          </Grid>
          <Grid item>
            <Typography>
              <a className={classes.item} href="view-dao">
                My DAOs
              </a>
            </Typography>
          </Grid>
        </Grid> */}
              {/* <Grid className={classes.listItemSmall} container spacing={1}>
          <Grid item>
            {' '}
            <AddCircleIcon />
          </Grid>
          <Grid item>
            {' '}
            <Typography className={classes.item}>
              <a className={classes.item} href="create-dao">
                Create Dao
              </a>
            </Typography>
          </Grid>
        </Grid> */}

              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <AddCircleIcon />
                </Grid>
                <Grid item>
                  <Typography>
                    <a className={classes.item} href="create-dao">
                      {PAGES_NAME.CREATE_DAO}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Divider className={classes.divider} />
            {/* <div className={classes.listItem}>
        <p className={classes.title}>Proposal</p>
        <Grid className={classes.listItemSmall} container spacing={1}>
          <Grid item>
            <CalendarMonthIcon />
          </Grid>
          <Grid item>
            <Typography className={classes.item}> Proposal Calender</Typography>
          </Grid>
        </Grid>
      </div> */}
            {/* <Divider className={classes.divider} /> */}
            <div className={classes.listItem}>
              <p className={classes.title}>{PAGES_NAME.TOKEN}</p>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <TokenIcon />
                </Grid>

                <Grid item>
                  <Typography className={classes.item}>
                    <a className={classes.item} href="view-tokens">
                      {PAGES_NAME.MY_TOKENS}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <AddCircleOutlineIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.item}>
                    <a className={classes.item} href="generate-token">
                      {PAGES_NAME.GENERATE_TOKEN}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.listItem}>
              <p className={classes.title}>{PAGES_NAME.NFT}</p>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <FitbitIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.item}>
                    <a className={classes.item} href="view-nfts">
                      {PAGES_NAME.MY_NFTS}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <PlaylistAddCircleIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.item}>
                    <a className={classes.item} href="generate-nft-collection">
                      {PAGES_NAME.GENERATE_COLLECTION}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <PlaylistAddCircleIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.item}>
                    <a className={classes.item} href="generate-nft">
                      {PAGES_NAME.GENERATE_NFT}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Divider />
            <div className={classes.listItem}>
              <p className={classes.title}>{PAGES_NAME.DOCS}</p>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <SummarizeIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.item}>
                    <a
                      className={classes.item}
                      href="https://docs.daoton.io"
                      target="_blank"
                      rel="noreferrer">
                      {PAGES_NAME.DOCUMENTATION}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <SummarizeIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.item}>
                    <a
                      className={classes.item}
                      href="https://drive.google.com/file/d/1BhY6hriK72TEqH2ytaNl2ny_8Tgwna1g/view?usp=sharing"
                      target="_blank"
                      rel="noreferrer">
                      {PAGES_NAME.LITEPAPER}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Logout />
          </Grid>
        </div>
      </Card>
    </>
  );
};

export default SideMenu;

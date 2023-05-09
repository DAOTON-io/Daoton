import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Divider, Grid, MenuItem, Theme, Typography } from '@mui/material';
import GoogleFontLoader from 'react-google-font-loader';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { makeStyles } from '@mui/styles';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FitbitIcon from '@mui/icons-material/Fitbit';
import TokenIcon from '@mui/icons-material/Token';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { PAGES_NAME } from '../utils/enums';
import Logout from './Logout';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: '#2D6495 !important',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    height: '92vh',
    color: 'white',
    padding: '10px',
    borderRadius: '1rem !important',
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
    marginBottom: ' 0.5rem !important',
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
    paddingLeft: '0.5rem !important',
  },
  icon: {
    position: 'relative',
    top: '0.2rem',
    marginRight: '0.2rem',
  },
}));

const SideMenu: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

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
              <b className={classes.title}>{PAGES_NAME.DAO}</b>

              <Grid container spacing={1} className={classes.listItemSmall}>
                <MenuItem
                  className={classes.item}
                  key={PAGES_NAME.VIEW_DAOS}
                  selected={window.location.pathname === PAGES_NAME.VIEW_DAOS}
                  onClick={() => navigate('/view-dao')}>
                  <Grid item>
                    <ViewHeadlineIcon className={classes.icon} />
                  </Grid>
                  <Typography textAlign="center">
                    {PAGES_NAME.VIEW_DAOS}
                  </Typography>
                </MenuItem>
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
                <MenuItem
                  className={classes.item}
                  key={PAGES_NAME.CREATE_DAO}
                  selected={window.location.pathname === PAGES_NAME.CREATE_DAO}
                  onClick={() => navigate('/create-dao')}>
                  <Grid item>
                    <AddCircleIcon className={classes.icon} />
                  </Grid>
                  <Typography textAlign="center">
                    {PAGES_NAME.CREATE_DAO}
                  </Typography>
                </MenuItem>
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
                  <Typography className={classes.item}>
                    {' '}
                    Proposal Calender
                  </Typography>
                </Grid>
              </Grid>
            </div> */}
            {/* <Divider className={classes.divider} /> */}
            <div className={classes.listItem}>
              <b className={classes.title}>{PAGES_NAME.TOKEN}</b>

              <Grid className={classes.listItemSmall} container spacing={1}>
                <MenuItem
                  className={classes.item}
                  key={PAGES_NAME.MY_TOKENS}
                  selected={window.location.pathname === PAGES_NAME.MY_TOKENS}
                  onClick={() => navigate('/view-tokens')}>
                  <Grid item>
                    <TokenIcon className={classes.icon} />
                  </Grid>
                  <Typography textAlign="center">
                    {PAGES_NAME.MY_TOKENS}
                  </Typography>
                </MenuItem>
              </Grid>

              <Grid className={classes.listItemSmall} container spacing={1}>
                <MenuItem
                  className={classes.item}
                  key={PAGES_NAME.GENERATE_TOKEN}
                  selected={
                    window.location.pathname === PAGES_NAME.GENERATE_TOKEN
                  }
                  onClick={() => navigate('/generate-token')}>
                  <Grid item>
                    <AddCircleOutlineIcon className={classes.icon} />
                  </Grid>
                  <Typography textAlign="center">
                    {PAGES_NAME.GENERATE_TOKEN}
                  </Typography>
                </MenuItem>
              </Grid>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.listItem}>
              <b className={classes.title}>{PAGES_NAME.NFT}</b>

              <Grid className={classes.listItemSmall} container spacing={1}>
                <MenuItem
                  className={classes.item}
                  key={PAGES_NAME.MY_NFTS}
                  selected={window.location.pathname === PAGES_NAME.MY_NFTS}
                  onClick={() => navigate('/view-nfts')}>
                  <Grid item>
                    <FitbitIcon className={classes.icon} />
                  </Grid>
                  <Typography textAlign="center">
                    {PAGES_NAME.MY_NFTS}
                  </Typography>
                </MenuItem>
              </Grid>

              <Grid className={classes.listItemSmall} container spacing={1}>
                <MenuItem
                  className={classes.item}
                  key={PAGES_NAME.GENERATE_COLLECTION}
                  selected={
                    window.location.pathname === PAGES_NAME.GENERATE_COLLECTION
                  }
                  onClick={() => navigate('/generate-nft-collection')}>
                  <Grid item>
                    <PlaylistAddCircleIcon className={classes.icon} />
                  </Grid>
                  <Typography textAlign="center">
                    {PAGES_NAME.GENERATE_COLLECTION}
                  </Typography>
                </MenuItem>
              </Grid>

              <Grid className={classes.listItemSmall} container spacing={1}>
                <MenuItem
                  className={classes.item}
                  key={PAGES_NAME.GENERATE_NFT}
                  selected={
                    window.location.pathname === PAGES_NAME.GENERATE_NFT
                  }
                  onClick={() => navigate('/generate-nft')}>
                  <Grid item>
                    <PlaylistAddCircleIcon className={classes.icon} />
                  </Grid>
                  <Typography textAlign="center">
                    {PAGES_NAME.GENERATE_NFT}
                  </Typography>
                </MenuItem>
              </Grid>
              {/* ----------------------------------------------------------------- */}
              <Grid className={classes.listItemSmall} container spacing={1}>
                <MenuItem
                  className={classes.item}
                  key={PAGES_NAME.MAIN_NFT}
                  selected={
                    window.location.pathname === PAGES_NAME.GENERATE_NFT
                  }
                  onClick={() => navigate('/main-nft')}>
                  <Grid item>
                    <PlaylistAddCircleIcon className={classes.icon} />
                  </Grid>
                  <Typography textAlign="center">
                    {PAGES_NAME.MAIN_NFT}
                  </Typography>
                </MenuItem>
              </Grid>
              {/* ----------------------------------------------------------------- */}
            </div>
            <Divider />
            <div className={classes.listItem}>
              <b className={classes.title}>{PAGES_NAME.DOCS}</b>
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

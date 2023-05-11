import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Divider, Grid, ListItem, Stack, Theme, Typography, withStyles } from '@mui/material';
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
import { List } from 'reactstrap';

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
  divider: {
    backgroundColor: 'white',
    color: 'white',
    margin: '0.5rem !important'
  },
  title: {
    color: 'white',
    marginBottom: '0.5rem',
    marginLeft: '0.5rem',
    fontSize: '14px',
  },
  item: {
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'Signika Negative',
    paddingLeft: '0.5rem !important',
    "&:hover": {
      backgroundColor: '#A2C5E3',
      cursor: 'pointer',
      
    },
    "&:selected":{
      backgroundColor: '#A2C5E3'
    }
  },
  icon: {
    position: 'relative',
    top: '0.2rem',
    marginRight: '0.8rem',
    color: 'white',
  },
  titleStack: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  menuStack: {
    color: 'white',
  },
  link: {
    textDecoration: 'none',
  }
}));


const SideMenu: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();


  const [activePage, setActivePage] = useState()

  return (
    <Card className={classes.card}>
      <GoogleFontLoader fonts={[{ font: 'Signika Negative', weights: [400, '400i'], },]} subsets={['cyrillic-ext', 'greek']} />
      <Stack className={classes.titleStack}>
        <Typography
          style={{
            fontWeight: 'bold',
            fontSize: '2rem',
            marginBottom: '1rem',
          }}> {PAGES_NAME.TITLE} </Typography>
      </Stack>
      <Stack className={classes.title}>
        <Typography> {PAGES_NAME.DAO} </Typography>
      </Stack>
      <Stack className={classes.menuStack}>
        <List>
          <ListItem
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
          </ListItem>
          <ListItem className={classes.item}
            key={PAGES_NAME.CREATE_DAO}
            selected={window.location.pathname === PAGES_NAME.CREATE_DAO}
            onClick={() => navigate('/create-dao')}>
            <Grid item>
              <AddCircleIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">
              {PAGES_NAME.CREATE_DAO}
            </Typography>
          </ListItem>
          <Divider className={classes.divider}></Divider>
          <Stack className={classes.title}>
            <Typography> {PAGES_NAME.TOKEN} </Typography>
          </Stack>
          <ListItem className={classes.item}
            key={PAGES_NAME.MY_TOKENS}
            selected={window.location.pathname === PAGES_NAME.MY_TOKENS}
            onClick={() => navigate('/view-tokens')}>
            <Grid item>
              <TokenIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">
              {PAGES_NAME.MY_TOKENS}
            </Typography>
          </ListItem>
          <ListItem className={classes.item}
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
          </ListItem>
          <Divider className={classes.divider}></Divider>
          <Stack className={classes.title}>
            <Typography> {PAGES_NAME.NFT} </Typography>
          </Stack>
          <ListItem className={classes.item}
            key={PAGES_NAME.MY_NFTS}
            selected={window.location.pathname === PAGES_NAME.MY_NFTS}
            onClick={() => navigate('/view-nfts')}>
            <Grid item>
              <FitbitIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">
              {PAGES_NAME.MY_NFTS}
            </Typography>
          </ListItem>
          <ListItem className={classes.item}
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
          </ListItem>
          <ListItem className={classes.item}
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
          </ListItem>
          <Divider className={classes.divider}></Divider>
          <Stack className={classes.title}>
            <Typography> {PAGES_NAME.DOCS} </Typography>
          </Stack>
          <Link
            className={classes.link}
            to="https://docs.daoton.io"
            target="_blank"
            rel="noreferrer">
            <ListItem className={classes.item}
              key={PAGES_NAME.DOCUMENTATION}
              selected={
                window.location.pathname === PAGES_NAME.DOCUMENTATION
              }
              onClick={() => { navigate('') }}>
              <Grid item>
                <SummarizeIcon className={classes.icon} />
              </Grid>
              <Typography textAlign="center">
                {PAGES_NAME.DOCUMENTATION}
              </Typography>
            </ListItem>
          </Link>
          <Link
            className={classes.link}
            to={'https://drive.google.com/file/d/1BhY6hriK72TEqH2ytaNl2ny_8Tgwna1g/view?usp=sharing'}
            target='_blank'
            rel='noreferrer'>
            <ListItem className={classes.item}
              key={PAGES_NAME.LITEPAPER}
              selected={
                window.location.pathname === PAGES_NAME.LITEPAPER
              }
              onClick={() => { navigate('') }}>
              <Grid item>
                <SummarizeIcon className={classes.icon} />
              </Grid>
              <Typography textAlign="center">
                {PAGES_NAME.LITEPAPER}
              </Typography>
            </ListItem>
          </Link>
        </List>
        <Stack sx={{ margin: '0.5rem' }}>
          <Logout />
        </Stack>
      </Stack>
    </Card >
  );
};

export default SideMenu;

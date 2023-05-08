import React from 'react';
import {Box, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Link} from 'react-router-dom';
import {PAGES_NAME} from '../utils/enums';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TokenIcon from '@mui/icons-material/Token';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FitbitIcon from '@mui/icons-material/Fitbit';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import SummarizeIcon from '@mui/icons-material/Summarize';

const drawerWidth = 240;

const pages = [
  {
    id: 1,
    text: PAGES_NAME.VIEW_DAOS,
    path: 'view-dao',
    icon: <ViewHeadlineIcon />,
  },
  {
    id: 2,
    text: PAGES_NAME.CREATE_DAO,
    path: 'create-dao',
    icon: <AddCircleIcon />,
  },
  {id: 3, text: PAGES_NAME.MY_TOKENS, path: 'view-tokens', icon: <TokenIcon />},
  {
    id: 4,
    text: PAGES_NAME.GENERATE_TOKEN,
    path: 'generate-token',
    icon: <AddCircleOutlineIcon />,
  },
  {id: 5, text: PAGES_NAME.MY_NFTS, path: 'view-nfts', icon: <FitbitIcon />},
  {
    id: 6,
    text: PAGES_NAME.GENERATE_COLLECTION,
    path: 'generate-nft-collection',
    icon: <PlaylistAddCircleIcon />,
  },
  {
    id: 7,
    text: PAGES_NAME.GENERATE_NFT,
    path: 'generate-nft',
    icon: <PlaylistAddCircleIcon />,
  },
  {
    id: 8,
    text: PAGES_NAME.DOCUMENTATION,
    path: 'https://docs.daoton.io',
    icon: <SummarizeIcon />,
  },
  {
    id: 9,
    text: PAGES_NAME.LITEPAPER,
    path: 'https://drive.google.com/file/d/1BhY6hriK72TEqH2ytaNl2ny_8Tgwna1g/view?usp=sharing',
    icon: <SummarizeIcon />,
  },
];

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.background.paper,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  listItem: {
    '&.Mui-selected': {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  listItemIcon: {
    color: theme.palette.text.secondary,
  },
}));

type Props = {
  selectedPage: any;
};

const Sidebar: React.FC<Props> = ({selectedPage}) => {
  const classes = useStyles();

  return (
    <Box className={classes.drawer}>
      <List className={classes.drawerContainer}>
        {pages.map(page => (
          <ListItem
            key={page.id}
            button
            component={Link}
            to={page.path}
            selected={selectedPage === page.id}
            className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>
              {page.icon}
            </ListItemIcon>
            <ListItemText primary={page.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

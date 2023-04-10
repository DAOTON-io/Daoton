import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SummarizeIcon from "@mui/icons-material/Summarize";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";
import GridViewIcon from "@mui/icons-material/GridView";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TonConnectButton } from "@tonconnect/ui-react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    visibility: "hidden",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem",
  },
  card: {
    backgroundColor: "#2AABEE",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    height: "92vh",
    color: "white",
    padding: "10px",
    borderRadius: "1rem",
    // add breakpoint
    [theme.breakpoints.down("md")]: {
      visible: "none",
      display: "none",
    },
  },
  listItem: {
    padding: "10px",
    color: "white",
  },
  listItemSmall: {
    marginBottom: "1rem",
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "#1689c5",
    },
  },

  divider: {
    backgroundColor: "white",
    color: "white",
  },
  title: {
    color: "white",
    marginBottom: "0.5rem",
    fontSize: "14px",
  },
  item: {
    color: "white",
    textDecoration: "none",
    fontFamily: "Signika Negative",
  },
  connect: {
    // add breakpoint
    [theme.breakpoints.up("sm")]: {
      right: "3rem !important",
      position: "absolute !important",
    },
  },
}));

const drawerWidth = 240;

function DrawerAppBar(props: { window: any }) {
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", backgroundColor: "#2AABEE", height: "100vh" }}>
      <Typography variant="h6" sx={{ my: 2, color: "white", fontWeight: "bold" }}>
        DAOTON
      </Typography>
      <Divider className={classes.divider} />
      <Grid
        style={{
          backgroundColor: "#2AABEE",
        }}
        item
        md={12}
      >
        {" "}
        <div className={classes.listItem}>
          <p className={classes.title}>Dao</p>

          <Grid className={classes.listItemSmall} container spacing={1}>
            <Grid item>
              <ViewHeadlineIcon />
            </Grid>
            <Grid item>
              <Typography>
                <a className={classes.item} href="view-dao">
                  All Dao's
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.listItemSmall} container spacing={1}>
            <Grid item>
              <RemoveRedEyeIcon />
            </Grid>
            <Grid item>
              <Typography>
                <a className={classes.item} href="view-dao">
                  My Dao's
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.listItemSmall} container spacing={1}>
            <Grid item>
              {" "}
              <AddCircleIcon />
            </Grid>
            <Grid item>
              {" "}
              <Typography className={classes.item}>
                <a className={classes.item} href="create-dao">
                  Create Dao
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
          <p className={classes.title}>Token</p>
          <Grid className={classes.listItemSmall} container spacing={1}>
            <Grid item>
              <ViewCompactAltIcon />
            </Grid>

            <Grid item>
              <Typography className={classes.item}>
                <a className={classes.item} href="view-tokens">
                  My Tokens
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
                  Generate Token
                </a>
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.listItem}>
          <p className={classes.title}>NFT</p>
          <Grid className={classes.listItemSmall} container spacing={1}>
            <Grid item>
              <ViewCompactAltIcon />
            </Grid>
            <Grid item>
              <Typography className={classes.item}>
                <a className={classes.item} href="view-nfts">
                  My Nft's
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.listItemSmall} container spacing={1}>
            <Grid item>
              <GridViewIcon />
            </Grid>
            <Grid item>
              <Typography className={classes.item}>
                <a className={classes.item} href="generate-nft-collection">
                  Generate Collection
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.listItemSmall} container spacing={1}>
            <Grid item>
              <GridViewIcon />
            </Grid>
            <Grid item>
              <Typography className={classes.item}>
                <a className={classes.item} href="generate-nft">
                  Generate Nft
                </a>
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <div className={classes.listItem}>
          <p className={classes.title}>Docs</p>

          <Grid className={classes.listItemSmall} container spacing={1}>
            <Grid item>
              <SummarizeIcon />
            </Grid>
            <Grid item>
              <Typography className={classes.item}>
                <a className={classes.item} href="https://docs.daoton.io">
                  Our Docs
                </a>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="static"
        style={{
          backgroundColor: "#2AABEE",
          borderRadius: "0.5rem",
          fontFamily: "Signika Negative",
          width: "100%",
        }}
        component="nav"
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." style={{ width: "100%" }} inputProps={{ "aria-label": "search" }} />
          </Search>

          {/* <Box className={classes.connect} style={{ flexGrow: 0, right: "0" }}>
            <TonConnectButton />
          </Box> */}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;

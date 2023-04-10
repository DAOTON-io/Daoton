/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import GoogleFontLoader from "react-google-font-loader";
import { TonConnectButton } from "@tonconnect/ui-react";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "white !important",
    paddingLeft: "0.2rem !important",
    paddingRight: "0.2rem !important",
    paddingTop: "0rem !important",
    paddingBottom: "0rem !important",
    fontFamily: "Signika Negative !important",
    textTransform: "none !important",
    color: "black !important",
    borderRadius: "0.3rem !important",
    minHeight: "3rem !important",
    marginBottom: "0.5rem !important",
    // add breakpoint
    [theme.breakpoints.up("xs")]: {
      visibility: "none",
    },
  },
  connect: {
    // add breakpoint
    [theme.breakpoints.up("sm")]: {
      right: "3rem !important",
      position: "absolute !important",
      top: "2rem !important",
    },
  },
  container: {
    // add breakpoint
    [theme.breakpoints.down("md")]: {
      padding: "0.5rem !important",
    },
  },
  visibility: {
    [theme.breakpoints.up("sm")]: {
      visibility: "hidden",
      display: "none",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "1rem",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  [theme.breakpoints.down("md")]: {},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  borderRadius: "1rem",
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
  },
}));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const classes = useStyles();

  return (
    <AppBar
      className={classes.container}
      style={{
        backgroundColor: "#2D6495",
        borderRadius: "0.5rem",
        fontFamily: "Signika Negative",
      }}
      position="static"
    >
      <GoogleFontLoader
        fonts={[
          {
            font: "Signika Negative",
            weights: [400, "400i"],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid className={classes.visibility} container spacing={1}>
            <Grid item xs={3}>
              <Button className={classes.button}>
                <a
                  style={{
                    fontFamily: "Signika Negative",
                    textDecoration: "none",
                  }}
                  href="view-dao"
                >
                  View Dao
                </a>
              </Button>{" "}
            </Grid>
            <Grid item xs={3}>
              <Button className={classes.button}>
                <a
                  style={{
                    fontFamily: "Signika Negative",
                    textDecoration: "none",
                  }}
                  href="create-dao"
                >
                  Create Dao
                </a>
              </Button>{" "}
            </Grid>
            <Grid item xs={3}>
              <Button className={classes.button}>
                <a
                  style={{
                    fontFamily: "Signika Negative",
                    textDecoration: "none",
                  }}
                  href="view-tokens"
                >
                  View Tokens
                </a>
              </Button>{" "}
            </Grid>
            <Grid item xs={3}>
              <Button className={classes.button}>
                <a
                  style={{
                    fontFamily: "Signika Negative",
                    textDecoration: "none",
                  }}
                  href="generate-token"
                >
                  Generate Tokens
                </a>
              </Button>{" "}
            </Grid>
          </Grid>
        </Toolbar>
        <Grid container>
          {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
          {/* <Box className={classes.connect} style={{ flexGrow: 0, right: "0", marginTop: "0.5rem" }}>
            <TonConnectButton />
          </Box> */}
        </Grid>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

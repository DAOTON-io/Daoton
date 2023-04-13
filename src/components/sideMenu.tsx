import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Card } from "reactstrap";
import Grid from "@mui/material/Grid";
import GoogleFontLoader from "react-google-font-loader";
import { makeStyles } from "@mui/styles";
import SummarizeIcon from "@mui/icons-material/Summarize";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Avatar from "@mui/material/Avatar";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FitbitIcon from "@mui/icons-material/Fitbit";
import TokenIcon from "@mui/icons-material/Token";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";

export default function SideMenu() {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const [tonConnectUI] = useTonConnectUI();
  const navigate = useNavigate();

  const classes = useStyles();
  const address = useTonAddress(false);

  return (
    <>
      <Card className={classes.card}>
        <div
          style={{
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
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
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              marginBottom: "1rem",
            }}
          >
            DAOTON
          </Typography>
          {/* <img width={'80%'} src="logo/logobg.png" /> */}
        </div>

        <div>
          <Grid item md={12}>
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
                      All DAOs
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
                      My DAOs
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
                  <TokenIcon />
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
                  <FitbitIcon />
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
                  <PlaylistAddCircleIcon />
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
                  <PlaylistAddCircleIcon />
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
                    <a className={classes.item} href="https://docs.daoton.io" target="_blank" rel="noreferrer">
                      Our Docs
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.listItem}>
              <Grid className={classes.logoutlistItemSmall} container spacing={1}>
                {!showLogout ? (
                  <Grid
                    item
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.3rem" }}
                    onClick={() => {
                      setShowLogout(true);
                    }}
                  >
                    <Avatar src="/broken-image.jpg" sx={{ width: 32, height: 32, bgcolor: "#EC7D31", marginRight: "0.5rem" }} />
                    <Typography className={classes.item}>{address.slice(0, 8) + "..." + address.slice(-4)} </Typography>
                  </Grid>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <IconButton
                      aria-label="back"
                      component="label"
                      style={{ color: "white" }}
                      onClick={() => {
                        setShowLogout(false);
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Grid item>
                      <Typography className={classes.item}>{address.slice(0, 8) + "..." + address.slice(-4)}</Typography>
                    </Grid>
                    <IconButton
                      aria-label="back"
                      component="label"
                      style={{ color: "white" }}
                      onClick={() => {
                        tonConnectUI.disconnect();
                        navigate("/login");
                      }}
                    >
                      <LogoutIcon />
                    </IconButton>
                  </div>
                )}
              </Grid>
            </div>
          </Grid>
        </div>
      </Card>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem",
  },
  card: {
    backgroundColor: "#2D6495",
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
    padding: "4px",
    color: "white",
    cursor: "pointer",
  },
  logoutlistItem: {
    padding: "4px",
    color: "white",
  },
  listItemSmall: {
    marginBottom: "0.6rem",
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "#A2C5E3",
    },
  },
  logoutlistItemSmall: {
    marginBottom: "0.6rem",
    "&:hover": {
      borderRadius: 4,
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
}));

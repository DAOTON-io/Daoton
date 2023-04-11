import * as React from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";
import GridViewIcon from "@mui/icons-material/GridView";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Card } from "reactstrap";
import Grid from "@mui/material/Grid";
import GoogleFontLoader from "react-google-font-loader";
import { makeStyles } from "@mui/styles";
import SummarizeIcon from "@mui/icons-material/Summarize";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem",
  },
  card: {
    backgroundColor: "#0F2233",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    height: "92vh",
    color: "white",
    padding: 24,
    borderRadius: "40px",
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
  listItemSmall: {
    marginBottom: "1rem",
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "#A2C5E3",
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
    fontFamily: "Raleway",
    fontWeight: 500,
  },

  button: {
    padding: "10px",
    backgroundColor: "#E7F4FF",
    color: "#1D252C",
    border: "none",
    borderRadius: "16px",
    minWidth: '100%',
    fontFamily: "Raleway",
    fontWeight: 500,
  },
  link:{
    textDecoration: "none",
    fontFamily: "Raleway",
    fontWeight: 500,
  }

}));

export default function SideMenu() {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <div
          style={{
            color: "white",
            // justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <GoogleFontLoader fonts={[{ font: "Raleway", weights: [700, "700i", 500, "500i"], },]} subsets={["cyrillic-ext", "greek"]} />

          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "26px",
              marginBottom: "1rem",
              textAlign: "left",
              marginTop: 4,
            }}>
            Dao
          </Typography>
          {/* <img width={'80%'} src="logo/logobg.png" /> */}
        </div>

        <div>
          <Grid item md={12}>
            {" "}
            <div className={classes.listItem}>
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
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "26px",
                  marginBottom: "1rem",
                  textAlign: "left",
                  marginTop: 4,
                }}>
                Token
              </Typography>
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
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "26px",
                  marginBottom: "1rem",
                  textAlign: "left",
                  marginTop: 4,
                }}>
                NFT
              </Typography>

              <Grid container paddingLeft={2}>
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
              </Grid>

            </div>
            <Divider />
            <div className={classes.listItem}>
              <Grid item>
                <button className={classes.button}>
                  <a className={classes.link} href="https://docs.daoton.io" target="_blank" rel="noreferrer">
                    Our Docs
                  </a>
                </button>
              </Grid>
            </div>
          </Grid>

          {/* <List>
                                    {[
                                        "View DAOs",
                                        "Create DAO",
                                        "View Tokens",
                                        "Generate Token",
                                        "Proposal Calender",
                                    ].map((text, index) => (
                                        <ListItem style={{
                                            marginBottom: '0.5rem'
                                        }} key={text} disablePadding>
                                            <ListItemButton >
                                                <ListItemIcon style={{ color: "white" }}>
                                                    {index == 0 ? (
                                                        <ViewHeadlineIcon />
                                                    ) : index == 1 ? (
                                                        <AddCircleIcon />
                                                    ) : index == 2 ? (
                                                        <ViewCompactAltIcon />
                                                    ) : index == 3 ? (
                                                        <AddCircleOutlineIcon />
                                                    ) : index == 4 ? (
                                                        <CalendarMonthIcon />
                                                    ) : (
                                                        <MailIcon />
                                                    )}
                                                </ListItemIcon>

                                                <ListItemText primary={text} />
                                            </ListItemButton>

                                        </ListItem>
                                    ))}
                                </List> */}
        </div>
      </Card>
    </>
  );
}

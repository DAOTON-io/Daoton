import * as React from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Card } from "reactstrap";
import Grid from "@mui/material/Grid";
import GoogleFontLoader from "react-google-font-loader";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material";



const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem",
  },
  card: {
    backgroundColor: "#2AABEE",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    height: "90vh",
    color: "white",
    padding: "10px",
    borderRadius: "1rem",
    // add breakpoint
    [theme.breakpoints.down("md")]: {
      visible: "none",
      display: "none",
    }
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
}));
export default function SideMenu() {
  const classes = useStyles();
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
                      View Dao
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
            <div className={classes.listItem}>
              <p className={classes.title}>Token</p>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  <ViewCompactAltIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.item}>
                    <a className={classes.item} href="view-tokens">
                      View Tokens
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
              <p className={classes.title}>Proposal</p>
              <Grid className={classes.listItemSmall} container spacing={1}>
                <Grid item>
                  {" "}
                  <CalendarMonthIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.item}> Proposal Calender</Typography>
                </Grid>
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

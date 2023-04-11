import { Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { CustomStep } from "components/customStep";
import DrawerAppBar from "components/mobilMenu";
import SideMenu from "components/sideMenu";
import { makeStyles } from "@mui/styles";
import BusinessIcon from "@mui/icons-material/Business";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ForumIcon from "@mui/icons-material/Forum";
import GavelIcon from "@mui/icons-material/Gavel";
import PixIcon from "@mui/icons-material/Pix";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import React, { useState } from "react";

const steps = ["Choose DAO Type", "Your Dao Informations", "Token Detail", "Review"];
const categories = [
  { id: 1, label: "Company", icon: <BusinessIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" /> },
  { id: 2, label: "Governance", icon: <AssuredWorkloadIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" /> },
  { id: 3, label: "Community", icon: <ForumIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" /> },
  { id: 4, label: "Election", icon: <GavelIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" /> },
  { id: 5, label: "Venture Capital", icon: <PixIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" /> },
  { id: 6, label: "Game-Fi", icon: <SportsEsportsIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" /> },
  { id: 7, label: "Start-Up", icon: <RocketLaunchIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" /> },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    marginTop: "2rem",
    width: "90%",
  },
  cardDiv: {
    marginTop: "8rem",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },
  card: {
    backgroundImage: "url('/images/bluebg2.jpg') !important",
    backgroundSize: "cover",
    // backgroundColor: "#2D6495 !important",
    // "&:hover": {
    //   backgroundColor: "#A2C5E3 !important",
    // },
  },
  cardItem: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    height: "5rem",
  },
}));

export const CreateDao = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const classes = useStyles();

  return (
    <div
      style={{
        backgroundColor: "#E7EBF1",
        height: "100%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={2}>
          <SideMenu />
        </Grid>
        <Grid item md={10}>
          <DrawerAppBar />
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              height: "80vh",
            }}
          >
            <div className={classes.appBar}>
              <CustomStep steps={steps} activeStep={activeStep} />
            </div>
            <div className={classes.cardDiv}>
              {activeStep === 1 && (
                <>
                  {" "}
                  <Grid container spacing={2}>
                    {categories.map((ct) => {
                      return (
                        <Grid item xs={12} sm={6}>
                          <Card
                            id={ct.id.toString()}
                            className={classes.card}
                            onClick={() => {
                              setActiveStep(2);
                              setSelectedCategory(ct.id);
                            }}
                          >
                            <CardActionArea>
                              <CardContent className={classes.cardItem}>
                                {ct.icon}
                                <Typography color={"white"} fontSize={30} gutterBottom variant="h5" component="div">
                                  {ct.label}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

import { AppBar, Grid } from "@mui/material";
import { CustomStep } from "components/customStep";
import DrawerAppBar from "components/mobilMenu";
import SideMenu from "components/sideMenu";
import { makeStyles } from "@mui/styles";
import React from "react";

const steps = ["Choose DAO Type", "Your Dao Informations", "Token Detail", "Review"];

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    marginTop: "2rem",
    width: "90%",
  },
}));

export const CreateDao = () => {
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
              marginTop: "1rem",
              justifyContent: "center",
              // alignItems: "center",
              display: "flex",
              height: "80vh",
            }}
          >
            <div className={classes.appBar}>
              <CustomStep steps={steps} activeStep={1} />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

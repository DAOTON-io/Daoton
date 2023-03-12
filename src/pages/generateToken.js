import { Grid } from "@mui/material";

import { makeStyles } from "@mui/styles";
import React from "react";
import { Button, Card } from "reactstrap";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";

const useStyles = makeStyles({
  container: {
    padding: "1rem",
  },
  card: {
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    color: "white",
    padding: "20px",
    borderRadius: "0.5rem",
    height: "78vh",
  },

  title: {
    marginBottom: "0.5rem",
    fontSize: "30px",
    color: "black",
    fontWeight: "bold",
  },
  form: {
    marginTop: "1rem",
  },
  label: {
    color: "#2AABEE",
    fontSize: "14px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2AABEE",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    marginTop: "1rem",

    marginBottom: "1rem",
  },
  select: {
    marginTop: "0.5rem",

    width: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    color: "white",
    border: "none",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    backgroundColor: "#2AABEE",
    padding: "10px",
    borderRadius: "0.5rem",
  },
  input: {
    marginTop: "0.5rem",
    padding: "10px",
    color: "white",
    border: "1px solid #2AABEE",
    borderRadius: "0.5rem",
    width: "120%",

    "&:hover": {
      border: "1px solid #2AABEE",
    },
  },
});
export default function GenerateToken() {
  const classes = useStyles();

  return (
    <div>
      <div
        style={{
          backgroundColor: "#E7EBF1",
        }}
        className={classes.container}
      >
        <Grid container spacing={2}>
          <Grid item md={2}>
            <SideMenu />
          </Grid>
          <Grid item md={10}>
            <ResponsiveAppBar />{" "}
            <div style={{ marginTop: "1rem" }}>
              <Card className={classes.card}>
                <Grid container>
                  <Grid item md={12}>
                    {" "}
                    <div
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      {" "}
                      <Grid container display={"flex"} alignItems={"center"}>
                        <p className={classes.title}>Generate Token</p>
                      </Grid>
                      <Grid container>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"} spacing={2}>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <label className={classes.label} for="tokenName">
                                  Name:
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={6}>
                              <form className={classes.form}>
                                <input fullWidth className={classes.input} type="text" id="tokenName" name="tokenName" placeholder="Token Name.."></input>
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"} spacing={2}>
                            {" "}
                            <Grid item md={3}>
                              {" "}
                              <form className={classes.form}>
                                <label className={classes.label} for="description">
                                  Description:
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={6}>
                              {" "}
                              <form className={classes.form}>
                                <input fullWidth className={classes.input} type="text" id="description" name="description" placeholder="Description.."></input>
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"} spacing={2}>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <label className={classes.label} for="tokenSymbol">
                                  Symbol:
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={6}>
                              <form className={classes.form}>
                                <input fullWidth className={classes.input} type="text" id="tokenSymbol" name="tokenSymbol" placeholder="Token Symbol.."></input>
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"} spacing={2}>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <label className={classes.label} for="amount">
                                  Amount
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={6}>
                              <form className={classes.form}>
                                <input fullWidth className={classes.input} type="text" id="amount" name="amount" placeholder="Amount.."></input>
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"} spacing={2}>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <label className={classes.label} for="decimal">
                                  Decimal
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={6}>
                              <form className={classes.form}>
                                <input fullWidth className={classes.input} type="text" id="decimal" name="decimal" placeholder="Decimal.."></input>
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>{" "}
                <Button className={classes.button} style={{ backgroundColor: "#2AABEE", width: "35vh", marginTop: "2rem" }}>
                  Create
                </Button>{" "}
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

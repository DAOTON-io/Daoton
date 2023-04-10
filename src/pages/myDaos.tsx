import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Card } from "reactstrap";
import { DaoCard } from "../components/dao-card";
import SideMenu from "../components/sideMenu";
import DrawerAppBar from "../components/mobilMenu";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
      padding: "1rem",
    },
  },
  card: {
    backgroundColor: "#2D6495",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    height: "90vh",
    color: "white",
    padding: "10px",
    borderRadius: "1rem",
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
  },
}));

const columnsJson = JSON.parse(localStorage.getItem("daos") || "");

var columns: any = [];

for (var i in columnsJson) columns.push([i, columnsJson[i]]);

export default function MyDao() {
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
          <Grid item md={10} xs={12}>
            <DrawerAppBar />

            <div
              style={{
                height: "100vh",
                width: "100%",
                overflow: "auto", // Kaydırma çubuğu eklemek için
              }}
            >
              {" "}
              <Grid container>
                {/* If columns are empty write there are no DAO's in the middle of the screen on a card */}
                {columns.length === 0 && (
                  <Grid
                    item
                    md={12}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Card
                      style={{
                        backgroundColor: "white",
                        borderRadius: "1rem",
                        padding: "5rem",
                        marginTop: "2rem",
                        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        style={{
                          color: "#1689c5",
                          fontSize: "30px",
                          fontWeight: "bold",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        There are no DAO's
                      </Typography>
                    </Card>
                  </Grid>
                )}
                {columns.map((column: any) => (
                  <Grid key={column.id} item md={3}>
                    <DaoCard
                      daoId={column[1].name}
                      name={column[1].name}
                      description={column[1].desc}
                      value={column[1].tokenContract}
                      // today's date in format: 2021-10-10
                      date={Date().split(" ")[3] + "-" + Date().split(" ")[1] + "-" + Date().split(" ")[2]}
                      daoImg={""}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

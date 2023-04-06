/* eslint-disable jsx-a11y/alt-text */
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import GoogleFontLoader from "react-google-font-loader";
import { Card } from "reactstrap";

const useStyles = makeStyles({
  container: {
    padding: "1rem",
  },
  card: {
    backgroundColor: "white",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    borderRadius: "0.5rem",
    padding: "20px",
    minHeight: "40vh",
  },
  name: {
    color: "white",
    justifyContent: "center !important ",
    alignItems: "center !important",
    display: "flex",
    width: "100%",
    margin: "10px",
    fontFamily: "Signika Negative",
    backgroundColor: "#ff761c",
    borderRadius: "0.5rem",
    padding: "5px",
  },
  date: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "12px",
    marginBottom: "10px",
    fontFamily: "Signika Negative",
  },
  description: {
    align: "center !important",
    color: "black",
    justifyContent: "center !important",
    alignItems: "center !important",
    display: "flex",
    fontSize: "14px",
    fontFamily: "Signika Negative",
    marginBottom: "10px",
  },
  value: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontFamily: "Signika Negative",
    fontSize: "12px",
  },
});

type Props = {
  name: string;
  date: string;
  description: string;
  value: string;
  daoId: string;
  daoImg: string;
};

export const DaoCard: React.FC<Props> = ({ name, date, description, value, daoId, daoImg }) => {
  const classes = useStyles();

  return (
    <div>
      <GoogleFontLoader
        fonts={[
          {
            font: "Signika Negative",
            weights: [400, "400i"],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <div className={classes.container}>
        <a
          style={{
            textDecoration: "none",
          }}
          href={"/listContracts/" + daoId}
        >
          {" "}
          <Card className={classes.card}>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Grid item>
                {" "}
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <img width={"45%"} src={daoImg} />
                </div>{" "}
                <Grid container>
                  <p className={classes.name}>{name}</p>
                </Grid>
                <p className={classes.date}>Created on {date}</p>
                <p className={classes.description}>{description}</p>
                <p className={classes.value}>{value}</p>
              </Grid>
            </div>
          </Card>
        </a>
      </div>
    </div>
  );
};

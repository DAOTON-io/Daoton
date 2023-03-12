import { Grid, Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { ListItemText } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { Card } from "reactstrap";
import { CopyAll } from "@mui/icons-material";

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

export default function TokenItem({ name, date, description, value }) {
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
          // href="/listContracts"
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
                  <img width={"45%"} src="logo/logo.jpeg" />
                </div>{" "}
                <Grid container>
                  <p className={classes.name}>{name}</p>
                </Grid>
                <p className={classes.date}>Token Details</p>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p className={classes.description}>{description.slice(0, 16) + "..." + description.slice(-3)}</p>
                  <Button
                    style={{ maxWidth: "0.2rem", maxHeight: "1rem" }}
                    endIcon={<CopyAll />}
                    onClick={() => {
                      navigator.clipboard.writeText(description);
                    }}
                  ></Button>
                </Box>
                <br />
                <p className={classes.value}>{value}</p>
              </Grid>
            </div>
          </Card>
        </a>
      </div>
    </div>
  );
}

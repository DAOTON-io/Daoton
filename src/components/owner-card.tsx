/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoogleFontLoader from "react-google-font-loader";
import { Card } from "reactstrap";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    padding: "0rem",
  },
  card: {
    backgroundColor: "white",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    borderRadius: "0.5rem",
    padding: "20px",
    marginTop: "20px",
  },
  name: {
    color: "black",
    fontWeight: "bold",
    fontSize: "30px",
    fontFamily: "Signika Negative",
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
  daoId: string;
};

export const OwnerCard: React.FC<Props> = ({ daoId }) => {
  const [daoName, setDaoName] = React.useState("");
  const [daoDescription, setDaoDescription] = React.useState("");
  const classes = useStyles();
  useEffect(() => {
    axios.get("https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/getDAOs").then((response) => {
      const columnsJson = Object.values(response.data);

      //Creator :  "1234" DAO_Address :  "asdasd" DAO_Description :  "asdas" DAO_Name :  "aasd" DAO_Token_Address :  "asdasd" DAO_Token_Symbol :  "asdasd"
      let columnsJson2 = columnsJson.map((item: any) => {
        return {
          name: item.DAO_Name,
          description: item.DAO_Description,
          date: item.DAO_Address,
          value: item.DAO_Token_Address,
        };
      });
      //filter DAOs by DAO_ID
      columnsJson2 = columnsJson2.filter((item: any) => {
        console.log(item.name);
        return item.name === daoId;
      });
      setDaoName(columnsJson2[0].name);
      setDaoDescription(columnsJson2[0].description);
    });
  }, [daoId]);

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
        <Card className={classes.card}>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Grid container alignItems={"center"} spacing={2}>
              <Grid item>
                <p className={classes.name}>{daoName}</p>
              </Grid>
              <Grid item>
                <img width={"20%"} src="/images/logo.jpeg" />
              </Grid>
              <Grid item className={classes.description}>
                {daoDescription}
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </div>
  );
};

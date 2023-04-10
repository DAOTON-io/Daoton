import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { Card } from "reactstrap";
import { DaoCard } from "../components/dao-card";
import SideMenu from "../components/sideMenu";
import axios from "axios";
import DrawerAppBar from "../components/mobilMenu";

const useStyles = makeStyles((theme) => ({
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

export default function ViewDao() {
  const classes = useStyles();
  const [columns, setColumns] = React.useState([]);
  useEffect(() => {
    axios.get("https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/getDAOs").then((response) => {
      let columnsJson = Object.values(response.data);

      //Creator :  "1234" DAO_Address :  "asdasd" DAO_Description :  "asdas" DAO_Name :  "aasd" DAO_Token_Address :  "asdasd" DAO_Token_Symbol :  "asdasd"
      const columnsJson2 = columnsJson.map((item: any) => {
        return {
          name: item.DAO_Name,
          description: item.DAO_Description,
          date: item.DAO_Address,
          value: item.DAO_Token_Address,
          daoImg: item.DAO_Image ? "https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/image/" + item.DAO_Image : "image/logo.jpeg",
        };
      });

      setColumns(columnsJson2 as any);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#E7EBF1",
        }}
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
                {/* If columns are empty write there are no DAOs in the middle of the screen on a card */}
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
                        There are no DAOs
                      </Typography>
                    </Card>
                  </Grid>
                )}
                {columns.map((column: any) => (
                  <Grid key={column.id} item md={3}>
                    <DaoCard
                      daoId={column.name}
                      name={column.name}
                      description={column.description}
                      value={column.tokenContract}
                      daoImg={column.daoImg}
                      // today's date in format: 2021-10-10
                      date={Date().split(" ")[3] + "-" + Date().split(" ")[1] + "-" + Date().split(" ")[2]}
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

import { Grid, Box, CircularProgress, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import TokenItem from "../components/token-item";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
      padding: "1rem",
    }
  },
  card: {
    backgroundColor: "#2AABEE",
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
const columns = [
  {
    name: "Token",
    description: "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use..",
    date: "January 2021",
    value: "",
  },
  {
    name: "Token",
    description:
      "The TON network is a blockchain protocol developed by the team behind Telegram messenger, designed to enable fast and secure transactions for users around the world",
    date: "February 2021",
    value: "",
  },
  {
    name: "Token",
    value: "",
    description: "The TON network features a unique Byzantine Fault Tolerant consensus mechanism, enabling high levels of security and scalability for the network",
    date: "10.10.2021",
  },
  {
    name: "TON",
    description: "The TON network allows developers to build decentralized applications (dApps) on top of the network, providing a range of use cases for users",
    value: "",
    date: "10.05.2021",
  },
  {
    name: "DAO",
    description: "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
    value: "",
    date: "10.10.2023",
  },
  {
    name: "TONDAO",
    description: "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
    value: "",
    date: "05.10.2021",
  },
  {
    name: "DAOTon",
    description: "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
    value: "",
    date: "01.10.2021",
  },
  {
    name: "DAOTon",
    description: "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
    value: "",
    date: "01.10.2021",
  },
];

let url = "https://testnet.tonapi.io/v1/jetton/getBalances?account=";

export default function ViewTokens() {
  const classes = useStyles();

  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const [timer, setTimer] = useState(Date.now());

  let address = useTonAddress();

  useEffect(() => {
    const interval = setInterval(() => setTimer(Date.now()), 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const response = await fetch(url + address);
        const jettons = await response.json();
        const jettonlist = jettons.balances;

        setTokens(jettonlist);
      }

      setLoading(false);
    };

    fetchData();
  }, [address, timer]);

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
          <Grid item md={10} xs={12} >
            <ResponsiveAppBar />
            {/* <Card style={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            padding: '1rem',
                            marginTop: '1rem',
                            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                        }} ></Card>  */}

            <div
              style={{

                height: "100vh",
                width: "100%",
                overflow: "auto", // Kaydırma çubuğu eklemek için


              }}
            >
              {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", width: "80vw" }}>
                  <CircularProgress />
                </Box>
              )}
              <Grid
                container
                style={{
                  position: "-webkit-sticky",
                  position: "sticky",
                  top: "0",
                }}
              >
                {tokens.length === 0 && (
                  <Grid item md={12} style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}>
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
                        }}
                      >
                        There are no Token's
                      </Typography>
                    </Card>
                  </Grid>
                )}
                {tokens.map((column) => (
                  <Grid key={column.metadata.address} item md={3}>
                    <TokenItem
                      name={column.metadata.name + "(" + column.metadata.symbol + ")"}
                      description={column.jetton_address}
                      value={"Token Balance : " + column.balance / Math.pow(10, column.metadata.decimals)}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div >
  );
}

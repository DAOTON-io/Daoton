import { Grid, Box, CircularProgress, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { TokenItem } from "../components/token-item";
import SideMenu from "../components/sideMenu";
import { fetchTokens } from "../lib/api/index";
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
        const jettons = await fetchTokens(address);
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
      >
        <Grid container spacing={2}>
          <Grid item md={2}>
            <SideMenu />
          </Grid>
          <Grid item md={10} xs={12}>
            <DrawerAppBar />
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
                  top: "0",
                }}
              >
                {tokens.length === 0 && (
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
                        }}
                      >
                        There are no Token's
                      </Typography>
                    </Card>
                  </Grid>
                )}
                {tokens.map((column: any) => (
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
    </div>
  );
}

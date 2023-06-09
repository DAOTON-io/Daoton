import React, { useEffect, useState } from "react";
import { Grid, Box, CircularProgress, Card, Typography, Theme } from "@mui/material";
import { useTonAddress } from "@tonconnect/ui-react";
import { TokenItem } from "../components/TokenItem";
import { fetchTokens } from "../lib/api/index";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: 'calc(100vh - 9rem)',
    widht: "100%",
    overflow: "auto",
    padding: "1rem"
  },
}))

const ViewTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(Date.now());
  const classes = useStyles();

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
    <Grid container className={classes.container}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            width: "80vw",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
              <Typography
                style={{
                  color: "#1689c5",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                There are no Token's
              </Typography>
            </Grid>
          )}
          {tokens.map((column: any) => (
            <Grid key={column.metadata.address} item md={3}>
              <TokenItem
                name={column.metadata.name + "(" + column.metadata.symbol + ")"}
                description={column.jetton_address}
                value={"Token Balance : " + column.balance / Math.pow(10, column.metadata.decimals)}
                image={column.metadata.image}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ViewTokens;

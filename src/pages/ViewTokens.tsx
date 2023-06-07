import React, { useEffect, useState } from "react";
import { Grid, Box, CircularProgress, Card, Typography } from "@mui/material";
import { useTonAddress } from "@tonconnect/ui-react";
import { TokenItem } from "../components/TokenItem";
import { fetchTokens } from "../lib/api/index";

const ViewTokens = () => {
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
    <div
      style={{
        height: "calc(100vh - 8.5rem)",
        width: "100%",
        overflow: "auto",
      }}
    >
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
              <Card
                style={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  padding: "5rem 2.5rem",
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
                image={column.metadata.image}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ViewTokens;

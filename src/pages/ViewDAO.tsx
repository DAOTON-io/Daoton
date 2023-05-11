/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Card } from "reactstrap";
import { DaoCard } from "../components/DaoCard";
import { TonClient } from "ton";
import { Address } from "ton-core";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import daoton from "../lib/dao/contracts/daoton.contract.json";
import DaoTonContract from "../lib/dao/lib/DaotonContract";
import { open } from "../utils/index";
import DaoContract from "../lib/dao/lib/DaoContract";
import { Dao } from "../utils/types";

export default function ViewDao() {
  const [columns, setColumns] = useState<Dao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timer, setTimer] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTimer(Date.now()), 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      const endpoint = await getHttpEndpoint({ network: "testnet" });
      const client = new TonClient({ endpoint });

      const daotonContractAddress = Address.parse(daoton.address);
      const daotonMasterContract = new DaoTonContract(daotonContractAddress);

      const daotonContract = open(daotonMasterContract, client);

      const daoList = await daotonContract.getDaoList(client);

      const daoPromises: Promise<Dao>[] = [];

      if (daoList && daoList.length > 0) {
        daoList.forEach((dao: any) => {
          const daoContractAddress = Address.parse(dao);
          const daoMasterContract = new DaoContract(daoContractAddress);
          const daoContract = open(daoMasterContract, client);

          daoPromises.push(daoContract.getDaoData());
        });

        const daos = await Promise.all(daoPromises);

        console.log(daos);

        setColumns(daos);
        setLoading(false);
      }
    };

    init();
  }, [timer]);

  if (loading) {
    return (
      <div
        style={{
          height: "calc(100vh - 8rem)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "calc(100vh - 8.5rem)",
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
          {columns.map((column: Dao, index) => {
            return (
              <Grid key={index.toString()} item md={3} sx={{ width: "100%" }}>
                <DaoCard
                  daoId={column.address}
                  name={column.content.name}
                  description={column.content.description}
                  value={column.address}
                  daoImg={column.content.image || ""}
                  // today's date in format: 2021-10-10
                  date={Date().split(" ")[3] + "-" + Date().split(" ")[1] + "-" + Date().split(" ")[2]}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

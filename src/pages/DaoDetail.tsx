import React, { useEffect, useState } from "react";
import { Address } from "ton-core";
import { useNavigate, useParams } from "react-router-dom";
import { TonClient } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import DaoContract from "../lib/dao/lib/DaoContract";
import { open } from "../utils/index";
import { Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CustomButton } from "../components/CustomButton";
import { Dao } from "../utils/types";
import { categories } from "../components/DaoCategories";

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem !important",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: 2,
      padding: "24px",
    },
  },
  tableContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem !important",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: 2,
      padding: "24px",
    },
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 !important",
    margin: "0 !important",
  },
  card: {
    width: "100%",
    marginBottom: "0.8rem",
    border: "1px solid #2C6495",
  },
  buttonItem: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: "1rem !important",
  },
  tableItem: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const DaoDetail: React.FC = () => {
  const [daoValues, setDaoValues] = useState<Dao>();
  const [loading, setLoading] = useState<boolean>(true);

  const { daoId } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (daoId) {
        const daoContractAddress = Address.parse(daoId);
        const daoMasterContract = new DaoContract(daoContractAddress);

        const endpoint = await getHttpEndpoint({ network: "testnet" });
        const client = new TonClient({ endpoint });
        const daoContract = open(daoMasterContract, client);
        const daoData = await daoContract.getDaoData();

        setDaoValues(daoData);
        setLoading(false);
      }
    };

    init();
  }, [daoId]);

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
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container className={classes.cardContainer}>
          <Grid item justifyContent={"center"} className={classes.item} sx={{ flexDirection: "column !important" }}>
            <Card className={classes.card}>
              <CardContent>
                <Typography sx={{ mb: 1.5 }} color="#2C6495">
                  <b>DAO Name:</b> {daoValues?.content.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="#2C6495">
                  <b>DAO Address:</b> {daoValues?.address}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="#2C6495">
                  <b>DAO Token Address:</b> {daoValues?.tokenContract.toFriendly()}
                </Typography>
                {daoValues?.nftContract ? (
                  <Typography sx={{ mb: 1.5 }} color="#2C6495">
                    <b>DAO NFT Address:</b> {daoValues?.nftContract.toFriendly()}
                  </Typography>
                ) : undefined}
                <Typography sx={{ mb: 1.5 }} color="#2C6495">
                  It is a <b>{categories.find((category) => category.id === daoValues?.daoTypeId)?.label}</b> category. {daoValues?.content.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container className={classes.tableContainer}>
          <Grid item className={classes.buttonItem}>
            <CustomButton label="Create Proposal" onClick={() => navigate(`/view-dao/${daoValues?.address}/create-proposal`)} />
          </Grid>
          <Grid item justifyContent={"center"} className={classes.tableItem} sx={{ flexDirection: "column !important" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map(row => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default DaoDetail;

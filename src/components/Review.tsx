import React from "react";
import { Grid, Stack, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CategoryType, InfoType, TokenDetailType, NftDetailType } from "../utils/types";
import { CustomButton } from "./CustomButton";

type Props = {
  selectedCategory: CategoryType;
  daoInfo: InfoType;
  tokenDetail: TokenDetailType;
  nftDetail: NftDetailType;
  activeStepOnChange: (activeStep: number) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: 6,
    marginTop: 6,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: 2,
      padding: "24px",
    },
    display: "flex",
    justifyContent: "center",
    width: "100% !important",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}));

export const Review: React.FC<Props> = ({ selectedCategory, daoInfo, tokenDetail, nftDetail, activeStepOnChange }) => {
  const classes = useStyles();

  const save = () => {
    console.log("category in review", selectedCategory);
    console.log("daoInfo in review", daoInfo);
    console.log("tokenDetail in review", tokenDetail);
    console.log("nftDetail in review", nftDetail);
  };

  const backStep = () => {
    activeStepOnChange(3);
  };

  return (
    <Grid container className={classes.container}>
      <Stack direction="column" spacing={2} marginTop={4}>
        <Grid item>
          <Stack
            direction="row"
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack direction="column" spacing={2}>
              <Grid
                style={{
                  padding: "1rem",
                  backgroundColor: "#2C6495",
                  borderRadius: "1rem",
                  color: "beige",
                }}
              >
                <Typography variant="body1">
                  <div>
                    <b>Category: </b>
                    {selectedCategory.label}
                  </div>
                </Typography>
                <Typography variant="body1">
                  <div>
                    <b> DAO Name: </b>
                    {daoInfo.name}
                  </div>
                </Typography>
                <Typography variant="body1">
                  <div>
                    <b>DAO Description: </b>
                    {daoInfo.desc}
                  </div>
                </Typography>
              </Grid>
            </Stack>
            {tokenDetail ? (
              <Stack direction="column" spacing={2}>
                <Grid
                  item
                  style={{
                    padding: "1rem",
                    backgroundColor: "#2C6495",
                    borderRadius: "1rem",
                    color: "beige",
                  }}
                >
                  <Typography variant="body1">
                    <div>
                      <b>Token Name: </b>
                      {tokenDetail.name}
                    </div>
                  </Typography>
                  <Typography variant="body1">
                    <div>
                      <b>Token Symbol: </b>
                      {tokenDetail.symbol}
                    </div>
                  </Typography>
                  <Typography variant="body1">
                    <div>
                      <b>Token Description: </b>
                      {tokenDetail.description}
                    </div>
                  </Typography>
                  <Typography variant="body1">
                    <div>
                      <b>Token Amount: </b>
                      {tokenDetail.amount}
                    </div>
                  </Typography>
                  <Typography variant="body1">
                    <div>
                      <b>Token Decimal: </b>
                      {tokenDetail.decimal}
                    </div>
                  </Typography>
                  <Typography variant="body1">
                    <div>
                      <b>Pausable Contract: </b>
                      {tokenDetail.pausableContract.toString()}
                    </div>
                  </Typography>
                  <Typography variant="body1">
                    <div>
                      <b>Stackable Contract: </b>
                      {tokenDetail.stackableContract.toString()}
                    </div>
                  </Typography>
                </Grid>
              </Stack>
            ) : nftDetail ? (
              <Stack direction="column" spacing={2}>
                <Grid
                  item
                  style={{
                    padding: "1rem",
                    backgroundColor: "#2C6495",
                    borderRadius: "1rem",
                    color: "beige",
                  }}
                >
                  <Typography variant="body1">Nft Name: {nftDetail.name}</Typography>
                  <Typography variant="body1">Token Description: {nftDetail.description}</Typography>
                  <Typography variant="body1">Nft Level: {nftDetail.level}</Typography>
                  <Typography variant="body1">Collection Address: {nftDetail.collectionAddress}</Typography>
                </Grid>
              </Stack>
            ) : undefined}
          </Stack>
        </Grid>
        <Grid paddingTop={2} container justifyContent={"space-between"} width={"100%"}>
          <CustomButton onClick={backStep} disabled={false} label="BACK" />
          <CustomButton onClick={save} disabled={false} label="SAVE" />
        </Grid>
      </Stack>
    </Grid>
  );
};

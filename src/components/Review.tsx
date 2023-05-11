import React, { useEffect } from "react";
import { Grid, Stack, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CategoryType, DaoInfoData, TokenDetailType } from "../utils/types";
import { CustomButton } from "./CustomButton";
import { base64ToImage } from "../utils/utils";
import { TOKEN_TYPES } from "../utils/enums";

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
    overflow: "auto",
  },
  buttonContainer: {
    paddingRight: "2rem",
    paddingLeft: "2rem",
    textAlign: "start",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "1rem",
      paddingLeft: "1rem",
    },
  },
}));

type Props = {
  selectedCategory: CategoryType;
  daoInfo: DaoInfoData;
  tokenDetail: TokenDetailType;
  // nftDetail?: NftDetailType;
  activeStepOnChange: (activeStep: number) => void;
  generate: () => void;
};

export const Review: React.FC<Props> = ({ selectedCategory, daoInfo, tokenDetail, activeStepOnChange, generate }) => {
  const classes = useStyles();

  useEffect(() => {
    base64ToImage(daoInfo.image, (img) => {
      document.getElementById("dao-image")!.style.width = "200px";
      document.getElementById("dao-image")!.style.height = "200px";
      (document.getElementById("dao-image") as HTMLInputElement)!.src = daoInfo.image;
    });
  }, [daoInfo.image]);

  useEffect(() => {
    base64ToImage(tokenDetail.image, (img) => {
      document.getElementById("token-image")!.style.width = "200px";
      document.getElementById("token-image")!.style.height = "200px";
      (document.getElementById("token-image") as HTMLInputElement)!.src = tokenDetail.image || "";
    });
  }, [tokenDetail.image]);

  // useEffect(() => {
  //   base64ToImage(nftDetail.image, (img) => {
  //     document.getElementById("nft-image")!.style.width = "200px";
  //     document.getElementById("nft-image")!.style.height = "200px";
  //     (document.getElementById("nft-image") as HTMLInputElement)!.src = nftDetail.image;
  //   });
  // }, [nftDetail.image]);

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
                    {daoInfo.description}
                  </div>
                </Typography>
                <Grid container className={classes.buttonContainer}>
                  <Grid item justifyContent={"flex-start"}>
                    <label>DAO Image : </label>
                  </Grid>
                  <Grid item justifyContent={"flex-end"}>
                    <img id="dao-image" alt="alt" width={100} height={100} src={daoInfo.image || "/images/logo.jpeg"}></img>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>

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
                    {tokenDetail.isPausable.toString()}
                  </div>
                </Typography>
                <Typography variant="body1">
                  <div>
                    <b>Stackable Contract: </b>
                    {tokenDetail.isStackable.toString()}
                  </div>
                </Typography>
              </Grid>
              {tokenDetail.image && (
                <Grid container className={classes.buttonContainer}>
                  <Grid item justifyContent={"flex-start"}>
                    <label>Token Image : </label>
                  </Grid>
                  <Grid item justifyContent={"flex-end"}>
                    <div id="token-image"></div>
                  </Grid>
                </Grid>
              )}
            </Stack>

            {/* <Stack direction="column" spacing={2}>
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
                <Grid container className={classes.buttonContainer}>
                  <Grid item justifyContent={"flex-start"}>
                    <label>Nft Image : </label>
                  </Grid>
                  <Grid item justifyContent={"flex-end"}>
                    <div id="nft-image"></div>
                  </Grid>
                </Grid>
              </Stack> */}
          </Stack>
        </Grid>
        <Grid paddingTop={2} container justifyContent={"space-between"} width={"100%"}>
          <CustomButton onClick={backStep} disabled={false} label="BACK" />
          <CustomButton onClick={generate} disabled={false} label={tokenDetail.type === TOKEN_TYPES.NEW_TOKEN ? "GENERATE TOKEN & SAVE" : "SAVE"} />
        </Grid>
      </Stack>
    </Grid>
  );
};

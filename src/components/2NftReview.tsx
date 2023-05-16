import React, { useEffect } from "react";
import { GenerateNftType } from "../utils/types";
import { CustomButton } from "./CustomButton";
import { Card, CardContent, CardMedia, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100% !important",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    overflow: "auto",
    margin: "0 !important",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: 2,
      padding: "24px",
    },
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
  card: {
    minWidth: 400,
    maxWidth: 400,
    // margin: "2rem",
    marginBottom: "0.8rem",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 !important",
    margin: "0",
  },
}));

type Props = {
  nftInfo: GenerateNftType;
  nftInfoOnChange: (nftInfo: GenerateNftType) => void;
};

export const NftReview: React.FC<Props> = ({ nftInfoOnChange, nftInfo }) => {
  const classes = useStyles();

  useEffect(() => {
    // base64ToImage(nftDetail.nftImage, img => {
    //     document.getElementById('nft-image')!.style.width = '200px';
    //     document.getElementById('nft-image')!.style.height = '200px';
    //     (document.getElementById('nft-image') as HTMLInputElement)!.src = nftDetail.nftImage;
    // })
  }, [nftInfo.nftImage]);

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item justifyContent={"center"} className={classes.item} sx={{ flexDirection: "column !important" }}>
        <Card className={classes.card}>
          <CardMedia sx={{ height: 180 }} image={nftInfo.nftImage} title={nftInfo.nftName}></CardMedia>
          <CardContent>
            <Typography variant="h5" gutterBottom component="div">
              Name: {nftInfo.nftName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {nftInfo.nftDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Collection address: {nftInfo.collectionAddress.slice(0, 5) + "..." + nftInfo.collectionAddress.slice(-5)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Level: {nftInfo.level}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

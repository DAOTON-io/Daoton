import React from "react";
import { makeStyles } from "@mui/styles";
import { GenerateNftType } from "../utils/types";
import { Grid, Stack } from "@mui/material";
import { CustomInput } from "./CustomInput";
import { ImageUpload } from "./ImageUpload";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Raleway",
    fontWeight: 700,
    fontSize: "26px",
    color: "#0F2233",
    paddingBottom: "2rem",
    position: "relative",
    top: "1rem",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: 2,
      padding: "24px",
    },
  },
  buttonContainer: {
    textAlign: "start",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stackContainer: {
    minWidth: "25rem",
    marginTop: "2",
    [theme.breakpoints.down("sm")]: {
      minWidth: "10rem",
    },
  },
}));

type Props = {
  nftInfo: GenerateNftType;
  nftInfoOnChange: (nftInfo: GenerateNftType) => void;
};

const NftForm: React.FC<Props> = ({ nftInfoOnChange, nftInfo }) => {
  const classes = useStyles();

  // const disable = (): boolean => {
  //   return !(nftInfo.collectionAddress && nftInfo.nftName && nftInfo.nftDescription && nftInfo.level);
  // };

  return (
    <Grid container className={classes.container}>
      <Stack spacing={2} marginTop={4} className={classes.stackContainer} direction={"column"}>
        <CustomInput
          placeholder="Name"
          label="Name"
          id="name"
          name="name"
          value={nftInfo.nftName}
          onChange={(event: any) => {
            nftInfoOnChange({
              ...nftInfo,
              nftName: event.target.value,
            });
          }}
        />
        <CustomInput
          placeholder="Description"
          label="Description"
          id="description"
          name="description"
          value={nftInfo.nftDescription}
          onChange={(event: any) => {
            nftInfoOnChange({
              ...nftInfo,
              nftDescription: event.target.value,
            });
          }}
        />
        <CustomInput
          placeholder="Level"
          label="Level"
          id="level"
          name="level"
          value={nftInfo.level}
          onChange={(event: any) => {
            nftInfoOnChange({
              ...nftInfo,
              level: event.target.value,
            });
          }}
        />
        <CustomInput
          placeholder="Collection Address"
          label="Collection Address"
          id="collectionAddress"
          name="collectionAddress"
          value={nftInfo.collectionAddress}
          onChange={(event: any) => {
            nftInfoOnChange({
              ...nftInfo,
              collectionAddress: event.target.value,
            });
          }}
        />

        {/* <input className={classes.inputImage} placeholder="Image*"
                        onChange={(event) => {
                          setNftData({ ...nftData, nftImage: event.target.value });
                        }}></input> */}

        <Grid container className={classes.buttonContainer}>
          <Grid item justifyContent={"flex-start"} style={{ marginRight: "1rem" }}>
            <label>NFT Image : </label>
          </Grid>
          <Grid item justifyContent={"flex-end"}>
            <ImageUpload
              onChange={(value: string) => {
                nftInfoOnChange({
                  ...nftInfo,
                  nftImage: value,
                });
              }}
              onClear={() => { }}
            ></ImageUpload>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
};

export default NftForm;

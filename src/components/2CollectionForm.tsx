import React from "react";
import { makeStyles } from "@mui/styles";
import { CollectionData } from "../utils/types";
import { Grid, Stack } from "@mui/material";
import { ImageUpload } from "./ImageUpload";
import { CustomInput } from "./CustomInput";

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
  stackContainer: {
    minWidth: "25rem",
    marginTop: "0 !important",
    [theme.breakpoints.down("sm")]: {
      minWidth: "10rem",
    },
  },
}));

type Props = {
  collectionInfo: CollectionData;
  collectionInfoOnChange: (collectionInfo: CollectionData) => void;
};

const CollectionForm: React.FC<Props> = ({ collectionInfoOnChange, collectionInfo }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Stack spacing={2} marginTop={4} className={classes.stackContainer} direction={"column"}>
        <CustomInput
          placeholder="Name"
          label="Name"
          id="name"
          name="name"
          value={collectionInfo.collectionName}
          onChange={(event: any) => {
            collectionInfoOnChange({
              ...collectionInfo,
              collectionName: event.target.value,
            });
          }}
        />
        <CustomInput
          placeholder="Description"
          label="Description"
          id="description"
          name="description"
          value={collectionInfo.collectionDescription}
          onChange={(event: any) => {
            collectionInfoOnChange({
              ...collectionInfo,
              collectionDescription: event.target.value,
            });
          }}
        />
        {/* <input className={classes.inputImage} placeholder="Image*"
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionImage: event.target.value });
                        }}></input> */}

        <Grid direction={"column"} container justifyContent={"center"}>
          <Grid container className={classes.buttonContainer}>
            <Grid item justifyContent={"flex-start"}>
              <label>Collection Image : </label>
            </Grid>
            <Grid item justifyContent={"flex-end"}>
              <ImageUpload
                onChange={(value: any) => {
                  collectionInfoOnChange({
                    ...collectionInfo,
                    collectionImage: value,
                  });
                }}
                onClear={() => {}}
              ></ImageUpload>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
};

export default CollectionForm;

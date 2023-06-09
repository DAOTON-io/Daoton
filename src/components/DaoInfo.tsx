import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Stack, Theme } from "@mui/material";
import { CustomInput } from "./CustomInput";
import { ImageUpload } from "./ImageUpload";
import { base64ToImage } from "../utils/utils";
import { DaoInfoData } from "../utils/types";

type Props = {
  daoInfoOnChange: (daoInfo: DaoInfoData) => void;
  daoInfo: DaoInfoData;
  buttonDisableOnChange: (value: boolean) => void;
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
    overflow: "auto",
  },
  stackContainer: {
    minWidth: "25rem",
    [theme.breakpoints.down("sm")]: {
      minWidth: "10rem",
    },
  },
  buttonContainer: {
    textAlign: "start",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
  },
}));

export const DaoInfo: React.FC<Props> = ({ daoInfoOnChange, daoInfo, buttonDisableOnChange }) => {
  const classes = useStyles();

  useEffect(() => {
    base64ToImage(daoInfo.image, (img) => {
      document.getElementById("image")?.appendChild(img);
    });
  }, [daoInfo.image]);

  useEffect(() => {
    buttonDisableOnChange(!(daoInfo.name && daoInfo.description));
  }, [buttonDisableOnChange, daoInfo.description, daoInfo.name]);

  return (
    <Grid container className={classes.container}>
      <Stack direction="column" spacing={4} marginTop={4} className={classes.stackContainer}>
        <CustomInput
          placeholder="DAO Name"
          label="DAO Name"
          id="name"
          name="name"
          value={daoInfo.name}
          onChange={(e: any) => daoInfoOnChange({ ...daoInfo, name: e.target.value })}
        />
        <CustomInput
          placeholder="Description"
          label="Description"
          id="description"
          name="description"
          value={daoInfo.description}
          onChange={(e: any) => daoInfoOnChange({ ...daoInfo, description: e.target.value })}
        />
        <Grid container className={classes.buttonContainer}>
          <Grid item justifyContent={"flex-start"} style={{ marginRight: "1rem" }}>
            <label>DAO Image : </label>
          </Grid>
          <Grid item justifyContent={"flex-end"}>
            <ImageUpload
              onChange={(value: any) => {
                daoInfoOnChange({ ...daoInfo, image: value });
              }}
              onClear={() => {}}
            ></ImageUpload>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
};

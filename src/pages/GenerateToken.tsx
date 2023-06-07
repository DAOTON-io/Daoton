import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Stack, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import toastr from "toastr";
import { ImageUpload } from "../components/ImageUpload";
import { Token } from "../utils/types";
import { CustomInput } from "../components/CustomInput";
import { CustomSwitch } from "../components/CustomSwitch";
import { CustomButton } from "../components/CustomButton";
import { mintToken } from "../lib/token-minter/utils";
import { base64ToImage } from "../utils/utils";

const useStyles = makeStyles((theme: Theme) => ({
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
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    height: "65vh",
    overflow: "auto",
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      //height: '25rem',
    },
  },
}));

const GenerateToken: React.FC = () => {
  const [data, setData] = useState<Token>({
    name: "",
    symbol: "",
    decimal: 9,
    amount: 0,
    description: "",
    isPausable: false,
    isStackable: false,
    offchainUri: "",
  });

  const classes = useStyles();
  let address = useTonAddress();
  const [tonConnectUi] = useTonConnectUI();
  const navigate = useNavigate();

  const generateToken = async () => {
    const transaction = await mintToken(address, data);

    tonConnectUi.sendTransaction(transaction).then(() => {
      navigate("/view-tokens");
      toastr.success("Jetton deployed successfully.");
    });
  };

  useEffect(() => {
    base64ToImage(data.image, (img) => {
      document.getElementById("image")?.appendChild(img);
    });
  }, [data.image]);

  const disable = (): boolean => {
    return !(data.name && data.symbol && data.amount && data.decimal && data.description);
  };

  return (
    <div
      style={{
        height: "80vh",
        minWidth: "21rem",
        padding: "1rem",
      }}
    >
      <Grid container className={classes.container}>
        <Grid container className={classes.center}>
          <h5 className={classes.title}>Generate Token</h5>

          <Grid container className={classes.gridContainer}>
            <Stack spacing={2} direction={"column"} marginTop={4} className={classes.stackContainer}>
              <CustomInput
                placeholder="Name"
                label="Name"
                id="name"
                name="name"
                value={data.name}
                onChange={(e: any) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
              <CustomInput
                placeholder="Description"
                label="Description"
                id="description"
                name="description"
                value={data.description}
                onChange={(e: any) =>
                  setData({
                    ...data,
                    description: e.target.value,
                  })
                }
              />
              <CustomInput
                placeholder="Symbol"
                label="Symbol"
                id="symbol"
                name="symbol"
                value={data.symbol}
                onChange={(e: any) =>
                  setData({
                    ...data,
                    symbol: e.target.value,
                  })
                }
              />
              <CustomInput
                placeholder="Amount"
                label="Amount"
                id="amount"
                name="amount"
                value={data.amount}
                onChange={(e: any) =>
                  setData({
                    ...data,
                    amount: e.target.value,
                  })
                }
              />
              <CustomInput
                placeholder="Decimal"
                label="Decimal"
                id="decimal"
                name="decimal"
                value={data.decimal}
                onChange={(e: any) =>
                  setData({
                    ...data,
                    decimal: e.target.value,
                  })
                }
              />
              <Grid direction={"column"} container justifyContent={"center"}>
                <Grid container className={classes.buttonContainer}>
                  <Grid item>
                    <label>Pausable Contract : </label>
                  </Grid>
                  <Grid item>
                    <CustomSwitch
                      checked={data.isPausable}
                      onChange={(e: any) =>
                        setData({
                          ...data,
                          isPausable: !data.isPausable,
                        })
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.buttonContainer}>
                  <Grid item>
                    <label>Stackable Contract : </label>
                  </Grid>
                  <Grid item>
                    <CustomSwitch
                      checked={data.isStackable}
                      onChange={(e: any) =>
                        setData({
                          ...data,
                          isStackable: !data.isStackable,
                        })
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.buttonContainer}>
                  <Grid item justifyContent={"flex-start"}>
                    <label>Token Image : </label>
                  </Grid>
                  <Grid item justifyContent={"flex-end"}>
                    <ImageUpload
                      onChange={(value: any) => {
                        setData({ ...data, image: value });
                      }}
                      onClear={() => {
                        setData({ ...data, image: undefined });
                      }}
                    ></ImageUpload>
                  </Grid>
                </Grid>
              </Grid>
              <Grid paddingTop={2} container justifyContent={"center"}>
                <CustomButton onClick={generateToken} disabled={disable()} label="Mint Token" />
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default GenerateToken;

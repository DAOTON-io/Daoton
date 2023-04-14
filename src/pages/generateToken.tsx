import React, { useState } from "react";
import { Grid, Stack, Card, Switch } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SideMenu from "../components/sideMenu";
import { createDeployParams } from "../lib/token-minter/deployer";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";

import { Address, toNano, contractAddress, Cell } from "ton";
import BigNumber from "bignumber.js";
import { BN } from "bn.js";
import { useNavigate } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";
import toastr from "toastr";
import DrawerAppBar from "../components/mobilMenu";
import { ImageUpload } from "../components/imageUpload";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#FBFDFF",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    color: "white",
    padding: "30px",
    borderRadius: "0.5rem",

    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "70%",
      padding: "50px",
    },
  },

  title: {
    fontFamily: "Raleway",
    fontWeight: 700,
    fontSize: "26px",
    color: "#0F2233",
    marginBottom: "0.5rem",
  },
  form: {
    marginTop: "1rem",
  },
  label: {
    color: "grey",
    fontSize: "14px",
    fontWeight: "bold",
    fontFamily: "Raleway",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2D6495",
    color: "#E7F4FF",
    border: "none",
    borderRadius: "16px",
    minWidth: "235px",
    minHeight: "44px",
    fontFamily: "Raleway",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      minWidth: "200px",
    },
  },

  input: {
    borderRadius: "16px",
    borderColor: "#A2C5E3",
    borderWidth: "1px",
    maxWidth: "400px",
    color: "#767D86",
    minHeight: "44px",
    padding: "12px",
    boxShadow: "none",
    fontSize: "16px",
    fontFamily: "Raleway",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      minWidth: "300px",
    },
  },

  inputImage: {
    borderRadius: "16px",
    borderColor: "#A2C5E3",
    borderWidth: "1px",
    borderStyle: "dashed",
    maxWidth: "400px",
    color: "#767D86",
    minHeight: "44px",
    padding: "12px",
    boxShadow: "none",
    fontSize: "16px",
    fontFamily: "Raleway",
    fontWeight: 500,
  },

  center: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  },

  container: {
    marginBottom: 6,
    marginTop: 6,
    padding: "64px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: 2,
      padding: "24px",
    },
  },
  buttonContainer: {
    paddingRight: "32px",
    paddingLeft: "32px",
    textAlign: "start",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "16px",
      paddingLeft: "16px",
    },
  },
}));

const ten = new BigNumber(10);

async function fetchDecimalsOffchain(url: string) {
  let res = await fetch(url);
  let obj = await res.json();
  return obj;
}

export function toDecimalsBN(num: BigNumber.Value, decimals: BigNumber.Value) {
  return new BN(BigNumber(num).multipliedBy(ten.pow(decimals)).toFixed(0));
}

export default function GenerateToken() {
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    symbol: "",
    decimal: 9,
    amount: 0,
    description: "",
    isPausable: false,
    isStackable: false,
    offchainUri: "",
  });
  let address = useTonAddress();
  const [tonConnectUi] = useTonConnectUI();
  const navigate = useNavigate();

  const generateToken = async () => {
    const editedAddress = Address.parse(address);

    let dc = data.decimal;
    if (data.offchainUri) {
      let res = await fetchDecimalsOffchain(data.offchainUri.replace("ipfs://", "https://ipfs.io/ipfs/"));
      dc = res.decimals;
    }

    const params = {
      owner: editedAddress,
      onchainMetaData: {
        name: data.name,
        symbol: data.symbol,
        description: data.description,
        decimals: dc.toFixed(0),
        // isPausable: data.isPausable,
      },
      // offchainUri: data.offchainUri,
      amountToMint: toDecimalsBN(data.amount, dc),
    };

    const deployParams = createDeployParams(params, data.offchainUri);

    const contractAddressHex = contractAddress({
      workchain: 0,
      initialCode: deployParams.code,
      initialData: deployParams.data,
    }).toString();
    console.log("contractAddressHex", contractAddressHex);

    const state_init = new Cell();
    state_init.bits.writeUint(6, 5);
    state_init.refs.push(deployParams.code);
    state_init.refs.push(deployParams.data);

    const aa = await state_init.toBoc();
    const bb = aa.toString("base64");

    const py = await deployParams.message.toBoc();

    const defaultTx2 = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: contractAddressHex,
          amount: toNano(0.25).toNumber().toString(),
          stateInit: bb,
          payload: py.toString("base64"),
        },
      ],
    };

    tonConnectUi.sendTransaction(defaultTx2).then(() => {
      navigate("/view-tokens");
      toastr.success(contractAddressHex, "Jetton deployed successfully.");
    });
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    if (data) { generateToken(); }
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={2} md={3}>
        <SideMenu></SideMenu>
      </Grid>

      <Grid item lg={10} md={9} xs={12}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <DrawerAppBar></DrawerAppBar>
          </Grid>
          <Grid item>
            <Card
              sx={{
                borderRadius: "40px",
              }}
            >
              <GoogleFontLoader fonts={[{ font: "Raleway", weights: [700, "700i", 500, "500i"] }]} subsets={["cyrillic-ext", "greek"]} />

              <Grid container className={classes.container}>
                <Grid item lg={1} md={2} sm={1} xs={0}></Grid>
                <Grid direction={"column"} item lg={9} md={8} sm={11} xs={12} className={classes.center}>
                  <h5 className={classes.title}>Generate Token</h5>

                  <form onSubmit={handleSubmit}>
                    <Grid item>
                      <Stack spacing={2} maxWidth={"400px"} marginTop={4}>
                        <input
                          className={classes.input}
                          placeholder="Name"
                          type="text"
                          id="name"
                          name="name"
                          value={data.name}
                          onChange={(event) => {
                            setData({
                              ...data,
                              name: event.target.value,
                            });

                          }}
                          required
                          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter token name')}
                          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>
                        <input
                          className={classes.input}
                          placeholder="Description"
                          type="text"
                          id="description"
                          name="description"
                          value={data.description}
                          onChange={(event) => {
                            setData({
                              ...data,
                              description: event.target.value,
                            });
                          }}
                          required
                          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter token description')}
                          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>
                        <input
                          className={classes.input}
                          placeholder="Symbol"
                          type="text"
                          id="symbol"
                          name="symbol"
                          value={data.symbol}
                          onChange={(event) => {
                            setData({
                              ...data,
                              symbol: event.target.value,
                            });
                          }}
                          required
                          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter token symbol')}
                          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>
                        <input
                          className={classes.input}
                          placeholder="Amount"
                          type="text"
                          id="amount"
                          name="amount"
                          // value={data.amount}
                          onChange={(event) => {
                            setData({
                              ...data,
                              amount: parseInt(event.target.value),
                            });
                          }}
                          // required
                          // onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter token description')}
                          // onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>
                        <input
                          className={classes.input}
                          placeholder="Decimal"
                          type="text"
                          id="decimal"
                          name="decimal"
                          // value={data.decimal}
                          onChange={(event) => {
                            setData({
                              ...data,
                              decimal: parseInt(event.target.value),
                            });
                          }}
                          // required
                          // onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter decimal value')}
                          // onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>

                        <Grid direction={"column"} container justifyContent={"center"}>
                          <Grid container className={classes.buttonContainer}>
                            <Grid item>
                              <label>Pausable Contract : </label>
                            </Grid>
                            <Grid item>
                              <Switch
                                onChange={() => {
                                  setData({
                                    ...data,
                                    isPausable: !data.isPausable,
                                  });
                                }}
                              ></Switch>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.buttonContainer}>
                            <Grid item>
                              <label>Stackable Contract : </label>
                            </Grid>
                            <Grid item>
                              <Switch
                                onChange={() => {
                                  setData({
                                    ...data,
                                    isStackable: !data.isStackable,
                                  });
                                }}
                              ></Switch>
                            </Grid>
                          </Grid>
                          <Grid container className={classes.buttonContainer}>
                            <Grid item justifyContent={"flex-start"}>
                              <label>Collection Image : </label>
                            </Grid>
                            <Grid item justifyContent={"flex-start"}>
                              <ImageUpload onChange={() => { }} onClear={() => { }}></ImageUpload>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid paddingTop={2} container justifyContent={"center"}>
                          <button type="submit" className={classes.button}>
                            Mint Token
                          </button>
                        </Grid>
                      </Stack>
                    </Grid>
                  </form>
                </Grid>
                <Grid item lg={2} md={2} sm={0} xs={0}></Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

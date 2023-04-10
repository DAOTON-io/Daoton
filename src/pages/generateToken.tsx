import React, { useState } from "react";
import { Grid, Switch } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Card } from "reactstrap";
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

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
      padding: "1rem",
    },
  },
  card: {
    backgroundColor: "#ffffff",
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
    marginBottom: "0.5rem",
    fontSize: "30px",
    color: "#2D6495",
    fontFamily: "Signika Negative",
    fontWeight: "bold",
  },
  form: {
    marginTop: "0.6rem",
  },
  label: {
    color: "grey",
    fontSize: "14px",
    fontWeight: "bold",
    fontFamily: "Signika Negative",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2D6495",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontFamily: "Signika Negative",
    cursor: "pointer",
    marginBottom: "1rem",
  },

  input: {
    marginTop: "0.5rem",
    padding: "10px",
    color: "black",
    border: "1px solid #2D6495",
    borderRadius: "0.5rem",
    width: "100%",
    "&:hover": {
      border: "1px solid #2D6495",
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

  return (
    <div>
      <div
        style={{
          backgroundColor: "#E7EBF1",
        }}
        className={classes.container}
      >
        <Grid container spacing={2}>
          <Grid item md={2}>
            <SideMenu />
          </Grid>
          <Grid item md={10}>
            <DrawerAppBar />
            <div
              style={{
                marginTop: "1rem",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: "80vh",
              }}
            >
              <Card className={classes.card}>
                <GoogleFontLoader
                  fonts={[
                    {
                      font: "Signika Negative",
                      weights: [400, "400i"],
                    },
                  ]}
                  subsets={["cyrillic-ext", "greek"]}
                />
                <Grid container>
                  <Grid item md={12}>
                    <div
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <Grid container display={"flex"} alignItems={"center"}>
                        <p className={classes.title}>Generate Token</p>
                      </Grid>

                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} htmlFor="name">
                                Name:
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <input
                                className={classes.input}
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                placeholder="Token Name.."
                                onChange={(event) => {
                                  setData({
                                    ...data,
                                    name: event.target.value,
                                  });
                                }}
                              ></input>
                            </form>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} htmlFor="description">
                                Description :
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <input
                                className={classes.input}
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Description.."
                                value={data.description}
                                onChange={(event) => {
                                  setData({
                                    ...data,
                                    description: event.target.value,
                                  });
                                }}
                              ></input>
                            </form>
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} htmlFor="symbol">
                                Symbol :
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <input
                                className={classes.input}
                                type="text"
                                id="symbol"
                                name="symbol"
                                placeholder="Token Symbol.."
                                value={data.symbol}
                                onChange={(event) => {
                                  setData({
                                    ...data,
                                    symbol: event.target.value,
                                  });
                                }}
                              ></input>
                            </form>
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} htmlFor="amount">
                                Amount :
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <input
                                className={classes.input}
                                type="text"
                                id="amount"
                                name="amount"
                                placeholder="Amount.."
                                value={data.amount}
                                onChange={(event) => {
                                  setData({
                                    ...data,
                                    amount: parseInt(event.target.value),
                                  });
                                }}
                              ></input>
                            </form>
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} htmlFor="decimal">
                                Decimal :
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <input
                                className={classes.input}
                                type="text"
                                id="decimal"
                                name="decimal"
                                placeholder="Decimal.."
                                value={data.decimal}
                                onChange={(event) => {
                                  setData({
                                    ...data,
                                    decimal: parseInt(event.target.value),
                                  });
                                }}
                              ></input>
                            </form>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container alignItems={"center"}>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"}>
                            <Grid item md={8}>
                              <form className={classes.form}>
                                <label className={classes.label} htmlFor="decimal">
                                  Pausable Contract :
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <Switch
                                  color="primary"
                                  size="medium"
                                  checked={data.isPausable}
                                  onChange={() => {
                                    setData({
                                      ...data,
                                      isPausable: !data.isPausable,
                                    });
                                  }}
                                  disabled
                                />
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"}>
                            <Grid item md={8}>
                              <form className={classes.form}>
                                <label className={classes.label} htmlFor="decimal">
                                  Stackable Contract :
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <Switch
                                  color="primary"
                                  size="medium"
                                  checked={data.isStackable}
                                  onChange={() => {
                                    setData({
                                      ...data,
                                      isStackable: !data.isStackable,
                                    });
                                  }}
                                  disabled
                                />
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>{" "}
                <Button
                  className={classes.button}
                  style={{
                    backgroundColor: "#2D6495",
                    width: "35vh",
                    marginTop: "1rem",
                  }}
                  onClick={() => generateToken()}
                >
                  Mint Token
                </Button>{" "}
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

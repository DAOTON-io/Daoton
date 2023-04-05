import { Grid, Switch } from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { Button, Card } from "reactstrap";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import GoogleFontLoader from "react-google-font-loader";
import { Address } from "tonweb";
import { fetchTokens, fetchNfts } from "../lib/api/index";
import axios from "axios";
import DrawerAppBar from "../components/mobilMenu";
import FileBase64 from 'react-file-base64';

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

    borderRadius: "0.5rem",
    padding: "30px",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "70%",
      padding: "50px",
    },
  },

  title: {
    marginBottom: "0.5rem",
    fontSize: "30px",
    color: "#2AABEE",
    fontWeight: "bold",
    fontFamily: "Signika Negative",
  },
  form: {
    marginTop: "1rem",
  },
  label: {
    color: "grey",
    fontSize: "14px",
    fontWeight: "bold",
    fontFamily: "Signika Negative",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2AABEE",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    fontFamily: "Signika Negative",

    marginBottom: "1rem",
  },
  select: {
    fontFamily: "Signika Negative",
    width: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    color: "white",
    border: "none",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    backgroundColor: "#2AABEE",
    padding: "10px",
    borderRadius: "0.5rem",
  },
  input: {
    marginTop: "0.5rem",
    padding: "10px",
    border: "1px solid #2AABEE",
    borderRadius: "0.5rem",
    width: "100%",

    "&:hover": {
      border: "1px solid #2AABEE",
    },
  },
}));

export default function CreateDao() {

    
  const classes = useStyles();
  const [data, setData] = useState({ name: "", type: "1", desc: "Sample Desc", isPauseable:"true", tokenContract: "", nftCollectionContract: "" });
  const [tonConnectUi] = useTonConnectUI();
  const address = useTonAddress();
  const [tokens, setTokens] = useState([]);
  const [nftCollections, setNftCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      const fetchInitData = async () => {
        const tokenList = await fetchTokens(address);
        const nftList = await fetchNfts(address);

        setNftCollections(nftList.collections);
        setTokens(tokenList.balances);
      };

      fetchInitData();
    }

    setLoading(false);
  }, [address]);

  const createDao = async () => {
    console.log("create dao");
    console.log("Dao type", data.type);
    console.log("Dao name", data.name);
    console.log("Dao desc", data.desc);
    console.log("Dao tokenContract", data.tokenContract);
    let code = TonWeb.boc.Cell.fromBoc('b5ee9c72c1010401004100000d12230114ff00f4a413f4bcf2c80b010201620302001da1e9fbda89a1a67fa7ffa7ffa67e610038d030ed44d0d33fd3ffd3ffd33f3003c8cb3f12cbffcbffcb3fc9ed5475069b44')[0];
    let dataInit = new TonWeb.boc.Cell();
    //init state is set_data(begin_cell().store_uint(dao_id, 64).store_uint(contract_id, 64).store_dict(dict).end_cell());
    //dao_id = random 64 bit number
    // transform  256 bit hex address to int and store it in contract_id 
    // let contract_id = TonWeb.utils.hexToBytes(data.tokenContract); 
    let dao_id = Math.floor(Math.random() * 100000000 + 1);
    dataInit.bits.writeUint(dao_id, 64);
    // dataInit.bits.writeUint(data.tokenContract, 256);
    dataInit.bits.writeUint(0, 256);
    dataInit.bits.writeUint(0, 256);
    dataInit.bits.writeUint(dao_id, 64);
    let state_init = new TonWeb.boc.Cell();
    state_init.bits.writeUint(6, 5);
    state_init.refs.push(code);
    state_init.refs.push(dataInit);




    let state_init_boc = TonWeb.utils.bytesToBase64(await state_init.toBoc());
    console.log(state_init_boc);
    //  te6ccsEBBAEAUwAABRJJAgE0AQMBFP8A9KQT9LzyyAsCAGrTMAGCCGlJILmRMODQ0wMx+kAwi0ZG9nZYcCCAGMjLBVAEzxaARfoCE8tqEssfAc8WyXP7AAAQAAABhltsPJ+MirEd

    let contractAddressNew = '0:' + TonWeb.utils.bytesToHex(await state_init.hash());
    console.log(contractAddressNew);

    const defaultTx2 = {
        validUntil: Date.now() + 1000000,
        messages: [
            {
                address: contractAddressNew,
                amount: '69000000',
                stateInit: state_init_boc
            },
        ],
    };
    tonConnectUi.sendTransaction(defaultTx2).then((res) => {
      let token;
      //prepare image base64 data
      let image = data.image;
      if (image) {
          image = image.replace(/^data:image\/[a-z]+;base64,/, "");
      }

      //Get JWT token from api /auth with address
      axios.post("https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/auth", { address: contractAddressNew }).then(
          (res) => {
              token = res.data.token;
          }
      )

      //save dao address to database using api call post. set token in post header x-access-token  https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/saveDAO with DAO_Name, sender, DAO_Description, DAO_Address, DAO_Token_Address, DAO_Token_Symbol
      axios.post("https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/saveDAO", { DAO_Name: data.name, sender: address, DAO_Description: data.desc, DAO_Address: contractAddressNew, DAO_Token_Address: data.tokenContract, DAO_Token_Symbol: data.tokenContract, DAO_Image: data.image }, { headers: { "x-access-token": token } }).then(
          (res) => {
              console.log(res);
          }
      ).finally(() => {
        // window.location.href = '/view-dao';
      })
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#E7EBF1",
        height: "100%",
      }}
    >
      <div className={classes.container}>
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
                    {" "}
                    <div
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      {" "}
                      <Grid container display={"flex"} alignItems={"center"}>
                        <p className={classes.title}>Create DAO</p>
                      </Grid>
                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} for="fname">
                                DAO Type :{" "}
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <select className={classes.select} id="type" name="type" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })}>
                                <option value="1">Token</option>
                                <option value="2">NFT</option>
                              </select>
                            </form>
                          </div>
                        </Grid>
                      </Grid>

                      {/* If data.type == 1, ask token, else nft  */}
                      {data.type == 1 ? (
                        <Grid container alignItems={"center"}>
                          <Grid item xs={12} md={2}>
                            {" "}
                            <div>
                              <form className={classes.form}>
                                <label className={classes.label} for="token">
                                  Token :
                                </label>
                              </form>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={8}>
                            {" "}
                            <div>
                              <form className={classes.form}>
                                <select
                                  className={classes.select}
                                  id="token"
                                  name="token"
                                  value={data.tokenContract}
                                  onChange={(e) => setData({ ...data, tokenContract: e.target.value })}
                                >
                                  {tokens.map((tk) => {
                                    return <option value={tk.jetton_address}>{tk.metadata.name + "(" + tk.metadata.symbol + ")"}</option>;
                                  })}
                                </select>
                              </form>
                            </div>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid container alignItems={"center"}>
                          <Grid item xs={12} md={2}>
                            {" "}
                            <div>
                              <form className={classes.form}>
                                <label className={classes.label} for="fname">
                                  NFT :
                                </label>
                              </form>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <div>
                              <form className={classes.form}>
                                <select
                                  className={classes.select}
                                  id="collection"
                                  name="collection"
                                  value={data.nftCollectionContract}
                                  onChange={(e) => setData({ ...data, nftCollectionContract: e.target.value })}
                                >
                                  {nftCollections.map((nfc) => {
                                    return <option value={nfc.address}>{nfc.name}</option>;
                                  })}
                                </select>
                              </form>
                            </div>
                          </Grid>
                        </Grid>
                      )}
                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} for="fname">
                                DAO Name:
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <input
                                fullWidth
                                className={classes.input}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="DAO name.."
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
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
                              <label className={classes.label} for="fname">
                                Description:
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <input
                                fullWidth
                                className={classes.input}
                                type="text"
                                id="desc"
                                name="desc"
                                placeholder="Description.."
                                value={data.desc}
                                onChange={(e) => setData({ ...data, desc: e.target.value })}
                              ></input>
                            </form>
                          </div>
                        </Grid>
                      </Grid>
                      {/* Is pauseable switch */}
                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} for="fname">
                                Is Pauseable:
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <Switch
                                checked={data.isPauseable}
                                onChange={(e) => setData({ ...data, isPauseable: e.target.checked })}
                                name="isPauseable"
                                inputProps={{ "aria-label": "secondary checkbox" }}
                              />
                            </form>
                          </div>
                        </Grid>
                      </Grid>
                      {/* DAO Image Upload*/}
                      <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} for="fname">
                                DAO Image: (Only PNG!!!)
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}
                                style={{color: "black"}}
                                >
                              <FileBase64
                                multiple={false}
                                onDone={(file) => setData({ ...data, image: file.base64 })}
                              />
                            </form>
                          </div>
                        </Grid>
                      </Grid>
                      {/* <Grid container alignItems={"center"}>
                        <Grid item xs={12} md={2}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <label className={classes.label} for="fname">
                                Jetton Address:
                              </label>
                            </form>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {" "}
                          <div>
                            <form className={classes.form}>
                              <input
                                fullWidth
                                className={classes.input}
                                type="text"
                                id="tokenContract"
                                name="tokenContract"
                                placeholder="Adress.."
                                value={data.tokenContract}
                                onChange={(e) => setData({ ...data, tokenContract: e.target.value })}
                              ></input>
                            </form>
                          </div>
                        </Grid>
                      </Grid> */}
                      <Grid container></Grid>
                    </div>
                  </Grid>
                </Grid>{" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Button className={classes.button} onClick={createDao} style={{ backgroundColor: "#2AABEE", width: "35vh", marginTop: "1rem" }}>
                    Generate
                  </Button>{" "}
                </div>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
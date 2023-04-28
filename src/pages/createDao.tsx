import React, { useState, useEffect } from "react";
import { Grid, Switch, Card, Stack } from "@mui/material";

import { makeStyles } from "@mui/styles";
import SideMenu from "../components/sideMenu";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import GoogleFontLoader from "react-google-font-loader";
import { fetchTokens, fetchNfts } from "../lib/api/index";
import axios from "axios";
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

  select: {
    fontFamily: "Raleway",
    width: "100%",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#1D252C",
    border: "none",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    backgroundColor: "#A2C5E3",
    padding: "10px",
    borderRadius: "0.5rem",
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

export default function CreateDao() {
  const classes = useStyles();
  const [data, setData] = useState({ name: "", type: "1", desc: "Sample Desc", isPauseable: true, tokenContract: "", nftCollectionContract: "", image: "" });
  const [tonConnectUi] = useTonConnectUI();
  const address = useTonAddress();
  const [tokens, setTokens] = useState([]);
  const [nftCollections, setNftCollections] = useState([]);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      //TODO will fix nft collection
      const fetchInitData = async () => {
        try {
          const tokenList = await fetchTokens(address);
          setTokens(tokenList.balances);
        } catch {}
        try {
          const nftList = await fetchNfts(address);
          setNftCollections(nftList.collections as any);
        } catch {}
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
    let code = TonWeb.boc.Cell.fromBoc(
      "b5ee9c72c1010401004100000d12230114ff00f4a413f4bcf2c80b010201620302001da1e9fbda89a1a67fa7ffa7ffa67e610038d030ed44d0d33fd3ffd3ffd33f3003c8cb3f12cbffcbffcb3fc9ed5475069b44"
    )[0];
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

    let contractAddressNew = "0:" + TonWeb.utils.bytesToHex(await state_init.hash());
    console.log(contractAddressNew);

    const defaultTx2 = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: contractAddressNew,
          amount: "69000000",
          stateInit: state_init_boc,
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
      axios.post("https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/auth", { address: contractAddressNew }).then((res) => {
        token = res.data.token;
      });

      //save dao address to database using api call post. set token in post header x-access-token  https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/saveDAO with DAO_Name, sender, DAO_Description, DAO_Address, DAO_Token_Address, DAO_Token_Symbol
      axios
        .post(
          "https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/saveDAO",
          {
            DAO_Name: data.name,
            sender: address,
            DAO_Description: data.desc,
            DAO_Address: contractAddressNew,
            DAO_Token_Address: data.tokenContract,
            DAO_Token_Symbol: data.tokenContract,
            DAO_Image: data.image,
          },
          { headers: { "x-access-token": token } }
        )
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          // window.location.href = '/view-dao';
        });
    });
  };

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
                  <h5 className={classes.title}>Create DAO</h5>

                  <Grid item>
                    <Stack spacing={2} maxWidth={"400px"} marginTop={4}>
                      <select className={classes.select} id="type" name="type" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })}>
                        <option value="1">Token</option>
                        <option value="2">NFT</option>
                      </select>

                      {Number(data.type) === 1 ? (
                        <select className={classes.select} placeholder="Token">
                          {tokens.map((tk: any) => {
                            return <option value={tk.jetton_address}>{tk.metadata.name + "(" + tk.metadata.symbol + ")"}</option>;
                          })}
                        </select>
                      ) : (
                        <select className={classes.select} placeholder="NFT">
                          {nftCollections.map((nft: any) => {
                            return <option value={nft.address}>{nft.name}</option>;
                          })}
                        </select>
                      )}

                      <input
                        className={classes.input}
                        placeholder="DAO Name"
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                      ></input>
                      <input
                        className={classes.input}
                        placeholder="Description"
                        type="text"
                        id="desc"
                        name="desc"
                        value={data.desc}
                        onChange={(e) => setData({ ...data, desc: e.target.value })}
                      ></input>

                      <Grid direction={"column"} container justifyContent={"center"}>
                        <Grid container className={classes.buttonContainer}>
                          <Grid item>
                            <label>Pausable : </label>
                          </Grid>
                          <Grid item>
                            <Switch
                              checked={data.isPauseable}
                              name="isPauseable"
                              inputProps={{ "aria-label": "secondary checkbox" }}
                              onChange={(e) => setData({ ...data, isPauseable: e.target.checked })}
                            ></Switch>
                          </Grid>
                        </Grid>
                        <Grid container className={classes.buttonContainer}>
                          <Grid item justifyContent={"flex-start"} style={{ marginRight: "1rem" }}>
                            <label>DAO Image : </label>
                          </Grid>
                          <Grid item justifyContent={"flex-start"}>
                            <ImageUpload onChange={() => {}} onClear={() => {}}></ImageUpload>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid paddingTop={2} container justifyContent={"center"}>
                        <button
                          className={classes.button}
                          onClick={() => {
                            createDao();
                          }}
                        >
                          Generate
                        </button>
                      </Grid>
                    </Stack>
                  </Grid>
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

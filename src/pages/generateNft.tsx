import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import NftMinter from "../lib/nft-minter";
import { create, urlSource } from "ipfs";
import { collectionPreview } from "../lib/api/index";
import { Address } from "ton";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Grid, Input, ListItem, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import SideMenu from "components/sideMenu";
import { wordSize } from "bn.js";
import GoogleFontLoader from "react-google-font-loader";
import DrawerAppBar from "components/mobilMenu";
import { ImageUpload } from "components/imageUpload";

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

export default function GenerateNft() {
  const classes = useStyles();
  const navigate = useNavigate();

  let address = useTonAddress(false);
  const [tonConnectUi] = useTonConnectUI();
  const [nftData, setNftData] = useState({ nftName: "", nftDescription: "", nftImage: "", value: "", collectionAddress: "" });

  const generateNFT = async () => {
    if (address) {
      const node = await create();
      const itemContent = await node.add(
        JSON.stringify({
          attributes: [
            {
              trait_type: "level",
              value: nftData.value,
            },
          ],
          description: nftData.nftDescription,
          external_url: "example.com",
          image: nftData.nftImage,
          name: nftData.nftName,
        })
      );

      const content = await collectionPreview(nftData.collectionAddress);

      const minter = new NftMinter(Address.parse(content.owner_address).toString(), tonConnectUi, content.collection_content.data);

      minter.deployNftItem(itemContent.path, content.next_item_index, address).then(() => {
        navigate("/view-nfts");
      });
    }
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    if (nftData) { generateNFT(); }
  }

  return (
    <Grid container spacing={2}>
      <Grid item lg={2} md={3}>
        <SideMenu />
      </Grid>
      <Grid item lg={10} md={9} xs={12}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item md={4}>
            <DrawerAppBar />
          </Grid>
          <Grid item md={8} height={"100%"}>
            <Card
              sx={{
                borderRadius: "40px",
              }}
            >
              <GoogleFontLoader fonts={[{ font: "Raleway", weights: [700, "700i", 500, "500i"] }]} subsets={["cyrillic-ext", "greek"]} />
              <Grid container className={classes.container}>
                <Grid item lg={1} md={2} sm={1} xs={0}></Grid>
                <Grid item lg={9} md={8} sm={11} xs={12} className={classes.center}>
                  <h5 className={classes.title}>Create NFT</h5>

                  <form>
                    <Grid item>
                      <Stack spacing={2} maxWidth={"400px"} marginTop={4}>
                        <input
                          className={classes.input}
                          placeholder="Name"
                          onChange={(event) => {
                            setNftData({ ...nftData, nftName: event.target.value });
                          }}
                          required
                          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter NFT name')}
                          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>
                        <input
                          className={classes.input}
                          placeholder="Description"
                          onChange={(event) => {
                            setNftData({ ...nftData, nftDescription: event.target.value });
                          }}
                          required
                          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter NFT description')}
                          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>
                        <input
                          className={classes.input}
                          placeholder="Level"
                          onChange={(event) => {
                            setNftData({ ...nftData, value: event.target.value });
                          }}
                          required
                          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter NFT level')}
                          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>
                        <input
                          className={classes.input}
                          placeholder="Collection Address"
                          onChange={(event) => {
                            setNftData({ ...nftData, collectionAddress: event.target.value });
                          }}
                          required
                          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please enter collection address')}
                          onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                        ></input>

                        <Grid direction={"column"} container justifyContent={"center"}>
                          <Grid container className={classes.buttonContainer}>
                            <Grid item justifyContent={"flex-start"}>
                              <label>NFT Image : </label>
                            </Grid>
                            <Grid item justifyContent={"flex-start"}>
                              <ImageUpload onChange={() => { }} onClear={() => { }}></ImageUpload>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid paddingTop={2} container justifyContent={"center"}>
                          <button type="submit" className={classes.button}>
                            Create
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

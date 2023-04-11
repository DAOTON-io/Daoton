import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import NftMinter from "../lib/nft-minter";
import { create, urlSource } from "ipfs";
import { collectionPreview } from "../lib/api/index";
import { Address } from "ton";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Grid, Input, ListItem, OutlinedInput, Stack, TextField, Typography, } from "@mui/material";
import SideMenu from "components/sideMenu";
import { wordSize } from "bn.js";
import GoogleFontLoader from "react-google-font-loader";
import DrawerAppBar from "components/mobilMenu";


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
    backgroundColor: "#0F2233",
    color: "#E7F4FF",
    border: "none",
    borderRadius: "16px",
    minWidth: '235px',
    fontFamily: "Raleway",
    fontWeight: 500,
  },

  input: {
    borderRadius: '16px',
    borderColor: '#A2C5E3',
    borderWidth: '1px',
    maxWidth: '400px',
    color: '#767D86',
    minHeight: '44px',
    padding: '12px',
    boxShadow: 'none',
    fontSize: '16px',
    fontFamily: "Raleway",
    fontWeight: 500,
  },

  inputImage: {
    borderRadius: '16px',
    borderColor: '#A2C5E3',
    borderWidth: '1px',
    borderStyle: 'dashed',
    maxWidth: '400px',
    color: '#767D86',
    minHeight: '44px',
    padding: '12px',
    boxShadow: 'none',
    fontSize: '16px',
    fontFamily: "Raleway",
    fontWeight: 500,
  }
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

  return (
    <Grid container spacing={2}>

      <Grid item lg={2} md={3}>
        <SideMenu />
      </Grid>
      <Grid item lg={10} md={9} xs={12}>
        <DrawerAppBar />
        <Card sx={{
          borderRadius: '40px'
        }}>
          <GoogleFontLoader fonts={[{ font: "Raleway", weights: [700, "700i", 500, "500i"], },]} subsets={["cyrillic-ext", "greek"]} />
          <Grid direction={'row'} container sx={{ padding: 2, marginTop: 6, }}>

            <Grid item lg={1} md={2} sm={1} xs={0}></Grid>
            <Grid item lg={9} md={8} sm={11} xs={12}>

              <h5 className={classes.title}>Create NFT</h5>

              <Grid item>
                <Stack spacing={2} maxWidth={'400px'} marginTop={4} >
                  <input className={classes.input} placeholder="Name"
                    onChange={(event) => {
                      setNftData({ ...nftData, nftName: event.target.value });
                    }}></input>
                  <input className={classes.input} placeholder="Description"
                    onChange={(event) => {
                      setNftData({ ...nftData, nftDescription: event.target.value });
                    }}></input>
                  <input className={classes.input} placeholder="Level"
                    onChange={(event) => {
                      setNftData({ ...nftData, value: event.target.value });
                    }}></input>
                  <input className={classes.input} placeholder="Collection Address"
                    onChange={(event) => {
                      setNftData({ ...nftData, collectionAddress: event.target.value });
                    }}></input>
                  <input className={classes.inputImage} placeholder="Image*"
                    onChange={(event) => {
                      setNftData({ ...nftData, nftImage: event.target.value });
                    }}></input>
                  <Grid paddingTop={2} container justifyContent={'center'}>
                    <button className={classes.button}
                      onClick={() => {
                        generateNFT();
                        console.log(nftData);
                      }}>Create</button>
                  </Grid>
                </Stack>
              </Grid>


            </Grid>
            <Grid item lg={2} md={2} sm={0} xs={0}></Grid>

          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

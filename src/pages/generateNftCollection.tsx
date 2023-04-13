import React, { useState } from "react";
import { Grid, Stack, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SideMenu from "../components/sideMenu";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import NftMinter from "../lib/nft-minter";
import { create } from "ipfs";
import { useNavigate } from "react-router-dom";
import DrawerAppBar from "../components/mobilMenu";
import GoogleFontLoader from "react-google-font-loader";
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
    minWidth: '235px',
    minHeight: '44px',
    fontFamily: "Raleway",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      minWidth: '200px',
    },
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
    [theme.breakpoints.down("sm")]: {
      minWidth: '300px',
    },
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
  },

  center: {
    [theme.breakpoints.down("sm")]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }
  },

  container: {
    marginBottom: 6,
    marginTop: 6,
    padding: '64px',
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    }
  }

}));

export default function GenerateNftCollection() {
  const classes = useStyles();
  const navigate = useNavigate();

  let address = useTonAddress(true);
  const [tonConnectUi] = useTonConnectUI();
  const [collectionData, setCollectionData] = useState({ collectionName: "", collectionDescription: "", collectionImage: "" });

  const generateCollection = async () => {
    if (address) {
      const node = await create();
      const nftCollectionUri = await node.add(
        JSON.stringify({
          name: collectionData.collectionName,
          description: collectionData.collectionDescription,
          image: collectionData.collectionImage,
          external_link: "example.com",
          seller_fee_basis_points: 100,
          fee_recipient: "0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721",
        })
      );

      const minter = new NftMinter(address, tonConnectUi, "https://ipfs.io/ipfs/" + nftCollectionUri.path);
      minter.deployNftCollection().then(() => {
        navigate("/generate-nft");
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={2} md={3}>
        <SideMenu></SideMenu>
      </Grid>
      <Grid item lg={10} md={9} xs={12}>
        <Grid container direction={'column'} spacing={2}>
          <Grid item>
            <DrawerAppBar></DrawerAppBar>
          </Grid>
          <Grid item>
            <Card sx={{
              borderRadius: '40px',
            }}>
              <GoogleFontLoader fonts={[{ font: "Raleway", weights: [700, "700i", 500, "500i"], },]} subsets={["cyrillic-ext", "greek"]} />
              <Grid container className={classes.container}>

                <Grid item lg={1} md={2} sm={1} xs={0}></Grid>
                <Grid direction={'column'} item lg={9} md={8} sm={11} xs={12} className={classes.center}>

                  <h5 className={classes.title}>Create Collection</h5>

                  <Grid item>
                    <Stack spacing={2} maxWidth={'400px'} marginTop={4} >
                      <input className={classes.input} placeholder="Name"
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionName: event.target.value });
                        }}></input>
                      <input className={classes.input} placeholder="Description"
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionDescription: event.target.value });
                        }}></input>

                      <input className={classes.inputImage} placeholder="Image*"
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionImage: event.target.value });
                        }}></input>
                      <Grid paddingTop={2} container justifyContent={'center'}>
                        <button className={classes.button}
                          onClick={() => {
                            generateCollection()
                            console.log(collectionData);
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
      </Grid>
    </Grid>
  );
}
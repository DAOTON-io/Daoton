import React, { useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Card } from "reactstrap";
import SideMenu from "../components/sideMenu";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import NftMinter from "../lib/nft-minter";
import { create } from "ipfs";
import { Box } from "@mui/system";
import { MobileView, BrowserView } from "react-device-detect";
import { useNavigate } from "react-router-dom";
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
    color: "#2AABEE",
    fontFamily: "Signika Negative",
    fontWeight: "bold",
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

  input: {
    marginTop: "0.5rem",
    padding: "10px",
    color: "black",
    border: "1px solid #2AABEE",
    borderRadius: "0.5rem",
    width: "100%",
    "&:hover": {
      border: "1px solid #2AABEE",
    },
  },
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
    <div
      style={{
        backgroundColor: "#E7EBF1",
      }}
      className={classes.container}
    >
      <Grid container spacing={2}>
        <Grid item md={2}>
          <SideMenu></SideMenu>
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
              <Box mt={2}>
                <p className={classes.title}>Create Collection</p>
              </Box>
              <Grid container alignItems={"center"}>
                <Grid item xs={12} md={2}>
                  <div>
                    <form className={classes.form}>
                      <label className={classes.label} for="name">
                        Collection name:
                      </label>
                    </form>
                  </div>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div>
                    <form className={classes.form}>
                      <input
                        fullWidth
                        className={classes.input}
                        type="text"
                        id="name"
                        name="collectionName"
                        placeholder="Collection name.."
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionName: event.target.value });
                        }}
                      ></input>
                    </form>
                  </div>
                </Grid>
              </Grid>
              <Grid container alignItems={"center"}>
                <Grid item xs={12} md={2}>
                  <div>
                    <form className={classes.form}>
                      <label className={classes.label} for="name">
                        Description:
                      </label>
                    </form>
                  </div>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div>
                    <form className={classes.form}>
                      <input
                        fullWidth
                        className={classes.input}
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description..."
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionDescription: event.target.value });
                        }}
                      ></input>
                    </form>
                  </div>
                </Grid>
              </Grid>
              <Grid container alignItems={"center"}>
                <Grid item xs={12} md={2}>
                  <div>
                    <form className={classes.form}>
                      <label className={classes.label} for="name">
                        Image:
                      </label>
                    </form>
                  </div>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div>
                    <form className={classes.form}>
                      <input
                        fullWidth
                        className={classes.input}
                        type="text"
                        id="description"
                        name="description"
                        placeholder="URL of 256x256 pixel PNG image of Collection logo."
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionImage: event.target.value });
                        }}
                      ></input>
                    </form>
                  </div>
                </Grid>
              </Grid>
              <BrowserView>
                <Grid container xs={6.8} justifyContent={"flex-end"}>
                  <Grid item>
                    <Button
                      className={classes.button}
                      style={{ backgroundColor: "#2AABEE", width: "20vh", marginTop: "2rem" }}
                      onClick={() => {
                        generateCollection();
                        console.log(collectionData);
                      }}
                    >
                      Generate Collection
                    </Button>
                  </Grid>
                </Grid>
              </BrowserView>
              <MobileView>
                <Grid container>
                  <Button
                    className={classes.button}
                    style={{ backgroundColor: "#2AABEE", width: "100%", marginTop: "2rem" }}
                    onClick={() => {
                      generateCollection();
                      console.log(collectionData);
                    }}
                  >
                    Generate Collection
                  </Button>
                </Grid>
              </MobileView>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

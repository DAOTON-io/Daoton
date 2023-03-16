import React, { useState } from "react";
import { Divider, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Card } from "reactstrap";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import NftMinter from "../lib/nft-minter";
import { create } from "ipfs";
import { Box } from "@mui/system";

export default function GenerateNft() {
  const classes = useStyles();

  let address = useTonAddress(true);
  const [tonConnectUi] = useTonConnectUI();
  const [collectionData, setCollectionData] = useState({ collectionName: '', collectionDescription: '', collectionImage: '' });
  const [nftData, setNftData] = useState({ nftName: '', nftDescription: '', nftImage: '', value: '', });

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
      await minter.deployNftCollection();
    }
  };

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

      const nftCollectionUri = await node.add(
        JSON.stringify({
          name: collectionData.name,
          description: collectionData.description,
          image: collectionData.image,
          external_link: "example.com",
          seller_fee_basis_points: 100,
          fee_recipient: "0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721",
        })
      );

      const minter = new NftMinter(address, tonConnectUi, "https://ipfs.io/ipfs/" + nftCollectionUri);
      await minter.deployNftItem(itemContent.path);


    }
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
            <ResponsiveAppBar />{" "}
            <div style={{ marginTop: "1rem" }}>
              <Card className={classes.card}>
                <Grid container>
                  <Grid item md={12}>
                    <div
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <Grid container display={"flex"} alignItems={"center"}>
                        <p className={classes.title}>Generate Collection</p>
                      </Grid>
                      <Grid container>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"} spacing={2}>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <label className={classes.label} for="name">
                                  Collection Name:
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={6}>
                              <form className={classes.form}>
                                <input
                                  fullWidth
                                  className={classes.input}
                                  type="text"
                                  id="name"
                                  name="name"
                                  placeholder="Collection name.."
                                  onChange={(event) => {
                                    setCollectionData({ ...collectionData, collectionName: event.target.value });
                                  }}
                                ></input>
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6}>
                          <Grid container alignItems={"center"} spacing={2}>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <label className={classes.label} for="description">
                                  Collection Description:
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={6}>
                              <form className={classes.form}>
                                <input
                                  fullWidth
                                  className={classes.input}
                                  type="text"
                                  id="description"
                                  name="description"
                                  placeholder="Collection description.."
                                  onChange={(event) => {
                                    setCollectionData({ ...collectionData, collectionDescription: event.target.value });
                                  }}
                                ></input>
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container>


                        <Grid item md={6}>
                          <Grid container alignItems={"center"} spacing={2}>
                            <Grid item md={3}>
                              <form className={classes.form}>
                                <label className={classes.label} for="decimal">
                                  Image
                                </label>
                              </form>
                            </Grid>
                            <Grid item md={6}>
                              <form className={classes.form}>
                                <input
                                  fullWidth
                                  className={classes.input}
                                  type="text"
                                  id="decimal"
                                  name="decimal"
                                  placeholder="URL of 256x256 pixel PNG image of nft logo..."
                                  onChange={(event) => {
                                    setCollectionData({ ...collectionData, collectionImage: event.target.value });
                                  }}
                                ></input>
                              </form>
                            </Grid>
                          </Grid>
                        </Grid>

                      </Grid>
                    </div>
                  </Grid>
                </Grid>
                <div>


                  <Box>
                    <Button
                      className={classes.button}
                      style={{ backgroundColor: "#2AABEE", width: "35vh", marginTop: "2rem" }}
                      onClick={() => {
                        generateCollection();
                        console.log(collectionData)

                      }}
                    >
                      Generate Collection
                    </Button>



                    <Divider sx={{ marginY: '20px' }} variant="fullWidth"></Divider>



                    <Grid container>
                      <Grid item md={12}>
                        <div
                          style={{
                            marginTop: "1rem",
                          }}
                        >
                          <Grid container display={"flex"} alignItems={"center"}>
                            <p className={classes.title}>Generate NFT</p>
                          </Grid>
                          <Grid container>
                            <Grid item md={6}>
                              <Grid container alignItems={"center"} spacing={2}>
                                <Grid item md={3}>
                                  <form className={classes.form}>
                                    <label className={classes.label} for="name">
                                      NFT Name:
                                    </label>
                                  </form>
                                </Grid>
                                <Grid item md={6}>
                                  <form className={classes.form}>
                                    <input
                                      fullWidth
                                      className={classes.input}
                                      type="text"
                                      id="name"
                                      name="name"
                                      placeholder="NFT name.."
                                      onChange={(event) => {
                                        setNftData({ ...nftData, nftName: event.target.value });
                                      }}
                                    ></input>
                                  </form>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={6}>
                              <Grid container alignItems={"center"} spacing={2}>
                                <Grid item md={3}>
                                  <form className={classes.form}>
                                    <label className={classes.label} for="description">
                                      NFT Description:
                                    </label>
                                  </form>
                                </Grid>
                                <Grid item md={6}>
                                  <form className={classes.form}>
                                    <input
                                      fullWidth
                                      className={classes.input}
                                      type="text"
                                      id="description"
                                      name="description"
                                      placeholder="NFT description.."
                                      onChange={(event) => {
                                        setNftData({ ...nftData, nftDescription: event.target.value });
                                      }}
                                    ></input>
                                  </form>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item md={6}>
                              <Grid container alignItems={"center"} spacing={2}>
                                <Grid item md={3}>
                                  <form className={classes.form}>
                                    <label className={classes.label} for="decimal">
                                      NFT Image
                                    </label>
                                  </form>
                                </Grid>
                                <Grid item md={6}>
                                  <form className={classes.form}>
                                    <input
                                      fullWidth
                                      className={classes.input}
                                      type="text"
                                      id="decimal"
                                      name="decimal"
                                      placeholder="URL of 256x256 pixel PNG image of NFT logo..."
                                      onChange={(event) => {
                                        setNftData({ ...nftData, nftImage: event.target.value });
                                      }}
                                    ></input>
                                  </form>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item md={6}>
                              <Grid container alignItems={"center"} spacing={2}>
                                <Grid item md={3}>
                                  <form className={classes.form}>
                                    <label className={classes.label} for="name">
                                      NFT value:
                                    </label>
                                  </form>
                                </Grid>
                                <Grid item md={6}>
                                  <form className={classes.form}>
                                    <input
                                      fullWidth
                                      className={classes.input}
                                      type="text"
                                      id="value"
                                      name="value"
                                      placeholder="NFT value.."
                                      onChange={(event) => {
                                        setNftData({ ...nftData, value: event.target.value });
                                      }}
                                    ></input>
                                  </form>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>


                    <Button
                      className={classes.button}
                      style={{ backgroundColor: "#2AABEE", width: "35vh", marginTop: "2rem" }}
                      onClick={() => {
                        generateNFT();
                        console.log(nftData)
                      }}
                    >
                      Mint NFT
                    </Button>{" "}
                  </Box>
                </div>



              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}



const useStyles = makeStyles({
  container: {
    padding: "1rem",
  },
  card: {
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    color: "white",
    padding: "20px",
    borderRadius: "0.5rem",
    height: "78vh",
  },

  title: {
    marginBottom: "0.5rem",
    fontSize: "30px",
    color: "black",
    fontWeight: "bold",
  },
  form: {
    marginTop: "1rem",
  },
  label: {
    color: "#2AABEE",
    fontSize: "14px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2AABEE",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    marginTop: "1rem",

    marginBottom: "1rem",
  },

  input: {
    marginTop: "0.5rem",
    padding: "10px",
    color: "black",
    border: "1px solid #2AABEE",
    borderRadius: "0.5rem",
    width: "120%",
    "&:hover": {
      border: "1px solid #2AABEE",
    },
  },
});

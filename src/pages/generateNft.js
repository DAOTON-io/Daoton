import React from "react";
import { Grid, Switch } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Card } from "reactstrap";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import NftMinter from "../lib/nft-minter";
import { create } from "ipfs";

export default function GenerateNft() {
  const classes = useStyles();

  let address = useTonAddress(true);
  const [tonConnectUi] = useTonConnectUI();

  const generateCollection = async () => {
    if (address) {
      const node = await create();
      const nftCollectionUri = await node.add(
        JSON.stringify({
          name: "Daoton NFT Collection new version",
          description: "Daoton nft collection",
          image: "example.svg",
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
              value: 1,
            },
          ],
          description: "Afc was deployed.",
          external_url: "TEST33334343",
          image: "image.svg",
          name: "TEST333232213",
        })
      );

      const minter = new NftMinter(address, tonConnectUi, "https://ipfs.io/ipfs/QmNnWQ81mZYrEggPeEbceWqJcokR5hEy9d4XqVKPXRyEQt");
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
                <Button
                  className={classes.button}
                  style={{ backgroundColor: "#2AABEE", width: "35vh", marginTop: "2rem" }}
                  onClick={() => {
                    generateCollection();
                  }}
                >
                  Generate Collection
                </Button>{" "}
                <Button
                  className={classes.button}
                  style={{ backgroundColor: "#2AABEE", width: "35vh", marginTop: "2rem" }}
                  onClick={() => {
                    generateNFT();
                  }}
                >
                  Mint NFT
                </Button>{" "}
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

import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Box, CircularProgress, Theme, CardMedia, CardContent } from "@mui/material";
import { fetchNfts } from "../lib/api";
import { NftCard } from "../components/NftItem";
import { useTonAddress } from "@tonconnect/ui-react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "80vh",
    widht: "100%",
    overflow: "auto",
    padding: "1rem"
  },
  card: {
    margin: "1rem",
  },
}))

interface Collection {
  collectionName: string,
  collectionAddress: string
}

const ViewNft = () => {
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState<Collection[]>([])
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const navigate = useNavigate();

  const address = 'EQDyNhhx8N1Uy_jF4b1cT_CUFLsHKP6IwP6CwpsqBSM1tfn_'

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const nftResponse = await fetchNfts(address);
        const nftData = nftResponse.nftItems;

        setNfts(nftData);

        let newGame: Collection[] = []
        nftData.forEach((element: any) => {
          let yeniOyun: Collection = {
            collectionName: element.collection.name,
            collectionAddress: element.collection_address,
          }
          newGame = [...newGame, yeniOyun]
        });

        const unique = newGame.filter((element: any) => {
          const isDuplicate = newGame.includes(element.collectionAddress);
          if (!isDuplicate) {
            newGame.push(element.collectionAddress);
            return true;
          }
          return false;
        });
        setCollections(unique)
      }
      setLoading(false);
    };
    fetchData();
  }, [address]);

  return (
    <Grid container className={classes.container}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            width: "80vw",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {nfts.length === 0 && (
            <Grid
              item
              md={12}
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Card
                style={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  padding: "5rem 2.5rem",
                  marginTop: "2rem",
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Typography
                  style={{
                    color: "#1689c5",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  There are no Nft's
                </Typography>
              </Card>
            </Grid>
          )}
          {
            collections.map((item: any) => (
              <Card className={classes.card} sx={{ width: 280, height: 280, }} onClick={() => {
                console.log(item.collectionAddress);
                navigate("/view-nfts/" + item.collectionAddress);
              }}>
                <CardMedia image="https://www.webtekno.com/images/editor/default/0003/96/db58cdce487ce8c8c8d890916ef7cd5f6853c272.jpeg" sx={{ height: 120,}}></CardMedia>
                <CardContent>
                  <Typography variant="h6" gutterBottom component="div">
                    {item.collectionName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Collection address: {item.collectionAddress.slice(0, 5) + '...' + item.collectionAddress.slice(-5)}
                  </Typography>
                </CardContent>
              </Card>
            ))
          }
          {/* {nfts.map((item: any) => (
              <Grid item margin={1} md={3.75} justifyContent={"space-around"}>
                <a style={{ textDecoration: "none" }} onClick={()=>console.log(item)}>
                  <NftCard
                    name={item.metadata.name}
                    address={item.address.slice(0, 4) + "..." + item.address.slice(-4)}
                    collectionAddress={item.collection_address.slice(0, 4) + "..." + item.collection_address.slice(-4)}
                    description={item.metadata.description}
                    image={item.metadata.image}
                  ></NftCard>
                </a>
              </Grid>
            ))} */}
        </>
      )}
    </Grid>
  );
};

export default ViewNft;

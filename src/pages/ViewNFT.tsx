import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Box, CircularProgress, Theme, CardMedia, CardContent } from "@mui/material";
import { fetchNfts } from "../lib/api";
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
  const [collections, setCollections] = useState<Collection[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const navigate = useNavigate();

  const address = useTonAddress();
  // const address = 'EQDyNhhx8N1Uy_jF4b1cT_CUFLsHKP6IwP6CwpsqBSM1tfn_'


  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const nftResponse = await fetchNfts(address);
        const nftData = nftResponse.nftItems;

        setNfts(nftData);

        let collectionArray: Collection[] = [];
        nftData.forEach((element: any) => {
          let newCollection: Collection = {
            collectionName: element.collection?.name,
            collectionAddress: element?.collection_address,
          }
          collectionArray = [...collectionArray, newCollection];
        });

        const unique = collectionArray.filter((element: any) => {
          const isDuplicate = collectionArray.includes(element.collectionAddress);
          if (!isDuplicate) {
            collectionArray.push(element.collectionAddress);
            return true;
          }
          return false;
        });
        setCollections(unique);
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
          {collections.length === 0 && (
            <Grid
              item
              md={12}
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Typography style={{
                color: "#1689c5",
                fontSize: "30px",
                fontWeight: "bold",
              }}
              >
                There are no Collection's
              </Typography>
            </Grid>
          )}
          {
            collections.map((item: any) => (
              <Card className={classes.card} sx={{ width: 280, height: 280, }} onClick={() => {
                navigate("/view-nfts/" + item.collectionAddress);
              }}>
                <CardMedia image="https://www.webtekno.com/images/editor/default/0003/96/db58cdce487ce8c8c8d890916ef7cd5f6853c272.jpeg" sx={{ height: 120, }}></CardMedia>
                <CardContent>
                  <Typography variant="h6" gutterBottom component="div">
                    {item.collectionName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Collection address: {item?.collectionAddress}
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

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Box, CircularProgress, Theme, CardMedia, CardContent, Button, Stack, Container, Divider } from "@mui/material";
import { fetchNfts } from "../lib/api";
import { useTonAddress } from "@tonconnect/ui-react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "80vh",
    widht: "100%",
    overflow: "auto",
    padding: "1rem",
    alignContent: "start",
  },
  card: {
    margin: "1rem",
  },
  title: {
    color: "#1689c5",
    fontWeight: "bold",
  },
  divider:{
    "&.MuiDivider-root": {
      "&::before": {
        borderTop: "thin solid #1689c5"
      },
      "&::after": {
        borderTop: "thin solid #1689c5"
      }
    },
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

  // const address = useTonAddress();
  const address = 'EQDyNhhx8N1Uy_jF4b1cT_CUFLsHKP6IwP6CwpsqBSM1tfn_'


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
      <Grid container direction={"column"}>
        <Grid item textAlign={"center"} margin={2}>
          <Divider className={classes.divider}>
            <Typography className={classes.title} variant="h5">Collections</Typography>
          </Divider>
        </Grid>
        <Grid container direction={"row"}>
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
                  <Card className={classes.card} sx={{ width: 280, minHeight: 280, maxHeight: 300, }}
                    onClick={() => {
                      navigate("/view-nfts/" + item.collectionAddress);
                    }}>
                    <CardMedia image="https://www.webtekno.com/images/editor/default/0003/96/db58cdce487ce8c8c8d890916ef7cd5f6853c272.jpeg" sx={{ height: 120, }}></CardMedia>
                    <CardContent>
                      <Grid marginBottom={2} item minHeight={"64px"}>
                        <Typography variant="h6" gutterBottom component="div">
                          {item.collectionName}
                        </Typography>
                      </Grid>
                      <Grid container direction={"column"}>
                        <Typography variant="body2" color="text.secondary">
                          Collection address:
                        </Typography>
                        <Grid container direction={"row"} marginTop={1} justifyContent={"space-between"}>
                          <Typography variant="body2" color="text.secondary">
                            {item?.collectionAddress?.slice(0, 10) + "..." + item?.collectionAddress?.slice(-5)}
                          </Typography>
                          <Button startIcon={<ContentCopyIcon></ContentCopyIcon>} size="small" onClick={() => { navigator.clipboard.writeText(item?.collectionAddress); }}></Button>
                        </Grid>
                      </Grid>
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
      </Grid>
    </Grid>
  );
};

export default ViewNft;

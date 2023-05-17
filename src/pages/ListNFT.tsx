import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { fetchNfts } from "../lib/api";
import { useParams } from "react-router-dom";


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

const ListNFT = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);

    const classes = useStyles();
    const pageId = useParams();
    const id = pageId.collectionAddress;
    // const collectionAddress = pageId.collectionAddress;


    const address = 'EQDyNhhx8N1Uy_jF4b1cT_CUFLsHKP6IwP6CwpsqBSM1tfn_'



    useEffect(() => {
        const fetchData = async () => {
            if (address) {
                const nftResponse = await fetchNfts(address);
                const nftdata = nftResponse.nftItems;
                setNfts(nftdata)
            }
            setLoading(false);
        }
        fetchData()
    }, [address])

    return (
        <Grid container className={classes.container}>
            {
                loading ? (
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
                            nfts.map((item: any) => (
                                id == item.collection_address &&
                                (
                                    <Card className={classes.card} sx={{ width: 280, height: 280, }}>
                                        <CardMedia image={'https://www.webtekno.com/images/editor/default/0003/96/db58cdce487ce8c8c8d890916ef7cd5f6853c272.jpeg'} sx={{ height: 120, }}></CardMedia>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom component="div">
                                                {item.metadata.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.metadata.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Level:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                NFT address: {item.address.slice(0, 5) + '...' + item.address.slice(-5)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )))
                        }



                    </>
                )
            }
        </Grid>
    )
}

export default ListNFT
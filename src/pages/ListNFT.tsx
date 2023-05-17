import { Card, CardContent, CardMedia, Grid, Theme, Typography } from "@mui/material";
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
                // console.log(nftdata);
                setNfts(nftdata)
                // console.log(nfts[0].metadata.attributes[0].value);
                console.log(nfts);
            }
        }
        fetchData()
    }, [address])

    return (
        <Grid container className={classes.container}>
            {/* <h4>path id = {id}</h4> */}
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
        </Grid>
    )
}

export default ListNFT
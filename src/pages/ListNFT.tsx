import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Divider, Grid, Theme, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { fetchNfts } from "../lib/api";
import { useParams } from "react-router-dom";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Zoom from '@mui/material/Zoom';


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        height: 'calc(100vh - 10rem)',
        widht: "100%",
        overflow: "auto",
        padding: "1rem"
    },
    card: {
        margin: "1rem",
        alignContent: "space-around",
    },
    title: {
        color: "#1689c5",
        fontWeight: "bold",
    },
    divider: {
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

const ListNFT = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState<string>();
    const classes = useStyles();
    const pageId = useParams();
    const id = pageId.collectionAddress;
    // const collectionAddress = pageId.collectionAddress;


    const address = 'EQDyNhhx8N1Uy_jF4b1cT_CUFLsHKP6IwP6CwpsqBSM1tfn_'

    function findCollectionAddressIndex(element: any) {
        return element.collection.address === id;
    }

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

    useEffect(() => {
        let index = nfts.findIndex(findCollectionAddressIndex);
        if (index !== -1 && 'collection' in nfts[index]) {
            let currentTitle = nfts[index]['collection']['name'];
            setTitle(currentTitle);
        }
    }, [nfts])

    return (
        <Grid container className={classes.container}>
            <Grid container direction={"column"}>
                <Grid item textAlign={"center"} margin={2}>
                    <Divider className={classes.divider}>
                        <Typography className={classes.title} variant="h5">{title}</Typography>
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
                                    id === item.collection_address &&
                                    (
                                        <Card className={classes.card} sx={{ width: 280, minHeight: 280, maxHeight: 300, }}>
                                            <CardMedia image={'https://www.webtekno.com/images/editor/default/0003/96/db58cdce487ce8c8c8d890916ef7cd5f6853c272.jpeg'} sx={{ height: 120, }}></CardMedia>

                                            <CardContent>
                                                <Grid item minWidth={"32px"}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        {item.metadata.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid container direction={"column"}>
                                                    <Tooltip title={item?.metadata?.description} placement="top" TransitionComponent={Zoom} arrow sx={{background:"white !important", color:"black",borderColor:"black"}}>

                                                        <Typography variant="body2" color="text.secondary" marginBottom={2}>
                                                            {
                                                                (item?.metadata?.description?.length) < 30
                                                                    ? item?.metadata?.description
                                                                    : item?.metadata?.description?.slice(0, 30) + ' ...'
                                                            }
                                                        </Typography>
                                                    </Tooltip>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Level:
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        NFT address:
                                                    </Typography>
                                                    <Grid container direction={"row"} justifyContent={"space-between"}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item?.address?.slice(0, 10) + '...' + item?.address?.slice(-5)}
                                                        </Typography>
                                                        <Button startIcon={<ContentCopyIcon></ContentCopyIcon>} size="small" onClick={() => { navigator.clipboard.writeText(item?.collectionAddress); }}></Button>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    )))
                            }
                        </>
                    )}
                </Grid>
            </Grid>
        </Grid >
    )
}

export default ListNFT
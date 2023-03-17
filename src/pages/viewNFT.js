
import { Grid, Card, Box, Typography } from "@mui/material";
import Collection from "../components/collections";
import SideMenu from "../components/sideMenu";
import { makeStyles } from "@mui/styles";
import ResponsiveAppBar from "../components/header";
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { fetchNfts } from "../lib/api";
import NftCard from "../components/nft-item";

export default function ViewNft() {
    const { collectionId } = useParams();
    const classes = useStyles();

    const [nft, setNft] = useState([]);
    const [loading, setLoading] = useState(true);


    const nftItem = []
    // const [list, setList] = useState();

    // const address = useTonAddress();
    const address = 'EQDyNhhx8N1Uy_jF4b1cT_CUFLsHKP6IwP6CwpsqBSM1tfn_'


    useEffect(() => {
        const fetchData = async () => {
            if (address) {
                const nftResponse = await fetchNfts(address)
                const nftData = nftResponse.nftItems

                console.log(nftData[0].collection_address)


                for (let index = 0; index < nftData.length; index++) {
                    // console.log(nftData[index].collection_address)
                    if (collectionId === nftData[index].collection_address) {
                        nftItem.push(nftData[index])
                        console.log(nftItem)
                    }
                }


                setNft(nftItem)
            }
            setLoading(false);

        };
        fetchData();
    }, [address])


    // console.log(collectionId)

    return (
        <div>
            <div
                style={{
                    backgroundColor: "#E7EBF1",
                }}
                className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item md={2}>
                        <SideMenu />
                    </Grid>
                    <Grid item md={10} xs={12}>
                        <ResponsiveAppBar />
                        <div
                            style={{
                                height: "100vh",
                                width: "100%",
                                overflow: "auto", // Kaydırma çubuğu eklemek için
                                marginTop: "0.5em"
                            }}
                            marginTop={2}>
                            {/* //TODO cozemedigim bir hata */}
                            {/* {loading && (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", width: "80vw" }}>
                                    <CircularProgress />
                                </Box>
                            )} */}
                            <Grid
                                container
                                style={{
                                    position: "-webkit-sticky",
                                    position: "sticky",
                                    top: "0",
                                }}
                            >
                                {nft.length === 0 && (
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
                                                padding: "5rem",
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
                                                There are no Token's
                                            </Typography>
                                        </Card>
                                    </Grid>
                                )}

                                <Grid md={20} margin={2}>
                                    <Collection
                                        name={'your collection'}
                                        address={collectionId}
                                    ></Collection>
                                </Grid>


                                {nft.map((item) => (
                                    <Grid item margin={1} md={3.75} justifyContent={'space-around'}>
                                        <a style={{ textDecoration: 'none' }}>
                                            <NftCard
                                                name={item.collection.name}
                                                address={item.address.slice(0, 4) + '...' + item.address.slice(-4)}
                                                description={item.metadata.description}
                                            ></NftCard>
                                        </a>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem",
        [theme.breakpoints.down("md")]: {
            padding: "1rem",
        },
    },
    card: {
        backgroundColor: "#2AABEE",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        height: "90vh",
        color: "white",
        padding: "10px",
        borderRadius: "1rem",
    },
    listItem: {
        padding: "10px",
        color: "white",
    },
    listItemSmall: {
        marginBottom: "1rem",
        "&:hover": {
            borderRadius: 4,
            backgroundColor: "#1689c5",
        },
    },

    divider: {
        backgroundColor: "white",
        color: "white",
    },
    title: {
        color: "white",
        marginBottom: "0.5rem",
        fontSize: "14px",
    },
    item: {
        color: "white",
    },
}));
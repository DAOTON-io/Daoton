import React, { useEffect, useState, CircularProgress } from "react";
import { Grid, Box, Card, Typography } from "@mui/material";
import SideMenu from "../components/sideMenu";
import ResponsiveAppBar from "../components/header";
import { makeStyles } from "@mui/styles";
import { useTonAddress } from "@tonconnect/ui-react";
import { fetchNfts } from "../lib/api";
import Collection from "../components/collections";

export default function ViewCollections() {
    const classes = useStyles();

    const [collection, setCollection] = useState([]);
    const [items, setItems] = useState();
    const [link, setLink] = useState();

    const [loading, setLoading] = useState(true);

    const [timer, setTimer] = useState(Date.now());



    // useEffect(() => {
    //     const interval = setInterval(() => setTimer(Date.now()), 6000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    // const address = useTonAddress();
    const address = 'EQDyNhhx8N1Uy_jF4b1cT_CUFLsHKP6IwP6CwpsqBSM1tfn_'

    useEffect(() => {
        const fetchData = async () => {
            if (address) {
                const collectionResponse = await fetchNfts(address)
                const collectionData = collectionResponse.collections
                setCollection(collectionData)
            }
            setLoading(false);

        };
        fetchData();
    }, [address])



    return (
        <div marginTop={2}>
            <div
                style={{
                    backgroundColor: "#E7EBF1",
                    height: "100vh",
                    width: "100%",
                    overflow: "auto",
                }}
                className={classes.container}
            >
                <Grid container spacing={2}>
                    <Grid item md={2}>
                        <SideMenu></SideMenu>
                    </Grid>
                    <Grid item md={10}>
                        <ResponsiveAppBar></ResponsiveAppBar>

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
                                {collection.length === 0 && (
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
                                {collection.map((item) => (

                                    <Grid item my={1} md={20}>
                                        <a href={"/view-collections/"+item.address} onClick={()=>{setLink(item.address)
                                        console.log(item.address)}} style={{ textDecoration: 'none' }}>
                                            <Collection
                                                name={item.name}
                                                address={item.address}
                                            ></Collection>
                                        </a>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>

                    </Grid>
                </Grid>
            </div>
        </div >
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
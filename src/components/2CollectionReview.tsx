import React, { useEffect } from "react";
import { CollectionDataType } from "../utils/types";
import { CustomButton } from "./CustomButton";
import { Card, CardContent, CardMedia, Grid, Stack, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { base64ToImage } from "../utils/utils";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import { create } from 'ipfs';
import NftMinter from '../lib/nft-minter';


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100% !important",
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        overflow: "auto",
        margin: "0 !important",
        [theme.breakpoints.down("sm")]: {
            marginBottom: 2,
            marginTop: 2,
            padding: "24px",
        },
    },
    buttonContainer: {
        paddingRight: "2rem",
        paddingLeft: "2rem",
        textAlign: "start",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "0.5rem",
        [theme.breakpoints.down("sm")]: {
            paddingRight: "1rem",
            paddingLeft: "1rem",
        },
    },
    card: {
        minWidth: 400,
        maxWidth: 400,
        marginBottom: "0.8rem",
    },
    item: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 !important",
        margin: "0",
    },
}));


type Props = {
    collectionInfo: CollectionDataType;
    collectionInfoOnChange: (collectionInfo: CollectionDataType) => void;
}

export const CollectionReview: React.FC<Props> = ({ collectionInfoOnChange, collectionInfo }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    let address = useTonAddress(true);
    const [tonConnectUi] = useTonConnectUI();

    useEffect(() => {
        // base64ToImage(collectionInfo.collectionImage, img => {

        //     document.getElementById('col-image')!.style.width = '200px';
        //     document.getElementById('col-image')!.style.height = '200px';
        //     (document.getElementById('col-image') as HTMLInputElement)!.src = collectionInfo.collectionImage;
        // })
    }, [collectionInfo.collectionImage])


    return (
        <Grid container className={classes.container} spacing={2}>
            <Grid item justifyContent={"center"} className={classes.item} sx={{ flexDirection: "column !important" }}>
                <Card className={classes.card}>
                    <CardMedia sx={{ height: 180 }} image={collectionInfo.collectionImage} title={collectionInfo.collectionName}></CardMedia>
                    <CardContent>
                        <Typography variant="h5" gutterBottom component="div">
                            Name: {collectionInfo.collectionName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Description: {collectionInfo.collectionDescription}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
import React, { useEffect } from "react";
import { CollectionDataType } from "../utils/types";
import { CustomButton } from "./CustomButton";
import { Card, CardContent, Grid, Stack, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { base64ToImage } from "../utils/utils";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import { create } from 'ipfs';
import NftMinter from '../lib/nft-minter';


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        marginBottom: 6,
        marginTop: 6,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 2,
            marginTop: 2,
            padding: '24px',
        },
        display: 'flex',
        justifyContent: 'center',
        width: '100% !important',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        overflow: 'auto',
    },
    buttonContainer: {
        paddingRight: '2rem',
        paddingLeft: '2rem',
        textAlign: 'start',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '0.5rem',
        [theme.breakpoints.down('sm')]: {
            paddingRight: '1rem',
            paddingLeft: '1rem',
        },
    },
}));


type Props = {
    collectionInfoOnChange: (collectionInfo: CollectionDataType) => void;
    activeStepOnChange: (activeStep: number) => void;
    collectionDetail: CollectionDataType;
}

export const CollectionReview: React.FC<Props> = ({ collectionInfoOnChange, activeStepOnChange, collectionDetail }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    let address = useTonAddress(true);
    const [tonConnectUi] = useTonConnectUI();

    const generateCollection = async () => {
        if (address) {
            const node = await create();
            const nftCollectionUri = await node.add(
                JSON.stringify({
                    name: collectionDetail.collectionName,
                    description: collectionDetail.collectionDescription,
                    image: collectionDetail.collectionImage,
                    external_link: 'example.com',
                    seller_fee_basis_points: 100,
                    fee_recipient: '0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721',
                }),
            );

            const minter = new NftMinter(
                address,
                tonConnectUi,
                'https://ipfs.io/ipfs/' + nftCollectionUri.path,
            );
            minter.deployNftCollection().then(() => {
                navigate('/generate-nft');
            });
        }
    };




    useEffect(() => {
        console.log(collectionDetail.collectionImage)
        base64ToImage(collectionDetail.collectionImage, img => {

            document.getElementById('col-image')!.style.width = '200px';
            document.getElementById('col-image')!.style.height = '200px';
            (document.getElementById('col-image') as HTMLInputElement)!.src = collectionDetail.collectionImage;
        })
    }, [collectionDetail.collectionImage])


    return (
        <Grid container className={classes.container}>
            <Stack direction="column" spacing={2} margin={4}>
                <Grid item>
                    <Stack direction="column"
                        spacing={2}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <Card sx={{ minWidth: 600 }}>
                            <CardContent>
                                <Typography variant="body1">
                                    <div>
                                        <b>Name: </b>
                                        {collectionDetail.collectionName}
                                    </div>
                                </Typography>
                                <Typography variant="body1">
                                    <div>
                                        <b> Description: </b>
                                        {collectionDetail.collectionDescription}
                                    </div>
                                </Typography>
                                <Typography variant="body1">
                                    <div>
                                        <b>Image: </b>
                                        <img id="col-image" alt="alt" />
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                        <CustomButton onClick={generateCollection} label="GENERATE" ></CustomButton>
                    </Stack>
                </Grid>
            </Stack>
        </Grid>

    )
}
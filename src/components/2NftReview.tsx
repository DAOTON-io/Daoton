import React, { useEffect } from "react";
import { GenerateNftType } from "../utils/types";
import { CustomButton } from "./CustomButton";
import { Card, CardContent, Grid, Stack, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { base64ToImage } from "../utils/utils";
import { Address } from 'ton';
import NftMinter from "../lib/nft-minter";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { collectionPreview } from "../lib/api";
import { create } from 'ipfs';
import { useNavigate } from "react-router-dom";


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
    nftInfoOnChange: (nftInfo: GenerateNftType) => void;
    activeStepOnChange: (activeStep: number) => void;
    nftDetail: GenerateNftType;
}

export const NftReview: React.FC<Props> = ({ activeStepOnChange, nftInfoOnChange, nftDetail }) => {
    
    const classes = useStyles();
    let address = useTonAddress(false);
    const [tonConnectUi] = useTonConnectUI();
    const navigate = useNavigate();


    const generateNFT = async () => {
        console.log('generate', nftDetail);
        if (address) {
            const node = await create();
            const itemContent = await node.add(
                JSON.stringify({
                    attributes: [
                        {
                            trait_type: 'level',
                            value: nftDetail.level,
                        },
                    ],
                    description: nftDetail.nftDescription,
                    external_url: 'example.com',
                    image: nftDetail.nftImage,
                    name: nftDetail.nftName,
                }),
            );

            const content = await collectionPreview(nftDetail.collectionAddress);

            const minter = new NftMinter(
                Address.parse(content.owner_address).toString(),
                tonConnectUi,
                content.collection_content.data,
            );

            minter
                .deployNftItem(itemContent.path, content.next_item_index, address)
                .then(() => {
                    navigate('/view-nfts');
                });
        }
    };

    useEffect(() => {
        base64ToImage(nftDetail.nftImage, img => {
            document.getElementById('nft-image')!.style.width = '200px';
            document.getElementById('nft-image')!.style.height = '200px';
            (document.getElementById('nft-image') as HTMLInputElement)!.src = nftDetail.nftImage;
        })
    }, [nftDetail.nftImage])


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
                                        {nftDetail.nftName}
                                    </div>
                                </Typography>
                                <Typography variant="body1">
                                    <div>
                                        <b> Description: </b>
                                        {nftDetail.nftDescription}
                                    </div>
                                </Typography>
                                <Typography variant="body1">
                                    <div>
                                        <b> Level: </b>
                                        {nftDetail.level}
                                    </div>
                                </Typography>
                                <Typography variant="body1">
                                    <div>
                                        <b> Collection address: </b>
                                        {nftDetail.collectionAddress}
                                    </div>
                                </Typography>
                                <Typography variant="body1">
                                    <div>
                                        <b>Image: </b>
                                        <img id="nft-image" alt="alt" />
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                        <CustomButton onClick={generateNFT} label="GENERATE" ></CustomButton>
                    </Stack>
                </Grid>
            </Stack>
        </Grid>
    )
}
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { GenerateNftType, InfoType, NftDetailType } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from 'ton';
import { create } from 'ipfs';
import NftMinter from '../lib/nft-minter';
import { collectionPreview } from '../lib/api/index';
import { Grid, Stack } from "@mui/material";
import { CustomInput } from "./CustomInput";
import { ImageUpload } from "./ImageUpload";
import { CustomButton } from "./CustomButton";

const useStyles = makeStyles(theme => ({
    title: {
        fontFamily: 'Raleway',
        fontWeight: 700,
        fontSize: '26px',
        color: '#0F2233',
        paddingBottom: '2rem',
        position: 'relative',
        top: '1rem',
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            marginBottom: 2,
            marginTop: 2,
            padding: '24px',
        },
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
    stackContainer: {
        minWidth: '25rem',
        marginTop: '0 !important',
        [theme.breakpoints.down('sm')]: {
            minWidth: '10rem',
        },
    },
    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '65vh',
        overflow: 'auto',
        padding: '1rem',
    },
}));

type Props = {
    activeStepOnChange: (activeStep: number) => void;
    nftInfoOnChange: (nftInfo: GenerateNftType) => void;
    nftInfo: GenerateNftType;
};

const NftForm: React.FC<Props> = ({
    activeStepOnChange,
    nftInfoOnChange,
    nftInfo }) => {
    const [nftData, setNftData] = useState<GenerateNftType>({
        nftName: '',
        nftDescription: '',
        level: '',
        collectionAddress: '',
        nftImage: '',
    });

    const classes = useStyles();
    const navigate = useNavigate();
    let address = useTonAddress(false);
    const [tonConnectUi] = useTonConnectUI();

    useEffect(() => {
        if (nftInfo) setNftData(nftInfo)
    }, [nftInfo])

    const backStep = () => {
        activeStepOnChange(1);
        nftInfoOnChange(nftData)
    };

    const nextStep = () => {
        activeStepOnChange(2);
    }

    const generateNFT = async () => {
        console.log('generate', nftData);
        if (address) {
            const node = await create();
            const itemContent = await node.add(
                JSON.stringify({
                    attributes: [
                        {
                            trait_type: 'level',
                            value: nftData.level,
                        },
                    ],
                    description: nftData.nftDescription,
                    external_url: 'example.com',
                    image: nftData.nftImage,
                    name: nftData.nftName,
                }),
            );

            const content = await collectionPreview(nftData.collectionAddress);

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

    const disable = (): boolean => {
        return !(
            nftData.collectionAddress &&
            nftData.nftName &&
            nftData.nftDescription &&
            nftData.level
        );
    };

    return (
        <Grid container className={classes.container}>
            <Grid item lg={1} md={2} sm={1} xs={0}></Grid>
            <Grid container className={classes.center}>
                <h5 className={classes.title}>Generate NFT</h5>

                <Grid container className={classes.gridContainer}>
                    <Stack
                        spacing={2}
                        marginTop={4}
                        className={classes.stackContainer}
                        direction={'column'}>
                        <CustomInput
                            placeholder="Name"
                            label="Name"
                            id="name"
                            name="name"
                            value={nftData.nftName}
                            onChange={(event: any) => {
                                setNftData({
                                    ...nftData,
                                    nftName: event.target.value,
                                });
                            }}
                        />
                        <CustomInput
                            placeholder="Description"
                            label="Description"
                            id="description"
                            name="description"
                            value={nftData.nftDescription}
                            onChange={(event: any) => {
                                setNftData({
                                    ...nftData,
                                    nftDescription: event.target.value,
                                });
                            }}
                        />
                        <CustomInput
                            placeholder="Level"
                            label="Level"
                            id="level"
                            name="level"
                            value={nftData.level}
                            onChange={(event: any) => {
                                setNftData({
                                    ...nftData,
                                    level: event.target.value,
                                });
                            }}
                        />
                        <CustomInput
                            placeholder="Collection Address"
                            label="Collection Address"
                            id="collectionAddress"
                            name="collectionAddress"
                            value={nftData.collectionAddress}
                            onChange={(event: any) => {
                                setNftData({
                                    ...nftData,
                                    collectionAddress: event.target.value,
                                });
                            }}
                        />

                        {/* <input className={classes.inputImage} placeholder="Image*"
                        onChange={(event) => {
                          setNftData({ ...nftData, nftImage: event.target.value });
                        }}></input> */}

                        <Grid direction={'column'} container justifyContent={'center'}>
                            <Grid container className={classes.buttonContainer}>
                                <Grid item justifyContent={'flex-start'}>
                                    <label>NFT Image : </label>
                                </Grid>
                                <Grid item justifyContent={'flex-start'}>
                                    <ImageUpload
                                        onChange={() => { }}
                                        onClear={() => { }}></ImageUpload>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid paddingTop={2} container justifyContent={'space-between'}>
                            <CustomButton onClick={backStep} disabled={false} label="BACK" />
                            <CustomButton onClick={nextStep} label="NEXT"/>
                            {/* <CustomButton
                                onClick={generateNFT}
                                disabled={disable()}
                                label="Generate"
                            /> */}
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
            <Grid item lg={2} md={2} sm={0} xs={0}></Grid>
        </Grid>
    );
}

export default NftForm
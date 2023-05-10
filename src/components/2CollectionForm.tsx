import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { CollectionDataType } from "../utils/types";
import { Grid, Stack } from '@mui/material';
import { ImageUpload } from "./ImageUpload";
import { CustomButton } from "./CustomButton";
import { CustomInput } from "./CustomInput";


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
    collectionInfoOnChange: (collectionInfo: CollectionDataType) => void;
    collectionInfo: CollectionDataType;
};

const CollectionForm: React.FC<Props> = ({ activeStepOnChange, collectionInfoOnChange, collectionInfo }) => {
    const [collectionData, setCollectionData] = useState<CollectionDataType>({
        collectionName: '',
        collectionDescription: '',
        collectionImage: '',
    });

    const classes = useStyles();

    const backStep = () => {
        activeStepOnChange(1);
        collectionInfoOnChange(collectionData);
    };

    const nextStep = () => {
        activeStepOnChange(3);
        collectionInfoOnChange(collectionData);
    }


    return (
        <Grid container className={classes.container}>
            <Grid container className={classes.center}>
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
                            value={collectionData.collectionName}
                            onChange={(event: any) => {
                                setCollectionData({
                                    ...collectionData,
                                    collectionName: event.target.value,
                                });
                            }}
                        />
                        <CustomInput
                            placeholder="Description"
                            label="Description"
                            id="description"
                            name="description"
                            value={collectionData.collectionDescription}
                            onChange={(event: any) => {
                                setCollectionData({
                                    ...collectionData,
                                    collectionDescription: event.target.value,
                                });
                            }}
                        />
                        {/* <input className={classes.inputImage} placeholder="Image*"
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionImage: event.target.value });
                        }}></input> */}

                        <Grid direction={'column'} container justifyContent={'center'}>
                            <Grid container className={classes.buttonContainer}>
                                <Grid item justifyContent={'flex-start'}>
                                    <label>Collection Image : </label>
                                </Grid>
                                <Grid item justifyContent={'flex-end'}>
                                    <ImageUpload
                                        onChange={(value: any) => {
                                            setCollectionData({
                                                ...collectionData,
                                                collectionImage: value,
                                            })
                                        }}
                                        onClear={() => { }}></ImageUpload>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid paddingTop={2} container justifyContent={'space-between'}>
                            <CustomButton onClick={backStep} label="BACK"></CustomButton>
                            <CustomButton onClick={nextStep} label="NEXT" />
                            {/* <CustomButton
                                onClick={generateCollection}
                                disabled={
                                    !(
                                        collectionData.collectionName &&
                                        collectionData.collectionDescription
                                    )
                                }
                                label="Generate"
                            /> */}
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CollectionForm
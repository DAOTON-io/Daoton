import React, { useEffect, useState } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CategoryType, CollectionDataType, GenerateNftType } from '../utils/types';
import { NFTCategories } from '../components/2NftCategories';
import NftForm from '../components/2NftForm';
import CollectionForm from '../components/2CollectionForm';
import { NewSteps } from '../components/2Steps';
import { NftReview } from '../components/2NftReview';
import { CollectionReview } from '../components/2CollectionReview';

const useStyles = makeStyles((theme: Theme) => ({
    cardDiv: {
        marginTop: '8rem',
        display: 'flex',
        alignItem: 'center',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            marginBottom: 2,
            marginTop: '9rem',
            overflow: 'auto',
        },
    },
}));

export const MainNFT: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(1);
    const [choice, setChoice] = useState('Your choice')
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>({
        id: 0,
        label: '',
        icon: undefined,
    });
    const [nftInfo, setNftInfo] = useState<GenerateNftType>({
        nftName: '',
        nftDescription: '',
        level: '',
        collectionAddress: '',
        nftImage: '',
    })

    const [collectionInfo, setCollectionInfo] = useState<CollectionDataType>({
        collectionName: '',
        collectionDescription: '',
        collectionImage: '',
    })
    const classes = useStyles();

    useEffect(() => {
        if (activeStep === 1) {
            setChoice('Your choice')
        }
        else if (selectedCategory.id == 1) {
            setChoice("Generate NFT")
        }
        else if (selectedCategory.id == 2) {
            setChoice("Generate Collection")
        }
    }, [activeStep])


    return (
        <div
            style={{
                justifyContent: 'center',
                display: 'flex',
                height: '80vh',
                marginBottom: '1rem',
                minWidth: '21rem',
                padding: '1rem',
            }}>
            <NewSteps allSteps={[
                'Choose Type',
                choice,
                'Review',
            ]} activeStep={activeStep} />
            <div className={classes.cardDiv}>
                {activeStep === 1 && (
                    <>
                        {' '}
                        <NFTCategories
                            activeStepOnChange={setActiveStep}
                            selectedCategoryOnChange={setSelectedCategory}
                            selectedCategory={selectedCategory}
                        />
                    </>
                )}
                {selectedCategory.id === 1 && activeStep === 2 && (
                    <>
                        {' '}

                        <NftForm
                            activeStepOnChange={setActiveStep}
                            nftInfoOnChange={setNftInfo}
                            nftInfo={nftInfo}
                        ></NftForm>
                    </>
                )}
                {selectedCategory.id === 1 && activeStep === 3 && (
                    <>
                        {' '}

                        <NftReview
                            activeStepOnChange={setActiveStep}
                            nftInfoOnChange={setNftInfo}
                            nftDetail={nftInfo}
                        ></NftReview>
                    </>
                )}
                {selectedCategory.id === 2 && activeStep === 2 && (
                    <>
                        {' '}
                        <CollectionForm
                            activeStepOnChange={setActiveStep}
                            collectionInfoOnChange={setCollectionInfo}
                            collectionInfo={collectionInfo}
                        ></CollectionForm>
                    </>
                )}
                {selectedCategory.id === 2 && activeStep === 3 && (
                    <>
                        {' '}
                        <CollectionReview
                            activeStepOnChange={setActiveStep}
                            collectionInfoOnChange={setCollectionInfo}
                            collectionDetail={collectionInfo}
                        ></CollectionReview>
                    </>
                )}
            </div>
        </div>

    );
};

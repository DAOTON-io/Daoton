import React, { useEffect, useState } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DaoCategories } from '../components/DaoCategories';
import {
    CategoryType,
    InfoType,
    NftDetailType,
    TokenDetailType,
} from '../utils/types';
import { TOKEN_TYPES } from '../utils/enums';
import { TokenDetail } from '../components/TokenDetail';
import { DaoInfo } from '../components/DaoInfo';
import { Steps } from '../components/Steps';
import { Review } from '../components/Review';
import { NFTCategories } from '../components/2NftCategories';
import { CustomInput } from '../components/CustomInput';
import NftForm from '../components/2NftForm';
import CollectionForm from '../components/2CollectionCategories';
import { NewSteps } from '../components/2Steps';

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
    const [choice, setChoice] = useState('your choise')
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>({
        id: 0,
        label: '',
        icon: undefined,
    });
    const classes = useStyles();

    useEffect(() => {
        if (selectedCategory.id == 1) {
            setChoice("nft")
        }
        else if (selectedCategory.id == 2) {
            setChoice("collection")
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
                'Token Detail',
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
                {selectedCategory.id === 1 && (
                    <>
                        {' '}

                        <NftForm></NftForm>
                    </>
                )}
                {selectedCategory.id === 2 && (
                    <>
                        {' '}
                        <CollectionForm></CollectionForm>
                    </>
                )}
            </div>
        </div>

    );
};

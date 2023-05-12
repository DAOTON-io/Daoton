import React, { useEffect, useState } from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CategoryType, CollectionDataType, GenerateNftType } from "../utils/types";
import { NFTCategories } from "../components/2NftCategories";
import NftForm from "../components/2NftForm";
import CollectionForm from "../components/2CollectionForm";
import { NftReview } from "../components/2NftReview";
import { CollectionReview } from "../components/2CollectionReview";
import { COLLECTION_STEPS, MAIN_STEPS, NFT_STEPS } from "../utils/enums";
import { Steps } from "../components/Steps";

const useStyles = makeStyles((theme: Theme) => ({
  cardDiv: {
    marginTop: "8rem",
    display: "flex",
    alignItem: "center",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: "9rem",
      overflow: "auto",
    },
  },
}));

export const MainNFT: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [step, setStep] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({
    id: 0,
    label: "",
    icon: undefined,
  });

  const [nftInfo, setNftInfo] = useState<GenerateNftType>({
    nftName: "",
    nftDescription: "",
    level: "",
    collectionAddress: "",
    nftImage: "",
  });

  const [collectionInfo, setCollectionInfo] = useState<CollectionDataType>({
    collectionName: "",
    collectionDescription: "",
    collectionImage: "",
  });

  const classes = useStyles();

  useEffect(() => {
    if (activeStep === 1) {
      setStep(Object.values(MAIN_STEPS));
    } else if (selectedCategory.id === 1) {
      setStep(Object.values(NFT_STEPS));
    } else if (selectedCategory.id === 2) {
      setStep(Object.values(COLLECTION_STEPS));
    }
  }, [activeStep, selectedCategory.id]);

  const generateNft = () => {
    return "generateNft";
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        height: "calc(100vh - 8.5rem)",

        minWidth: "21rem",
        padding: "1rem",
      }}
    >
      <Steps allSteps={step} activeStep={activeStep} />
      <div className={classes.cardDiv}>
        {activeStep === 1 && (
          <NFTCategories
            selectedCategoryOnChange={(selectedCategory: CategoryType) => {
              setSelectedCategory(selectedCategory);
              setActiveStep(2);
            }}
            selectedCategory={selectedCategory}
          />
        )}
        {selectedCategory.id === 1 && activeStep === 2 && <NftForm nftInfoOnChange={setNftInfo} nftInfo={nftInfo} />}
        {selectedCategory.id === 1 && activeStep === 3 && (
          <NftReview activeStepOnChange={setActiveStep} nftInfoOnChange={setNftInfo} nftDetail={nftInfo} generateNftButtonClick={generateNft} />
        )}
        {selectedCategory.id === 2 && activeStep === 2 && (
          <CollectionForm activeStepOnChange={setActiveStep} collectionInfoOnChange={setCollectionInfo} collectionInfo={collectionInfo} />
        )}
        {selectedCategory.id === 2 && activeStep === 3 && (
          <CollectionReview activeStepOnChange={setActiveStep} collectionInfoOnChange={setCollectionInfo} collectionDetail={collectionInfo} />
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Grid, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CategoryType, CollectionDataType, GenerateNftType } from "../utils/types";
import { NFTCategories } from "../components/2NftCategories";
import NftForm from "../components/2NftForm";
import CollectionForm from "../components/2CollectionForm";
import { NftReview } from "../components/2NftReview";
import { CollectionReview } from "../components/2CollectionReview";
import { COLLECTION_STEPS, MAIN_STEPS, NFT_STEPS } from "../utils/enums";
import { Steps } from "../components/Steps";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "ton";
import { useNavigate } from "react-router-dom";
import NftMinter from "../lib/nft-minter";
import { collectionPreview } from "../lib/api";
import { create } from "ipfs";
import { CustomButton } from "../components/CustomButton";

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

  let address = useTonAddress(false);
  const [tonConnectUi] = useTonConnectUI();
  const navigate = useNavigate();

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

  const backStep = () => { setActiveStep(activeStep - 1); };
  const nextStep = () => { setActiveStep(activeStep + 1); };

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

  const generateNFT = async () => {
    console.log("generate", nftInfo);
    if (address) {
      const node = await create();
      const itemContent = await node.add(
        JSON.stringify({
          attributes: [
            {
              trait_type: "level",
              value: nftInfo.level,
            },
          ],
          description: nftInfo.nftDescription,
          external_url: "example.com",
          image: nftInfo.nftImage,
          name: nftInfo.nftName,
        })
      );

      const content = await collectionPreview(nftInfo.collectionAddress);

      const minter = new NftMinter(Address.parse(content.owner_address).toString(), tonConnectUi, content.collection_content.data);

      minter.deployNftItem(itemContent.path, content.next_item_index, address).then(() => {
        navigate("/view-nfts");
      });
    }
  };

  const generateCollection = async () => {
    if (address) {
      const node = await create();
      const nftCollectionUri = await node.add(
        JSON.stringify({
          name: collectionInfo.collectionName,
          description: collectionInfo.collectionDescription,
          image: collectionInfo.collectionImage,
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
      {/* <div className={classes.cardDiv}> */}
      <Grid container direction={'column'} paddingTop={16}>
        <Grid item>
          {activeStep === 1 && (
            <NFTCategories
              selectedCategoryOnChange={(selectedCategory: CategoryType) => {
                setSelectedCategory(selectedCategory);
                setActiveStep(2);
              }}
              selectedCategory={selectedCategory}
            />
          )}
          {selectedCategory.id === 1 && activeStep === 2 &&
            <NftForm nftInfoOnChange={setNftInfo} nftInfo={nftInfo} />
          }
          {selectedCategory.id === 1 && activeStep === 3 && (
            <NftReview nftInfoOnChange={setNftInfo} nftInfo={nftInfo} generateNftButtonClick={generateNFT} />
          )}
          {selectedCategory.id === 2 && activeStep === 2 && (
            <CollectionForm collectionInfoOnChange={setCollectionInfo} collectionInfo={collectionInfo} />
          )}
          {selectedCategory.id === 2 && activeStep === 3 && (
            <CollectionReview collectionInfoOnChange={setCollectionInfo} collectionDetail={collectionInfo} generateCollectionButtonFunc={generateCollection} />
          )}
        </Grid>
        {activeStep !== 1 && activeStep !== 4 && (
          <Grid container justifyContent={'space-evenly'} paddingX={24}>
            <CustomButton onClick={backStep} label="BACK"></CustomButton>
            <CustomButton onClick={nextStep} label="NEXT"></CustomButton>
          </Grid>
        )
        }
      </Grid>
    </div>
  );
};

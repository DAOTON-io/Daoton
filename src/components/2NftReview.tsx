import React from "react";
import { GenerateNftType } from "../utils/types";
import { CustomButton } from "./CustomButton";

type Props = {
    nftInfoOnChange: (nftInfo: GenerateNftType) => void;
    activeStepOnChange: (activeStep: number) => void;
    nftDetail: GenerateNftType;
}

export const NftReview: React.FC<Props> = ({ activeStepOnChange, nftInfoOnChange, nftDetail }) => {
    console.log(nftDetail)
    return (
        <>
        {nftDetail.nftName}
        <>
        <CustomButton onClick={()=>{}} label="GENERATE" ></CustomButton>
        </>
        </>
    )
}
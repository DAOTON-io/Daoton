import React from "react";
import { CollectionDataType } from "../utils/types";
import { CustomButton } from "./CustomButton";

type Props = {
    collectionInfoOnChange: (collectionInfo: CollectionDataType) => void;
    activeStepOnChange: (activeStep: number) => void;
    collectionDetail: CollectionDataType;
}

export const CollectionReview: React.FC<Props> = ({ collectionInfoOnChange, activeStepOnChange, collectionDetail }) => {
    return (
        <>
            <>{collectionDetail.collectionDescription}</>
            <>   </>
            <>{collectionDetail.collectionName}</>
            <CustomButton onClick={() => { }} label="GENERATE" ></CustomButton>

        </>
    )
}
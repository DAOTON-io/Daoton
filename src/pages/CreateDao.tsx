import React, { useState } from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DaoCategories } from "../components/DaoCategories";
import { CategoryType, InfoType, NftDetailType, TokenDetailType } from "../utils/types";
import { TOKEN_TYPES } from "../utils/enums";
import { TokenDetail } from "../components/TokenDetail";
import { DaoInfo } from "../components/DaoInfo";
import { Steps } from "../components/Steps";
import { Review } from "../components/Review";

import { contractAddress, Address, beginCell } from "ton";
import { Cell } from "ton";
import daoContract from "../lib/dao/contracts/dao.compiled.json";
import daotonContract from "../lib/dao/contracts/daoton.contract.json";
import { toNano } from "ton";
import { useTonConnectUI } from "@tonconnect/ui-react";

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

export const CreateDao: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({
    id: 0,
    label: "",
    icon: undefined,
  });
  const [daoInfo, setDaoInfo] = useState<InfoType>({
    name: "",
    desc: "",
    image: "",
  });
  const [tokenDetail, setTokenDetail] = useState<TokenDetailType>({
    type: TOKEN_TYPES.NEW_TOKEN,
    name: "",
    description: "",
    symbol: "",
    amount: "",
    decimal: "",
    pausableContract: false,
    stackableContract: false,
    image: "",
  });
  const [nftDetail, setNftDetail] = useState<NftDetailType>({
    type: TOKEN_TYPES.NEW_NFT,
    name: "",
    description: "",
    level: "",
    collectionAddress: "",
    image: "",
  });

  const classes = useStyles();
  const [tonConnectUi] = useTonConnectUI();

  const createDao = () => {
    const code = Cell.fromBoc(daoContract.hex)[0];

    const data = beginCell()
      .storeUint(selectedCategory.id, 16)
      .storeAddress(Address.parse("kQBV7AsAYm791A-1YtnhtatnE6B93Oxt6hgLLK12I7QF2OhO"))
      .storeAddress(Address.parse("kQBV7AsAYm791A-1YtnhtatnE6B93Oxt6hgLLK12I7QF2OhO"))
      .storeRef(
        beginCell()
          .storeBuffer(Buffer.from(JSON.stringify(daoInfo)))
          .endCell()
      )
      .storeUint(0, 32) // initial proposal count
      .storeDict(null) // proposals
      .endCell();

    const workchain = 0; // deploy to workchain 0
    const contractAddressHex = contractAddress({ workchain, initialCode: code, initialData: data });

    const state_init = new Cell();
    state_init.bits.writeUint(6, 5);
    state_init.refs.push(code);
    state_init.refs.push(data);

    const main_state = state_init.toBoc();
    const main_state_64 = main_state.toString("base64");

    const message = beginCell().storeUint(0, 32).storeAddress(contractAddressHex).storeAddress(Address.parse(daotonContract.address)).endCell();

    const messageBody = message.toBoc();

    const tx = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: contractAddressHex.toString(),
          amount: toNano(0.2).toNumber().toString(),
          stateInit: main_state_64,
          payload: messageBody.toString("base64"),
        },
      ],
    };

    tonConnectUi.sendTransaction(tx).then(() => {
      // navigate("/view-tokens");
      toastr.success(contractAddressHex.toString(), "Jetton deployed successfully.");
    });
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        height: "80vh",
        marginBottom: "1rem",
        minWidth: "21rem",
        padding: "1rem",
      }}
    >
      <Steps activeStep={activeStep} />
      <div className={classes.cardDiv}>
        {activeStep === 1 && (
          <>
            {" "}
            <DaoCategories activeStepOnChange={setActiveStep} selectedCategoryOnChange={setSelectedCategory} selectedCategory={selectedCategory} />
          </>
        )}
        {activeStep === 2 && (
          <>
            {" "}
            <DaoInfo activeStepOnChange={setActiveStep} daoInfoOnChange={setDaoInfo} daoInfo={daoInfo} />
          </>
        )}
        {activeStep === 3 && (
          <>
            {" "}
            <TokenDetail activeStepOnChange={setActiveStep} tokenDetailOnChange={setTokenDetail} tokenDetail={tokenDetail} nftDetailOnChange={setNftDetail} nftDetail={nftDetail} />
          </>
        )}
        {activeStep === 4 && (
          <>
            {" "}
            <Review selectedCategory={selectedCategory} daoInfo={daoInfo} tokenDetail={tokenDetail} nftDetail={nftDetail} activeStepOnChange={setActiveStep} />
          </>
        )}
        <button onClick={() => createDao()}>Hellooo</button>
      </div>
    </div>
  );
};

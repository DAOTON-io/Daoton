import React, { useState } from "react";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DaoCategories } from "../components/DaoCategories";
import { CategoryType, DaoInfoData, TokenDetailType } from "../utils/types";
import { TOKEN_TYPES } from "../utils/enums";
import { TokenDetail } from "../components/TokenDetail";
import { DaoInfo } from "../components/DaoInfo";
import { Steps } from "../components/Steps";
import { Review } from "../components/Review";

import { contractAddress, Address, beginCell } from "ton";
import { Cell } from "ton";
import daoContract from "../lib/dao/contracts/dao.compiled.json";
import daotonContract from "../lib/dao/contracts/daoton.contract.json";
import { toNano, beginDict } from "ton";
import { useTonConnectUI } from "@tonconnect/ui-react";
import toastr from "toastr";
import { sha256 } from "../lib/token-minter/deployer";
import { daoMetadata } from "../lib/dao/lib/make-get-call";
import { useNavigate } from "react-router-dom";

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

  const [daoInfo, setDaoInfo] = useState<DaoInfoData>({
    name: "",
    description: "",
    image: "",
    tokenAddress: "",
  });

  const [tokenDetail, setTokenDetail] = useState<TokenDetailType>({
    type: TOKEN_TYPES.NEW_TOKEN,
    name: "",
    description: "",
    symbol: "",
    amount: 0,
    decimal: 9,
    isPausable: false,
    isStackable: false,
    offchainUri: "",
  });

  // const [nftDetail, setNftDetail] = useState<NftDetailType>({
  //   type: TOKEN_TYPES.NEW_NFT,
  //   name: "",
  //   description: "",
  //   level: "",
  //   collectionAddress: "",
  //   image: "",
  // });

  const classes = useStyles();
  const [tonConnectUi] = useTonConnectUI();

  const navigate = useNavigate();

  const buildDaoOnchainMetadata = (data: any) => {
    const KEYLEN = 256;
    const dict = beginDict(KEYLEN);

    Object.entries(data).forEach(([k, v]: any) => {
      if (!daoMetadata[k]) throw new Error(`Unsupported onchain key: ${k}`);
      if (v === undefined || v === "") return;

      let bufferToStore = Buffer.from(v, daoMetadata[k]);

      const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

      const rootCell = new Cell();
      rootCell.bits.writeUint8(0x00);
      let currentCell = rootCell;

      while (bufferToStore.length > 0) {
        currentCell.bits.writeBuffer(bufferToStore.slice(0, CELL_MAX_SIZE_BYTES));
        bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
        if (bufferToStore.length > 0) {
          let newCell = new Cell();
          currentCell.refs.push(newCell);
          currentCell = newCell;
        }
      }

      dict.storeRef(sha256(k), rootCell);
    });

    return beginCell().storeInt(0x00, 8).storeDict(dict.endDict()).endCell();
  };

  const createDao = () => {
    const code = Cell.fromBoc(daoContract.hex)[0];

    const metadata = buildDaoOnchainMetadata(daoInfo);

    const data = beginCell()
      .storeUint(selectedCategory.id, 16)
      .storeAddress(Address.parse("kQBV7AsAYm791A-1YtnhtatnE6B93Oxt6hgLLK12I7QF2OhO"))
      .storeAddress(Address.parse("kQBV7AsAYm791A-1YtnhtatnE6B93Oxt6hgLLK12I7QF2OhO"))
      .storeRef(metadata)
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
      navigate("/view-dao");
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
        {activeStep === 1 && <DaoCategories activeStepOnChange={setActiveStep} selectedCategoryOnChange={setSelectedCategory} selectedCategory={selectedCategory} />}
        {activeStep === 2 && <DaoInfo activeStepOnChange={setActiveStep} daoInfoOnChange={setDaoInfo} daoInfo={daoInfo} />}
        {activeStep === 3 && (
          <TokenDetail
            activeStepOnChange={setActiveStep}
            tokenDetailOnChange={setTokenDetail}
            tokenDetail={tokenDetail}
            changeTokenAddress={(address: string) => {
              setDaoInfo({ ...daoInfo, tokenAddress: address });
            }}
            tokenAddress={daoInfo.tokenAddress}
          />
        )}
        {activeStep === 4 && <Review selectedCategory={selectedCategory} daoInfo={daoInfo} tokenDetail={tokenDetail} activeStepOnChange={setActiveStep} />}
      </div>
    </div>
  );
};

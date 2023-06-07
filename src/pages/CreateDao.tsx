import React, { useState } from "react";
import { Grid, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DaoCategories } from "../components/DaoCategories";
import { CategoryType, DaoInfoData, TokenDetailType } from "../utils/types";
import { DAO_STEPS, TOKEN_TYPES } from "../utils/enums";
import { TokenDetail } from "../components/TokenDetail";
import { DaoInfo } from "../components/DaoInfo";
import { Steps } from "../components/Steps";
import { Review } from "../components/Review";
import { contractAddress, Address, beginCell, Cell, toNano, beginDict } from "ton";
import daoContract from "../lib/dao/contracts/dao.compiled.json";
import daotonContract from "../lib/dao/contracts/daoton.contract.json";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import toastr from "toastr";
import { sha256 } from "../lib/token-minter/deployer";
import { daoMetadata } from "../lib/dao/lib/make-get-call";
import { useNavigate } from "react-router-dom";
import { mintToken } from "../lib/token-minter/utils";
import { CustomButton } from "../components/CustomButton";

const useStyles = makeStyles((theme: Theme) => ({
  cardDiv: {
    marginTop: "8rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: "9rem",
      overflow: "auto",
    },
  },
  buttonContainer: {
    display: "flex",
    marginTop: "2rem",
    width: "100%",
  },
}));

export const CreateDao: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({
    id: 0,
    label: "",
    icon: undefined,
  });
  const [daoInfo, setDaoInfo] = useState<DaoInfoData>({
    name: "",
    description: "",
    image: "",
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
  const [tokenAddress, setTokenAddress] = useState<string>("");

  const address = useTonAddress();

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

  const createDao = async () => {
    let tokenMintTransaction;
    let daoTokenAddress;

    if (tokenDetail.type === TOKEN_TYPES.NEW_TOKEN) {
      tokenMintTransaction = await mintToken(address, tokenDetail);

      daoTokenAddress = tokenMintTransaction.messages[0].address;
    }

    const code = Cell.fromBoc(daoContract.hex)[0];

    const metadata = buildDaoOnchainMetadata(daoInfo);

    const data = beginCell()
      .storeUint(selectedCategory.id, 16)
      .storeAddress(Address.parse(daoTokenAddress || tokenAddress))
      .storeAddress(Address.parse(daoTokenAddress || tokenAddress))
      .storeRef(metadata)
      .storeUint(0, 32) // initial proposal count
      .storeDict(null) // proposals
      .endCell();

    const workchain = 0; // deploy to workchain 0
    const contractAddressHex = contractAddress({
      workchain,
      initialCode: code,
      initialData: data,
    });

    const state_init = new Cell();
    state_init.bits.writeUint(6, 5);
    state_init.refs.push(code);
    state_init.refs.push(data);

    const main_state = state_init.toBoc();
    const main_state_64 = main_state.toString("base64");

    const message = beginCell().storeUint(0, 32).storeAddress(contractAddressHex).storeAddress(Address.parse(daotonContract.address)).endCell();

    const messageBody = message.toBoc();

    let tx = {
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

    if (tokenMintTransaction) {
      tx = {
        validUntil: Date.now() + 1000000,
        messages: [
          tokenMintTransaction.messages[0],
          {
            address: contractAddressHex.toString(),
            amount: toNano(0.2).toNumber().toString(),
            stateInit: main_state_64,
            payload: messageBody.toString("base64"),
          },
        ],
      };
    }

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
        height: "calc(100vh - 9.5rem)",
        marginBottom: "1rem",
        minWidth: "21rem",
        padding: "1rem",
      }}
    >
      <Steps activeStep={activeStep} allSteps={Object.values(DAO_STEPS)} />
      <div className={classes.cardDiv}>
        {activeStep === 1 && <DaoCategories activeStepOnChange={setActiveStep} selectedCategoryOnChange={setSelectedCategory} selectedCategory={selectedCategory} />}
        {activeStep === 2 && <DaoInfo daoInfoOnChange={setDaoInfo} daoInfo={daoInfo} buttonDisableOnChange={setButtonDisable} />}
        {activeStep === 3 && (
          <TokenDetail
            tokenDetailOnChange={setTokenDetail}
            tokenDetail={tokenDetail}
            changeTokenAddress={(address: string) => {
              setTokenAddress(address);
            }}
            tokenAddress={tokenAddress}
            buttonDisableOnChange={setButtonDisable}
          />
        )}
        {activeStep === 4 && <Review selectedCategory={selectedCategory} daoInfo={daoInfo} tokenDetail={tokenDetail} />}

        {activeStep !== 1 ? (
          <div className={classes.buttonContainer}>
            <Grid paddingTop={2} container justifyContent={"space-evenly"} width={"100%"}>
              <CustomButton onClick={() => setActiveStep(activeStep - 1)} disabled={false} label="BACK" />
              {activeStep !== 4 ? (
                <CustomButton onClick={() => setActiveStep(activeStep + 1)} disabled={buttonDisable} label="NEXT" />
              ) : (
                <CustomButton onClick={createDao} disabled={false} label={tokenDetail.type === TOKEN_TYPES.NEW_TOKEN ? "GENERATE TOKEN & SAVE" : "SAVE"} />
              )}
            </Grid>
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

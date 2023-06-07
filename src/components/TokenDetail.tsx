import React, { useEffect, useState } from "react";
import { Grid, MenuItem, SelectChangeEvent, Stack, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTonAddress } from "@tonconnect/ui-react";
import { fetchTokens } from "../lib/api";
import { TOKEN_TYPES } from "../utils/enums";
import { TokenDetailType, TokensType } from "../utils/types";
import { CustomInput } from "./CustomInput";
import { CustomSelect } from "./CustomSelect";
import { CustomSwitch } from "./CustomSwitch";
import { ImageUpload } from "./ImageUpload";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 2,
      marginTop: 2,
      padding: "24px",
    },
  },
  stackContainer: {
    minWidth: "25rem",
    [theme.breakpoints.down("sm")]: {
      minWidth: "10rem",
    },
  },
  buttonContainer: {
    textAlign: "start",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

type Props = {
  tokenDetailOnChange: (tokenDetail: TokenDetailType) => void;
  tokenDetail: TokenDetailType;
  changeTokenAddress: (address: string) => void;
  tokenAddress: string;
  // nftDetailOnChange: (nftDetail: NftDetailType) => void;
  // nftDetail: NftDetailType;
  buttonDisableOnChange: (value: boolean) => void;
};

export const TokenDetail: React.FC<Props> = ({ tokenDetailOnChange, tokenDetail, changeTokenAddress, tokenAddress, buttonDisableOnChange }) => {
  const [tokenType, setTokenType] = useState<TOKEN_TYPES>(tokenDetail.type);
  const [tokens, setTokens] = useState<TokensType[]>([]);
  // const [nfts, setNfts] = useState<any[]>([]);

  const address = useTonAddress();
  const classes = useStyles();

  useEffect(() => {
    if (address) {
      const fetchInitData = async () => {
        try {
          const tokenList = await fetchTokens(address);
          setTokens(tokenList.balances);
        } catch {}

        // try {
        //   const nftList = await fetchNfts(address);
        //   console.log("nftList", nftList);
        //   setNfts(nftList.collections as any);
        // } catch {}
      };

      fetchInitData();
    }
  }, [address]);

  useEffect(() => {
    const disable = (): boolean => {
      if (tokenType === TOKEN_TYPES.NEW_TOKEN) {
        return !(tokenDetail.name && tokenDetail.description && tokenDetail.symbol && tokenDetail.amount && tokenDetail.decimal);
      } else if (tokenType === TOKEN_TYPES.TOKEN_FROM_WALLET) {
        return !tokenAddress;
      } else return false;
    };

    buttonDisableOnChange(disable());
  }, [buttonDisableOnChange, tokenAddress, tokenDetail.amount, tokenDetail.decimal, tokenDetail.description, tokenDetail.name, tokenDetail.symbol, tokenType]);

  const selectToken = (e: SelectChangeEvent) => {
    e.preventDefault();
    const currentAddress = e.target.value;
    changeTokenAddress(currentAddress);

    const currentToken = tokens.find((tk) => tk.jetton_address === currentAddress);
    if (currentToken) {
      tokenDetailOnChange({
        type: TOKEN_TYPES.TOKEN_FROM_WALLET,
        amount: Number(currentToken.balance),
        decimal: currentToken.metadata.decimals,
        isStackable: false,
        isPausable: false,
        name: currentToken.metadata.name,
        description: currentToken.metadata.description,
        symbol: currentToken.metadata.symbol,
        offchainUri: "",
        image: currentToken.metadata.image,
      });
    }
  };

  // const selectNft = (e: SelectChangeEvent) => {
  //   e.preventDefault();
  //   const nftValue = JSON.parse(e.target.value);
  //   setNftData({
  //     ...nftData,
  //     name: nftValue.metadata.name,
  //   });
  // };

  const selectType = (e: any) => {
    setTokenType(e.target.value as TOKEN_TYPES);

    tokenDetailOnChange({
      ...tokenDetail,
      type: e.target.value,
    });
  };

  return (
    <Grid container className={classes.container} overflow={"auto"}>
      <Stack direction="column" spacing={2} marginTop={4} marginBottom={2} className={classes.stackContainer}>
        <Stack>
          <CustomSelect id={"select-type"} onChange={selectType} value={tokenType}>
            {" "}
            <MenuItem value={TOKEN_TYPES.NEW_TOKEN}>{TOKEN_TYPES.NEW_TOKEN}</MenuItem>
            <MenuItem value={TOKEN_TYPES.TOKEN_FROM_WALLET}>{TOKEN_TYPES.TOKEN_FROM_WALLET}</MenuItem>
            {/* <MenuItem value={TOKEN_TYPES.NEW_NFT}>
              {TOKEN_TYPES.NEW_NFT}
            </MenuItem>
            <MenuItem value={TOKEN_TYPES.NFT_FROM_WALLET}>
              {TOKEN_TYPES.NFT_FROM_WALLET}
            </MenuItem> */}
          </CustomSelect>
        </Stack>
        <Grid item>
          {tokenType === TOKEN_TYPES.NEW_TOKEN && (
            <Stack direction="column" spacing={4} marginTop={2}>
              <Stack direction="row" spacing={4}>
                <CustomInput
                  placeholder="Token Name"
                  label="Token Name"
                  id="tokenName"
                  name="tokenName"
                  value={tokenDetail.name}
                  onChange={(e: any) => tokenDetailOnChange({ ...tokenDetail, name: e.target.value })}
                />
                <CustomInput
                  placeholder="Token Description"
                  label="Token Description"
                  id="tokenDescription"
                  name="tokenDescription"
                  value={tokenDetail.description}
                  onChange={(e: any) => tokenDetailOnChange({ ...tokenDetail, description: e.target.value })}
                  style={{ marginLeft: "0.5rem" }}
                />
              </Stack>
              <Stack direction="row" spacing={4}>
                <CustomInput
                  placeholder="Token Symbol"
                  label="Token Symbol"
                  id="tokenSymbol"
                  name="tokenSymbol"
                  value={tokenDetail.symbol}
                  onChange={(e: any) => tokenDetailOnChange({ ...tokenDetail, symbol: e.target.value })}
                />
                <CustomInput
                  placeholder="Token Amount"
                  label="Token Amount"
                  id="tokenAmount"
                  name="tokenamount"
                  value={tokenDetail.amount}
                  onChange={(e: any) => tokenDetailOnChange({ ...tokenDetail, amount: e.target.value })}
                  style={{ marginLeft: "0.5rem" }}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Token Decimal"
                  label="Token Decimal"
                  id="tokenDecimal"
                  name="tokenDecimal"
                  value={tokenDetail.decimal}
                  onChange={(e: any) => tokenDetailOnChange({ ...tokenDetail, decimal: e.target.value })}
                />
              </Stack>
              <Stack direction="row" spacing={2} paddingTop={1}>
                <Grid item>
                  <span style={{ marginTop: "1rem" }}>Pausable Contract:</span>
                  <CustomSwitch
                    checked={tokenDetail.isPausable}
                    onChange={(e: any) =>
                      tokenDetailOnChange({
                        ...tokenDetail,
                        isPausable: e.target.checked,
                      })
                    }
                  />
                </Grid>
                <Grid item>
                  <span style={{ marginTop: "1rem" }}>Stackable Contract:</span>
                  <CustomSwitch
                    checked={tokenDetail.isStackable}
                    onChange={(e: any) =>
                      tokenDetailOnChange({
                        ...tokenDetail,
                        isStackable: e.target.checked,
                      })
                    }
                  />
                </Grid>
              </Stack>
              <Grid container className={classes.buttonContainer}>
                <Grid item justifyContent={"flex-start"}>
                  <label>Token Image : </label>
                </Grid>
                <Grid item justifyContent={"flex-end"}>
                  <ImageUpload
                    onClear={() => {}}
                    onChange={(value: string) =>
                      tokenDetailOnChange({
                        ...tokenDetail,
                        image: value,
                      })
                    }
                  ></ImageUpload>
                </Grid>
              </Grid>
            </Stack>
          )}

          {tokenType === TOKEN_TYPES.TOKEN_FROM_WALLET && (
            <CustomSelect id={"select-token"} onChange={selectToken} value={tokenAddress} label="Choose a token">
              {tokens.map((tk: TokensType) => {
                return (
                  <MenuItem key={tk.jetton_address} value={tk.jetton_address}>
                    {tk.metadata.name + "(" + tk.metadata.symbol + ")"}
                  </MenuItem>
                );
              })}
            </CustomSelect>
          )}

          {/* tokenType === TOKEN_TYPES.NEW_NFT ? (
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Nft Name"
                  label="Nft Name"
                  id="nftName"
                  name="nftName"
                  value={nftData.name}
                  onChange={(e: any) => setNftData({ ...nftData, name: e.target.value })}
                />
                <CustomInput
                  placeholder="Nft Description"
                  label="Nft Description"
                  id="nftDescription"
                  name="nftDescription"
                  value={nftData.description}
                  onChange={(e: any) => setNftData({ ...nftData, description: e.target.value })}
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Level"
                  label="Level"
                  id="lnftLevel"
                  name="nftLevel"
                  value={nftData.level}
                  onChange={(e: any) => setNftData({ ...nftData, level: e.target.value })}
                />
                <CustomInput
                  placeholder="Collection Address"
                  label="Collection Address"
                  id="nftCollectionAddress"
                  name="nctCollectionAddress"
                  value={nftData.collectionAddress}
                  onChange={(e: any) => setNftData({ ...nftData, collectionAddress: e.target.value })}
                />
              </Stack>
              <Grid container className={classes.buttonContainer}>
                <Grid item justifyContent={"flex-start"}>
                  <label>Collection Image : </label>
                </Grid>
                <Grid item justifyContent={"flex-end"}>
                  <ImageUpload
                    onClear={() => {}}
                    onChange={(value: string) =>
                      setNftData({
                        ...nftData,
                        image: value,
                      })
                    }
                  ></ImageUpload>
                </Grid>
              </Grid>
            </Stack>
          ) : tokenType === TOKEN_TYPES.NFT_FROM_WALLET ? (
            nfts.length !== 0 ? (
              <CustomSelect onChange={selectNft}>
                {nfts.map((nft: TokensType) => {
                  return (
                    <MenuItem
                      key={nft.jetton_address}
                      value={JSON.stringify({
                        ...nft,
                        name: nft?.metadata.name,
                        symbol: nft?.metadata.symbol,
                      })}
                    >
                      {nft.metadata.name + "(" + nft.metadata.symbol + ")"}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            ) : (
              <p>You do not have any nft</p>
            )
          ) : undefined} */}
        </Grid>
      </Stack>
    </Grid>
  );
};

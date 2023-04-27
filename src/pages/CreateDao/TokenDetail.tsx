import React, {useEffect, useState} from 'react';
import {Grid, MenuItem, SelectChangeEvent, Stack, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {fetchNfts, fetchTokens} from '../../lib/api';
import {useTonAddress} from '@tonconnect/ui-react';
import {NftDetailType, TokenDetailType, TokensType} from '../../utils/types';
import {TOKEN_TYPES} from '../../utils/enums';
import {CustomInput} from '../../components/CustomInput';
import {CustomButton} from '../../components/CustomButton';
import {CustomSelect} from '../../components/CustomSelect';
import {CustomSwitch} from '../../components/CustomSwitch';
import {ImageUpload} from '../../components/imageUpload';

type Props = {
  activeStepOnChange: (activeStep: number) => void;
  tokenDetailOnChange: (tokenDetail: TokenDetailType) => void;
  tokenDetail: TokenDetailType;
  nftDetailOnChange: (nftDetail: NftDetailType) => void;
  nftDetail: NftDetailType;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
      minWidth: '15rem',
    },
  },
  buttonContainer: {
    textAlign: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export const TokenDetail: React.FC<Props> = ({
  activeStepOnChange,
  tokenDetailOnChange,
  tokenDetail,
  nftDetailOnChange,
  nftDetail,
}) => {
  const [tokenType, setTokenType] = useState<TOKEN_TYPES>(
    TOKEN_TYPES.NEW_TOKEN,
  );
  const [tokens, setTokens] = useState<TokensType[]>([]);
  const [tokenData, setTokenData] = useState<TokenDetailType>({
    type: tokenType,
    name: '',
    description: '',
    symbol: '',
    amount: '',
    decimal: '',
    pausableContract: true,
    stackableContract: true,
    image: '',
  });
  const [nfts, setNfts] = useState<any[]>([]);
  const [nftData, setNftData] = useState<NftDetailType>({
    type: tokenType,
    name: '',
    description: '',
    level: '',
    collectionAddress: '',
    image: '',
  });

  const address = useTonAddress();
  const classes = useStyles();

  useEffect(() => {
    if (address) {
      const fetchInitData = async () => {
        try {
          const tokenList = await fetchTokens(address);
          setTokens(tokenList.balances);
        } catch {}
        try {
          const nftList = await fetchNfts(address);
          console.log('nftList', nftList);
          setNfts(nftList.collections as any);
        } catch {}
      };

      fetchInitData();
    }
  }, [address]);

  useEffect(() => {
    if (tokenDetail) setTokenData(tokenDetail);
    if (nftDetail) setNftData(nftDetail);
  }, [tokenDetail, nftDetail]);

  const selectToken = (e: SelectChangeEvent) => {
    e.preventDefault();
    const tokenValue = JSON.parse(e.target.value);
    setTokenData({
      ...tokenData,
      name: tokenValue.metadata.name,
      symbol: tokenValue.metadata.symbol,
    });
  };

  const selectNft = (e: SelectChangeEvent) => {
    e.preventDefault();
    const nftValue = JSON.parse(e.target.value);
    setNftData({
      ...nftData,
      name: nftValue.metadata.name,
    });
  };

  const selectType = (e: any) => {
    setTokenType(e.target.value as TOKEN_TYPES);
    setTokenData({
      type: tokenType,
      name: '',
      description: '',
      symbol: '',
      amount: '',
      decimal: '',
      pausableContract: true,
      stackableContract: true,
      image: '',
    });
    setNftData({
      type: tokenType,
      name: '',
      description: '',
      level: '',
      collectionAddress: '',
      image: '',
    });
  };

  const createDao = () => {
    activeStepOnChange(4);
    if (tokenData) tokenDetailOnChange(tokenData);
    if (nftData) nftDetailOnChange(nftData);
  };

  const backStep = () => {
    activeStepOnChange(2);
    if (tokenData) tokenDetailOnChange(tokenData);
    if (nftData) nftDetailOnChange(nftData);
  };

  const disable = (): boolean => {
    if (tokenType === TOKEN_TYPES.NEW_TOKEN) {
      return !(
        tokenData.name &&
        tokenData.description &&
        tokenData.symbol &&
        tokenData.amount &&
        tokenData.decimal
      );
    } else if (tokenType === TOKEN_TYPES.TOKEN_FROM_WALLET) {
      return !(tokenData.name && tokenData.symbol);
    } else return false;
  };

  return (
    <Grid container className={classes.container} overflow={'auto'}>
      <Stack direction="column" spacing={2} marginTop={4}>
        <Stack>
          <CustomSelect onChange={selectType} values={tokenType}>
            {' '}
            <MenuItem value={TOKEN_TYPES.NEW_TOKEN}>
              {TOKEN_TYPES.NEW_TOKEN}
            </MenuItem>
            <MenuItem value={TOKEN_TYPES.TOKEN_FROM_WALLET}>
              {TOKEN_TYPES.TOKEN_FROM_WALLET}
            </MenuItem>
            <MenuItem value={TOKEN_TYPES.NEW_NFT}>
              {TOKEN_TYPES.NEW_NFT}
            </MenuItem>
            <MenuItem value={TOKEN_TYPES.NFT_FROM_WALLET}>
              {TOKEN_TYPES.NFT_FROM_WALLET}
            </MenuItem>
          </CustomSelect>
        </Stack>
        <Grid item>
          {tokenType === TOKEN_TYPES.NEW_TOKEN ? (
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Token Name"
                  label="Token Name"
                  id="tokenName"
                  name="tokenName"
                  value={tokenData.name}
                  onChange={(e: any) =>
                    setTokenData({...tokenData, name: e.target.value})
                  }
                />
                <CustomInput
                  placeholder="Token Description"
                  label="Token Description"
                  id="tokenDescription"
                  name="tokenDescription"
                  value={tokenData.description}
                  onChange={(e: any) =>
                    setTokenData({...tokenData, description: e.target.value})
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Token Symbol"
                  label="Token Symbol"
                  id="tokenSymbol"
                  name="tokenSymbol"
                  value={tokenData.symbol}
                  onChange={(e: any) =>
                    setTokenData({...tokenData, symbol: e.target.value})
                  }
                />
                <CustomInput
                  placeholder="Token Amount"
                  label="Token Amount"
                  id="tokenAmount"
                  name="tokenamount"
                  value={tokenData.amount}
                  onChange={(e: any) =>
                    setTokenData({...tokenData, amount: e.target.value})
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Token Decimal"
                  label="Token Decimal"
                  id="tokenDecimal"
                  name="tokenDecimal"
                  value={tokenData.decimal}
                  onChange={(e: any) =>
                    setTokenData({...tokenData, decimal: e.target.value})
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2} paddingTop={1}>
                <Grid item>
                  <span style={{marginTop: '1rem'}}>Pausable Contract:</span>
                  <CustomSwitch
                    checked={tokenData.pausableContract}
                    onChange={(e: any) =>
                      setTokenData({
                        ...tokenData,
                        pausableContract: e.target.checked,
                      })
                    }
                  />
                </Grid>
                <Grid item>
                  <span style={{marginTop: '1rem'}}>Stackable Contract:</span>
                  <CustomSwitch
                    checked={tokenData.stackableContract}
                    onChange={(e: any) =>
                      setTokenData({
                        ...tokenData,
                        stackableContract: e.target.checked,
                      })
                    }
                  />
                </Grid>
              </Stack>
              <Grid container className={classes.buttonContainer}>
                <Grid item justifyContent={'flex-start'}>
                  <label>Collection Image : </label>
                </Grid>
                <Grid item justifyContent={'flex-end'}>
                  <ImageUpload
                    onClear={() => {}}
                    onChange={(value: string) =>
                      setTokenData({
                        ...tokenData,
                        image: value,
                      })
                    }></ImageUpload>
                </Grid>
              </Grid>
            </Stack>
          ) : tokenType === TOKEN_TYPES.TOKEN_FROM_WALLET ? (
            tokens.length !== 0 ? (
              <CustomSelect onChange={selectToken}>
                {tokens.map((tk: TokensType) => {
                  return (
                    <MenuItem
                      key={tk.jetton_address}
                      value={JSON.stringify({
                        ...tk,
                        name: tk?.metadata.name,
                        symbol: tk?.metadata.symbol,
                      })}>
                      {tk.metadata.name + '(' + tk.metadata.symbol + ')'}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            ) : (
              <p>You do not have any token</p>
            )
          ) : tokenType === TOKEN_TYPES.NEW_NFT ? (
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Nft Name"
                  label="Nft Name"
                  id="nftName"
                  name="nftName"
                  value={nftData.name}
                  onChange={(e: any) =>
                    setNftData({...nftData, name: e.target.value})
                  }
                />
                <CustomInput
                  placeholder="Nft Description"
                  label="Nft Description"
                  id="nftDescription"
                  name="nftDescription"
                  value={nftData.description}
                  onChange={(e: any) =>
                    setNftData({...nftData, description: e.target.value})
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Level"
                  label="Level"
                  id="lnftLevel"
                  name="nftLevel"
                  value={nftData.level}
                  onChange={(e: any) =>
                    setNftData({...nftData, level: e.target.value})
                  }
                />
                <CustomInput
                  placeholder="Collection Address"
                  label="Collection Address"
                  id="nftCollectionAddress"
                  name="nctCollectionAddress"
                  value={nftData.collectionAddress}
                  onChange={(e: any) =>
                    setNftData({...nftData, collectionAddress: e.target.value})
                  }
                />
              </Stack>
              <Grid container className={classes.buttonContainer}>
                <Grid item justifyContent={'flex-start'}>
                  <label>Collection Image : </label>
                </Grid>
                <Grid item justifyContent={'flex-end'}>
                  <ImageUpload
                    onClear={() => {}}
                    onChange={(value: string) =>
                      setNftData({
                        ...nftData,
                        image: value,
                      })
                    }></ImageUpload>
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
                      })}>
                      {nft.metadata.name + '(' + nft.metadata.symbol + ')'}
                    </MenuItem>
                  );
                })}
              </CustomSelect>
            ) : (
              <p>You do not have any nft</p>
            )
          ) : undefined}
        </Grid>
        <Grid
          paddingTop={2}
          container
          justifyContent={'space-between'}
          width={'100%'}>
          <CustomButton onClick={backStep} disabled={false} label="BACK" />
          <CustomButton onClick={createDao} disabled={disable()} label="NEXT" />
        </Grid>
      </Stack>
    </Grid>
  );
};

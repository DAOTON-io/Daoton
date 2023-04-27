import React, {useEffect, useState} from 'react';
import {Grid, MenuItem, SelectChangeEvent, Stack, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {fetchTokens} from '../../lib/api';
import {useTonAddress} from '@tonconnect/ui-react';
import {TokenDetailType, TokensType} from '../../utils/types';
import {TOKEN_TYPES} from '../../utils/enums';
import {CustomInput} from '../../components/CustomInput';
import {CustomButton} from '../../components/CustomButton';
import {CustomSelect} from '../../components/CustomSelect';
import {CustomSwitch} from '../../components/CustomSwitch';

type Props = {
  activeStepOnChange: (activeStep: number) => void;
  tokenDetailOnChange: (tokenDetail: TokenDetailType) => void;
  tokenDetail: TokenDetailType;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: 6,
    marginTop: 6,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const TokenDetail: React.FC<Props> = ({
  activeStepOnChange,
  tokenDetailOnChange,
  tokenDetail,
}) => {
  const [tokenType, setTokenType] = useState<TOKEN_TYPES>(
    TOKEN_TYPES.NEW_TOKEN,
  );
  const [tokens, setTokens] = useState<TokensType[]>([]);
  const [data, setData] = useState<TokenDetailType>({
    name: '',
    type: tokenType,
    symbol: '',
    mintable: true,
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
        // try {
        //   const nftList = await fetchNfts(address);
        //   setNftCollections(nftList.collections as any);
        // } catch {}
      };

      fetchInitData();
    }
  }, [address]);

  useEffect(() => {
    if (tokenDetail) setData(tokenDetail);
  }, [tokenDetail]);

  const selectToken = (e: SelectChangeEvent) => {
    e.preventDefault();
    const tokenValue = JSON.parse(e.target.value);
    setData({
      ...data,
      name: tokenValue.metadata.name,
      symbol: tokenValue.metadata.symbol,
    });
  };

  const createDao = () => {
    activeStepOnChange(4);
    tokenDetailOnChange(data);
  };

  const backStep = () => {
    activeStepOnChange(2);
    tokenDetailOnChange(data);
  };

  return (
    <Grid container className={classes.container}>
      <Stack direction="column" spacing={2} maxWidth={'400px'} marginTop={4}>
        <Grid item>
          <CustomSelect
            onChange={(e: any) => setTokenType(e.target.value as TOKEN_TYPES)}
            values={tokenType}>
            {' '}
            <MenuItem value={TOKEN_TYPES.NEW_TOKEN}>
              {TOKEN_TYPES.NEW_TOKEN}
            </MenuItem>
            <MenuItem value={TOKEN_TYPES.TOKEN_FROM_WALLET}>
              {TOKEN_TYPES.TOKEN_FROM_WALLET}
            </MenuItem>
          </CustomSelect>
        </Grid>

        <Grid item>
          {tokenType === TOKEN_TYPES.NEW_TOKEN ? (
            <Grid item>
              <CustomInput
                placeholder="Token Name"
                id="name"
                name="name"
                value={data.name}
                onChange={(e: any) => setData({...data, name: e.target.value})}
              />
              <CustomInput
                placeholder="Token Symbol"
                id="symbol"
                name="symbol"
                value={data.symbol}
                onChange={(e: any) =>
                  setData({...data, symbol: e.target.value})
                }
              />
              <Grid item>
                <span style={{marginTop: '1rem'}}>
                  Token non-mintable ise bu anahtarı kapatın.
                </span>
                <CustomSwitch
                  checked={data.mintable}
                  onChange={(e: any) =>
                    setData({...data, mintable: e.target.checked})
                  }
                />
              </Grid>
            </Grid>
          ) : tokenType === TOKEN_TYPES.TOKEN_FROM_WALLET ? (
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
          ) : undefined}
        </Grid>

        <Grid
          paddingTop={2}
          container
          justifyContent={'space-between'}
          width={'100%'}>
          <CustomButton onClick={backStep} disabled={false} label="BACK" />
          <CustomButton
            onClick={createDao}
            disabled={!(data.name && data.symbol)}
            label="NEXT"
          />
        </Grid>
      </Stack>
    </Grid>
  );
};

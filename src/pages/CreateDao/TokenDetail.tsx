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
import {ImageUpload} from '../../components/imageUpload';

type Props = {
  activeStepOnChange: (activeStep: number) => void;
  tokenDetailOnChange: (tokenDetail: TokenDetailType) => void;
  tokenDetail: TokenDetailType;
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
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
}) => {
  const [tokenType, setTokenType] = useState<TOKEN_TYPES>(
    TOKEN_TYPES.NEW_TOKEN,
  );
  const [tokens, setTokens] = useState<TokensType[]>([]);
  const [data, setData] = useState<TokenDetailType>({
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

  const disabled = !(
    data.name &&
    data.description &&
    data.symbol &&
    data.amount &&
    data.decimal
  );

  return (
    <Grid container className={classes.container} overflow={'auto'}>
      <Stack direction="column" spacing={2} marginTop={4}>
        <Stack>
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
        </Stack>

        <Grid item>
          {tokenType === TOKEN_TYPES.NEW_TOKEN ? (
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Token Name"
                  label="Token Name"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e: any) =>
                    setData({...data, name: e.target.value})
                  }
                />
                <CustomInput
                  placeholder="Token Description"
                  label="Token Description"
                  id="description"
                  name="description"
                  value={data.description}
                  onChange={(e: any) =>
                    setData({...data, description: e.target.value})
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Token Symbol"
                  label="Token Symbol"
                  id="symbol"
                  name="symbol"
                  value={data.symbol}
                  onChange={(e: any) =>
                    setData({...data, symbol: e.target.value})
                  }
                />
                <CustomInput
                  placeholder="Token Amount"
                  label="Token Amount"
                  id="amount"
                  name="amount"
                  value={data.amount}
                  onChange={(e: any) =>
                    setData({...data, amount: e.target.value})
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <CustomInput
                  placeholder="Token Decimal"
                  label="Token Decimal"
                  id="decimal"
                  name="decimal"
                  value={data.decimal}
                  onChange={(e: any) =>
                    setData({...data, decimal: e.target.value})
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2} paddingTop={1}>
                <Grid item>
                  <span style={{marginTop: '1rem'}}>Pausable Contract:</span>
                  <CustomSwitch
                    checked={data.pausableContract}
                    onChange={(e: any) =>
                      setData({...data, pausableContract: e.target.checked})
                    }
                  />
                </Grid>
                <Grid item>
                  <span style={{marginTop: '1rem'}}>Stackable Contract:</span>
                  <CustomSwitch
                    checked={data.stackableContract}
                    onChange={(e: any) =>
                      setData({...data, stackableContract: e.target.checked})
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
                    onChange={() => {}}
                    onClear={() => {}}></ImageUpload>
                </Grid>
              </Grid>
            </Stack>
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
          <CustomButton onClick={createDao} disabled={disabled} label="NEXT" />
        </Grid>
      </Stack>
    </Grid>
  );
};

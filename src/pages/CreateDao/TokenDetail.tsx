import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Theme,
} from '@mui/material';
import {fetchTokens} from '../../lib/api';
import {useTonAddress} from '@tonconnect/ui-react';
import {TokenDetailType, TokensType} from '../../utils/types';
import {TOKEN_TYPES} from '../../utils/enums';

type Props = {
  activeStepOnChange: (activeStep: number) => void;
  tokenDetailOnChange: (tokenDetail: TokenDetailType) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    padding: '10px',
    backgroundColor: '#2D6495',
    color: '#E7F4FF',
    border: 'none',
    borderRadius: '16px',
    minWidth: '235px',
    minHeight: '44px',
    fontFamily: 'Raleway',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      minWidth: '200px',
    },
  },
  select: {
    fontFamily: 'Raleway',
    width: '100%',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1D252C',
    border: 'none',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    backgroundColor: '#A2C5E3',
    padding: '10px',
    borderRadius: '0.5rem',
  },
  input: {
    borderRadius: '16px',
    borderColor: '#A2C5E3',
    borderWidth: '1px',
    maxWidth: '400px',
    color: '#767D86',
    minHeight: '44px',
    padding: '12px',
    boxShadow: 'none',
    fontSize: '16px',
    fontFamily: 'Raleway',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      minWidth: '300px',
    },
  },
  center: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  container: {
    marginBottom: 6,
    marginTop: 6,
    padding: '64px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
  },
}));

export const TokenDetail: React.FC<Props> = ({
  activeStepOnChange,
  tokenDetailOnChange,
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

  const classes = useStyles();
  const address = useTonAddress();

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

  return (
    <Grid item>
      <Grid item>
        <Select
          className={classes.select}
          id="type"
          name="type"
          value={tokenType}
          onChange={e => setTokenType(e.target.value as TOKEN_TYPES)}>
          <MenuItem value={TOKEN_TYPES.NEW_TOKEN}>
            {TOKEN_TYPES.NEW_TOKEN}
          </MenuItem>
          <MenuItem value={TOKEN_TYPES.TOKEN_FROM_WALLET}>
            {TOKEN_TYPES.TOKEN_FROM_WALLET}
          </MenuItem>
        </Select>
      </Grid>

      <Grid item>
        {tokenType === TOKEN_TYPES.NEW_TOKEN ? (
          <Grid item>
            <TextField
              className={classes.input}
              placeholder="Token Name"
              id="name"
              name="name"
              value={data.name}
              onChange={e => setData({...data, name: e.target.value})}
              required
            />
            <TextField
              className={classes.input}
              placeholder="Token Symbol"
              id="symbol"
              name="symbol"
              value={data.symbol}
              onChange={e => setData({...data, symbol: e.target.value})}
              required
            />
            <Grid item>
              <span>Token non-mintable ise bu anahtarı kapatın.</span>
              <Switch
                checked={data.mintable}
                onChange={e => setData({...data, mintable: e.target.checked})}
                defaultChecked
              />
            </Grid>
          </Grid>
        ) : tokenType === TOKEN_TYPES.TOKEN_FROM_WALLET ? (
          <Select
            className={classes.select}
            placeholder="Token"
            onChange={selectToken}>
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
          </Select>
        ) : undefined}
      </Grid>

      <Grid paddingTop={2} container justifyContent={'center'}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            createDao();
          }}
          disabled={!(data.name && data.symbol)}>
          Generate
        </Button>
      </Grid>
    </Grid>
  );
};

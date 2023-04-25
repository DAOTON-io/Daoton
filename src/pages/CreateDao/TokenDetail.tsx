import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Grid, Switch} from '@mui/material';
import {fetchTokens} from '../../lib/api';
import {useTonAddress} from '@tonconnect/ui-react';

const useStyles = makeStyles(theme => ({
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

type Props = {
  activeStepOnChange: (activeStep: number) => void;
};

export const TokenDetail: React.FC<Props> = ({activeStepOnChange}) => {
  const [tokenType, setTokenType] = useState<number>(1);
  const [tokens, setTokens] = useState([]);
  const [data, setData] = useState({
    name: '',
    type: tokenType,
    symbol: '',
    mintable: false,
  });

  const classes = useStyles();
  const address = useTonAddress();

  useEffect(() => {
    if (address) {
      //TODO will fix nft collection
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

  const createDao = () => {
    console.log('data token detail', data);
  };

  return (
    <Grid item>
      <Grid item>
        <select
          className={classes.select}
          id="type"
          name="type"
          value={tokenType}
          onChange={e => setTokenType(Number(e.target.value))}>
          <option value="1">New Token</option>
          <option value="2">Token From Wallet</option>
        </select>
      </Grid>

      <Grid item>
        {tokenType === 1 ? (
          <Grid item>
            <input
              className={classes.input}
              placeholder="Token Name"
              id="name"
              name="name"
              value={data.name}
              onChange={e => setData({...data, name: e.target.value})}></input>
            <input
              className={classes.input}
              placeholder="Token Symbol"
              id="symbol"
              name="symbol"
              value={data.symbol}
              onChange={e =>
                setData({...data, symbol: e.target.value})
              }></input>
            <Grid item>
              <span>Token non-mintable ise bu anahtarı kapatın.</span>
              <Switch
                checked={data.mintable}
                onChange={e => setData({...data, mintable: e.target.checked})}
                defaultChecked
              />
            </Grid>
          </Grid>
        ) : tokenType === 2 ? (
          <select className={classes.select} placeholder="Token">
            {tokens.map((tk: any) => {
              return (
                <option value={tk.jetton_address}>
                  {tk.metadata.name + '(' + tk.metadata.symbol + ')'}
                </option>
              );
            })}
          </select>
        ) : undefined}
      </Grid>

      <Grid paddingTop={2} container justifyContent={'center'}>
        <button
          className={classes.button}
          onClick={() => {
            createDao();
            activeStepOnChange(4);
          }}>
          Generate
        </button>
      </Grid>
    </Grid>
  );
};

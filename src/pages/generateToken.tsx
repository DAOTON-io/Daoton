import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Grid, Stack, Card, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import GoogleFontLoader from 'react-google-font-loader';
import {useTonConnectUI, useTonAddress} from '@tonconnect/ui-react';
import {Address, toNano, contractAddress, Cell} from 'ton';
import toastr from 'toastr';
import SideMenu from '../components/sideMenu';
import {createDeployParams} from '../lib/token-minter/deployer';
import DrawerAppBar from '../components/mobilMenu';
import {ImageUpload} from '../components/imageUpload';
import {fetchDecimalsOffchain, toDecimalsBN} from '../utils/utils';
import {GenerateTokenType} from '../utils/types';
import {CustomInput} from '../components/CustomInput';
import {CustomSwitch} from '../components/CustomSwitch';
import {CustomButton} from '../components/CustomButton';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '26px',
    color: '#0F2233',
    paddingBottom: '2rem',
    position: 'relative',
    top: '1rem',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
  },
  buttonContainer: {
    paddingRight: '32px',
    paddingLeft: '32px',
    textAlign: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '16px',
      paddingLeft: '16px',
    },
  },
  stackContainer: {
    minWidth: '25rem',
    marginTop: '0 !important',
    [theme.breakpoints.down('sm')]: {
      minWidth: '10rem',
    },
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '65vh',
    overflow: 'auto',
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      //height: '25rem',
    },
  },
}));

const GenerateToken: React.FC = () => {
  const [data, setData] = useState<GenerateTokenType>({
    name: '',
    symbol: '',
    decimal: 9,
    amount: 0,
    description: '',
    isPausable: false,
    isStackable: false,
    offchainUri: '',
  });

  const classes = useStyles();
  let address = useTonAddress();
  const [tonConnectUi] = useTonConnectUI();
  const navigate = useNavigate();

  const generateToken = async () => {
    const editedAddress = Address.parse(address);

    let dc = data.decimal;
    if (data.offchainUri) {
      let res = await fetchDecimalsOffchain(
        data.offchainUri.replace('ipfs://', 'https://ipfs.io/ipfs/'),
      );
      dc = res.decimals;
    }

    const params = {
      owner: editedAddress,
      onchainMetaData: {
        name: data.name,
        symbol: data.symbol,
        description: data.description,
        decimals: dc.toFixed(0),
        // isPausable: data.isPausable,
      },
      // offchainUri: data.offchainUri,
      amountToMint: toDecimalsBN(data.amount, dc),
    };

    const deployParams = createDeployParams(params, data.offchainUri);

    const contractAddressHex = contractAddress({
      workchain: 0,
      initialCode: deployParams.code,
      initialData: deployParams.data,
    }).toString();

    console.log('contractAddressHex', contractAddressHex);

    const state_init = new Cell();
    state_init.bits.writeUint(6, 5);
    state_init.refs.push(deployParams.code);
    state_init.refs.push(deployParams.data);

    const aa = await state_init.toBoc();
    const bb = aa.toString('base64');

    const py = await deployParams.message.toBoc();

    const defaultTx2 = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: contractAddressHex,
          amount: toNano(0.25).toNumber().toString(),
          stateInit: bb,
          payload: py.toString('base64'),
        },
      ],
    };

    tonConnectUi.sendTransaction(defaultTx2).then(() => {
      navigate('/view-tokens');
      toastr.success(contractAddressHex, 'Jetton deployed successfully.');
    });
  };

  return (
    <Grid container spacing={2} overflow={'auto'}>
      <Grid item lg={2} md={3}>
        <SideMenu />
      </Grid>

      <Grid item lg={10} md={9} xs={12}>
        <Grid container direction={'column'} spacing={2}>
          <Grid item>
            <DrawerAppBar />
          </Grid>
          <Grid item>
            <Card
              sx={{
                borderRadius: '40px',
              }}>
              <GoogleFontLoader
                fonts={[{font: 'Raleway', weights: [700, '700i', 500, '500i']}]}
                subsets={['cyrillic-ext', 'greek']}
              />
              <div
                style={{
                  height: '80vh',
                  minWidth: '21rem',
                  padding: '1rem',
                }}>
                <Grid container className={classes.container}>
                  <Grid
                    container
                    lg={9}
                    md={8}
                    sm={11}
                    xs={12}
                    className={classes.center}>
                    <h5 className={classes.title}>Generate Token</h5>

                    <Grid container className={classes.gridContainer}>
                      <Stack
                        spacing={2}
                        direction={'column'}
                        marginTop={4}
                        className={classes.stackContainer}>
                        <CustomInput
                          placeholder="Name"
                          label="Name"
                          id="name"
                          name="name"
                          value={data.name}
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              name: e.target.value,
                            })
                          }
                        />
                        <CustomInput
                          placeholder="Description"
                          label="Description"
                          id="description"
                          name="description"
                          value={data.description}
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              description: e.target.value,
                            })
                          }
                        />
                        <CustomInput
                          placeholder="Symbol"
                          label="Symbol"
                          id="symbol"
                          name="symbol"
                          value={data.symbol}
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              symbol: e.target.value,
                            })
                          }
                        />
                        <CustomInput
                          placeholder="Amount"
                          label="Amount"
                          id="amount"
                          name="amount"
                          value={data.amount}
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              amount: parseInt(e.target.value),
                            })
                          }
                        />
                        <CustomInput
                          placeholder="Decimal"
                          label="Decimal"
                          id="decimal"
                          name="decimal"
                          value={data.decimal}
                          onChange={(e: any) =>
                            setData({
                              ...data,
                              decimal: parseInt(e.target.value),
                            })
                          }
                        />
                        <Grid
                          direction={'column'}
                          container
                          justifyContent={'center'}>
                          <Grid container className={classes.buttonContainer}>
                            <Grid item>
                              <label>Pausable Contract : </label>
                            </Grid>
                            <Grid item>
                              <CustomSwitch
                                checked={data.isPausable}
                                onChange={(e: any) =>
                                  setData({
                                    ...data,
                                    isPausable: !data.isPausable,
                                  })
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.buttonContainer}>
                            <Grid item>
                              <label>Stackable Contract : </label>
                            </Grid>
                            <Grid item>
                              <CustomSwitch
                                checked={data.isStackable}
                                onChange={(e: any) =>
                                  setData({
                                    ...data,
                                    isStackable: !data.isStackable,
                                  })
                                }
                              />
                            </Grid>
                          </Grid>
                          <Grid container className={classes.buttonContainer}>
                            <Grid item justifyContent={'flex-start'}>
                              <label>Collection Image : </label>
                            </Grid>
                            <Grid item justifyContent={'flex-start'}>
                              <ImageUpload
                                onChange={() => {}}
                                onClear={() => {}}></ImageUpload>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          paddingTop={2}
                          container
                          justifyContent={'center'}>
                          <CustomButton
                            onClick={generateToken}
                            disabled={false}
                            label="Mint Token"
                          />
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GenerateToken;

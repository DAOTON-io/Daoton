import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Grid, Stack, Card} from '@mui/material';
import {makeStyles} from '@mui/styles';
import GoogleFontLoader from 'react-google-font-loader';
import {useTonConnectUI, useTonAddress} from '@tonconnect/ui-react';
import {create} from 'ipfs';
import SideMenu from '../components/sideMenu';
import NftMinter from '../lib/nft-minter';
import DrawerAppBar from '../components/mobilMenu';
import {ImageUpload} from '../components/imageUpload';
import {CollectionDataType} from '../utils/types';
import {CustomInput} from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';

const useStyles = makeStyles(theme => ({
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
    paddingRight: '2rem',
    paddingLeft: '2rem',
    textAlign: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '1rem',
      paddingLeft: '1rem',
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
  },
}));

const GenerateCollection = () => {
  const [collectionData, setCollectionData] = useState<CollectionDataType>({
    collectionName: '',
    collectionDescription: '',
    collectionImage: '',
  });

  const classes = useStyles();
  const navigate = useNavigate();
  let address = useTonAddress(true);
  const [tonConnectUi] = useTonConnectUI();

  const generateCollection = async () => {
    if (address) {
      const node = await create();
      const nftCollectionUri = await node.add(
        JSON.stringify({
          name: collectionData.collectionName,
          description: collectionData.collectionDescription,
          image: collectionData.collectionImage,
          external_link: 'example.com',
          seller_fee_basis_points: 100,
          fee_recipient: '0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721',
        }),
      );

      const minter = new NftMinter(
        address,
        tonConnectUi,
        'https://ipfs.io/ipfs/' + nftCollectionUri.path,
      );
      minter.deployNftCollection().then(() => {
        navigate('/generate-nft');
      });
    }
  };

  return (
    <Grid container spacing={2}>
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
                  <Grid container className={classes.center}>
                    <h5 className={classes.title}>Generate Collection</h5>

                    <Grid container className={classes.gridContainer}>
                      <Stack
                        spacing={2}
                        marginTop={4}
                        className={classes.stackContainer}
                        direction={'column'}>
                        <CustomInput
                          placeholder="Name"
                          label="Name"
                          id="name"
                          name="name"
                          value={collectionData.collectionName}
                          onChange={(event: any) => {
                            setCollectionData({
                              ...collectionData,
                              collectionName: event.target.value,
                            });
                          }}
                        />
                        <CustomInput
                          placeholder="Description"
                          label="Description"
                          id="description"
                          name="description"
                          value={collectionData.collectionDescription}
                          onChange={(event: any) => {
                            setCollectionData({
                              ...collectionData,
                              collectionDescription: event.target.value,
                            });
                          }}
                        />
                        {/* <input className={classes.inputImage} placeholder="Image*"
                        onChange={(event) => {
                          setCollectionData({ ...collectionData, collectionImage: event.target.value });
                        }}></input> */}

                        <Grid
                          direction={'column'}
                          container
                          justifyContent={'center'}>
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
                        </Grid>

                        <Grid
                          paddingTop={2}
                          container
                          justifyContent={'center'}>
                          <CustomButton
                            onClick={generateCollection}
                            disabled={false}
                            label="Generate"
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

export default GenerateCollection;

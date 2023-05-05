/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Grid, Card, Typography, Box, CircularProgress} from '@mui/material';
import SideMenu from '../components/SideMenu';
import {makeStyles} from '@mui/styles';
import {useState, useEffect} from 'react';
import {fetchNfts} from '../lib/api';
import {NftCard} from '../components/nft-item';
import {useTonAddress} from '@tonconnect/ui-react';
import DrawerAppBar from '../components/mobilMenu';

export default function ViewNft() {
  const classes = useStyles();

  const [nfts, setNfts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  const address = useTonAddress();

  useEffect(() => {
    const fetchData = async () => {
      if (address) {
        const nftResponse = await fetchNfts(address);
        const nftData = nftResponse.nftItems;

        setNfts(nftData);
        nftData.map((item: {metadata: any}) => console.log(item.metadata));
      }
      setLoading(false);
    };
    fetchData();
  }, [address]);

  return (
    <div>
      <div
        style={{
          backgroundColor: '#E7EBF1',
        }}>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <SideMenu />
          </Grid>
          <Grid item md={10} xs={12}>
            <DrawerAppBar />
            <div
              style={{
                height: '100vh',
                width: '100%',
                overflow: 'auto', // Kaydırma çubuğu eklemek için
                marginTop: '0.5em',
              }}>
              {/* //TODO cozemedigim bir hata */}
              {/* {loading && (
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", width: "80vw" }}>
                                    <CircularProgress />
                                </Box>
                            )} */}
              <Grid
                container
                style={{
                  position: '-webkit-sticky',
                  top: '0',
                }}>
                {loading ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '60vh',
                      width: '80vw',
                    }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {nfts.length === 0 && (
                      <Grid
                        item
                        md={12}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                        }}>
                        <Card
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            padding: '5rem 2.5rem',
                            marginTop: '2rem',
                            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                          }}>
                          <Typography
                            style={{
                              color: '#1689c5',
                              fontSize: '30px',
                              fontWeight: 'bold',
                            }}>
                            There are no Nft's
                          </Typography>
                        </Card>
                      </Grid>
                    )}

                    {nfts.map((item: any) => (
                      <Grid
                        item
                        margin={1}
                        md={3.75}
                        justifyContent={'space-around'}>
                        <a style={{textDecoration: 'none'}}>
                          <NftCard
                            name={item.metadata.name}
                            address={
                              item.address.slice(0, 4) +
                              '...' +
                              item.address.slice(-4)
                            }
                            collectionAddress={
                              item.collection_address.slice(0, 4) +
                              '...' +
                              item.collection_address.slice(-4)
                            }
                            description={item.metadata.description}
                            image={item.metadata.image}></NftCard>
                        </a>
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: '#2D6495',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    height: '90vh',
    color: 'white',
    padding: '10px',
    borderRadius: '1rem',
  },
  listItem: {
    padding: '10px',
    color: 'white',
  },
  listItemSmall: {
    marginBottom: '1rem',
    '&:hover': {
      borderRadius: 4,
      backgroundColor: '#1689c5',
    },
  },

  divider: {
    backgroundColor: 'white',
    color: 'white',
  },
  title: {
    color: 'white',
    marginBottom: '0.5rem',
    fontSize: '14px',
  },
  item: {
    color: 'white',
  },
}));

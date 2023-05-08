import React from 'react';
import {Grid, Card, Typography, Box, CircularProgress} from '@mui/material';
import {useState, useEffect} from 'react';
import {fetchNfts} from '../lib/api';
import {NftCard} from '../components/NftItem';
import {useTonAddress} from '@tonconnect/ui-react';

const ViewNft = () => {
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
              <Grid item margin={1} md={3.75} justifyContent={'space-around'}>
                <a style={{textDecoration: 'none'}}>
                  <NftCard
                    name={item.metadata.name}
                    address={
                      item.address.slice(0, 4) + '...' + item.address.slice(-4)
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
  );
};

export default ViewNft;

import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useTonConnectUI} from '@tonconnect/ui-react';
import axios from 'axios';
import GoogleFontLoader from 'react-google-font-loader';
import {useParams} from 'react-router-dom';
import {Button, Card} from 'reactstrap';
import TonWeb from 'tonweb';
import DrawerAppBar from '../components/mobilMenu';
import SideMenu from '../components/SideMenu';
import getCurrentValue from '../utils/get_current_value';

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
    fontSize: '28px',
    marginTop: '1rem',
    marginBottom: '1rem',
    fontFamily: 'Signika Negative',
    color: 'black',
  },
  info: {
    color: 'black',
    fontSize: '16px',
    marginBottom: '0.33rem',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    display: 'flex',
    fontFamily: 'Signika Negative',
  },
  center: {
    justifyContent: 'center !important',
    alignItems: 'center !important',
    display: 'flex',
  },
  Button: {
    fontFamily: 'Signika Negative',
    padding: '10px',
    backgroundColor: '#ff761c',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    marginTop: '1rem',
    minWidth: '100px',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    color: 'white',
    padding: '20px',
    borderRadius: '0.5rem',
    height: '55vh',
  },
  cardName: {
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    color: 'white',
    padding: '20px',
    borderRadius: '0.5rem',
  },
});

export default function Vote() {
  const classes = useStyles();
  const [tonConnectUi] = useTonConnectUI();
  const {proposalId} = useParams();
  const [proposal, setProposal] = useState<any>();
  const [votes, setVotes] = useState([]);
  useEffect(() => {
    //get proposals from API and save to rows. Api is 188.132.128.77:1423/getContracts/:id
    axios
      .get(
        `https://0xfb5f6301747772afa27c55100b95eb29f07dbeb5.diode.link/getContractDetails/${proposalId}`,
      )
      .then(res => {
        console.log(res.data);
        const proposal = res.data[0];
        setProposal(proposal);
      });

    getCurrentValue(proposalId as any).then((votes: any) => {
      setVotes(votes);
      console.log(Date.now() - votes[4]);
      console.log(votes);
    });
  }, [proposalId]);

  const voteYes = async () => {
    let a = new TonWeb.boc.Cell();
    a.bits.writeUint(0, 32);
    let payload = TonWeb.utils.bytesToBase64(await a.toBoc());

    let contractAddressHex = proposalId;
    const defaultTx2 = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: contractAddressHex || '',
          amount: '6900000',
          payload: payload,
        },
      ],
    };

    tonConnectUi.sendTransaction(defaultTx2);
  };

  const voteNo = async () => {
    let a = new TonWeb.boc.Cell();
    a.bits.writeUint(1, 32);

    let payload = TonWeb.utils.bytesToBase64(await a.toBoc());

    let contractAddressHex = proposalId;
    const defaultTx2 = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: contractAddressHex || '',
          amount: '6900000',
          payload: payload,
        },
      ],
    };
    tonConnectUi.sendTransaction(defaultTx2);
  };

  return (
    <div>
      <GoogleFontLoader
        fonts={[
          {
            font: 'Signika Negative',
            weights: [400, '400i'],
          },
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />
      <div
        style={{
          backgroundColor: '#E7EBF1',
        }}>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <SideMenu />
          </Grid>
          <Grid item md={10}>
            <DrawerAppBar />
            <div>
              <Card className={classes.cardName}>
                <Grid
                  container
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  {' '}
                  <p className={classes.title}>
                    {proposal ? proposal.contract_description : ''}
                  </p>
                </Grid>
              </Card>
              <p className={classes.title}>Vote</p>
              <Card className={classes.card}>
                <Grid
                  container
                  alignItems={'center'}
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                  spacing={2}>
                  <Grid item>
                    <Button onClick={voteYes} className={classes.Button}>
                      Yes
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={voteNo} className={classes.Button}>
                      No
                    </Button>
                  </Grid>
                </Grid>
                {/* Display time left to vote ending. Display ended if already ended. */}

                <Grid
                  container
                  alignItems={'center'}
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                  spacing={2}>
                  <Grid item>
                    <p
                      className={classes.info}
                      style={{
                        fontWeight: 'bold',
                      }}>
                      Time left to vote:{' '}
                    </p>
                  </Grid>
                  <Grid item>
                    <p
                      className={classes.info}
                      style={{
                        fontWeight: 'bold',
                        //Check if bigger than 10 minutes
                      }}>
                      {Date.now() - votes[4] < 600000
                        ? new Date(
                            600000 - (Date.now() - votes[4]),
                          ).getHours() + ' minutes'
                        : 'Vote is done!! Result is: ' +
                          (votes[5] / 2 < votes[1] ? 'Yes' : 'No')}
                    </p>
                  </Grid>
                </Grid>

                <Grid
                  container
                  style={{
                    backgroundColor: '#F5F5F5',
                    marginTop: '3rem',
                    width: '100%',
                    padding: '5vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}>
                  <Grid item md={4}>
                    <div
                      style={{
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}>
                      {' '}
                      <Grid container className={classes.center}>
                        <p
                          className={classes.info}
                          style={{
                            fontWeight: 'bold',
                          }}>
                          Vote
                        </p>
                      </Grid>
                      <Grid container className={classes.center}>
                        <p className={classes.info}>{votes[5]}</p>
                      </Grid>
                      <Grid container className={classes.center}>
                        <p className={classes.info}>Quorum 33%</p>
                      </Grid>
                    </div>
                  </Grid>
                  <Grid item md={4}>
                    <Grid container className={classes.center}>
                      <p
                        className={classes.info}
                        style={{
                          fontWeight: 'bold',
                        }}>
                        Yes
                      </p>
                    </Grid>
                    <Grid container className={classes.center}>
                      <p className={classes.info}>{votes[1]}</p>
                    </Grid>
                    <Grid container className={classes.center}>
                      <p className={classes.info}>Quorum: 33%</p>
                    </Grid>
                  </Grid>
                  <Grid item md={4}>
                    <Grid container className={classes.center}>
                      <p
                        className={classes.info}
                        style={{
                          fontWeight: 'bold',
                        }}>
                        No
                      </p>
                    </Grid>
                    <Grid container className={classes.center}>
                      <p className={classes.info}>{votes[0]}</p>
                    </Grid>
                    <Grid container className={classes.center}>
                      <p className={classes.info}>Quorum: 33%</p>
                    </Grid>
                  </Grid>
                  <Grid item md={4}>
                    <Grid container className={classes.center}>
                      <p
                        className={classes.info}
                        style={{
                          fontWeight: 'bold',
                        }}>
                        No with Veto
                      </p>
                    </Grid>
                    <Grid container className={classes.center}>
                      <p className={classes.info}>{votes[2]}</p>
                    </Grid>
                    <Grid container className={classes.center}>
                      <p className={classes.info}>Quorum: 33%</p>
                    </Grid>
                  </Grid>
                  <Grid item md={4}>
                    <Grid container className={classes.center}>
                      <p
                        className={classes.info}
                        style={{
                          fontWeight: 'bold',
                        }}>
                        Abstain
                      </p>
                    </Grid>
                    <Grid container className={classes.center}>
                      <p className={classes.info}>{votes[3]}</p>
                    </Grid>
                    <Grid container className={classes.center}>
                      <p className={classes.info}>Quorum: 33%</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

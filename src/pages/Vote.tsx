import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {useParams} from 'react-router-dom';
import {Address} from 'ton-core';
import DaoContract from '../lib/dao/lib/DaoContract';
import {getHttpEndpoint} from '@orbs-network/ton-access';
import {TonClient, beginCell, toNano} from 'ton';
import {open} from '../utils/index';
import {ProposalType} from '../utils/types';
import toastr from 'toastr';
import {CustomButton} from '../components/CustomButton';

const useStyles = makeStyles({
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
  button: {
    padding: '10px !important',
    backgroundColor: '#ff761c !important',
    color: 'white !important',
    border: 'none !important',
    borderRadius: '0.5rem !important',
    marginTop: '1rem !important',
    minWidth: '100px !important',
    marginBottom: '1rem !important',
    cursor: 'pointer !important',
  },
});

export default function Vote() {
  const classes = useStyles();
  const [tonConnectUi] = useTonConnectUI();
  const [proposal, setProposal] = useState<ProposalType>();
  const [loading, setLoading] = useState<boolean>(true);

  const {daoId, proposalId} = useParams();

  useEffect(() => {
    const init = async () => {
      if (daoId) {
        const daoContractAddress = Address.parse(daoId);
        const daoMasterContract = new DaoContract(daoContractAddress);

        const endpoint = await getHttpEndpoint({network: 'testnet'});
        const client = new TonClient({endpoint});
        const daoContract = open(daoMasterContract, client);

        const proposal = await daoContract.getProposalById(
          Number(proposalId),
          client,
        );

        setProposal(proposal);

        setLoading(false);
      }
    };

    init();
  }, [daoId, proposalId]);

  const voteProposal = async (decision: number) => {
    if (daoId && proposalId) {
      const daoContract = Address.parse(daoId);

      const message = beginCell()
        .storeUint(2, 32) // op (op #2 = vote)
        .storeUint(Number(proposalId), 32) // propsal_id
        .storeUint(decision, 2) // vote
        .endCell();

      const messageBody = message.toBoc();

      const transaction = {
        validUntil: Date.now() + 1000000,
        messages: [
          {
            address: daoContract.toString(),
            amount: toNano(0.01).toNumber().toString(),
            payload: messageBody.toString('base64'),
          },
        ],
      };

      tonConnectUi.sendTransaction(transaction).then(() => {
        toastr.success('Voting created successfully');
      });
    } else {
      toastr.error('Something went wrong check your url');
    }
  };

  if (loading || !proposal) {
    return (
      <div
        style={{
          height: 'calc(100vh - 8rem)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        height: 'calc(100vh - 8rem)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}>
      <Grid item md={12}>
        <Grid item>
          <h3 style={{textAlign: 'center', color: 'black'}}>
            <b>Content:</b>{' '}
            <span style={{fontWeight: 'normal'}}>{proposal.content.text}</span>
          </h3>
        </Grid>
        <Grid
          container
          alignItems={'center'}
          style={{
            justifyContent: 'center',
            display: 'flex',
          }}
          spacing={2}>
          <Grid item>
            <CustomButton
              onClick={() => voteProposal(1)}
              label="Yes"
              className={classes.button}
            />
          </Grid>
          <Grid item>
            <CustomButton
              onClick={() => voteProposal(2)}
              label="No"
              className={classes.button}
            />
          </Grid>
          <Grid item>
            <CustomButton
              onClick={() => voteProposal(0)}
              label="Abstain"
              className={classes.button}
            />
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
          spacing={2}></Grid>

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
              <p className={classes.info}>{proposal.yes}</p>
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
              <p className={classes.info}>{proposal.no}</p>
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
              <p className={classes.info}>{proposal.abstain}</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

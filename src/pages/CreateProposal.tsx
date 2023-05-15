import React, {useState} from 'react';
import {Grid, Stack, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import moment, {Moment} from 'moment';
import {Address, beginCell, toNano, beginDict, Cell} from 'ton';
import {useTonConnectUI} from '@tonconnect/ui-react';
import toastr from 'toastr';
import {useParams} from 'react-router-dom';
import {sha256} from '../lib/token-minter/deployer';
import {ProposalFormType} from '../utils/types';
import {CustomButton} from '../components/CustomButton';
import {CustomInput} from '../components/CustomInput';
import {CustomSwitch} from '../components/CustomSwitch';
import {CustomDateTime} from '../components/CustomDateTime';

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
    overflow: 'auto',
  },
  stackContainer: {
    minWidth: '25rem',
    [theme.breakpoints.down('sm')]: {
      minWidth: '10rem',
      width: '100%',
    },
    marginBottom: '3.5rem',
  },
  buttonContainer: {
    textAlign: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

export const CreateProposal: React.FC = () => {
  const [data, setData] = useState<ProposalFormType>({
    timestamp: moment().unix(),
    successThreshold: 100,
    failThreshold: 0,
    isRelatedWithNft: false,
    content: '',
  });

  const [tonConnectUi] = useTonConnectUI();
  const classes = useStyles();
  const {daoId} = useParams();

  const disable: boolean = !(
    data.successThreshold > data.failThreshold &&
    data.successThreshold &&
    data.successThreshold !== 0 &&
    data.content &&
    data.timestamp > moment().unix()
  );

  const proposalMetadata: any = {
    text: 'utf8',
  };

  const buildDaoOnchainMetadata = (data: any) => {
    const KEYLEN = 256;
    const dict = beginDict(KEYLEN);

    Object.entries(data).forEach(([k, v]: any) => {
      if (!proposalMetadata[k])
        throw new Error(`Unsupported onchain key: ${k}`);
      if (v === undefined || v === '') return;

      let bufferToStore = Buffer.from(v, proposalMetadata[k]);

      const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

      const rootCell = new Cell();
      rootCell.bits.writeUint8(0x00);
      let currentCell = rootCell;

      while (bufferToStore.length > 0) {
        currentCell.bits.writeBuffer(
          bufferToStore.slice(0, CELL_MAX_SIZE_BYTES),
        );
        bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
        if (bufferToStore.length > 0) {
          let newCell = new Cell();
          currentCell.refs.push(newCell);
          currentCell = newCell;
        }
      }

      dict.storeRef(sha256(k), rootCell);
    });

    return beginCell().storeInt(0x00, 8).storeDict(dict.endDict()).endCell();
  };

  const createProposal = async () => {
    let daoContract = {};
    if (daoId) daoContract = Address.parse(daoId);
    const metadata = buildDaoOnchainMetadata({text: data.content});
    const message = beginCell()
      .storeUint(1, 32) // op (op #1 = create proposal)
      .storeCoins(10000000)
      .storeUint(data.timestamp, 64) // timestamp
      .storeCoins(data.successThreshold) // success threshold
      .storeCoins(data.failThreshold) // fail threshold
      .storeUint(data.isRelatedWithNft ? 1 : 0, 2)
      .storeRef(metadata)
      .endCell();

    const messageBody = message.toBoc();

    let tx = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: daoContract.toString(),
          amount: toNano(0.01).toNumber().toString(),
          payload: messageBody.toString('base64'),
        },
      ],
    };

    tonConnectUi.sendTransaction(tx).then(data => {
      // navigate("/view-dao");
      toastr.success('Proposal was created successfully.');
    });
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 9rem)',
        width: '100%',
        overflow: 'auto',
      }}>
      <Grid container className={classes.container}>
        <Grid container className={classes.center} justifyContent={'center'}>
          <Stack
            direction="column"
            spacing={4}
            marginTop={4}
            className={classes.stackContainer}>
            <div style={{marginTop: '1.5rem'}}>
              <CustomDateTime
                label="Timestamp"
                value={data.timestamp}
                onChange={(value: Moment) =>
                  setData({...data, timestamp: value.unix()})
                }
              />
            </div>
            <CustomInput
              placeholder="SuccessTreshold"
              label="SuccessTreshold"
              id="successTreshold"
              name="successTreshold"
              value={data.successThreshold}
              onChange={(e: any) =>
                setData({...data, successThreshold: Number(e.target.value)})
              }
            />
            <CustomInput
              placeholder="FailTreshold"
              label="FailTreshold"
              id="failTreshold"
              name="failTreshold"
              value={data.failThreshold}
              onChange={(e: any) =>
                setData({...data, failThreshold: Number(e.target.value)})
              }
            />
            <CustomInput
              placeholder="Type your proposal"
              label="Proposal Text"
              id="content"
              name="content"
              value={data.content}
              onChange={(e: any) => setData({...data, content: e.target.value})}
            />
            <Grid item>
              <span style={{marginTop: '1rem'}}>Is Related With Nft:</span>
              <CustomSwitch
                checked={data.isRelatedWithNft}
                onChange={(e: any) =>
                  setData({
                    ...data,
                    isRelatedWithNft: e.target.checked,
                  })
                }
              />
            </Grid>
            <Grid paddingTop={2} container justifyContent={'center'}>
              <CustomButton
                onClick={createProposal}
                disabled={disable}
                label="CREATE PROPOSAL"
              />
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

import React, {useState} from 'react';
import {Grid, Stack, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CustomInput} from './CustomInput';
import {CustomSwitch} from './CustomSwitch';
import {CustomButton} from './CustomButton';
import {ProposalType} from '../utils/types';
import {CustomDateTime} from './CustomDateTime';
import moment, {Moment} from 'moment';

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
  const [data, setData] = useState<ProposalType>({
    timestamp: moment().unix(),
    successThreshold: 0,
    failThreshold: 0,
    isRelatedWithNft: false,
    content: '',
  });

  const classes = useStyles();

  const createProposal = () => {
    console.log('proposal', data);
  };

  const disable: boolean = !(
    data.successThreshold > data.failThreshold &&
    data.successThreshold &&
    data.successThreshold !== 0 &&
    data.content &&
    data.timestamp > moment().unix()
  );

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
                setData({...data, successThreshold: e.target.value})
              }
            />
            <CustomInput
              placeholder="FailTreshold"
              label="FailTreshold"
              id="failTreshold"
              name="failTreshold"
              value={data.failThreshold}
              onChange={(e: any) =>
                setData({...data, failThreshold: e.target.value})
              }
            />
            <CustomInput
              placeholder="Content"
              label="Content"
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

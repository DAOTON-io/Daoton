/* eslint-disable @typescript-eslint/no-unused-vars */
import {Grid, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {Card} from 'reactstrap';
import {DaoCard} from '../components/DaoCard';
import axios from 'axios';
import {TonClient} from 'ton';
import {Address} from 'ton-core';
import {getHttpEndpoint} from '@orbs-network/ton-access';
import daoton from '../lib/dao/contracts/daoton.contract.json';
import DaoTonContract from '../lib/dao/lib/DaotonContract';
import {open} from '../utils';

export default function ViewDao() {
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const init = async () => {
      const endpoint = await getHttpEndpoint({network: 'testnet'});
      const client = new TonClient({endpoint});

      const contractAddress = Address.parse(daoton.address);

      // console.log(contractAddress);
      const masterContract = new DaoTonContract(contractAddress);

      const daoContract = open(masterContract, client);

      const daoList = await daoContract.getDaoList();
      console.log(daoList);
      setLoading(false);
    };

    init();
  });
  return (
    <div
      style={{
        height: 'calc(100vh - 8.5rem)',
        width: '100%',
        overflow: 'auto', // Kaydırma çubuğu eklemek için
      }}>
      {' '}
      <Grid container>
        {/* If columns are empty write there are no DAOs in the middle of the screen on a card */}
        {columns.length === 0 && (
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
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}>
                There are no DAOs
              </Typography>
            </Card>
          </Grid>
        )}
        {columns.map((column: any) => (
          <Grid key={column.id} item md={3}>
            <DaoCard
              daoId={column.name}
              name={column.name}
              description={column.description}
              value={column.tokenContract}
              daoImg={column.daoImg}
              // today's date in format: 2021-10-10
              date={
                Date().split(' ')[3] +
                '-' +
                Date().split(' ')[1] +
                '-' +
                Date().split(' ')[2]
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

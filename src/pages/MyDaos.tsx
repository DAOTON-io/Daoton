/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Grid, Theme, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Card} from 'reactstrap';
import {DaoCard} from '../components/DaoCard';

const columnsJson = JSON.parse(localStorage.getItem('daos') || '');

var columns: any = [];

for (var i in columnsJson) columns.push([i, columnsJson[i]]);

export default function MyDao() {
  return (
    <div
      style={{
        height: '100vh',
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
                padding: '5rem',
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
              daoId={column[1].name}
              name={column[1].name}
              description={column[1].desc}
              value={column[1].tokenContract}
              // today's date in format: 2021-10-10
              date={
                Date().split(' ')[3] +
                '-' +
                Date().split(' ')[1] +
                '-' +
                Date().split(' ')[2]
              }
              daoImg={''}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

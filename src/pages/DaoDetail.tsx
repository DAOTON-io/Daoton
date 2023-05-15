import React, {useEffect, useState} from 'react';
import {Address} from 'ton-core';
import {useParams} from 'react-router-dom';
import {TonClient} from 'ton';
import {getHttpEndpoint} from '@orbs-network/ton-access';
import DaoContract from '../lib/dao/lib/DaoContract';
import {open} from '../utils/index';
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem !important',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
  },
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem !important',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    margin: '0',
  },
  card: {
    width: '100%',
    marginBottom: '0.8rem',
  },
}));

type ProposalType = {
  daoName: string;
  daoDescription: string;
  daoAddress: string;
};

const DaoDetail: React.FC = () => {
  const [daoValues, setDaoValues] = useState<ProposalType>({
    daoName: '',
    daoDescription: '',
    daoAddress: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  const {daoId} = useParams();
  const classes = useStyles();

  useEffect(() => {
    const init = async () => {
      if (daoId) {
        const daoContractAddress = Address.parse(daoId);
        const daoMasterContract = new DaoContract(daoContractAddress);

        const endpoint = await getHttpEndpoint({network: 'testnet'});
        const client = new TonClient({endpoint});
        const daoContract = open(daoMasterContract, client);
        const daoData = await daoContract.getDaoData();
        setDaoValues({
          daoName: daoData.content.name,
          daoDescription: daoData.content.description,
          daoAddress: daoData.address,
        });

        setLoading(false);
      }
    };

    init();
  }, [daoId]);

  if (loading) {
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
  } else {
    return (
      <div
        style={{
          height: 'calc(100vh - 8.5rem)',
          width: '100%',
          overflow: 'auto', // Kaydırma çubuğu eklemek için
        }}>
        <Grid container className={classes.cardContainer} spacing={2}>
          <Grid
            item
            justifyContent={'center'}
            className={classes.item}
            sx={{flexDirection: 'column !important'}}>
            <Card className={classes.card}>
              <CardContent>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                  <b>DAO Name:</b> {daoValues.daoName}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                  <b>DAO Description:</b> {daoValues.daoDescription}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                  <b>DAO Address:</b> {daoValues.daoAddress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container className={classes.tableContainer}>
          <Grid
            item
            justifyContent={'center'}
            className={classes.item}
            sx={{flexDirection: 'column !important'}}>
            <TableContainer component={Paper}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map(row => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default DaoDetail;

import React, {ChangeEvent, useEffect, useState} from 'react';
import {Address} from 'ton-core';
import {useNavigate, useParams} from 'react-router-dom';
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
  TablePagination,
  TableRow,
  Theme,
  Typography,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CustomButton} from '../components/CustomButton';
import {Dao, ProposalType} from '../utils/types';
import {categories} from '../components/DaoCategories';

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    justifyContent: 'center',
    margin: '1rem !important',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2,
      marginTop: 2,
      padding: '24px',
    },
  },
  tableContainer: {
    justifyContent: 'center',
    padding: '0 1rem 2rem 1rem;',
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
    padding: '0 !important',
    margin: '0 !important',
  },
  card: {
    width: '100%',
    marginBottom: '0.8rem',
    border: '1px solid #2C6495',
  },
  buttonItem: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: '1rem !important',
  },
  tableItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    overflowX: 'auto',
    border: '1px solid #2C6495',
    borderRadius: '4px',
  },
  table: {overflowX: 'auto'},
  tableHeader: {
    color: '#2C6495 !important',
    fontWeight: 'bold !important',
  },
}));

const DaoDetail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [daoValues, setDaoValues] = useState<Dao>();
  const [proposals, setProposals] = useState<ProposalType[]>();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const classes = useStyles();
  const {daoId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (daoId) {
        const daoContractAddress = Address.parse(daoId);
        const daoMasterContract = new DaoContract(daoContractAddress);

        const endpoint = await getHttpEndpoint({network: 'testnet'});
        const client = new TonClient({endpoint});
        const daoContract = open(daoMasterContract, client);
        const dao = await daoContract.getDaoData();
        const proposals = await daoContract.getProposalList(
          client,
          dao.sequence,
        );

        setDaoValues(dao);
        setProposals(proposals);
        setLoading(false);
      }
    };

    init();
  }, [daoId]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Grid container className={classes.cardContainer}>
          <Grid
            item
            justifyContent={'center'}
            className={classes.item}
            sx={{flexDirection: 'column !important'}}>
            <Card className={classes.card}>
              <CardContent>
                <Typography sx={{mb: 0.5}} color="#2C6495">
                  <b>DAO Name:</b> {daoValues?.content.name}
                </Typography>
                <Typography sx={{mb: 0.5}} color="#2C6495">
                  <b>DAO Address:</b> {daoValues?.address}
                </Typography>
                <Typography sx={{mb: 0.5}} color="#2C6495">
                  <b>DAO Token Address:</b>{' '}
                  {daoValues?.tokenContract.toFriendly()}
                </Typography>
                {daoValues?.nftContract ? (
                  <Typography sx={{mb: 0.5}} color="#2C6495">
                    <b>DAO NFT Address:</b>{' '}
                    {daoValues?.nftContract.toFriendly()}
                  </Typography>
                ) : undefined}
                <Typography sx={{mb: 0.5}} color="#2C6495">
                  It is a{' '}
                  <b>
                    {
                      categories.find(
                        category => category.id === daoValues?.daoTypeId,
                      )?.label
                    }
                  </b>{' '}
                  category. {daoValues?.content.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container className={classes.tableContainer}>
          <Grid item className={classes.buttonItem}>
            <CustomButton
              label="Create Proposal"
              onClick={() =>
                navigate(`/view-dao/${daoValues?.address}/create-proposal`)
              }
            />
          </Grid>
          <Grid
            item
            justifyContent={'center'}
            className={classes.tableItem}
            sx={{flexDirection: 'column !important'}}>
            <TableContainer component={Paper} className={classes.table}>
              <Table
                aria-label="proposal table"
                stickyHeader
                style={{minWidth: '800px'}}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Content
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Owner
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Timestamp
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Balance
                      </Typography>
                    </TableCell>
                    <TableCell align="right" style={{paddingRight: '8px'}}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Vote Count
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        variant="subtitle1"
                        className={classes.tableHeader}>
                        Yes Count
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        No Count
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Abstain Count
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Success Threshold
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Fail Threshold
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        paddingRight: '8px',
                        borderBottom: '1px solid #2C6495',
                      }}>
                      <Typography
                        className={classes.tableHeader}
                        variant="subtitle1">
                        Is Related With NFT?
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {proposals
                    ? proposals
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((proposal: ProposalType, index: number) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': {border: 0},
                            }}>
                            <TableCell align="right">
                              {proposal.content.text}
                            </TableCell>
                            <TableCell align="right">
                              {proposal.owner}
                            </TableCell>
                            <TableCell align="right">
                              {proposal.timestamp}
                            </TableCell>
                            <TableCell align="right">
                              {proposal.balance}
                            </TableCell>
                            <TableCell align="right">
                              {/* {proposal.vote} */}
                              null
                            </TableCell>
                            <TableCell align="right">{proposal.yes}</TableCell>
                            <TableCell align="right">{proposal.no}</TableCell>
                            <TableCell align="right">
                              {proposal.abstain}
                            </TableCell>
                            <TableCell align="right">
                              {proposal.successThreshold}
                            </TableCell>
                            <TableCell align="right">
                              {proposal.failThreshold}
                            </TableCell>
                            <TableCell align="right">
                              {proposal.isRelatedWithNft}
                            </TableCell>
                          </TableRow>
                        ))
                    : undefined}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={proposals!.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default DaoDetail;

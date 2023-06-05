import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Address } from "ton-core";
import { useNavigate, useParams } from "react-router-dom";
import { TonClient, beginCell, Address as TAddress, toNano } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Modal,
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DaoContract from "../lib/dao/lib/DaoContract";
import { open } from "../utils/index";
import { CustomButton } from "../components/CustomButton";
import { Dao, ProposalType } from "../utils/types";
import { categories } from "../components/DaoCategories";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import moment from "moment";
import toastr from "toastr";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CustomInput } from "../components/CustomInput";

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    justifyContent: "center",
    marginTop: "1rem",
    padding: "1rem !important",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
  tableContainer: {
    justifyContent: "center",
    padding: "0 1rem 2rem 1rem;",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 !important",
    margin: "0 !important",
    width: "100%",
  },
  card: {
    width: "100%",
    marginBottom: "0.8rem",
    border: "1px solid #2C6495",
    overflow: "auto !important",

    borderRadius: "1rem !important",
  },
  buttonItem: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: "1rem !important",
  },
  tableItem: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    overflowX: "auto",
    border: "1px solid #2C6495",
    borderRadius: "1rem",
  },
  table: { overflowX: "auto" },
  tableHeader: {
    color: "#2C6495 !important",
    fontWeight: "bold !important",
  },
}));

const DaoDetail: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [daoValues, setDaoValues] = useState<Dao>();
  const [proposals, setProposals] = useState<ProposalType[]>();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [execModal, setExecModal] = useState<{ show: boolean; targetAddress?: string; proposalId?: number }>({ show: false });

  const classes = useStyles();
  const { daoId } = useParams();
  const [tonConnectUi] = useTonConnectUI();
  const address = useTonAddress(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (daoId) {
        const daoContractAddress = Address.parse(daoId);
        const daoMasterContract = new DaoContract(daoContractAddress);

        const endpoint = await getHttpEndpoint({ network: "testnet" });
        const client = new TonClient({ endpoint });
        const daoContract = open(daoMasterContract, client);
        const dao = await daoContract.getDaoData();
        const proposals = await daoContract.getProposalList(client, dao.sequence);

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

  const execute = () => {
    if (execModal.proposalId !== undefined && execModal.targetAddress) {
      const message = beginCell().storeUint(3, 32).storeUint(execModal.proposalId, 32).storeAddress(TAddress.parse(execModal.targetAddress)).endCell();
      const messageBody = message.toBoc();

      const transaction = {
        validUntil: Date.now() + 1000000,
        messages: [
          {
            address: daoId || "",
            amount: toNano(0.01).toNumber().toString(),
            payload: messageBody.toString("base64"),
          },
        ],
      };

      tonConnectUi.sendTransaction(transaction).then(() => {
        toastr.success("Execution created successfully");
        // navigate("/view-dao/" + daoId);
        setExecModal({ show: false });
      });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "calc(100vh - 8rem)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "calc(100vh - 8.5rem)",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container className={classes.cardContainer}>
          <Grid item justifyContent={"center"} className={classes.item} sx={{ flexDirection: "column !important" }}>
            <Card className={classes.card}>
              <CardContent>
                <Typography sx={{ mb: 0.5 }} color="#2C6495">
                  <b>DAO Name:</b> {daoValues?.content.name}
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="#2C6495">
                  <b>DAO Address:</b> {daoValues?.address}
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="#2C6495">
                  <b>DAO Token Address:</b> {daoValues?.tokenContract.toFriendly()}
                </Typography>
                {daoValues?.nftContract ? (
                  <Typography sx={{ mb: 0.5 }} color="#2C6495">
                    <b>DAO NFT Address:</b> {daoValues?.nftContract.toFriendly()}
                  </Typography>
                ) : undefined}
                <Typography sx={{ mb: 0.5 }} color="#2C6495">
                  It is a <b>{categories.find((category) => category.id === daoValues?.daoTypeId)?.label}</b> dao. {daoValues?.content.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container className={classes.tableContainer}>
          <Grid item className={classes.buttonItem}>
            <CustomButton label="Create Proposal" onClick={() => navigate(`/view-dao/${daoValues?.address}/create-proposal`)} />
          </Grid>
          <Grid item justifyContent={"center"} className={classes.tableItem} sx={{ flexDirection: "column !important" }}>
            {proposals?.length !== 0 ? (
              <div>
                <TableContainer component={Paper} className={classes.table}>
                  <Table aria-label="proposal table" stickyHeader style={{ minWidth: "800px" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} variant="subtitle1">
                            Text
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} variant="subtitle1">
                            Owner
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} variant="subtitle1">
                            Timestamp
                          </Typography>
                        </TableCell>
                        {/* <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} variant="subtitle1">
                            Balance
                          </Typography>
                        </TableCell> */}
                        {/* <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} variant="subtitle1">
                            Vote Count
                          </Typography>
                        </TableCell> */}
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography variant="subtitle1" className={classes.tableHeader}>
                            Yes
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} variant="subtitle1">
                            No
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} variant="subtitle1">
                            Abstain
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} noWrap variant="subtitle1">
                            Success T.
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography className={classes.tableHeader} noWrap variant="subtitle1">
                            Fail T.
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography noWrap className={classes.tableHeader} variant="subtitle1">
                            NFT?
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            paddingRight: "8px",
                            borderBottom: "1px solid #2C6495",
                          }}
                        >
                          <Typography noWrap className={classes.tableHeader} variant="subtitle1">
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {proposals?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((proposal: ProposalType, index: number) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="right">
                            <Typography sx={{ fontSize: "0.875rem" }} noWrap>
                              {proposal.content.text}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">{proposal.owner.slice(0, 12) + "..." + proposal.owner.slice(-3)}</TableCell>
                          <TableCell align="right">
                            <Typography sx={{ fontSize: "0.875rem" }} noWrap>
                              {" "}
                              {moment.unix(proposal.timestamp).format("MM/DD/YYYY h:mm A")}
                            </Typography>
                          </TableCell>
                          {/* <TableCell align="right">{proposal.balance}</TableCell> */}
                          {/* <TableCell align="right">
                            {proposal.vote}
                            null
                          </TableCell> */}
                          <TableCell align="right">{proposal.yes}</TableCell>
                          <TableCell align="right">{proposal.no}</TableCell>
                          <TableCell align="right">{proposal.abstain}</TableCell>
                          <TableCell align="right">{proposal.successThreshold}</TableCell>
                          <TableCell align="right">{proposal.failThreshold}</TableCell>
                          <TableCell align="right">
                            <Typography color="#2C6495">{proposal.isRelatedWithNft == true ? <CheckIcon /> : <CloseIcon />}</Typography>
                          </TableCell>
                          <TableCell>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => {
                                  navigate("/vote/" + daoId + "/" + index);
                                }}
                              >
                                Vote
                              </Button>
                              {address === proposal.owner ? (
                                <Button variant="contained" color="secondary" size="small" onClick={() => setExecModal({ show: true, proposalId: index })}>
                                  Exec
                                </Button>
                              ) : undefined}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
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
              </div>
            ) : (
              <Grid
                item
                md={12}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Card
                  style={{
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    padding: "5rem 2.5rem",
                    margin: "2rem",
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography
                    style={{
                      color: "#1689c5",
                      fontSize: "30px",
                      fontWeight: "bold",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    There are no proposal
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Modal
          open={execModal.show}
          onClose={() => {
            setExecModal({ show: false });
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <CustomInput
              label="Target Address"
              value={execModal.targetAddress || ""}
              fullWidth
              onChange={(event: { target: { value: any } }) => {
                setExecModal({ ...execModal, targetAddress: event.target.value });
              }}
              placeholder={"Target Address"}
              id={"taddress"}
              name={"taddress"}
              style={{ minWidth: "20rem" }}
            />

            <CustomButton onClick={execute} label="Execute" />
          </div>
        </Modal>
      </div>
    );
  }
};

export default DaoDetail;

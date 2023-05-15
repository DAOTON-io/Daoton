import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTonConnectUI } from "@tonconnect/ui-react";
import GoogleFontLoader from "react-google-font-loader";
import { useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { Address } from "ton-core";
import DaoContract from "../lib/dao/lib/DaoContract";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, beginCell, toNano } from "ton";
import { open } from "../utils/index";
import { ProposalType } from "../utils/types";
import toastr from "toastr";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    fontSize: "28px",
    marginTop: "1rem",
    marginBottom: "1rem",
    fontFamily: "Signika Negative",
    color: "black",
  },
  info: {
    color: "black",
    fontSize: "16px",
    marginBottom: "0.33rem",
    justifyContent: "center !important",
    alignItems: "center !important",
    display: "flex",
    fontFamily: "Signika Negative",
  },
  center: {
    justifyContent: "center !important",
    alignItems: "center !important",
    display: "flex",
  },
  Button: {
    fontFamily: "Signika Negative",
    padding: "10px",
    backgroundColor: "#ff761c",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    marginTop: "1rem",
    minWidth: "100px",
    marginBottom: "1rem",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    color: "white",
    padding: "20px",
    borderRadius: "0.5rem",
    height: "55vh",
  },
  cardName: {
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    color: "white",
    padding: "20px",
    borderRadius: "0.5rem",
  },
});

export default function Vote() {
  const classes = useStyles();
  const [tonConnectUi] = useTonConnectUI();
  const [proposal, setProposal] = useState<ProposalType>();
  const [loading, setLoading] = useState<boolean>(true);

  const { daoId, proposalId } = useParams();

  useEffect(() => {
    const init = async () => {
      if (daoId) {
        const daoContractAddress = Address.parse(daoId);
        const daoMasterContract = new DaoContract(daoContractAddress);

        const endpoint = await getHttpEndpoint({ network: "testnet" });
        const client = new TonClient({ endpoint });
        const daoContract = open(daoMasterContract, client);

        const proposal = await daoContract.getProposalById(Number(proposalId), client);

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
            payload: messageBody.toString("base64"),
          },
        ],
      };

      tonConnectUi.sendTransaction(transaction).then(() => {
        toastr.success("Voting created successfully");
      });
    } else {
      toastr.error("Something went wrong check your url");
    }
  };

  if (loading || !proposal) {
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
  }

  return (
    <div>
      <GoogleFontLoader
        fonts={[
          {
            font: "Signika Negative",
            weights: [400, "400i"],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <div
        style={{
          backgroundColor: "#E7EBF1",
        }}
      >
        <Grid item md={12}>
          <div>
            <Card className={classes.card}>
              <Grid
                container
                alignItems={"center"}
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
                spacing={2}
              >
                <Grid item>
                  <Button onClick={() => voteProposal(1)} className={classes.Button}>
                    Yes
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => voteProposal(2)} className={classes.Button}>
                    No
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => voteProposal(0)} className={classes.Button}>
                    Abstain
                  </Button>
                </Grid>
              </Grid>
              {/* Display time left to vote ending. Display ended if already ended. */}

              <Grid
                container
                alignItems={"center"}
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
                spacing={2}
              ></Grid>

              <Grid
                container
                style={{
                  backgroundColor: "#F5F5F5",
                  marginTop: "3rem",
                  width: "100%",
                  padding: "5vh",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Grid item md={4}>
                  <Grid container className={classes.center}>
                    <p
                      className={classes.info}
                      style={{
                        fontWeight: "bold",
                      }}
                    >
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
                        fontWeight: "bold",
                      }}
                    >
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
                        fontWeight: "bold",
                      }}
                    >
                      Abstain
                    </p>
                  </Grid>
                  <Grid container className={classes.center}>
                    <p className={classes.info}>{proposal.no}</p>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Grid>
      </div>
    </div>
  );
}

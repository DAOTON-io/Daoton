import { Grid, Menu } from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { Component } from "react";
import { useHref, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
import DaoCard from "../components/dao-card";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";
import StickyHeadTable from "../components/table";
import { Buffer } from 'buffer';
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem",
        [theme.breakpoints.down("md")]: {
            padding: "1rem",
        }
    },
    card: {
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        color: "white",
        padding: "20px",
        borderRadius: "0.5rem",
        height: "78vh",

    },

    title: {
        marginBottom: "0.5rem",
        fontSize: "30px",
        color: "#ff761c",
        fontWeight: "bold",
    },
    form: {
        marginTop: "1rem",
    },
    label: {
        color: "#2AABEE",
        fontSize: "14px",
        fontWeight: "bold",
    },
    button: {
        padding: "10px",
        backgroundColor: "#2AABEE",
        color: "white",
        border: "none",
        borderRadius: "0.5rem",
        marginTop: "1rem",

        marginBottom: '1rem'
    },
    select: {
        marginTop: "0.5rem",

        width: "100%",
        fontSize: "14px",
        fontWeight: "bold",
        color: "white",
        border: "none",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        backgroundColor: '#2AABEE',
        padding: "10px",
        borderRadius: "0.5rem",
    },
    input: {
        marginTop: "0.5rem",
        padding: "10px",
        border: "1px solid #2AABEE",
        borderRadius: "0.5rem",
        width: "200%",
        "&:hover": {
            border: "1px solid #2AABEE",
        },
    },
}));

const writeMayBe = (cell, ref) => {
    if (ref) {
        cell.bits.writeBit(1);
        if (cell.refs.length >= 4) {
            throw new Error('refs overflow')
        }
        cell.refs.push(ref);
    } else {
        cell.bits.writeBit(0);
    }
}

export default function CreateContract() {
    const classes = useStyles();
    const [proposalText, setProposalText] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [treshold, setTreshold] = React.useState("");
    const [tonConnectUi] = useTonConnectUI();
    const { daoId } = useParams();
    const createProposal = async () => {
        console.log("create proposal")
        console.log("Dao id:" + daoId)
        console.log("Proposal text:" + proposalText)

        // deploy voting contract
        let code = TonWeb.boc.Cell.fromBoc('b5ee9c72c101040100a500000d122a0114ff00f4a413f4bcf2c80b010201620302002ba1e9fbda89a1a67fa67fa67fa67fa67fe809a67e606300f2d020c700915be0d31f30ed44d0d33fd33fd33fd33fd33ff404d33f3008d0d30331fa4030fa4631d3ff30218307f40e6fa131925f08e021811770a0f823b9925f08e026c0009304a404de26c0019305a405de26c0029303a403de06c0039301a401de551406c8cb3f15cb3f13cb3fcb3fcb3fcb3ff400c9ed5476615ce2')[0];
        let positive = 0;
        let negative = 0;
        let veto = 0;
        let abstain = 0;
        let contract_time_of_deployment = Math.floor(Date.now());
        let data = new TonWeb.boc.Cell();
        data.bits.writeUint(positive, 64);
        data.bits.writeUint(negative, 64);
        data.bits.writeUint(veto, 64);//veto   
        data.bits.writeUint(abstain, 64);//abstain
        data.bits.writeUint(contract_time_of_deployment, 64);
        data.bits.writeUint(contract_time_of_deployment, 64);
        data.bits.writeBit(0);
        let state_init = new TonWeb.boc.Cell();
        state_init.bits.writeUint(6, 5);
        state_init.refs.push(code);
        state_init.refs.push(data);
        let sender_address = tonConnectUi.wallet.address;




        let state_init_boc = TonWeb.utils.bytesToBase64(await state_init.toBoc());
        console.log(state_init_boc);
        //  te6ccsEBBAEAUwAABRJJAgE0AQMBFP8A9KQT9LzyyAsCAGrTMAGCCGlJILmRMODQ0wMx+kAwi0ZG9nZYcCCAGMjLBVAEzxaARfoCE8tqEssfAc8WyXP7AAAQAAABhltsPJ+MirEd

        let contractAddressNew = '0:' + TonWeb.utils.bytesToHex(await state_init.hash());
        console.log(contractAddressNew);

        //add voting contract address to dao contract
        // let daoContract = TonWeb.boc.Cell.fromBoc(localStorage.getItem(daoId))[0];

        const defaultTx2 = {
            validUntil: Date.now() + 1000000,
            messages: [
                {
                    address: contractAddressNew,
                    amount: '6900000',
                    stateInit: state_init_boc
                },
            ],
        };
        tonConnectUi.sendTransaction(defaultTx2).then((res) => {
            let token;
            //Get JWT token from api /auth with address
            axios.post("http://188.132.128.77:1423/auth", { address: contractAddressNew }).then(
                (res) => {
                    token = res.data.token;
                }
            )


            //save voting contract address to database using api call post. set token in post header x-access-token  http://188.132.128.77:1423/saveContract with contract_name, contract_address, contract_description, DAO_Id
            axios.post("http://188.132.128.77:1423/saveContract", { address: sender_address, contract_name: "Voting", contract_address: contractAddressNew, contract_description: proposalText, DAO_Id: daoId }, { headers: { 'x-access-token': token } }).then(
                (res) => {
                    console.log(res);
                }
            )

                
        });
    }
    return (
        <div>
            <div
                style={{
                    backgroundColor: "#E7EBF1",
                }}
                className={classes.container}
            >
                <Grid container spacing={2}>
                    <Grid item md={2}>
                        <SideMenu />
                    </Grid>
                    <Grid item md={10}>
                        <ResponsiveAppBar /> <div style={{ marginTop: '1rem' }} ><Card className={classes.card}>
                            <Grid container >
                                <Grid item md={6}> <div
                                    style={{
                                        marginTop: "1rem",
                                    }}
                                >
                                    {" "}

                                    <Grid container display={"flex"} alignItems={"center"}>
                                        <p className={classes.title}>Create Proposal</p>
                                    </Grid>
                                    <Grid container>
                                        <div>
                                            <form className={classes.form}>
                                                <label className={classes.label} for="daoId">
                                                    DAO Id{" "}
                                                </label>
                                                <input
                                                    value={daoId}
                                                    fullWidth
                                                    className={classes.input}
                                                    type="text"
                                                    id="daoId"
                                                    name="firstname"
                                                    placeholder="DAO name.."
                                                    // non editable
                                                    disabled
                                                ></input>
                                            </form>
                                        </div>
                                    </Grid>
                                    <Grid container>
                                        <div>
                                            <form className={classes.form}>
                                                <label className={classes.label} for="tokenID">
                                                    Token{" "}
                                                </label>
                                                <input
                                                    value={daoId}
                                                    fullWidth
                                                    className={classes.input}
                                                    type="text"
                                                    id="tokenID"
                                                    name="firstname"
                                                    placeholder="DAO name.."
                                                    // non editable
                                                    disabled
                                                ></input>
                                            </form>
                                        </div>
                                    </Grid>
                                    <Grid container>
                                        <div>
                                            <form className={classes.form}>
                                                <label className={classes.label} for="proposalText">
                                                    Proposal
                                                </label>
                                                <input
                                                    onChange={(e) => setProposalText(e.target.value)}
                                                    className={classes.input}
                                                    type="text"
                                                    id="proposalText"
                                                    name="firstname"
                                                    placeholder="Description.."
                                                ></input>
                                            </form>
                                        </div>
                                    </Grid>
                                    <Grid container>
                                        <div>
                                            <form className={classes.form}>
                                                <label className={classes.label} for="duration">
                                                    Duration
                                                </label>
                                                <input
                                                    onChange={(e) => setDuration(e.target.value)}
                                                    className={classes.input}
                                                    type="text"
                                                    id="duration"
                                                    name="firstname"
                                                    placeholder="Duration"
                                                ></input>
                                            </form>
                                        </div>
                                    </Grid>
                                    <Grid container>
                                        <div>
                                            <form className={classes.form}>
                                                <label className={classes.label} for="treshold">
                                                    Treshold
                                                </label>
                                                <input
                                                    onChange={(e) => setTreshold(e.target.value)}
                                                    className={classes.input}
                                                    type="text"
                                                    id="treshold"
                                                    name="firstname"
                                                    placeholder="Treshold"
                                                ></input>
                                            </form>
                                        </div>
                                    </Grid>





                                </div></Grid>

                            </Grid>  <Button className={classes.button} onClick={createProposal} style={{ backgroundColor: '#2AABEE', width: '35vh' }} >Create</Button> </Card></div>


                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

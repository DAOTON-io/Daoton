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
        let code = TonWeb.boc.Cell.fromBoc('b5ee9c72c1010401009d00000d12280114ff00f4a413f4bcf2c80b0102016203020027a1e9fbda89a1a67fa67fa67fa67fa67fe808606100e6d020c700915be0d31fed44d0d33fd33fd33fd33fd33ff404303007d0d30331fa403005f404305350810101f40a6fa1375b04925f06e025811770a0f823b9925f06e024c0009301a401de24c0019302a402de24c00291a4de04c0039302a402de55200404c8cb3f13cb3fcb3fcb3fcb3fc9ed5495f106e7')[0];
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
        data.bits.writeBit(0);
        let state_init = new TonWeb.boc.Cell();
        state_init.bits.writeUint(6, 5);
        state_init.refs.push(code);
        state_init.refs.push(data);




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
            localStorage.setItem('proposals', JSON.stringify({ ...JSON.parse(localStorage.getItem('proposals')), [contractAddressNew]: { daoId: daoId, proposalText: proposalText, proposalId: contractAddressNew, date: Date().split(" ")[3] + "-" + Date().split(" ")[1] + "-" + Date().split(" ")[2] } }));
            console.log(res);
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

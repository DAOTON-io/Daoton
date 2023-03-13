import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTonConnectUI } from "@tonconnect/ui-react";
import React, { Component, useEffect } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { useHref, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
import TonWeb from "tonweb";
import ResponsiveAppBar from "../components/header";
import OwnerCard from "../components/owner-card";
import SideMenu from "../components/sideMenu";
import StickyHeadTable from "../components/table";
import getCurrentValue from "../utils/get_current_value.ts";

const useStyles = makeStyles({
    container: {

        padding: "1rem",
    },
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

    }
});

export default function Vote() {
    const classes = useStyles();
    const [tonConnectUi] = useTonConnectUI();
    const {proposalId} = useParams();
    const proposals = JSON.parse(localStorage.getItem('proposals'))
    const proposalText = proposals? Object.values(proposals).filter(proposal => proposal.proposalId == proposalId)[0].proposalText : [];
    const [votes, setVotes] = React.useState([]);
     useEffect( () => {
        getCurrentValue(proposalId).then((votes) => {
            setVotes(votes);
            console.log(votes);
        });
    }, []);
    const voteYes = async () => {
        let a = new TonWeb.boc.Cell();
        a.bits.writeUint(0, 32);
        let payload = TonWeb.utils.bytesToBase64(await a.toBoc());
        
        let contractAddressHex = proposalId;
        const defaultTx2 = {
        	validUntil: Date.now() + 1000000,
        	messages: [
        		{
        		address: contractAddressHex,
        		amount: "6900000",
        		payload: payload
        		}
        	]
        };
        tonConnectUi.sendTransaction(defaultTx2);
    }
    const voteNo = async () => {
        let a = new TonWeb.boc.Cell();
        a.bits.writeUint(1, 32);
        let payload = TonWeb.utils.bytesToBase64(await a.toBoc());
        
        let contractAddressHex = proposalId;
        const defaultTx2 = {
        	validUntil: Date.now() + 1000000,
        	messages: [
        		{
        		address: contractAddressHex,
        		amount: "6900000",
        		payload: payload
        		}
        	]
        };
        tonConnectUi.sendTransaction(defaultTx2);
    }
        
    return (
        <div>
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Signika Negative',
                        weights: [400, '400i'],
                    },

                ]}
                subsets={['cyrillic-ext', 'greek']}
            />
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
                        <ResponsiveAppBar />
                        <div className={classes.container} >
                            <Card className={classes.cardName} >
                                <Grid container style={{
                                    justifyContent: "center",
                                    display: "flex",
                                    alignItems: "center",
                                }} >  <p className={classes.title} >{proposalText}</p></Grid>

                            </Card>
                            <p className={classes.title} >Vote</p>
                            <Card className={classes.card} > <Grid container alignItems={'center'} style={{
                                justifyContent: "center",
                                display: "flex",
                            }} spacing={2} >
                                <Grid item>
                                    <Button onClick={voteYes} className={classes.Button} >Yes</Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={voteNo} className={classes.Button}>No</Button>
                                </Grid>
                            </Grid>

                                <Grid container style={{
                                    backgroundColor: '#F5F5F5',
                                    marginTop: '3rem',
                                    width: '100%',
                                    padding: '5vh',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                }} >
                                    <Grid item md={4} >
                                        <div style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',

                                        }} >  <Grid container className={classes.center} >
                                                <p className={classes.info} style={{
                                                    fontWeight: 'bold',
                                                }} >Vote</p>
                                            </Grid>
                                            <Grid container className={classes.center}>
                                                <p className={classes.info}>{votes[3]}</p>
                                            </Grid>
                                            <Grid container className={classes.center}>
                                                <p className={classes.info}>Quorum 33%</p>
                                            </Grid></div>

                                    </Grid>
                                    <Grid item md={4} >
                                        <Grid container className={classes.center}>
                                            <p className={classes.info} style={{
                                                fontWeight: 'bold',
                                            }} >Yes</p>
                                        </Grid>
                                        <Grid container className={classes.center}>
                                            <p className={classes.info}>{votes[1]}</p>
                                        </Grid>
                                        <Grid container className={classes.center}>
                                            <p className={classes.info}>Quorum: 33%</p>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={4} >
                                        <Grid container className={classes.center}>
                                            <p className={classes.info} style={{
                                                fontWeight: 'bold',
                                            }} >No</p>
                                        </Grid>
                                        <Grid container className={classes.center}>
                                            <p className={classes.info}>{votes[0]}</p>
                                        </Grid>
                                        <Grid container className={classes.center}>
                                            <p className={classes.info}>Quorum: 33%</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

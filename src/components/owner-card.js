import { Avatar, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Component } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { Card } from "reactstrap";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { json } from "react-router-dom";

const useStyles = makeStyles({
    container: {
        padding: "0rem",
    },
    card: {
        backgroundColor: "white",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        borderRadius: "0.5rem",
        padding: "20px",
        marginTop: "20px",


    },
    name: {
        color: "black",
        fontWeight: 'bold',
        fontSize: '30px',
        fontFamily: "Signika Negative",

    },
    date: {
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontSize: "12px",
        marginBottom: "10px",
        fontFamily: "Signika Negative",
    },
    description: {
        align: 'center !important',
        color: "black",
        justifyContent: "center !important",
        alignItems: "center !important",
        display: "flex",
        fontSize: "14px",
        fontFamily: "Signika Negative",
        marginBottom: "10px",

    },
    value: {
        color: "black",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontFamily: "Signika Negative",
        fontSize: "12px",

    },


});

export default function OwnerCard({ daoId }) {
    const classes = useStyles();
    const daoName = JSON.parse(localStorage.getItem('daos'))[daoId].name;
    const desc = JSON.parse(localStorage.getItem('daos'))[daoId].desc;
    console.log(JSON.parse(localStorage.getItem('daos'))[daoId])
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
            <div className={classes.container}>
                <Card className={classes.card} >
                    <div style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}>

                        <Grid container alignItems={'center'} spacing={2}>
                            <Grid item ><p className={classes.name} >{daoName}</p></Grid>
                            <Grid item >
                                <img width={'20%'} src="/logo/logo.jpeg" />
                            </Grid>
                            <Grid item className={classes.description} >desc
                            </Grid>

                        </Grid>


                    </div>
                </Card>
            </div>
        </div>
    );
}



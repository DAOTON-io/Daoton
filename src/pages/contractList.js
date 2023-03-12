import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Component } from "react";
import { useHref } from "react-router-dom";
import { Button, Card } from "reactstrap";
import ResponsiveAppBar from "../components/header";
import OwnerCard from "../components/owner-card";
import SideMenu from "../components/sideMenu";
import StickyHeadTable from "../components/table";

const useStyles = makeStyles({
    container: {
        padding: "1rem",
    },
    title: {
        fontWeight: "bold",
        fontSize: "20px",
        marginTop: "1rem",
    },
});
export default function ContractList() {
    const classes = useStyles();

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
                        <ResponsiveAppBar />
                        <OwnerCard />
                        <Grid container alignItems={"end"} spacing={2}>
                            <Grid item>
                                <p className={classes.title}>Oylamalar</p>
                            </Grid>
                            <Grid item>
                                <a href="/create-contract">
                                    <Button
                                        style={{
                                            marginRight: "5px",
                                            backgroundColor: "#ff761c",
                                            color: "white",
                                            textTransform: "none",
                                            borderRadius: "10px",
                                            padding: "0.5rem",
                                            fontSize: "0.8rem",
                                            border: "none",
                                        }}
                                    >
                                        Yeni Oylama
                                    </Button>
                                </a>
                            </Grid>
                        </Grid>
                        <StickyHeadTable />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

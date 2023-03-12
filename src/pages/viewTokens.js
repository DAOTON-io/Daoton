import { Grid, Menu } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Component } from "react";
import { useHref } from "react-router-dom";
import { Card } from "reactstrap";
import DaoCard from "../components/dao-card";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";
import StickyHeadTable from "../components/table";

const useStyles = makeStyles({
    container: {
        padding: "1rem",
    },
    card: {
        backgroundColor: "#2AABEE",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        height: "90vh",
        color: "white",
        padding: "10px",
        borderRadius: "1rem",
    },
    listItem: {
        padding: "10px",
        color: "white",
    },
    listItemSmall: {
        marginBottom: "1rem",
        "&:hover": {
            borderRadius: 4,
            backgroundColor: "#1689c5",
        },
    },

    divider: {
        backgroundColor: "white",
        color: "white",
    },
    title: {
        color: "white",
        marginBottom: "0.5rem",
        fontSize: "14px",
    },
    item: {
        color: "white",
    },
});
const columns = [
    {
        name: "Token",
        description:
            "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use..",
        date: "January 2021",
        value: "",
    },
    {
        name: "Token",
        description:
            "The TON network is a blockchain protocol developed by the team behind Telegram messenger, designed to enable fast and secure transactions for users around the world",
        date: "February 2021",
        value: "",
    },
    {
        name: "Token",
        value: "",
        description:
            "The TON network features a unique Byzantine Fault Tolerant consensus mechanism, enabling high levels of security and scalability for the network",
        date: "10.10.2021",
    },
    {
        name: "TON",
        description:
            "The TON network allows developers to build decentralized applications (dApps) on top of the network, providing a range of use cases for users",
        value: "",
        date: "10.05.2021",
    },
    {
        name: "DAO",
        description:
            "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
        value: "",
        date: "10.10.2023",
    },
    {
        name: "TONDAO",
        description:
            "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
        value: "",
        date: "05.10.2021",
    },
    {
        name: "DAOTon",
        description:
            "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
        value: "",
        date: "01.10.2021",
    },
    {
        name: "DAOTon",
        description:
            "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
        value: "",
        date: "01.10.2021",
    },
];
export default function ViewTokens() {
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
                        {/* <Card style={{
                            backgroundColor: 'white',
                            borderRadius: '1rem',
                            padding: '1rem',
                            marginTop: '1rem',
                            boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',



                        }} ></Card>  */}
                        <div
                            style={{
                                height: "80%",
                                width: "100%",
                                overflow: "auto", // Kaydırma çubuğu eklemek için
                                scrollbarWidth: "thin", // Kaydırma çubuğunun kalınlığını ayarlamak için
                                scrollbarColor: "darkgray gray",
                                overflowY: "scroll",
                            }}
                        >
                            {" "}
                            <Grid
                                container
                                style={{
                                    position: "-webkit-sticky",
                                    position: "sticky",
                                    top: "0",
                                }}
                            >
                                {columns.map((column) => (
                                    <Grid key={column.id} item md={3}>
                                        <DaoCard
                                            name={column.name}
                                            description={column.description}
                                            value={column.value}
                                            date={column.date}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

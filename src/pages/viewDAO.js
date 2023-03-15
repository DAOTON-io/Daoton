import { Grid, Menu, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Component } from "react";
import { useHref } from "react-router-dom";
import { Card } from "reactstrap";
import DaoCard from "../components/dao-card";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";
import StickyHeadTable from "../components/table";
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem",
        [theme.breakpoints.down("md")]: {
            padding: "1rem",
        }
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
}));
// const columns = [
//     {
//         name: "DAO",
//         description:
//             "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use..",
//         date: "January 2021",
//         value: "",
//     },
//     {
//         name: "TON",
//         description:
//             "The TON network is a blockchain protocol developed by the team behind Telegram messenger, designed to enable fast and secure transactions for users around the world",
//         date: "February 2021",
//         value: "",
//     },
//     {
//         name: "DAO",
//         value: "",
//         description:
//             "The TON network features a unique Byzantine Fault Tolerant consensus mechanism, enabling high levels of security and scalability for the network",
//         date: "10.10.2021",
//     },
//     {
//         name: "TON",
//         description:
//             "The TON network allows developers to build decentralized applications (dApps) on top of the network, providing a range of use cases for users",
//         value: "",
//         date: "10.05.2021",
//     },
//     {
//         name: "DAO",
//         description:
//             "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
//         value: "",
//         date: "10.10.2023",
//     },
//     {
//         name: "TONDAO",
//         description:
//             "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
//         value: "",
//         date: "05.10.2021",
//     },
//     {
//         name: "DAOTon",
//         description:
//             "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
//         value: "",
//         date: "01.10.2021",
//     },
//     {
//         name: "DAOTon",
//         description:
//             "The TON network is designed to provide a user-friendly experience for both developers and end-users, with a focus on simplicity and ease-of-use.",
//         value: "",
//         date: "01.10.2021",
//     },
// ];
//exapmle daos data: {"11":{"name":"11","type":"1","desc":"Sample Desc","tokenContract":"11","address":"0:352750010d7c939b5dfdb9141852838f3be4dacbf9f905935895e7ddacdef18b"},"12":{"name":"12","type":"1","desc":"Sample Desc","tokenContract":"11","address":"0:f4dd6eb1b0e53a0c4c0b5c37acd4ac5bcddde4f4a7e722bbc24f6325b206f6e8"}}
const columnsJson = JSON.parse(localStorage.getItem("daos"));
var columns = [];
for (var i in columnsJson)
    columns.push([i, columnsJson[i]]);
console.log(columns);
export default function ViewDao() {
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
                    <Grid item md={10} xs={12} >
                        <ResponsiveAppBar />

                        <div
                            style={{
                                height: "100vh",
                                width: "100%",
                                overflow: "auto", // Kaydırma çubuğu eklemek için

                            }}
                        >
                            {" "}
                            <Grid
                                container

                            >
                                {/* If columns are empty write there are no DAO's in the middle of the screen on a card */}
                                {columns.length === 0 && (
                                    <Grid item md={12} style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        display: "flex",
                                    }}  >
                                        <Card
                                            style={{

                                                backgroundColor: "white",
                                                borderRadius: "1rem",
                                                padding: "5rem",
                                                marginTop: "2rem",
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
                                                There are no DAO's
                                            </Typography>
                                        </Card>
                                    </Grid>
                                )}
                                {columns.map((column) => (
                                    <Grid key={column.id} item md={3}>
                                        <DaoCard
                                            daoId={column[1].name}
                                            name={column[1].name}
                                            description={column[1].desc}
                                            value={column[1].tokenContract}
                                            // today's date in format: 2021-10-10
                                            date={Date().split(" ")[3] + "-" + Date().split(" ")[1] + "-" + Date().split(" ")[2]}
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

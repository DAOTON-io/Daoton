import { Grid, Menu } from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { Component } from "react";
import { useHref } from "react-router-dom";
import { Button, Card } from "reactstrap";
import DaoCard from "../components/dao-card";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";
import StickyHeadTable from "../components/table";
import ListAltIcon from "@mui/icons-material/ListAlt";

const useStyles = makeStyles({
    container: {
        padding: "1rem",
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
        color: "black",
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

        marginBottom: "1rem",
    },
    select: {
        marginTop: "0.5rem",

        width: "100%",
        fontSize: "14px",
        fontWeight: "bold",
        color: "white",
        border: "none",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        backgroundColor: "#2AABEE",
        padding: "10px",
        borderRadius: "0.5rem",
    },
    input: {
        marginTop: "0.5rem",
        padding: "10px",
        color: "white",
        border: "1px solid #2AABEE",
        borderRadius: "0.5rem",
        width: "120%",

        "&:hover": {
            border: "1px solid #2AABEE",
        },
    },
});
export default function CreateDao() {
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
                        <ResponsiveAppBar />{" "}
                        <div style={{ marginTop: "1rem" }}>
                            <Card className={classes.card}>
                                <Grid container>
                                    <Grid item md={12}>
                                        {" "}
                                        <div
                                            style={{

                                                marginTop: "1rem",
                                            }}
                                        >
                                            {" "}
                                            <Grid container display={"flex"} alignItems={"center"}>
                                                <p className={classes.title}>Create DAO</p>
                                            </Grid>

                                            <Grid container>
                                                <div>
                                                    <form className={classes.form}>
                                                        <label className={classes.label} for="fname">
                                                            Choose DAO Type:{" "}
                                                        </label>
                                                        <select
                                                            className={classes.select}
                                                            id="country"
                                                            name="country"
                                                        >
                                                            <option value="australia">Company</option>
                                                            <option value="canada">Start-up</option>
                                                            <option value="usa">Game-fi</option>
                                                        </select>
                                                    </form>
                                                </div>
                                            </Grid>
                                            <Grid container>
                                                <Grid item md={6}>
                                                    <Grid container alignItems={"center"} spacing={2}>
                                                        {" "}
                                                        <Grid item md={3} >
                                                            {" "}
                                                            <form className={classes.form}>
                                                                <label className={classes.label} for="fname">
                                                                    DAO Name:
                                                                </label>
                                                            </form>
                                                        </Grid>
                                                        <Grid item md={6} >
                                                            {" "}
                                                            <form className={classes.form}>
                                                                <input
                                                                    fullWidth
                                                                    className={classes.input}
                                                                    type="text"
                                                                    id="fname"
                                                                    name="firstname"
                                                                    placeholder="DAO name.."
                                                                ></input>
                                                            </form>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Grid container alignItems={"center"} spacing={2}>
                                                        {" "}
                                                        <Grid item md={3}  >
                                                            {" "}
                                                            <form className={classes.form}>
                                                                <label className={classes.label} for="fname">
                                                                    Description:
                                                                </label>
                                                            </form>
                                                        </Grid>
                                                        <Grid item md={6} >
                                                            {" "}
                                                            <form className={classes.form}>
                                                                <input
                                                                    fullWidth
                                                                    className={classes.input}
                                                                    type="text"
                                                                    id="fname"
                                                                    name="firstname"
                                                                    placeholder="Description.."
                                                                ></input>
                                                            </form>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <Grid container>
                                                <Grid item md={6}>
                                                    <Grid container alignItems={"center"} spacing={2}>
                                                        {" "}
                                                        <Grid item md={3} >
                                                            {" "}
                                                            <form className={classes.form}>
                                                                <label className={classes.label} for="fname">
                                                                    Contract Adress:
                                                                </label>
                                                            </form>
                                                        </Grid>
                                                        <Grid item md={6} >
                                                            {" "}
                                                            <form className={classes.form}>
                                                                <input
                                                                    fullWidth
                                                                    className={classes.input}
                                                                    type="text"
                                                                    id="fname"
                                                                    name="firstname"
                                                                    placeholder="Adress.."
                                                                ></input>
                                                            </form>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Grid container alignItems={"center"} spacing={2}>
                                                        {" "}
                                                        <Grid item md={3} >
                                                            {" "}
                                                            <form className={classes.form}>
                                                                <label className={classes.label} for="fname">
                                                                    Date:
                                                                </label>
                                                            </form>
                                                        </Grid>
                                                        <Grid item md={6} >
                                                            {" "}
                                                            <form className={classes.form}>
                                                                <input
                                                                    fullWidth
                                                                    className={classes.input}
                                                                    type="text"
                                                                    id="fname"
                                                                    name="firstname"
                                                                    placeholder="Date.."
                                                                ></input>
                                                            </form>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>{" "}
                                <Button
                                    className={classes.button}
                                    style={{ backgroundColor: "#2AABEE", width: "35vh", marginTop: '2rem' }}
                                >
                                    Create
                                </Button>{" "}
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

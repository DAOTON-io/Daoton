import React from "react";
import { Grid } from "@mui/material";
import SideMenu from "../components/sideMenu";
import ResponsiveAppBar from "../components/header";
import { makeStyles } from "@mui/styles";

export default function ViewNFTS() {
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
                    <Grid item md={10} xs={12}>
                        <ResponsiveAppBar />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem",
        [theme.breakpoints.down("md")]: {
            padding: "1rem",
        },
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
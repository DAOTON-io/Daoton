import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { Component } from "react";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Card } from "reactstrap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ResponsiveAppBar from "./header";
import StickyHeadTable from "./table";
import SideMenu from "./sideMenu";
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
        marginBottom: '1rem',
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
        marginBottom: '0.5rem',
        fontSize: '14px'
    },
    item: {
        color: "white",
    },
});
export default function MenuPage() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item md={2}>
                        <SideMenu />
                    </Grid>
                    <Grid item md={8}>
                        <ResponsiveAppBar />
                        <StickyHeadTable />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

import { Grid, Menu } from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { Component, useState } from "react";
import { useHref } from "react-router-dom";
import { Button, Card } from "reactstrap";
import DaoCard from "../components/dao-card";
import ResponsiveAppBar from "../components/header";
import SideMenu from "../components/sideMenu";
import StickyHeadTable from "../components/table";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useTonConnectUI } from "@tonconnect/ui-react";
import TonWeb from "tonweb";

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
    const [data, setData] = useState({ name: "", type: "1", desc: "Sample Desc", tokenContract: "address" });
    const [tonConnectUi] = useTonConnectUI();

    const createDao = async () => {
        console.log("create dao");
        console.log("Dao type", data.type);
        console.log("Dao name", data.name);
        console.log("Dao desc", data.desc);
        console.log("Dao tokenContract", data.tokenContract);
        let code = TonWeb.boc.Cell.fromBoc('b5ee9c72c1010401004300000d12210114ff00f4a413f4bcf2c80b0102016203020019a1e9fbda89a1a67fa67fe808610040d0ed44d0d33fd33f6d21c700b39430f404309131e202c8cb3fcb3ff400c9ed54d6cfb549')[0];
        let dataInit = new TonWeb.boc.Cell();
        //init state is set_data(begin_cell().store_uint(dao_id, 64).store_uint(contract_id, 64).store_dict(dict).end_cell());
        //dao_id = random 64 bit number
        let dao_id = Math.floor(Math.random() * 100000000 + 1);
        dataInit.bits.writeUint(dao_id, 64);
        dataInit.bits.writeUint(12, 64);
        dataInit.bits.writeUint(0, 1);
        let state_init = new TonWeb.boc.Cell();
        state_init.bits.writeUint(6, 5);
        state_init.refs.push(code);
        state_init.refs.push(dataInit);




        let state_init_boc = TonWeb.utils.bytesToBase64(await state_init.toBoc());
        console.log(state_init_boc);
        //  te6ccsEBBAEAUwAABRJJAgE0AQMBFP8A9KQT9LzyyAsCAGrTMAGCCGlJILmRMODQ0wMx+kAwi0ZG9nZYcCCAGMjLBVAEzxaARfoCE8tqEssfAc8WyXP7AAAQAAABhltsPJ+MirEd

        let contractAddressNew = '0:' + TonWeb.utils.bytesToHex(await state_init.hash());
        console.log(contractAddressNew);

        const defaultTx2 = {
            validUntil: Date.now() + 1000000,
            messages: [
                {
                    address: contractAddressNew,
                    amount: '69000000',
                    stateInit: state_init_boc
                },
            ],
        };
        tonConnectUi.sendTransaction(defaultTx2).then((res) => {
            localStorage.setItem("daos", JSON.stringify({ ...JSON.parse(localStorage.getItem("daos")), [data.name]: { name: data.name, type: data.type, desc: data.desc, tokenContract: "TokenTon", address: contractAddressNew } }));
            console.log(res);
            console.log(localStorage.getItem("daos"));
            window.location.href = '/view-dao';
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
                                                            id="type"
                                                            name="type"
                                                            value={data.type}
                                                            onChange={(e) => setData({ ...data, type: e.target.value })}
                                                        >
                                                            <option value="1">Company</option>
                                                            <option value="2">Start-up</option>
                                                            <option value="3">Game-fi</option>
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
                                                                    id="name"
                                                                    name="name"
                                                                    placeholder="DAO name.."
                                                                    value={data.name}
                                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
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
                                                                    id="desc"
                                                                    name="desc"
                                                                    placeholder="Description.."
                                                                    value={data.desc}
                                                                    onChange={(e) => setData({ ...data, desc: e.target.value })}
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
                                                                    Jetton Address:
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
                                                                    id="tokenContract"
                                                                    name="tokenContract"
                                                                    placeholder="Adress.."
                                                                    value={data.tokenContract}
                                                                    onChange={(e) => setData({ ...data, tokenContract: e.target.value })}
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
                                    onClick={createDao}
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

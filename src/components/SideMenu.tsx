import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Divider, Grid, ListItemButton, Stack, Theme, Typography } from "@mui/material";
import GoogleFontLoader from "react-google-font-loader";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { makeStyles } from "@mui/styles";
import SummarizeIcon from "@mui/icons-material/Summarize";
import FitbitIcon from "@mui/icons-material/Fitbit";
import TokenIcon from "@mui/icons-material/Token";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import { PAGES_NAME } from "../utils/enums";
import Logout from "./Logout";
import { List } from "reactstrap";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: "#2D6495 !important",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    height: "92vh",
    color: "white",
    padding: "10px",
    borderRadius: "1rem !important",
    // add breakpoint
    [theme.breakpoints.down("md")]: {
      visible: "none",
      display: "none",
    },
  },
  divider: {
    backgroundColor: "white",
    color: "white",
    margin: "0.5rem !important",
  },
  title: {
    color: "white ",
    marginBottom: "0.5rem",
    marginLeft: "0.5rem",
    fontSize: "14px",
  },
  item: {
    color: "white",
    textDecoration: "none",
    fontFamily: "Signika Negative",
    paddingLeft: "0.5rem !important",
    paddingTop: "0.25rem !important",
    paddingBottom: "0.25rem !important",
    "&:hover": {
      backgroundColor: "#91b1cc !important",
      cursor: "pointer",
    },
  },
  selectedItem: {
    color: "white",
    textDecoration: "none",
    fontFamily: "Signika Negative",
    paddingLeft: "0.5rem !important",
    backgroundColor: "#A2C5E3 !important",
    paddingTop: "0.25rem !important",
    paddingBottom: "0.25rem !important",
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    position: "relative",
    top: "0.2rem",
    marginRight: "0.8rem",
    color: "white",
  },
  titleStack: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  menuStack: {
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const SideMenu: React.FC = () => {
  const classes = useStyles();
  const [activePage, setActivePage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const pathname = window.location.pathname;
    setActivePage(pathname);
  }, []);

  return (
    <Card className={classes.card}>
      <GoogleFontLoader fonts={[{ font: "Signika Negative", weights: [400, "400i"] }]} subsets={["cyrillic-ext", "greek"]} />
      <Stack className={classes.titleStack}>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          {PAGES_NAME.TITLE}{" "}
        </Typography>
      </Stack>
      <Stack className={classes.title}>
        <Typography> {PAGES_NAME.DAO} </Typography>
      </Stack>
      <Stack className={classes.menuStack}>
        <List>
          <ListItemButton
            className={activePage.startsWith("/view-dao") || activePage === "/" ? classes.selectedItem : classes.item}
            key={PAGES_NAME.VIEW_DAOS}
            onClick={() => {
              navigate("/view-dao");
              setActivePage("/view-dao");
            }}
          >
            <Grid item>
              <ViewHeadlineIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">{PAGES_NAME.VIEW_DAOS}</Typography>
          </ListItemButton>
          <ListItemButton
            className={activePage.startsWith("/create-dao") ? classes.selectedItem : classes.item}
            key={PAGES_NAME.CREATE_DAO}
            onClick={() => {
              navigate("/create-dao");
              setActivePage("/create-dao");
            }}
          >
            <Grid item>
              <AddCircleIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">{PAGES_NAME.CREATE_DAO}</Typography>
          </ListItemButton>
          <Divider className={classes.divider}></Divider>
          <Stack className={classes.title}>
            <Typography> {PAGES_NAME.TOKEN} </Typography>
          </Stack>
          <ListItemButton
            className={activePage.startsWith("/view-tokens") ? classes.selectedItem : classes.item}
            key={PAGES_NAME.MY_TOKENS}
            onClick={() => {
              navigate("/view-tokens");
              setActivePage("/view-tokens");
            }}
          >
            <Grid item>
              <TokenIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">{PAGES_NAME.MY_TOKENS}</Typography>
          </ListItemButton>
          <ListItemButton
            className={activePage.startsWith("/generate-token") ? classes.selectedItem : classes.item}
            key={PAGES_NAME.GENERATE_TOKEN}
            onClick={() => {
              navigate("/generate-token");
              setActivePage("/generate-token");
            }}
          >
            <Grid item>
              <AddCircleOutlineIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">{PAGES_NAME.GENERATE_TOKEN}</Typography>
          </ListItemButton>
          <Divider className={classes.divider}></Divider>
          <Stack className={classes.title}>
            <Typography> {PAGES_NAME.NFT} </Typography>
          </Stack>
          <ListItemButton
            className={activePage.startsWith("/view-nfts") ? classes.selectedItem : classes.item}
            key={PAGES_NAME.MY_NFTS}
            onClick={() => {
              navigate("/view-nfts");
              setActivePage("/view-nfts");
            }}
          >
            <Grid item>
              <FitbitIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">{PAGES_NAME.MY_NFTS}</Typography>
          </ListItemButton>
          {/* <ListItemButton
            className={activePage === "/generate-nft-collection" ? classes.selectedItem : classes.item}
            key={PAGES_NAME.GENERATE_COLLECTION}
            selected={window.location.pathname === PAGES_NAME.GENERATE_COLLECTION}
            onClick={() => {
              navigate("/generate-nft-collection");
              setActivePage("/generate-nft-collection");
            }}
          >
            <Grid item>
              <PlaylistAddCircleIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">{PAGES_NAME.GENERATE_COLLECTION}</Typography>
          </ListItemButton> */}
          <ListItemButton
            className={activePage.startsWith("/generate-nft") ? classes.selectedItem : classes.item}
            key={PAGES_NAME.GENERATE_NFT}
            onClick={() => {
              navigate("/generate-nft");
              setActivePage("/generate-nft");
            }}
          >
            <Grid item>
              <PlaylistAddCircleIcon className={classes.icon} />
            </Grid>
            <Typography textAlign="center">{PAGES_NAME.GENERATE_NFT}</Typography>
          </ListItemButton>
          <Divider className={classes.divider}></Divider>
          <Stack className={classes.title}>
            <Typography> {PAGES_NAME.DOCS} </Typography>
          </Stack>
          <Link className={classes.link} to="https://docs.daoton.io" target="_blank" rel="noreferrer">
            <ListItemButton
              className={classes.item}
              key={PAGES_NAME.DOCUMENTATION}
              onClick={() => {
                navigate("");
              }}
            >
              <Grid item>
                <SummarizeIcon className={classes.icon} />
              </Grid>
              <Typography textAlign="center">{PAGES_NAME.DOCUMENTATION}</Typography>
            </ListItemButton>
          </Link>
          <Link className={classes.link} to={"https://drive.google.com/file/d/1BhY6hriK72TEqH2ytaNl2ny_8Tgwna1g/view?usp=sharing"} target="_blank" rel="noreferrer">
            <ListItemButton
              className={classes.item}
              key={PAGES_NAME.LITEPAPER}
              onClick={() => {
                navigate("");
              }}
            >
              <Grid item>
                <SummarizeIcon className={classes.icon} />
              </Grid>
              <Typography textAlign="center">{PAGES_NAME.LITEPAPER}</Typography>
            </ListItemButton>
          </Link>
        </List>
        <Stack sx={{ margin: "0.5rem" }}>
          <Logout />
        </Stack>
      </Stack>
    </Card>
  );
};

export default SideMenu;

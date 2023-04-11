import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    overflow: "scrool",
    [theme.breakpoints.down("md")]: {
      padding: "1rem",
    },
  },
}));

export const ProtectedRoute = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);

  const classes = useStyles();

  useEffect(() => {
    tonConnectUI.connectionRestored.then(() => {
      setConnected(tonConnectUI.connected);
      setloading(false);
    });
  }, [tonConnectUI, tonConnectUI.connected, tonConnectUI.connectionRestored]);

  if (loading) {
    return <CircularProgress color="secondary" />;
  }

  return connected ? (
    <div
      style={{
        backgroundColor: "#E7EBF1",
      }}
      className={classes.container}
    >
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

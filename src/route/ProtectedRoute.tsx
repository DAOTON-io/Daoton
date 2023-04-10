import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { CircularProgress } from "@mui/material";

export const ProtectedRoute = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    console.log(tonConnectUI);
    tonConnectUI.connectionRestored.then(() => {
      setConnected(tonConnectUI.connected);
      setloading(false);
    });
  }, [tonConnectUI, tonConnectUI.connected, tonConnectUI.connectionRestored]);

  if (loading) {
    return <CircularProgress color="secondary" />;
  }

  return connected ? <Outlet /> : <Navigate to="/login" />;
};

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTonConnectUI } from "@tonconnect/ui-react";

export const ProtectedRoute = () => {
  const connection = useTonConnectUI();

  console.log(connection);

  return connection[0].connected ? <Outlet /> : <Navigate to="/login" />;
};

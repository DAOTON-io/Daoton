import React from "react";
import { Switch } from "@mui/material";

type Props = {
  checked: boolean;
  onChange: any;
};

export const CustomSwitch: React.FC<Props> = ({ checked, onChange }) => {
  return <Switch checked={checked} onChange={onChange} defaultChecked />;
};

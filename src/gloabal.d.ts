import { Theme } from "@mui/material/styles";

declare module "@mui/system" {
  interface DefaultTheme extends Theme {}
}

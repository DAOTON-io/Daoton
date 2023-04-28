import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import CreateDao from "./pages/createDao";
import ContractList from "./pages/contractList";
import ViewDao from "./pages/viewDAO";
import ViewTokens from "./pages/viewTokens";
import CreateContract from "./pages/createContract";
import GenerateToken from "./pages/generateToken";
import GenerateNft from "./pages/generateNft";
import GenerateNftCollection from "./pages/generateNftCollection";
import Vote from "./pages/vote";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import ViewNft from "./pages/viewNFT";
import { ProtectedRoute } from "./route/ProtectedRoute";
import { Login } from "./pages/Login";
import { CreateDao2 } from "./pages/createDao2";

const theme = createTheme();
const TonProofDemoApi = {
  connectWalletRequest: {
    permissions: [
      {
        name: "https://demo.tonconnect.dev",
        params: {
          message: "Hello, TonConnect!",
        },
      },
    ],
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TonConnectUIProvider
        manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
        getConnectParameters={() => TonProofDemoApi.connectWalletRequest as any}
        uiPreferences={{ theme: THEME.DARK }}
      >
        {/* <BrowserRouter basename="/Daoton"> */}
        <BrowserRouter basename="/">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" index element={<ViewDao />} />
              <Route path="/view-dao" index element={<ViewDao />} />
              <Route path="/listContracts/:daoId" index element={<ContractList />} />
              {/* <Route path="/create-dao" index element={<CreateDao />} /> */}
              <Route path="/create-dao" index element={<CreateDao2 />} />
              <Route path="/view-tokens" index element={<ViewTokens />} />
              <Route path="/create-contract" index element={<CreateContract />} />
              <Route path="/generate-token" index element={<GenerateToken />} />
              <Route path="/vote/:proposalId" index element={<Vote />} />

              <Route path="/create-contract/:daoId" index element={<CreateContract />} />
              <Route path="/generate-nft" index element={<GenerateNft />} />
              <Route path="/generate-nft-collection" index element={<GenerateNftCollection />} />
              <Route path="/view-nfts" index element={<ViewNft />} />
            </Route>

            <Route path="/login" index element={<Login />} />
          </Routes>
        </BrowserRouter>
      </TonConnectUIProvider>
    </ThemeProvider>
  );
}

export default App;

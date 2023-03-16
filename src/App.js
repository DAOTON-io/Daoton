import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDao from "./pages/createDao";
import ContractList from "./pages/contractList";
import ViewDao from "./pages/viewDAO";
import ViewTokens from "./pages/viewTokens";
import CreateContract from "./pages/createContract";
// import GenerateToken from "./pages/generateToken";
import GenerateToken from "./pages/generateToken";
import GenerateNft from "./pages/generateNft";
import GenerateNftCollection from "./pages/generateNftCollection";
import Vote from "./pages/vote";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import ViewNFTS from "./pages/viewNFT";

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
        getConnectParameters={() => TonProofDemoApi.connectWalletRequest}
        uiPreferences={{ theme: THEME.DARK }}
        /*walletsListConfiguration={{
    includeWallets: [...new Array(11)].map((_, index) => ({
        name: 'tonkeeper',
        bridgeUrl: `https://bridge${
            index < 9 ? `0${index + 1}` : index + 1
        }.subgroup.org/bridge`,
        universalLink: 'https://app.tonkeeper.com/ton-connect',
        aboutUrl: '',
        imageUrl: 'https://tonkeeper.com/assets/tonconnect-icon.png'
    }))
}}*/
      >
        <BrowserRouter>
          <Routes>
            <Route>
              {/* dummy  home page */}
              <Route path="/" index element={<ViewDao />} />
              <Route path="/view-dao" index element={<ViewDao />} />
              <Route path="/listContracts/:daoId" index element={<ContractList />} />
              <Route path="/create-dao" index element={<CreateDao />} />
              <Route path="/view-tokens" index element={<ViewTokens />} />
              <Route path="/view-nfts" index element={<ViewNFTS />} />
              <Route path="/create-contract" index element={<CreateContract />} />
              {/* <Route path="/generate-token" index element={<GenerateToken />} /> */}
              <Route path="/vote/:proposalId" index element={<Vote />} />

              <Route path="/create-contract/:daoId" index element={<CreateContract />} />
              <Route path="/generate-nft" index element={<GenerateNft />} />
              <Route path="/generate-nft-collection" index element={<GenerateNftCollection />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TonConnectUIProvider>
    </ThemeProvider>
  );
}

export default App;

import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDao from "./pages/createDao";
import ContractList from "./pages/contractList";
import ViewDao from "./pages/viewDAO";
import ViewTokens from "./pages/viewTokens";
import CreateContract from "./pages/createContract";

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
            <Route path="/view-dao" index element={<ViewDao />} />
            <Route path="/listContracts" index element={<ContractList />} />
            <Route path="/create-dao" index element={<CreateDao />} />
            <Route path="/view-tokens" index element={<ViewTokens />} />
            <Route path="/create-contract" index element={<CreateContract />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TonConnectUIProvider>
  );
}

export default App;

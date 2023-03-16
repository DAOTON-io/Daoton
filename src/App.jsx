import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateDao from "./pages/createDao";
import ContractList from "./pages/contractList";
import ViewDao from "./pages/viewDAO";
import ViewTokens from "./pages/viewTokens";
import CreateContract from "./pages/createContract";
import GenerateToken from "./pages/generateToken";
import GenerateNft from "./pages/generateNft";
import Vote from "./pages/vote.jsx";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route>
            {/* dummy  home page */}
            <Route path="/" index element={<ViewDao />} />
            <Route path="/view-dao" index element={<ViewDao />} />
            <Route path="/listContracts/:daoId" index element={<ContractList />} />
            <Route path="/create-dao" index element={<CreateDao />} />
            <Route path="/view-tokens" index element={<ViewTokens />} />
            <Route path="/create-contract" index element={<CreateContract />} />
            <Route path="/generate-token" index element={<GenerateToken />} />
            <Route path="/vote/:proposalId" index element={<Vote />} />

            <Route path="/create-contract/:daoId" index element={<CreateContract />} />
            <Route path="/generate-nft" index element={<GenerateNft />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

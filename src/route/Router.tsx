import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import ViewDao from "../pages/ViewDAO";
import ViewTokens from "../pages/ViewTokens";
import Vote from "../pages/Vote";
import GenerateCollection from "../pages/GenerateCollection";
import ViewNft from "../pages/ViewNFT";
import { Login } from "../pages/Login";
import GenerateToken from "../pages/GenerateToken";
import GenerateNft from "../pages/GenerateNft";
import { CreateDao } from "../pages/CreateDao";
import ContractList from "../pages/ContractList";
import CreateContract from "../pages/CreateContract";
import { MainNFT } from "../pages/MainNFT";
import { CreateProposal } from "../components/CreateProposal";
import ListNFT from "../pages/ListNFT";

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" index element={<ViewDao />} />
            <Route path="/view-dao" index element={<ViewDao />} />
            <Route path="/listContracts/:daoId" index element={<ContractList />} />
            {/* <Route path="/create-dao" index element={<CreateDao />} /> */}
            <Route path="/create-dao" index element={<CreateDao />} />
            <Route path="/view-tokens" index element={<ViewTokens />} />
            <Route path="/create-contract" index element={<CreateContract />} />
            <Route path="/generate-token" index element={<GenerateToken />} />
            <Route path="/vote/:proposalId" index element={<Vote />} />
            <Route path="/main-nft" index element={<MainNFT />} />

            <Route path="/create-contract/:daoId" index element={<CreateContract />} />
            <Route path="/generate-nft" index element={<GenerateNft />} />
            <Route path="/generate-nft-collection" index element={<GenerateCollection />} />
            <Route path="/view-nfts" index element={<ViewNft />} />
            <Route path="/view-nfts/:collectionAddress" index element={<ListNFT />} />
            <Route path="/create-proposal" index element={<CreateProposal />} />
          </Route>
          <Route path="/login" index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {ProtectedRoute} from '../route/ProtectedRoute';
import ViewDao from '../pages/viewDAO';
import ContractList from '../pages/contractList';
import {CreateDao2} from '../pages/createDao2';
import ViewTokens from '../pages/viewTokens';
import GenerateToken from '../pages/GenerateToken';
import CreateContract from '../pages/createContract';
import Vote from '../pages/vote';
import GenerateNft from '../pages/GenerateNft';
import GenerateCollection from '../pages/GenerateCollection';
import ViewNft from '../pages/viewNFT';
import {Login} from '../pages/Login';

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" index element={<ViewDao />} />
            <Route path="/view-dao" index element={<ViewDao />} />
            <Route
              path="/listContracts/:daoId"
              index
              element={<ContractList />}
            />
            {/* <Route path="/create-dao" index element={<CreateDao />} /> */}
            <Route path="/create-dao" index element={<CreateDao2 />} />
            <Route path="/view-tokens" index element={<ViewTokens />} />
            <Route path="/create-contract" index element={<CreateContract />} />
            <Route path="/generate-token" index element={<GenerateToken />} />
            <Route path="/vote/:proposalId" index element={<Vote />} />

            <Route
              path="/create-contract/:daoId"
              index
              element={<CreateContract />}
            />
            <Route path="/generate-nft" index element={<GenerateNft />} />
            <Route
              path="/generate-nft-collection"
              index
              element={<GenerateCollection />}
            />
            <Route path="/view-nfts" index element={<ViewNft />} />
          </Route>
          <Route path="/login" index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

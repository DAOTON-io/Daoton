import React, {useEffect} from 'react';
import {Address} from 'ton-core';
import {useParams} from 'react-router-dom';
import {TonClient} from 'ton';
import {getHttpEndpoint} from '@orbs-network/ton-access';
import DaoContract from '../lib/dao/lib/DaoContract';
import {open} from '../utils/index';

const DaoDetail: React.FC = () => {
  const {daoId} = useParams();

  useEffect(() => {
    const init = async () => {
      if (daoId) {
        const daoContractAddress = Address.parse(daoId);
        const daoMasterContract = new DaoContract(daoContractAddress);

        const endpoint = await getHttpEndpoint({network: 'testnet'});
        const client = new TonClient({endpoint});
        const daoContract = open(daoMasterContract, client);
        const list = await daoContract.getDaoData();

        console.log('3', list);
      }
    };

    init();
  }, [daoId]);

  return <div></div>;
};

export default DaoDetail;

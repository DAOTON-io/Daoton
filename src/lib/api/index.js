import axios from "axios";

const mainUrl = "https://testnet.tonapi.io/v1/";

export const fetchAddressTxs = async (address) => {
  const route = "blockchain/getTransactions?account=" + address + "&limit=1000";

  const { data: txHistory } = await axios.get(mainUrl + route);

  let targetAddresses = [];

  txHistory.transactions.forEach((th) => {
    if (th.out_msgs[0]) {
      const item = th.out_msgs[0].destination.address;
      if (targetAddresses.findIndex((dt) => dt === item) < 0) {
        targetAddresses.push(item);
      }
    }
  });

  const promises = targetAddresses.map((adr) => {
    return fetchAddressInfo(adr);
  });

  Promise.all(promises).then((res) => {
    console.log(res);
  });
};

const fetchAddressInfo = async (account) => {
  const route = "account/getInfo?account=" + account;

  const { data: addressInfo } = await axios.get(mainUrl + route);

  return addressInfo;
};

export const fetchTokens = async (account) => {
  const route = "jetton/getBalances?account=" + account;

  const { data: tokens } = await axios.get(mainUrl + route);

  return tokens;
};

export const fetchNfts = async (account) => {
  // eslint-disable-next-line no-useless-concat
  const route = "nft/searchItems?owner=" + account + "&limit=1000" + "&offset=0";

  const { data } = await axios.get(mainUrl + route);

  const nftItems = data.nft_items;
  let collections = [];

  nftItems.forEach((item) => {
    const isExist = collections.findIndex((cl) => cl.address === item.collection.address) > -1;
    if (!isExist) {
      collections.push(item.collection);
    }
  });

  return { nftItems, collections };
};

export const fetchNftCollection = async (collectionAddress) => {
  const route = "nft/getCollection?account=" + collectionAddress;

  const { data } = await axios.get(mainUrl + route);

  return data;
};

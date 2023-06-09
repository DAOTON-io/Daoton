import axios from "axios";

const mainUrl = "https://testnet.tonapi.io/v1/";

export const fetchAddressTxs = async (address: string) => {
  const route = "blockchain/getTransactions?account=" + address + "&limit=1000";

  const { data: txHistory } = await axios.get(mainUrl + route);

  let targetAddresses: any[] = [];

  txHistory.transactions.forEach((th: { out_msgs: { destination: { address: any } }[] }) => {
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

const fetchAddressInfo = async (account: string) => {
  const route = "account/getInfo?account=" + account;

  const { data: addressInfo } = await axios.get(mainUrl + route);

  return addressInfo;
};

export const fetchTokens = async (account: string) => {
  const route = "jetton/getBalances?account=" + account;

  const { data: tokens } = await axios.get(mainUrl + route);

  return tokens;
};

export const fetchNfts = async (account: string) => {
  // eslint-disable-next-line no-useless-concat
  const route = "nft/searchItems?owner=" + account + "&limit=1000" + "&offset=0";

  const { data } = await axios.get(mainUrl + route);

  //filter nft items with empty name
  const nftItems = data.nft_items.filter((item: { metadata: { name: any } }) => item.metadata.name);
  let collections: any[] = [];

  nftItems.forEach((item: { collection: { address: any } }) => {
    const isExist = collections.findIndex((cl) => cl.address === item.collection.address) > -1;
    if (!isExist) {
      collections.push(item.collection);
    }
  });

  return { nftItems, collections };
};

export const fetchNftCollection = async (collectionAddress: string) => {
  const route = "nft/getCollection?account=" + collectionAddress;

  const { data } = await axios.get(mainUrl + route);

  return data;
};

export const collectionPreview = async (collectionAddress: string) => {
  const route = "https://testnet.toncenter.com/api/v2/getTokenData?address=" + collectionAddress;

  const { data } = await axios.get(route);

  return data.result;
};

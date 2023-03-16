import TonWeb from "tonweb";
import { toNano } from "ton";

const { NftCollection, NftItem } = TonWeb.token.nft;

export default class NftMinter {
  nftCollection;
  tonConnectUi;
  walletAddress;

  constructor(walletAddressParam, tonConnectUi, collectionContentUri) {
    this.walletAddress = new TonWeb.utils.Address(walletAddressParam);
    this.tonConnectUi = tonConnectUi;

    this.nftCollection = new NftCollection(new TonWeb().provider, {
      ownerAddress: this.walletAddress,
      royalty: 0.05,
      royaltyAddress: this.walletAddress,
      collectionContentUri: collectionContentUri,
      nftItemContentBaseUri: "https://ipfs.io/ipfs/",
      nftItemCodeHex: NftItem.codeHex,
    });
  }

  deployNftCollection = async () => {
    const stateInit = (await this.nftCollection.createStateInit()).stateInit;
    const stateInitBoc = await stateInit.toBoc(false);
    const stateInitBase64 = TonWeb.utils.bytesToBase64(stateInitBoc);
    const nftCollectionAddress = await this.nftCollection.getAddress();

    const defaultTx2 = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: nftCollectionAddress.toString(true, true, true),
          amount: "500000",
          stateInit: stateInitBase64,
        },
      ],
    };

    this.tonConnectUi.sendTransaction(defaultTx2).then(() => {
      console.log("here");
    });
  };

  deployNftItem = async (itemContentUri) => {
    const nftCollectionAddress = await this.nftCollection.getAddress();
    const amount = toNano(0.05);

    const body = await this.nftCollection.createMintBody({
      amount: amount,
      itemIndex: 0,
      itemOwnerAddress: this.walletAddress,
      itemContentUri: itemContentUri,
    });

    const bodyBoc = await body.toBoc(false);
    const bodyBase64 = TonWeb.utils.bytesToBase64(bodyBoc);

    const defaultTx2 = {
      validUntil: Date.now() + 1000000,
      messages: [
        {
          address: nftCollectionAddress.toString(true, true, true),
          amount: amount.toString(),
          payload: bodyBase64,
        },
      ],
    };

    this.tonConnectUi.sendTransaction(defaultTx2).then(() => {
      console.log("here");
    });
  };
}

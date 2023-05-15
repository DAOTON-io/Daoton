import { TOKEN_TYPES } from "./enums";
import { Address } from "ton";

export type DaoInfoData = {
  name: string;
  description: string;
  image: string;
};

export type TokenDetailType = GenerateTokenType & {
  type: TOKEN_TYPES;
};

export type NftDetailType = {
  type: TOKEN_TYPES;
  name: string;
  description: string;
  level: string;
  collectionAddress: string;
  image: any;
};

export type CategoryType = { id: number; label: string; icon: any };

export type TokensType = {
  balance: string;
  jetton_address: string;
  metadata: {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    image?: string;
    description: string;
  };
  verification: string;
  wallet_address: {
    address: string;
    is_scam: boolean;
  };
};

export type GenerateTokenType = {
  name: string;
  symbol: string;
  decimal: number;
  amount: number;
  description: string;
  isPausable: boolean;
  isStackable: boolean;
  offchainUri: string;
  image?: string;
};

export type CollectionDataType = {
  collectionName: string;
  collectionDescription: string;
  collectionImage: any;
};

export type GenerateNftType = {
  nftName: string;
  nftDescription: string;
  level: string;
  collectionAddress: string;
  nftImage: any;
};

export type ProposalType = {
  timestamp: number;
  successThreshold: number;
  failThreshold: number;
  isRelatedWithNft: boolean;
  content: string;
};

export type Dao = {
  address: string;
  daoTypeId: number;
  tokenContract: Address;
  nftContract: Address;
  content: { name: string; description: string; image?: string };
  sequence: number;
};

import { TOKEN_TYPES } from "./enums";
import { Address } from "ton";

export type DaoInfoData = {
  name: string;
  description: string;
  image: string;
};

export type TokenWithType = Token & {
  type: TOKEN_TYPES;
};

export type NftDetail = {
  type: TOKEN_TYPES;
  name: string;
  description: string;
  level: string;
  collectionAddress: string;
  image: string;
};

export type Category = { id: number; label: string; icon: any };

export type Tokens = {
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

export type Token = {
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

export type CollectionData = {
  collectionName: string;
  collectionDescription: string;
  collectionImage: string;
};

export type Nft = {
  nftName: string;
  nftDescription: string;
  level: string;
  collectionAddress: string;
  nftImage: string;
};

export type Proposal = {
  owner: string;
  balance: number;
  yes: number;
  no: number;
  abstain: number;
  timestamp: number;
  successThreshold: number;
  failThreshold: number;
  vote: any[];
  isRelatedWithNft: boolean;
  content: { text: string };
};

export type Dao = {
  address: string;
  daoTypeId: number;
  tokenContract: Address;
  nftContract: Address;
  content: { name: string; description: string; image?: string };
  sequence: number;
};

export type ProposalForm = {
  timestamp: number;
  successThreshold: number;
  failThreshold: number;
  isRelatedWithNft: boolean;
  content: string;
};

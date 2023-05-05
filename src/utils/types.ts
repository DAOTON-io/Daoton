import {TOKEN_TYPES} from './enums';

export type InfoType = {
  name: string;
  desc: string;
  image: any;
};

export type TokenDetailType = {
  type: TOKEN_TYPES;
  name: string;
  description: string;
  symbol: string;
  amount: string;
  decimal: string;
  pausableContract: boolean;
  stackableContract: boolean;
  image: any;
};

export type NftDetailType = {
  type: TOKEN_TYPES;
  name: string;
  description: string;
  level: string;
  collectionAddress: string;
  image: any;
};

export type CategoryType = {id: number; label: string; icon: any};

export type TokensType = {
  balance: string;
  jetton_address: string;
  metadata: {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
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

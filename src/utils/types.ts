import {TOKEN_TYPES} from './enums';

export type InfoType = {
  name: string;
  desc: string;
  image: string;
};

export type TokenDetailType = {
  name: string;
  type: TOKEN_TYPES;
  symbol: string;
  mintable: boolean;
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

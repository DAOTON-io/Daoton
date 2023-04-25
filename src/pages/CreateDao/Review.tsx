import React from 'react';

enum TOKEN_TYPES {
  NEW_TOKEN = 'New Token',
  TOKEN_FROM_WALLET = 'Token from Wallet',
}

type TokenDetailType = {
  name: string;
  type: TOKEN_TYPES;
  symbol: string;
  mintable: boolean;
};

type InfoType = {
  name: string;
  desc: string;
  image: string;
};

type Props = {
  selectedCategory: number;
  daoInfo: InfoType;
  tokenDetail: TokenDetailType;
};

export const Review: React.FC<Props> = ({
  selectedCategory,
  daoInfo,
  tokenDetail,
}) => {
  console.log('category in review', selectedCategory);
  console.log('daoInfo in review', daoInfo);
  console.log('tokenDetail in review', tokenDetail);
  return <div></div>;
};

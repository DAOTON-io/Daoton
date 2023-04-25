import React from 'react';
import {InfoType, TokenDetailType} from '../../utils/types';

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

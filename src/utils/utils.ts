import BigNumber from 'bignumber.js';
import BN from 'bn.js';

export const fetchDecimalsOffchain = async (url: string) => {
  let res = await fetch(url);
  let obj = await res.json();
  return obj;
};

export const toDecimalsBN = (
  num: BigNumber.Value,
  decimals: BigNumber.Value,
) => {
  const ten = new BigNumber(10);

  return new BN(BigNumber(num).multipliedBy(ten.pow(decimals)).toFixed(0));
};

export const base64ToImage = (
  base64: any,
  callback: (img: HTMLImageElement) => void,
) => {
  const img = new Image();
  img.onload = () => callback(img);
  img.src = base64;
};

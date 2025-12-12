export interface IToken {
  label: string;
  symbol: string;
  address: `0x${string}`;
  decimals: number;
  img: string;
}

export const TOKENS: IToken[] = [
  {
    label: "USD Coin",
    symbol: "USDC",
    address: "0x68C47CEAD9A67E27f84BDb058FCaB747d2F2e0C3",
    decimals: 6,
    img: "/usdc.svg",
  },
  {
    label: "Tether USD",
    symbol: "USDT",
    address: "0x0F4Fa7Dc4d2A69dE0Be5b5E3A6923ddce1a7Dc2a",
    decimals: 6,
    img: "/usdt.svg",
  },
];

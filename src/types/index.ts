export type AllProps = {
  rates: AllRates[];
};

export type AllRates = {
  description: string;
  code: string;
  rate: number;
};

export type ConverstionInputType = {
  from: string;
  to: string;
  amount: string;
};

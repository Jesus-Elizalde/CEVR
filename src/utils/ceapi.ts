import { AllRates } from "../types";

export const getAllRates = async (base: string): Promise<AllRates[]> => {
  const data = await fetch(`https://api.exchangerate.host/latest?base=${base}`);
  const dataJson = await data.json();

  const data2 = await fetch("https://api.exchangerate.host/symbols");
  const dataJson2 = await data2.json();

  const arr: AllRates[] = [];

  for (const key in dataJson2["symbols"]) {
    arr.push({ ...dataJson2["symbols"][key], rate: dataJson["rates"][key] });
  }

  return arr;
};

export const getConverstion = async (
  from: string,
  to: string,
  amount: number
) => {
  const data = await fetch(
    `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
  );

  const dataJson = await data.json();

  return dataJson;
};

export const getCode = async (): Promise<string[]> => {
  const data = await fetch("https://api.exchangerate.host/symbols");

  const dataJson = await data.json();

  return Object.keys(dataJson["symbols"]);
};

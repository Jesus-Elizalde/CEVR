import { AllRates } from "../types";

export const getAllRates = async (): Promise<AllRates[]> => {
  const data = await fetch("https://api.exchangerate.host/latest");
  const dataJson = await data.json();

  const data2 = await fetch("https://api.exchangerate.host/symbols");
  const dataJson2 = await data2.json();

  const arr: AllRates[] = [];

  for (const key in dataJson2["symbols"]) {
    arr.push({ ...dataJson2["symbols"][key], rate: dataJson["rates"][key] });
  }

  return arr;
};

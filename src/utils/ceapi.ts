export const getAllRates = async () => {
  const data = await fetch("https://api.exchangerate.host/latest");
  const dataJson = await data.json();

  return dataJson["rates"];
};

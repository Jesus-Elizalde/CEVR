import { useEffect, useState } from "react";
import "./App.css";
import { getAllRates } from "./utils";
import { AllProps, AllRates } from "./types";
import { getCode, getConverstion } from "./utils/ceapi";

enum Mode {
  All,
  CONVERSTION,
}

function App() {
  const [mode, setMode] = useState<Mode>(Mode.All);
  const [rates, setRates] = useState<AllRates[]>([]);
  const [base, setBase] = useState("AED");

  useEffect(() => {
    (async () => {
      const resRates = await getAllRates(base);
      setRates(resRates);
    })();
  }, []);
  return (
    <>
      <div>Currency Exchange</div>
      <div>
        <button onClick={() => setMode(Mode.All)}>All</button>
        <button onClick={() => setMode(Mode.CONVERSTION)}>Converstion</button>
      </div>
      {mode === Mode.All && <All rates={rates} />}
      {mode === Mode.CONVERSTION && <Converstion />}
    </>
  );
}

function All(props: AllProps) {
  const { rates } = props;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.code}>
              <th>{rate.code}</th>
              <th>{rate.description}</th>
              <th>{rate.rate}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Converstion() {
  const [codes, setCodes] = useState<string[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);

  const [rate, setRate] = useState(undefined);
  const [result, setResult] = useState(undefined);

  console.log("🚀 ~ file: App.tsx:66 ~ Converstion ~ amount:", amount);

  useEffect(() => {
    (async () => {
      const resCodes = await getCode();
      setCodes(resCodes);
    })();
  }, []);

  const handleFromSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrom(e.target.value);
  };
  const handleToSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTo(e.target.value);
  };

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await getConverstion(from, to, amount);
    setResult(res.result);
    setRate(res.info.rate);

    console.log(res);
  };

  return (
    <div>
      Converstion
      <form onSubmit={handleSubmit}>
        <div>Amount: ${amount}</div>
        <div>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={handleAmountInput}
          />
          <select
            name="from"
            id="from"
            value={from}
            onChange={handleFromSelect}
          >
            <option value="">--Please choose an option--</option>
            {codes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <p>----</p>
          <select name="to" id="to" value={to} onChange={handleToSelect}>
            <option value="">--Please choose an option--</option>
            {codes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          <button>Convert!</button>
        </div>
        <div>Converstion: ${result}</div>
      </form>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { getAllRates } from "./utils";
import { AllProps, AllRates } from "./types";

enum Mode {
  All,
  CONVERSTION,
}

function App() {
  const [mode, setMode] = useState<Mode>(Mode.All);
  const [rates, setRates] = useState<AllRates[]>([]);

  useEffect(() => {
    (async () => {
      const rates = await getAllRates();
      setRates(rates);
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
  console.log("🚀 ~ file: App.tsx:36 ~ All ~ rates:", typeof rates);
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
  return <div>Converstion</div>;
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { getAllRates } from "./utils";

enum Mode {
  All,
  CONVERSTION,
}

function App() {
  const [mode, setMode] = useState<Mode>(Mode.All);
  const [rates, setRates] = useState("");
  console.log("🚀 ~ file: App.tsx:13 ~ App ~ rates:", rates);

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
      {mode === Mode.All && <All />}
      {mode === Mode.CONVERSTION && <Converstion />}
    </>
  );
}

function All() {
  return <div>All</div>;
}
function Converstion() {
  return <div>Converstion</div>;
}

export default App;

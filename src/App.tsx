import React, { useState } from "react";
import LineNumberInput from "./components/line-number-input";
import StringTable from "./components/string-table";
import { Line, loadString } from "./services/api";
import { isValidLineNumber, parseLines } from "./services/strings";

import "./App.css";

function App() {
  const [strings, setStrings] = useState<Line[]>([]);
  const [rawLines, setRawLines] = useState("");

  const lines = rawLines ? rawLines.split(/[,;]/) : [];
  const displayAlert = lines.some((line) => !isValidLineNumber(line));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const strings = await Promise.all(parseLines(rawLines).map(loadString));
    setStrings(strings);
  };

  return (
    <div className="container">
      <form className="input-bar" onSubmit={handleSubmit}>
        <span>Идентификаторы строк</span>
        <LineNumberInput value={rawLines} onChange={setRawLines} />
        <button className="submit-button">Подсчитать</button>
      </form>
      <div className="alert">
        {displayAlert && <mark>Введите числа от 1 до 20</mark>}
      </div>
      <StringTable strings={strings} />
    </div>
  );
}

export default App;

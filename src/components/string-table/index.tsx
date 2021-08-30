import React from "react";
import { Line } from "../../services/api";
import { countVowels, countWords } from "../../services/strings";
import "./string-table.css";

interface StringTableProps {
  strings: Line[];
}
const StringTable: React.FC<StringTableProps> = ({ strings }) => {
  return (
    <div className="table-bar">
      <div className="table">
        <div className="title">Текст</div>
        <div className="title">Количесво слов</div>
        <div className="title">Количество гласных</div>
      </div>
      {strings.map(({ id, text, error }) => (
        <div className="table" key={id}>
          {error ? (
            <div className="error">Ошибка загрузки, попробуйте еще раз</div>
          ) : (
            <>
              <div>{text}</div>
              <div className="counter">{countWords(text)}</div>
              <div className="counter">{countVowels(text)}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default StringTable;

import React, { useRef } from "react";
import { isValidLineNumber } from "../../services/strings";
import "./line-number-input.css";

interface LineNumberInputProps {
  onChange: (value: string) => void;
  value: string;
}

const LineNumberInput: React.FC<LineNumberInputProps> = ({
  value,
  onChange,
}) => {
  const outputRef = useRef<HTMLDivElement>(null);

  const displayValue = value
    .split(/[,;]/)
    .map((word) => (isValidLineNumber(word) ? word : `<mark>${word}</mark>`))
    .join(",");

  const handleScroll = (e: React.SyntheticEvent<HTMLInputElement>) => {
    outputRef!.current!.scrollLeft = e.currentTarget.scrollLeft;
  };

  return (
    <div className="line-input">
      <input
        className="text-input"
        onChange={(e) => onChange(e.currentTarget.value)}
        onScroll={handleScroll}
        value={value}
      />
      <div
        ref={outputRef}
        className="text-output"
        dangerouslySetInnerHTML={{ __html: displayValue }}
      ></div>
    </div>
  );
};

export default LineNumberInput;

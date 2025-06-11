import { ChevronLeft, ChevronRight } from "lucide-react";
import "./number-input.css"

interface Props {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
}

export const NumberInput = ({ value, setValue, min, max }: Props) => {
  const handlePageNumber = (value: string) => {
    const parsed = parseInt(value);
    if (isNaN(parsed)) return;

    const clamped = Math.max(min, Math.min(max, parsed));
    setValue(clamped);
  };

  return (
    <div className="number-input-container flex-row-center">
      <button
        className="number-input-button flex-column-center"
        onClick={() => setValue(Math.max(min, value - 1))}
        disabled={value === min}
      >
        <ChevronLeft />
      </button>
      <input
        type="text"
        name="number-input-view"
        id="number-input-view"
        className="flex-column-center"
        value={value}
        onChange={(e) => handlePageNumber(e.target.value)}
      />
      <button
        className="number-input-button flex-column-center"
        onClick={() => setValue(Math.min(max, value + 1))}
        disabled={value === max}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

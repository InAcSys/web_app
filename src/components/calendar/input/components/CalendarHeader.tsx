import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dropdown } from "../../../dropdown/Dropdown";
import "./styles/calendar-header.css";

type setDateFunction = (value: number) => void;

interface Props {
  month: number;
  setMonth: setDateFunction;
  year: number;
  setYear: setDateFunction;
  months: Array<string>
  years: Array<string>
}

export const CalendarHeader = ({
  month,
  setMonth,
  year,
  setYear,
  months,
  years
}: Props) => {
  const changeLeft = () => {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const changeRight = () => {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  return (
    <div className="calendar-header-section flex-row-between">
      <button
        className="calendar-header-button flex-column-center"
        onClick={changeLeft}
        disabled={year == 0 && month == 0}
      >
        <ChevronLeft size="18px" />
      </button>

      <div className="calendar-month-and-year-section flex-row-center">
        <Dropdown
          optionSelected={month}
          changeOptionSelected={setMonth}
          options={months}
          errorIsVisible={false}
        />
        <Dropdown
          optionSelected={year}
          changeOptionSelected={setYear}
          options={years}
          errorIsVisible={false}
        />
      </div>

      <button
        className="calendar-header-button flex-column-center"
        onClick={changeRight}
        disabled={year == 10 && month == 11}
      >
        <ChevronRight size="18px" />
      </button>
    </div>
  );
};

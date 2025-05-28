import { CalendarHeader } from "./CalendarHeader";
import "./styles/calendar-section.css";
import { CalendarBody } from "./CalendarBody";

type setDateNumberFuntion = (value: number) => void;

interface Props {
  day: number;
  setDay: setDateNumberFuntion;
  month: number;
  setMonth: setDateNumberFuntion;
  year: number;
  setYear: setDateNumberFuntion;
  months: Array<string>;
  years: Array<string>;
  handleOpen: () => void;
}

export const CalendarSection = ({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  months,
  years,
  handleOpen,
}: Props) => {
  return (
    <div className="calendar-section-container">
      <CalendarHeader
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        months={months}
        years={years}
      />
      <CalendarBody
        month={month}
        year={year}
        selectedDay={day}
        setDay={setDay}
        handleOpen={handleOpen}
      />
    </div>
  );
};

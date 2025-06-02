import { Calendar } from "lucide-react";
import { CalendarSection } from "./components";
import "./calendar-input.css";
import { Label } from "../../generals";
import { useEffect, useState } from "react";

type setDateFunction = (value: Date) => void;

interface Props {
  label?: string;
  date?: Date;
  setDate: setDateFunction;
  minimunYear: number;
  maximunYear: number;
}

export const CalendarInput = ({
  label = "Ingresar fecha",
  date,
  setDate,
  minimunYear,
  maximunYear,
}: Props) => {
  const [selectDay, setSelectDay] = useState(0);
  const [selectMonth, setSelectMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [selectYear, setSelectYear] = useState(0);
  const [years, setYears] = useState<Array<string>>([]);
  const [currentDate, setCurrentDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const getYears = () => {
    const size = maximunYear - minimunYear + 1;
    const yearList = Array.from(
      { length: size },
      (_, i) => `${minimunYear + i}`
    );
    setYears(yearList);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const currentDate = new Date();
    setCurrentYear(currentDate.getFullYear());
    setSelectDay(currentDate.getDate());
    setSelectMonth(currentDate.getMonth());
  }, []);

  useEffect(() => {
    getYears();
  }, [minimunYear, maximunYear]);

  useEffect(() => {
    if (!years[selectYear]) return;

    const fullYear = parseInt(years[selectYear]);
    const newDate = new Date(fullYear, selectMonth, selectDay);
    setCurrentDate(newDate);
    setDate(newDate);
  }, [selectDay, selectMonth, selectYear, years]);

  const parseDateLocal = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    if (!date) return;

    let parsedDate: Date;

    if (date instanceof Date) {
      parsedDate = date;
    } else if (typeof date === "string") {
      parsedDate = parseDateLocal(date);
    } else {
      return;
    }

    if (isNaN(parsedDate.getTime())) return;

    setCurrentDate(parsedDate);
    setSelectDay(parsedDate.getDate());
    setSelectMonth(parsedDate.getMonth());
    const yearIndex = years.findIndex(
      (y) => parseInt(y) === parsedDate.getFullYear()
    );
    if (yearIndex !== -1) {
      setSelectYear(yearIndex);
    }
  }, [date, years]);

  return (
    <div className="calendar-input-section">
      <Label text={label} isMandatory />
      <button
        className="calendar-input-date-section flex-row-between"
        onClick={() => handleOpen()}
      >
        <span className="calendar-input-date-text">
          {currentDate
            ? currentDate.toLocaleDateString("es-ES")
            : "Elige una fecha"}
        </span>
        <Calendar className="calendar-input-date-icon" />
      </button>
      {isOpen && (
        <CalendarSection
          day={selectDay}
          setDay={setSelectDay}
          month={selectMonth}
          setMonth={setSelectMonth}
          year={selectYear}
          setYear={setSelectYear}
          months={months}
          years={years}
          handleOpen={handleOpen}
        />
      )}
    </div>
  );
};

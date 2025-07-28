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
  const [selectYear, setSelectYear] = useState(0);
  const [years, setYears] = useState<Array<string>>([]);
  const [currentDate, setCurrentDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

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

    if (currentDate?.getTime() !== newDate.getTime()) {
      setCurrentDate(newDate);
      setDate(newDate);
    }
  }, [selectDay, selectMonth, selectYear, years]);

  const parseDateLocal = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    if (!date || years.length === 0 || initialized) return;

    const parsedDate =
      date instanceof Date ? date : parseDateLocal(date as string);

    if (isNaN(parsedDate.getTime())) return;

    const day = parsedDate.getDate();
    const month = parsedDate.getMonth();
    const year = parsedDate.getFullYear();
    const yearIndex = years.findIndex((y) => parseInt(y) === year);

    if (yearIndex === -1) return;

    setSelectDay(day);
    setSelectMonth(month);
    setSelectYear(yearIndex);
    setCurrentDate(parsedDate);
    setInitialized(true);
  }, [date, years, initialized]);

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

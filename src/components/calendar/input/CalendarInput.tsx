import { Calendar } from "lucide-react";
import { CalendarSection } from "./components/CalendarSection";
import "./calendar-input.css";
import { Label } from "../../generals";
import { useEffect, useState } from "react";

type setDateFunction = (value: number) => void;

interface Props {
  label?: string;
  day: number;
  setDay: setDateFunction;
  month: number;
  setMonth: setDateFunction;
  setYear: setDateFunction;
  isOpen?: boolean;
  handleOpen: () => void;
}

export const CalendarInput = ({
  label = "Ingresar fecha",
  isOpen = false,
  day,
  setDay,
  month,
  setMonth,
  setYear,
  handleOpen,
}: Props) => {
  const [selectMonth, setSelectMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(0);
  const [selectYear, setSelectYear] = useState(0);
  const [currentDate, setCurrentDate] = useState("")

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

  const [years, setYears] = useState<Array<string>>([]);

  const getYears = () => {
    const yearList = Array.from({ length: 11 }, (_, i) => `${currentYear + i}`);
    setYears(yearList);
  };

  useEffect(() => {
    const currentDate = new Date();
    setCurrentYear(currentDate.getFullYear());
  });

  useEffect(() => {
    getYears();
  }, [currentYear]);

  useEffect(() => {
    setMonth(selectMonth + 1);
  }, [selectMonth]);

  useEffect(() => {
    setYear(Number(years[selectYear]));
  }, [years, selectYear]);

  useEffect(() => {
    setCurrentDate(`${day}/${selectMonth + 1}/${years[selectYear]}`)
  }, [day, selectMonth, selectYear])

  return (
    <div className="calendar-input-section">
      <Label text={label} isMandatory />
      <button
        className="calendar-input-date-section flex-row-between"
        onClick={() => handleOpen()}
      >
        <span className="calendar-input-date-text">
          {currentDate ?? "Elige una fecha"}
        </span>
        <Calendar className="calendar-input-date-icon" />
      </button>
      {isOpen && (
        <CalendarSection
          day={day}
          setDay={setDay}
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

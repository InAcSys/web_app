import { Calendar } from "lucide-react";
import { CalendarSection } from "./components/CalendarSection";
import "./calendar-input.css";
import { Label } from "../../generals";
import { useEffect, useState } from "react";

type setDateFunction = (value: string) => void;

interface Props {
  label?: string;
  setDate: setDateFunction;
  minimunYear: number;
  maximunYear: number;
}

export const CalendarInput = ({
  label = "Ingresar fecha",
  setDate,
  minimunYear,
  maximunYear,
}: Props) => {
  const [selectDay, setSelectDay] = useState(0);
  const [selectMonth, setSelectMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [selectYear, setSelectYear] = useState(0);
  const [years, setYears] = useState<Array<string>>([]);
  const [currentDate, setCurrentDate] = useState("");
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
    const size = (maximunYear - minimunYear) + 1
    const yearList = Array.from({ length: size }, (_, i) => `${minimunYear + i}`);
    setYears(yearList);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const currentDate = new Date();
    console.log(currentDate.getDay());
    setCurrentYear(currentDate.getFullYear());
    setSelectDay(currentDate.getDate());
    setSelectMonth(currentDate.getMonth());
  }, []);

  useEffect(() => {
    getYears();
  }, [currentYear]);

  useEffect(() => {
    setCurrentDate(`${selectDay}/${selectMonth + 1}/${years[selectYear]}`);
  }, [years]);

  useEffect(() => {
    setCurrentDate(`${selectDay}/${selectMonth + 1}/${years[selectYear]}`);
    setDate(
      `${years[selectYear]}-${
        selectMonth + 1 < 10 ? "0" + (selectMonth + 1) : selectMonth + 1
      }-${selectDay < 10 ? "0" + selectDay : selectDay}`
    );
  }, [selectDay, selectMonth, selectYear]);

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

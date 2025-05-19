import { useEffect, useState } from "react";
import "./styles/calendar-body.css";

interface Props {
  year: number;
  month: number;
  selectedDay: number;
  setDay: (value: number) => void;
  handleOpen: () => void;
}

const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const CalendarBody = ({
  year,
  month,
  selectedDay,
  setDay,
  handleOpen,
}: Props) => {
  const [calendar, setCalendar] = useState<Array<number | null>>([]);

  const handleDay = (day: number) => {
    setDay(day);
    handleOpen()
  };

  const getCalendarMatrix = (month: number, year: number) => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const calendar: (number | null)[] = [];

    for (let i = 0; i < firstDayIndex; i++) {
      calendar.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      calendar.push(day);
    }

    setCalendar(calendar);
  };

  useEffect(() => {
    getCalendarMatrix(month, year);
  }, [year, month]);

  return (
    <div className="calendar-body-section">
      {weekDays.map((day, i) => (
        <span className="calendar-body-day-name" key={i}>
          {day}
        </span>
      ))}

      {calendar.map((day, index) =>
        day === null ? (
          <div key={index}></div>
        ) : (
          <button
            className={`calendar-body-day-button ${
              selectedDay === day ? "selected" : ""
            }`}
            key={index}
            onClick={() => {
              handleDay(day)
              console.log(day)
            }}
          >
            {day}
          </button>
        )
      )}
    </div>
  );
};

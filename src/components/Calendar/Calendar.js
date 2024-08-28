import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import CalendarPlan from '../../components/Modal/calendarPlan';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Calendar = () => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(7);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateDifference, setDateDifference] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [plans, setPlans] = useState([]);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const weeks = [];
  let days = [];

  const handleDateClick = (day, selectedYear, selectedMonth) => {
    if (selectedYear !== year || selectedMonth !== month) {
      setYear(selectedYear);
      setMonth(selectedMonth);
    } else {
      const selectedFullDate = new Date(selectedYear, selectedMonth, day);
      const formattedDate = `${selectedFullDate.getFullYear()}년 ${
        selectedFullDate.getMonth() + 1
      }월 ${selectedFullDate.getDate()}일 (${daysOfWeek[selectedFullDate.getDay()]})`;

      const diffTime = selectedFullDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const formattedDifference =
        diffDays > 0
          ? `D - ${diffDays}`
          : diffDays < 0
            ? `D + ${Math.abs(diffDays)}`
            : 'D-day';

      setSelectedDate(formattedDate);
      setDateDifference(formattedDifference);
      setIsModalOpen(true);
    }
  };

  const addPlan = (plan) => {
    setPlans([...plans, plan]);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextMonth(),
    onSwipedRight: () => handlePrevMonth(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const weekHeader = (
    <div className="calendar-week-header flex">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          className="calendar-day-header flex-1 text-center py-2 font-semibold text-gray-700"
        >
          {day}
        </div>
      ))}
    </div>
  );

  for (let i = 0; i < firstDayOfMonth; i++) {
    const day = prevMonthDays - firstDayOfMonth + i + 1;
    const prevMonth = month - 1;
    const prevYear = prevMonth < 0 ? year - 1 : year;

    days.push(
      <button
        key={`prev-${i}`}
        className="calendar-day prev-next-month text-gray-400 pt-2 pb-[15%] flex flex-col items-center rounded-md"
        onClick={() =>
          handleDateClick(day, prevYear, prevMonth < 0 ? 11 : prevMonth)
        }
        style={{ flex: '0 0 14.28%' }}
      >
        <span className="mb-auto">{day}</span>
      </button>,
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const todayClass = isToday(day)
      ? 'bg-[#90C8FF] text-white rounded-full w-[50%] h-[50%] flex items-center justify-center'
      : '';

    days.push(
      <button
        key={day}
        className={`calendar-day pt-2 pb-[15%] text-center flex flex-col items-center rounded-md ${
          (firstDayOfMonth + day - 1) % 7 === 0 ? 'text-red-500' : ''
        } ${(firstDayOfMonth + day - 1) % 7 === 6 ? 'text-blue-500' : ''} hover:bg-gray-100`}
        onClick={() => handleDateClick(day, year, month)}
        style={{ flex: '0 0 14.28%' }}
      >
        <span className={`mb-auto ${todayClass}`}>{day}</span>
      </button>,
    );

    if ((firstDayOfMonth + day) % 7 === 0 || day === daysInMonth) {
      weeks.push(
        <div
          key={`week-${weeks.length}`}
          className="calendar-week flex justify-start"
        >
          {days}
        </div>,
      );
      days = [];
    }
  }

  const nextMonth = month + 1;
  const nextYear = nextMonth > 11 ? year + 1 : year;
  if (days.length > 0) {
    for (let i = 1; days.length < 7; i++) {
      days.push(
        <button
          key={`next-${i}`}
          className="calendar-day prev-next-month text-gray-400 pt-2 pb-[15%] flex flex-col items-center rounded-md"
          onClick={() =>
            handleDateClick(i, nextYear, nextMonth > 11 ? 0 : nextMonth)
          }
          style={{ flex: '0 0 14.28%' }}
        >
          <span className="mb-auto">{i}</span>
        </button>,
      );
    }
    weeks.push(
      <div key={`week-next`} className="calendar-week flex justify-start">
        {days}
      </div>,
    );
  }

  return (
    <div>
      <Header />
      <div
        {...handlers}
        className="calendar p-[3%] bg-white shadow-md rounded-3xl border mx-auto"
        style={{
          borderColor: '#DCDCDC',
          borderWidth: '1%',
          maxWidth: '95%',
          maxHeight: '90%', // 캘린더의 최대 높이를 90%로 설정하여 세로로 길게 만듦
        }}
      >
        <div className="calendar-header text-left mb-[1%]">
          <span className="text-lg font-semibold ml-[4%]">
            {year}년 {month + 1}월
          </span>
        </div>
        {weekHeader}
        {weeks}

        <CalendarPlan
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedDate}
        >
          <p className="text-sm text-gray-500">{dateDifference}</p>
          <ul>
            {plans
              .filter((plan) => plan.date === selectedDate)
              .map((plan, index) => (
                <li key={index} className="text-sm">
                  {plan.title}
                </li>
              ))}
          </ul>
        </CalendarPlan>
      </div>
      <Footer />
    </div>
  );
};

export default Calendar;

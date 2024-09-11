import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import CalendarPlan from '../../components/Modal/calendarPlan';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateDifference, setDateDifference] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [plans, setPlans] = useState([]);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  // 6주인지 5주인지 계산
  const totalDays = firstDayOfMonth + daysInMonth;
  const totalWeeks = Math.ceil(totalDays / 7); // 총 주 계산

  // 주차 수에 따른 패딩 설정
  let buttonPadding;
  if (totalWeeks === 4) {
    buttonPadding = 'pb-[23.3%]'; // 4주차일 때 패딩
  } else if (totalWeeks === 5) {
    buttonPadding = 'pb-[17.5%]'; // 5주차일 때 패딩
  } else if (totalWeeks === 6) {
    buttonPadding = 'pb-[13.63%]'; // 6주차일 때 패딩
  }

  const weeks = [];
  let days = [];

  const handleDateClick = (day, selectedYear, selectedMonth) => {
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

  // 이전 달의 빈 칸을 채움
  for (let i = 0; i < firstDayOfMonth; i++) {
    const day = prevMonthDays - firstDayOfMonth + i + 1;
    const prevMonth = month - 1;
    const prevYear = prevMonth < 0 ? year - 1 : year;

    days.push(
      <button
        key={`prev-${i}`}
        className={`calendar-day prev-next-month text-gray-400 ${buttonPadding} flex flex-col items-center rounded-md`}
        onClick={() =>
          handleDateClick(day, prevYear, prevMonth < 0 ? 11 : prevMonth)
        }
        style={{ flex: '0 0 14.28%' }}
      >
        <span className="mb-auto">{day}</span>
      </button>,
    );
  }

  // 현재 달의 날짜 채우기
  for (let day = 1; day <= daysInMonth; day++) {
    const todayClass = isToday(day)
      ? 'bg-[#90C8FF] text-white rounded-full w-[50%] h-[50%] flex items-center justify-center'
      : '';

    days.push(
      <button
        key={day}
        className={`calendar-day ${buttonPadding} text-center flex flex-col items-center rounded-md ${
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
      if (day !== daysInMonth) {
        days = [];
      }
    }
  }

  const nextMonth = month + 1;
  const nextYear = nextMonth > 11 ? year + 1 : year;

  // 마지막 주의 빈칸을 채움
  if (days.length > 0) {
    for (let i = 1; days.length < 7; i++) {
      days.push(
        <button
          key={`next-${i}`}
          className={`calendar-day prev-next-month text-gray-400 ${buttonPadding} flex flex-col items-center rounded-md`}
          onClick={() =>
            handleDateClick(i, nextYear, nextMonth > 11 ? 0 : nextMonth)
          }
          style={{ flex: '0 0 14.28%' }}
        >
          <span className="mb-auto">{i}</span>
        </button>,
      );
    }
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
          maxHeight: '90%',
        }}
      >
        <div className="calendar-header text-left mb-[1%]">
          <span className="text-lg font-semibold ml-[4%]">
            {year}년 {month + 1}월
          </span>
        </div>
        {weekHeader}
        {weeks.map((week, index) => (
          <div key={index} className="calendar-week flex justify-start">
            {week.props.children}
          </div>
        ))}

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

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CalendarPlan from '../../components/Modal/calendarPlan';
import { useSwipeable } from 'react-swipeable';

const Calendar = ({ calendarId, readOnly = false }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDates, setSelectedDates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState([]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const dragTimer = useRef(null);
  const holdThreshold = 200;

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const totalDays = firstDayOfMonth + daysInMonth;
  const totalWeeks = Math.ceil(totalDays / 7);

  let buttonPadding = '';
  if (totalWeeks === 4) {
    buttonPadding = 'pb-[22.65%]';
  } else if (totalWeeks === 5) {
    buttonPadding = 'pb-[17%]';
  } else if (totalWeeks === 6) {
    buttonPadding = 'pb-[13.2%]';
  }

  const weeks = [];
  let days = [];

  const getDatesInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = formatDateKey(currentDate);
      dateArray.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleMouseDown = (day, selectedYear, selectedMonth) => {
    if (readOnly) return;
    dragTimer.current = setTimeout(() => {
      setIsDragging(true);
      const startDate = new Date(selectedYear, selectedMonth, day);
      setDragStart(startDate);
      setDragEnd(startDate);
      setSelectedDates([formatDateKey(startDate)]);
    }, holdThreshold);
  };

  const handleMouseEnter = (day, selectedYear, selectedMonth) => {
    if (!isDragging) return;
    const endDate = new Date(selectedYear, selectedMonth, day);
    setDragEnd(endDate);

    if (dragStart) {
      const dates = getDatesInRange(dragStart, endDate);
      setSelectedDates(dates);
    }
  };

  const handleMouseUp = () => {
    clearTimeout(dragTimer.current);
    if (isDragging) {
      setIsDragging(false);
      if (Array.isArray(selectedDates) && selectedDates.length > 0) {
        setIsModalOpen(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(dragTimer.current);
    };
  }, [isDragging, selectedDates]);

  const handleDateClick = (day, selectedYear, selectedMonth) => {
    if (readOnly) return;

    const selectedFullDate = formatDateKey(
      new Date(selectedYear, selectedMonth, day),
    );
    setSelectedDates([selectedFullDate]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDates([]);
  };

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/calendar`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('API 응답 데이터:', response.data);

        const individualSchedule = response.data?.individualScheduleList || [];
        setPlans(Array.isArray(individualSchedule) ? individualSchedule : []);
      } catch (error) {
        console.error('캘린더 데이터 가져오기 오류:', error);
        setPlans([]);
      }
    };

    fetchCalendarData();
  }, [calendarId]);

  const handleAddPlan = (newPlan) => {
    if (readOnly) return;
    setPlans((prevPlans) => {
      const updatedPlans = [...prevPlans];
      selectedDates.forEach((date) => {
        updatedPlans.push({ ...newPlan, date });
      });
      return updatedPlans;
    });
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
        className={`calendar-day prev-next-month text-gray-400 ${buttonPadding} flex flex-col items-center rounded-md`}
        onClick={() =>
          handleDateClick(day, prevYear, prevMonth < 0 ? 11 : prevMonth)
        }
        style={{ flex: '0 0 14.28%' }}
      >
        <span className="mb-auto">{day}</span>
      </button>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const todayClass = isToday(day)
      ? 'bg-[#90C8FF] text-white rounded-full w-6 h-6 flex items-center justify-center'
      : '';

    const dateKey = formatDateKey(new Date(year, month, day));
    const plansForDay = Array.isArray(plans) ? plans.filter((plan) => plan.date === dateKey) : [];
    const isSelected = Array.isArray(selectedDates) && selectedDates.includes(dateKey);
    const marginBottoms = ['mb-[80%]', 'mb-[42%]', 'mb-[4%]'];

    days.push(
      <button
        key={day}
        className={`calendar-day ${buttonPadding} text-center relative flex flex-col items-center ${
          (firstDayOfMonth + day - 1) % 7 === 0 ? 'text-red-500' : ''
        } ${(firstDayOfMonth + day - 1) % 7 === 6 ? 'text-blue-500' : ''} hover:bg-gray-100 ${
          isSelected ? 'bg-gray-200' : ''
        } rounded-md`} // 여기에 rounded-md 추가
        onMouseDown={() => handleMouseDown(day, year, month)}
        onMouseEnter={() => handleMouseEnter(day, year, month)}
        onClick={() => handleDateClick(day, year, month)}
        style={{ flex: '0 0 14.28%', userSelect: 'none' }}
      >
        <span className={`mb-auto ${todayClass}`}>{day}</span>

        {Array.isArray(plansForDay) && plansForDay.length > 0 && plansForDay.map((plan, index) => (
          <div
            key={index}
            className={`absolute bottom-0 w-[90%] text-xs text-gray-600 flex justify-center ${marginBottoms[index]}`}
            style={{
              backgroundColor: plan.color || '#92C7FA',
              borderRadius: '4px',
              padding: '2px 4px',
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {plan.title.length > 3 ? `${plan.title.slice(0, 3)}...` : plan.title}
          </div>
        ))}

      </button>
    );

    if ((firstDayOfMonth + day) % 7 === 0 || day === daysInMonth) {
      weeks.push(
        <div key={`week-${weeks.length}`} className="calendar-week flex justify-start">
          {days}
        </div>
      );
      if (day !== daysInMonth) {
        days = [];
      }
    }
  }

  const nextMonth = month + 1;
  const nextYear = nextMonth > 11 ? year + 1 : year;

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
        </button>
      );
    }
  }

  return (
    <div>
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
        {!readOnly && (
          <CalendarPlan
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedDates={selectedDates}
            plans={plans}
            setPlans={setPlans}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;

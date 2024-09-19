import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CalendarPlan from '../../components/Modal/sharedCalendarPlan';
import { useSwipeable } from 'react-swipeable';
import SharedCalendarBottomSheet from '../../components/Modal/sharedCalendarBottomSheet';

const SharedCalendar = ({ id, readOnly = false }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDates, setSelectedDates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [calendarId, setCalendarId] = useState(null);

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

  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = date.getDate().toString().padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  };

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

  const handleMouseDown = (day, selectedYear, selectedMonth) => {
    if (readOnly) return;
    dragTimer.current = setTimeout(() => {
      setIsDragging(true);
      const startDate = new Date(selectedYear, selectedMonth, day);
      setDragStart(startDate);
      setDragEnd(startDate);
      const newSelectedDates = [formatDateKey(startDate)];
      setSelectedDates(newSelectedDates);
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
        setIsBottomSheetOpen(true);
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

  const fetchSharedCalendar = async (calendarId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/shared-schedule/${calendarId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      console.log('캘린더 정보:', response);

      // if (response.data.calendarId) {
      //   setCalendarId(response.data.calendarId);
      //   console.log('캘린더 ID:', response.data.calendarId);
      // } else {
      //   console.error('캘린더 아이디가 존재하지 않습니다.');
      //   setCalendarId(null); // 기본값을 설정하지 않고 null로 유지
      // }

      if (response.data && Array.isArray(response.data)) {
        console.log('공유캘린더에서 가져온 일정들:', response.data);
        setPlans(response.data);
      } else {
        setPlans([]);
      }
    } catch (error) {
      console.error('공유캘린더 데이터 가져오기 오류:', error);
      setPlans([]);
    }
  };

  useEffect(() => {
    if (id !== null) {
      fetchSharedCalendar(id);
      console.log('캘린더id', id);
    }
  }, [id]);

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

  const getColorByColorId = (colorId) => {
    switch (colorId) {
      case 1:
        return '#6BB6FF';
      case 2:
        return '#FF6B6B';
      case 3:
        return '#BEFF6B';
      default:
        return '#92C7FA'; // 기본 색상
    }
  };

  const totalDays = firstDayOfMonth + daysInMonth;
  const totalWeeks = Math.ceil(totalDays / 7);

  let buttonPadding = '';
  if (totalWeeks === 4) {
    buttonPadding = 'pb-[26%]';
  } else if (totalWeeks === 5) {
    buttonPadding = 'pb-[19.5%]';
  } else if (totalWeeks === 6) {
    buttonPadding = 'pb-[15.2%]';
  }

  const weeks = [];
  let days = [];

  // 이전 달의 일수 채우기
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

  // 현재 달의 일수 채우기
  for (let day = 1; day <= daysInMonth; day++) {
    const todayClass = isToday(day)
      ? 'bg-[#90C8FF] text-white rounded-full w-6 h-6 flex items-center justify-center'
      : '';

    const dateKey = formatDateKey(new Date(year, month, day));

    const plansForDay = plans.filter((plan) => {
      const currentDateString = dateKey;
      const planStartDateString = plan.startDate
        ? plan.startDate.slice(0, 10)
        : null;
      const planEndDateString = plan.endDate ? plan.endDate.slice(0, 10) : null;

      if (!planStartDateString || !planEndDateString) {
        return false;
      }

      const currentDate = new Date(`${currentDateString}T00:00:00`);
      const planStartDate = new Date(`${planStartDateString}T00:00:00`);
      const planEndDate = new Date(`${planEndDateString}T00:00:00`);

      return currentDate >= planStartDate && currentDate <= planEndDate;
    });

    const isSelected =
      Array.isArray(selectedDates) && selectedDates.includes(dateKey);
    const marginBottoms = ['mb-[90%]', 'mb-[47.5%]', 'mb-[6%]'];

    // 일정이 3개를 초과하면 3개만 표시
    const displayedPlans = plansForDay.slice(0, 3);
    const morePlansCount = plansForDay.length - displayedPlans.length;

    days.push(
      <button
        key={day}
        className={`calendar-day ${buttonPadding} text-center relative flex flex-col items-center ${
          (firstDayOfMonth + day - 1) % 7 === 0 ? 'text-red-500' : ''
        } ${(firstDayOfMonth + day - 1) % 7 === 6 ? 'text-blue-500' : ''} hover:bg-gray-100 ${
          isSelected ? 'bg-gray-200' : ''
        } rounded-md`}
        onMouseDown={() => handleMouseDown(day, year, month)}
        onMouseEnter={() => handleMouseEnter(day, year, month)}
        onClick={() => handleDateClick(day, year, month)}
        style={{ flex: '0 0 14.28%', userSelect: 'none' }}
      >
        <span className={`mb-auto ${todayClass}`}>{day}</span>

        {/* 표시된 일정들 */}
        {displayedPlans.length > 0 &&
          displayedPlans.map((plan, index) => (
            <div
              key={index}
              className={`absolute bottom-0 w-[90%] h-[20%] text-xs text-gray-600 flex justify-center items-start ${marginBottoms[index]}`} // items-start를 추가하여 글자를 위로 정렬
              style={{
                backgroundColor: getColorByColorId(plan.colorId),
                borderRadius: '4px',
                padding: '2px 4px',
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                lineHeight: '1', // 글자 간격을 조정하려면 line-height를 사용
              }}
            >
              {plan.name && plan.name.length > 3
                ? `${plan.name.slice(0, 3)}...`
                : plan.name}
            </div>
          ))}

        {/* 일정이 3개를 초과할 경우 더보기 버튼 표시 */}
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

  // 다음 달의 일수 채우기
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
        </button>,
      );
    }
  }

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

        {Array.isArray(selectedDates) && selectedDates.length > 0 && (
          <CalendarPlan
            isOpen={isModalOpen}
            onClose={closeModal}
            selectedDates={selectedDates}
            plans={plans}
            setPlans={setPlans}
            calendarId={id}
          />
        )}
      </div>

      {!readOnly &&
        Array.isArray(selectedDates) &&
        selectedDates.length > 0 && (
          // Calendar 컴포넌트에서 setPlans 전달 제대로 관리하기
          <SharedCalendarBottomSheet
            isOpen={isBottomSheetOpen}
            onClose={() => {
              setIsBottomSheetOpen(false);
              setSelectedDates([]); // 모달이 닫힐 때 선택된 날짜 초기화
            }}
            selectedDates={selectedDates} // 선택된 날짜 전달
            closeCalendarPlanModal={() => setIsModalOpen(false)} // CalendarPlan 모달 닫기
            calendarId={id}
            setPlans={(updatedPlans) => {
              console.log('Calendar에서 setPlans 호출됨:', updatedPlans);
              setPlans(updatedPlans); // 업데이트된 일정 리스트 설정
            }}
          />
        )}
    </div>
  );
};

export default SharedCalendar;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomSheet from '../../components/Modal/modifySharedCalendar';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const CalendarItem = ({ calendar, onClick }) => (
  <div
    className="flex items-center border-b p-4 hover:bg-gray-100 cursor-pointer"
    onClick={() => onClick(calendar.calendarId)}
  >
    <img
      src={calendar.image}
      alt="calendar-logo"
      className="w-16 h-16 border border-[#E6E6E6] rounded"
      style={{ borderRadius: '10px' }}
    />
    <div className="ml-4">
      <div className="flex items-center">
        <div className="text-[20px] font-bold">{calendar.name}</div>
        <div className="ml-2 text-[14px] text-[#676767]">
          {calendar.members}
        </div>
      </div>
      <div className="text-[12px] text-[#676767]">{calendar.description}</div>
    </div>
  </div>
);

const CalendarList = () => {
  const [calendars, setCalendars] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0bmFsczY1NUBrb29rbWluLmFjLmtyIiwiaWF0IjoxNzI2NDEwNjE0LCJleHAiOjE3MjcwMTU0MTQsInN1YiI6InRlc3RAZ21haWwuY29tIiwiaWQiOjF9.TQ-HNQnEWVfbhXeQJw6AKB2REhqbyJjRvQ-Oj-OY8BI';

    axios
      .get('/shared-calendar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCalendars(res.data || []);
      })
      .catch((error) => {
        console.error('공유 캘린더 목록 가져오기 오류:', error);
      });
  }, []);

  const handleCalendarClick = (calendarId) => {
    navigate(`/calendar/${calendarId}`);
  };

  const handleSave = (newCalendar) => {
    if (isEditMode) {
      setCalendars(
        calendars.map((cal) =>
          cal.calendarId === selectedCalendar.calendarId
            ? { ...cal, ...newCalendar }
            : cal,
        ),
      );
    } else {
      const newId = Math.max(...calendars.map((cal) => cal.calendarId), 0) + 1;
      setCalendars([...calendars, { ...newCalendar, calendarId: newId }]);
    }
    setIsSheetOpen(false);
    setIsEditMode(false);
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setSelectedCalendar(null);
    setIsSheetOpen(true);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <div className="flex-grow overflow-y-auto">
        {calendars.map((calendar) => (
          <CalendarItem
            key={calendar.calendarId}
            calendar={calendar}
            onClick={handleCalendarClick}
          />
        ))}
      </div>
      <div
        className="absolute bottom-32 right-8 flex justify-center items-center text-sm text-white font-preMedium bg-gradient-to-r from-[#77B8FF] to-[#9FCDFF] w-[5.8125rem] h-[1.6875rem] rounded-[0.625rem] cursor-pointer"
        onClick={openCreateModal}
      >
        캘린더 생성
      </div>
      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        mode={isEditMode ? 'edit' : 'create'}
        onSave={handleSave}
        calendar={selectedCalendar}
      />
      <Footer />
    </div>
  );
};

export default CalendarList;

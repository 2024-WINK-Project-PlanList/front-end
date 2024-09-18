import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomSheet from '../../components/Modal/modifySharedCalendar';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { getCalendarList } from '../../api/sharedCalendar';
import { ReactComponent as BasicPic } from '../../assets/sharedCalendar/shareCalendarNone.svg';

const CalendarItem = ({ calendar, onClick }) => (
  <div
    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
    onClick={() => onClick(calendar.id)}
  >
    {calendar.image ? (
      <img
        src={calendar.image}
        alt="calendar-logo"
        className="w-16 h-16 border border-[#E6E6E6] rounded-[10px]"
      />
    ) : (
      <BasicPic />
    )}
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

  const handleCalendarClick = (calendarId) => {
    console.log(calendarId);
    navigate(`/calendar/${calendarId}`, {
      state: { calendarId },
    });
  };

  useEffect(() => {
    const fetchCalendarList = async () => {
      try {
        const res = await await getCalendarList();
        console.log(res);
        setCalendars(res || []);
      } catch (error) {
        console.error('캘린더 목록 조회 실패:', error);
      }
    };

    fetchCalendarList();
  }, []);

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
      <div className="flex-grow overflow-y-auto pb-[5.875rem]">
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

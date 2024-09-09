import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wink from '../../assets/sharedCalendar/wink.svg';
import clerker from '../../assets/sharedCalendar/clerker.svg';
import planlist from '../../assets/sharedCalendar/logo.svg';
import BottomSheet from '../../components/Modal/modifySharedCalendar';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const initialCalendars = [
  {
    id: 1,
    name: '2024 WINK',
    members: 49,
    description: '국민대학교 소프트웨어융합대학 소속 웹 학습 동아리 WINK',
    image: wink,
  },
  {
    id: 2,
    name: 'Clerker',
    members: 11,
    description: '자이 컨퍼런스 서비스 1팀, AI 회의 요약 서비스 클러커',
    image: clerker,
  },
  {
    id: 3,
    name: 'PlanList',
    members: 7,
    description: '팀 일정관리 캘린더, 플랜리스트',
    image: planlist,
  },
];

const CalendarItem = ({ calendar, onClick }) => (
  <div
    className="flex items-center border-b p-4 hover:bg-gray-100 cursor-pointer"
    onClick={() => onClick(calendar.id)}
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
  const [calendars, setCalendars] = useState(initialCalendars);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const navigate = useNavigate();

  const handleCalendarClick = (id) => {
    navigate(`/calendar/${id}`);
  };

  const handleSave = (newCalendar) => {
    if (isEditMode) {
      setCalendars(
        calendars.map((cal) =>
          cal.id === selectedCalendar.id ? { ...cal, ...newCalendar } : cal,
        ),
      );
    } else {
      const newId = Math.max(...calendars.map((cal) => cal.id), 0) + 1; // 최대 ID + 1
      setCalendars([...calendars, { ...newCalendar, id: newId }]);
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
            key={calendar.id}
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

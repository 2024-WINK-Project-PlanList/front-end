import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import setting from '../../assets/sharedCalendar/setting.svg';
import wink from '../../assets/sharedCalendar/wink.svg';
import clerker from '../../assets/sharedCalendar/clerker.svg';
import planlist from '../../assets/sharedCalendar/logo.svg';
import Calendar from '../../components/Calendar/Calendar';
import BottomSheet from '../../components/Modal/modifySharedCalendar';

const sharedCalendars = [
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

const CalendarDetail = () => {
  const { id } = useParams();
  const calendarId = parseInt(id);
  const navigate = useNavigate();
  const [calendar, setCalendar] = useState(
    sharedCalendars.find((cal) => cal.id === calendarId),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (updatedCalendar) => {
    setCalendar((prevCalendar) => ({
      ...prevCalendar,
      ...updatedCalendar,
    }));
  };

  const handleExit = () => {
    navigate('/calendar');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-8">
      <div className="flex items-center p-4 w-full">
        <img
          src={calendar.image}
          alt="calendar-logo"
          className="w-20 h-20 border border-[#E6E6E6] rounded"
          style={{ borderRadius: '10px' }}
        />
        <div className="ml-4">
          <div className="flex items-center">
            <div className="text-[24px] font-bold">{calendar.name}</div>
            <div className="ml-2 text-[16px] text-[#676767]">
              {calendar.members}
            </div>
            <img
              src={setting}
              alt="setting"
              className="absolute right-12 cursor-pointer"
              role="button"
              onClick={openModal}
            />
          </div>
          <div className="text-[12px] text-[#676767]">
            {calendar.description}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Calendar />
      </div>
      <BottomSheet
        isOpen={isModalOpen}
        onClose={closeModal}
        mode="edit"
        name={calendar.name}
        description={calendar.description}
        members={calendar.members}
        image={calendar.image}
        onSave={handleSave}
        onExit={handleExit}
      />
    </div>
  );
};

export default CalendarDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import setting from '../../assets/sharedCalendar/setting.svg';
import Calendar from '../../components/Calendar/Calendar';
import BottomSheet from '../../components/Modal/modifySharedCalendar';

const CalendarDetail = () => {
  const calendarId = useParams();
  const navigate = useNavigate();
  const [calendar, setCalendar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0bmFsczY1NUBrb29rbWluLmFjLmtyIiwiaWF0IjoxNzI2NDEwNjE0LCJleHAiOjE3MjcwMTU0MTQsInN1YiI6InRlc3RAZ21haWwuY29tIiwiaWQiOjF9.TQ-HNQnEWVfbhXeQJw6AKB2REhqbyJjRvQ-Oj-OY8BI';

    axios
      .get(`/shared-calendar/${calendarId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCalendar(res.data || []);
      })
      .catch((error) => {
        console.error('공유캘린더 조회 오류:', error);
      });
  }, [calendarId]);

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

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import setting from '../../assets/sharedCalendar/setting.svg';
import Calendar from '../../components/Calendar/Calendar';
import BottomSheet from '../../components/Modal/modifySharedCalendar';
import { getSharedCalendar } from '../../api/sharedCalendar';
import Header from '../../components/Layout/Header';
import { ReactComponent as BasicPic } from '../../assets/sharedCalendar/shareCalendarNone.svg';
import Footer from '../../components/Layout/Footer';

const CalendarDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [calendar, setCalendar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calendarId = location.state?.calendarId;

  useEffect(() => {
    const fetchCalendar = async () => {
      if (calendarId) {
        try {
          const res = await getSharedCalendar(calendarId);
          setCalendar(res);
        } catch (error) {
          console.error('공유캘린더 조회 실패:', error);
        }
      }
    };

    fetchCalendar();
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
    <>
      <Header />
      <div className="flex flex-col items-center h-screen">
        <div className="flex items-center p-4 w-full">
          {calendar?.image ? (
            <img
              src={calendar.image}
              alt="calendar-logo"
              className="w-20 h-20 border border-[#E6E6E6] rounded-[10px] drop-shadow-md"
            />
          ) : (
            <BasicPic className="w-20 h-20 drop-shadow-md" />
          )}
          <div className="ml-4">
            <div className="flex items-center">
              <div className="text-[26px] font-preRegular">
                {calendar?.name || 'No name'}
              </div>{' '}
              {/* 기본값 처리 */}
              <div className="ml-2 text-[16px] text-[#676767] font-preMedium">
                {calendar?.members || 'No members'}
              </div>
              <img
                src={setting}
                alt="setting"
                className="absolute right-12 cursor-pointer"
                role="button"
                onClick={openModal}
              />
            </div>
            <div className="text-[12px] text-[#676767] font-preRegular">
              {calendar?.description || 'No description'} {/* 기본값 처리 */}
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
          name={calendar?.name}
          description={calendar?.description}
          members={calendar?.members}
          image={calendar?.image}
          onSave={handleSave}
          onExit={handleExit}
          id={calendarId}
        />
      </div>
      <Footer />
    </>
  );
};

export default CalendarDetail;

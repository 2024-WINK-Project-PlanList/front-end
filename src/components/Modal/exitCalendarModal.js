import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteSharedCalendar } from '../../api/sharedCalendar';
import { ReactComponent as BasicPic } from '../../assets/sharedCalendar/shareCalendarNone.svg';

const ExitCalendarModal = ({
  isOpen,
  onClose,
  calendarId,
  calendarName,
  calendarImage,
}) => {
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      await deleteSharedCalendar(calendarId);
      navigate('/calendar'); // 삭제 후 /calendar로 리디렉션
      console.log('캘린더 삭제 성공');
    } catch (error) {
      console.error('캘린더 삭제 실패:', error);
      // 에러 처리 로직
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[348px] h-[268px] bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <div className="absolute inset-x-0 bottom-11 border-t border-[#D5D5D5]" />
        <div className="absolute inset-y-56 left-1/2 border-l border-[#D5D5D5] h-[44px]" />
        <div className="text-center mb-4 flex flex-col items-center">
          {calendarImage ? (
            <img
              src={calendarImage}
              alt="calendar logo"
              className="w-24 h-24 border border-gray-300 rounded-lg mb-2 drop-shadow-md"
            />
          ) : (
            <BasicPic className="w-24 h-24 mb-2 drop-shadow-md" />
          )}
          {calendarName && (
            <p className="text-xl font-semibold">{calendarName}</p>
          )}
        </div>
        <span className="text-center text-base mb-4">
          공유 캘린더를 나가시겠어요?
        </span>
        <div className="flex flex-col mt-auto">
          <div className="relative flex items-center">
            <button
              className="flex p-4 mt-1 ml-8 text-black font-bold bg-transparent"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="flex p-2 mt-2 ml-28 text-red-500 font-bold bg-transparent"
              onClick={handleConfirm} // API 호출 및 리디렉션
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitCalendarModal;

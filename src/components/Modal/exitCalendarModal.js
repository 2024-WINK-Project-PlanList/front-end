import React from 'react';
import axios from 'axios';

const ExitCalendarModal = ({
  isOpen,
  onClose,
  onConfirm,
  calendarId,
  calendarName,
  calendarImage,
}) => {
  // 나가기 API
  const handleExit = async () => {
    try {
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0bmFsczY1NUBrb29rbWluLmFjLmtyIiwiaWF0IjoxNzI2NDEwNjE0LCJleHAiOjE3MjcwMTU0MTQsInN1YiI6InRlc3RAZ21haWwuY29tIiwiaWQiOjF9.TQ-HNQnEWVfbhXeQJw6AKB2REhqbyJjRvQ-Oj-OY8BI';

      await axios.delete(`/shared-calendar/${calendarId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onConfirm();
    } catch (error) {
      console.error('공유 캘린더 나가기 오류:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[348px] h-[268px] bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <div className="absolute inset-x-0 bottom-11 border-t border-[#D5D5D5]" />
        <div className="absolute inset-y-56 left-1/2 border-l border-[#D5D5D5] h-[44px]" />
        <div className="text-center mb-4 flex flex-col items-center">
          {calendarImage && (
            <img
              src={calendarImage}
              alt="calendar logo"
              className="w-24 h-24 border border-gray-300 rounded-lg mb-2"
            />
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
              onClick={handleExit}
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

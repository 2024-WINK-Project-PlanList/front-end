import React, { useState } from 'react';
import CalendarBottomSheet from './CalendarBottomSheet';

const CalendarPlan = ({ isOpen, onClose, title, selectedDate, children }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div
        className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleOverlayClick}
      >
        <div
          className="modal-container bg-white rounded-2xl shadow-lg w-full max-w-xs h-[80vh] mx-4 flex flex-col"
          style={{ width: '80%', maxWidth: '365px', height: '75vh' }}
        >
          <div className="modal-header flex flex-col justify-between items-start p-4">
            <h2 className="text-xl font-preRegular">{title}</h2>
            {children && (
              <div className="mt-0 leading-none text-sm text-gray-500">
                {children}
              </div>
            )}
          </div>
          <div className="modal-content p-4 flex-1 overflow-y-auto"></div>
          <div className="modal-footer flex justify-end p-4">
            <button
              className="w-full px-4 py-2 bg-[#73B7FF] text-white rounded-lg hover:bg-[#58A9FF]"
              onClick={handleOpenBottomSheet}
            >
              일정 추가하기
            </button>
          </div>
        </div>
      </div>

      {/* CalendarBottomSheet 모달 */}
      <CalendarBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onAdd={onClose} // 추가 후 모달 닫기
        selectedDate={selectedDate}
      />
    </>
  );
};

export default CalendarPlan;

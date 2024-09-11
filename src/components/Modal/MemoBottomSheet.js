import React, { useState, useEffect, useRef } from 'react';
import Calendar from '../../components/Calendar/Calendar'; // Calendar 컴포넌트 임포트

const MemoBottomSheet = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sheetRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 30);
    } else if (isAnimating) {
      setIsAnimating(false);
      setTimeout(() => {
        setIsMounted(false);
        onClose();
      }, 300);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMounted(false);
      onClose();
    }, 300);
  };

  if (!isMounted) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
        onClick={handleOverlayClick}
      >
        <div
          ref={sheetRef}
          className={`bg-white rounded-t-2xl shadow-lg w-[480px] mx-auto transform transition-transform duration-300 ease-out ${
            isAnimating ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ height: 'calc(100vh - 4.25rem)', overflowY: 'auto' }}
        >
          {/* 드래그 영역 */}
          <div
            className="p-4 flex justify-center items-center cursor-pointer"
            onClick={handleClose}
          >
            <div className="w-24 h-1.5 bg-gray-400 rounded-full"></div>
          </div>

          {/* 모달 안에 캘린더만 표시 */}
          <div className="p-4">
            <Calendar isReadOnly={true} /> {/* isReadOnly prop 전달 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemoBottomSheet;

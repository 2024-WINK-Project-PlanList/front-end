import React, { useState, useEffect, useRef } from 'react';
import Calendar from '../../components/Calendar/Calendar'; // Calendar 컴포넌트 임포트
import FriendsProfile from '../../components/FriendsProfile/friendsProfile'; // 새로 만든 FriendsProfile 컴포넌트 가져오기

const MemoBottomSheet = ({
  isOpen,
  onClose,
  profileImage,
  profileName,
  profileMessage,
  calendarData, // 캘린더 데이터를 props로 전달받음
}) => {
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={sheetRef}
        className={`bg-white rounded-t-2xl shadow-lg w-[480px] mx-auto transform transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          height: 'calc(100vh - 4.25rem)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflowY: 'auto', // 스크롤 추가
        }}
      >
        <div
          className="p-4 flex justify-center items-center cursor-pointer"
          onClick={handleClose}
        >
          <div className="w-24 h-1.5 bg-gray-400 rounded-full"></div>
        </div>

        {/* 친구 프로필 정보 표시 */}
        <div className="mt-8">
          <FriendsProfile
            profileImage={profileImage}
            profileName={profileName} // 이름을 전달 (없으면 기본값 사용)
            profileMessage={profileMessage} // 친구의 코멘트를 전달
          />
        </div>

        {/* 캘린더 컴포넌트에 calendarData 전달하여 렌더링 */}
        <div className="flex-grow mt-[25%]">
          <Calendar readOnly={true} calendarData={calendarData} />
        </div>
      </div>
    </div>
  );
};

export default MemoBottomSheet;

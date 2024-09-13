import React, { useState, useEffect, useRef } from 'react';
import Calendar from '../../components/Calendar/Calendar'; // Calendar 컴포넌트 임포트
import FriendsProfile from '../../components/FriendsProfile/friendsProfile'; // 새로 만든 FriendsProfile 컴포넌트 가져오기

const MemoBottomSheet = ({
  isOpen,
  onClose,
  profileImage,
  profileName,
  profileEmail,
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
        {/* 드래그 영역 */}
        <div
          className="p-4 flex justify-center items-center cursor-pointer"
          onClick={handleClose}
        >
          <div className="w-24 h-1.5 bg-gray-400 rounded-full"></div>
        </div>

        {/* FriendsProfile을 상단에 위치시키고 아래로 내리기 위해 margin-top 추가 */}
        <div className="mt-8">
          <FriendsProfile
            profileImage={profileImage}
            profileName={profileName} // 이름을 전달 (없으면 기본값 사용)
            profileEmail={profileEmail} // 이메일을 전달 (없으면 기본값 사용)
          />
        </div>

        {/* 캘린더는 FriendsProfile 아래에 위치 */}
        <div className="flex-grow mt-[25%]">
          <Calendar readOnly={true} /> {/* readOnly 모드로 표시 */}
        </div>
      </div>
    </div>
  );
};

export default MemoBottomSheet;

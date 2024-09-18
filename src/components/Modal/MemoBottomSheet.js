import React, { useState, useEffect, useRef } from 'react';
import FriendCalendar from '../../components/Calendar/FriendCalendar'; // 새로 만든 FriendCalendar
import FriendsProfile from '../../components/FriendsProfile/friendsProfile';

const MemoBottomSheet = ({
  isOpen,
  onClose,
  profileImage,
  profileName,
  profileEmail, // 이메일 전달
  currentSong, // 현재 노래
  profileMessage,
  userId, // 친구의 userId 받기
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
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setIsMounted(false);
        onClose();
      }, 300);
    }
  }, [isOpen, onClose]);

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
          overflowY: 'auto',
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
            profileName={profileName}
            profileEmail={profileEmail} // 이메일 정보 표시
            currentSong={currentSong} // 노래 정보 전달
            profileMessage={profileMessage}
          />
        </div>

        {/* 친구 캘린더 렌더링 */}
        <div className="flex-grow mt-[25%]">
          {userId ? (
            <FriendCalendar userId={userId} /> // FriendCalendar에 userId 전달
          ) : (
            <p>캘린더 데이터를 불러올 수 없습니다. 유저 ID가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoBottomSheet;

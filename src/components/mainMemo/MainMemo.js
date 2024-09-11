import React, { useState, useRef } from 'react';
import MemoBottomSheet from '../Modal/MemoBottomSheet'; // 바텀시트 모달 가져오기
import myProfileImage from '../../assets/mainpage/profile.svg';
import friendProfileImage from '../../assets/mainpage/profile.svg';
import myMessageImage from '../../assets/mainpage/mymessage.svg';
import friendsMessageImage from '../../assets/mainpage/friendsmessage.svg';

const MainMemo = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null); // 선택된 프로필 상태
  const sliderRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseLeave = () => {
    isDragging = false;
  };

  const handleClick = (profileType, index) => {
    setSelectedProfile(`${profileType} ${index + 1}`); // 프로필 정보를 설정
    setIsBottomSheetOpen(true); // 바텀시트 열기
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false); // 바텀시트 닫기
  };

  const friendsProfiles = [
    friendProfileImage,
    friendProfileImage,
    friendProfileImage,
    friendProfileImage,
  ];

  return (
    <>
      <div
        className="flex items-center p-4 space-x-4 overflow-x-auto cursor-grab"
        id="profile-slider"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>
          {`
            #profile-slider::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {/* 나의 프로필 */}
        <button
          className="relative flex-shrink-0 focus:outline-none"
          style={{ width: '90px', height: '90px' }}
          onClick={() => handleClick('My Profile', 0)}
        >
          <img
            src={myProfileImage}
            alt="My Profile"
            className="w-full h-full rounded-full"
          />
          <img
            src={myMessageImage}
            alt="My Message"
            className="absolute bottom-[55%] left-1/2 transform -translate-x-1/2 w-full"
          />
        </button>

        {friendsProfiles.map((profile, index) => (
          <button
            key={index}
            className="relative flex-shrink-0 focus:outline-none"
            style={{ width: '90px', height: '90px' }}
            onClick={() => handleClick('Friend', index)}
          >
            <img
              src={profile}
              alt={`Friend ${index + 1}`}
              className="w-full h-full rounded-full"
            />
            <img
              src={friendsMessageImage}
              alt={`Friend ${index + 1} Message`}
              className="absolute bottom-[55%] left-1/2 transform -translate-x-1/2 w-full"
            />
          </button>
        ))}
      </div>

      {/* 바텀시트 모달 */}
      <MemoBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />
    </>
  );
};

export default MainMemo;

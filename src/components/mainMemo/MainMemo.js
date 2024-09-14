import React, { useState, useRef } from 'react';
import axios from 'axios'; // axios 가져오기
import MemoBottomSheet from '../Modal/MemoBottomSheet';
import myProfileImage from '../../assets/mainpage/profile.svg';
import friendProfileImage from '../../assets/mainpage/profile.svg';
import myMessageImage from '../../assets/mainpage/mymessage.svg';
import friendsMessageImage from '../../assets/mainpage/friendsmessage.svg';

const MainMemo = ({ memoData }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedProfileMessage, setSelectedProfileMessage] = useState('');
  const [selectedProfileName, setSelectedProfileName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const sliderRef = useRef(null);
  const myProfileName = '나의 하루';

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

  // 프로필 클릭 핸들러 (백엔드에 요청 보냄)
  const handleClick = (profileType, index, name, userId) => {
    // 'My Profile'인 경우 모달을 열지 않음
    if (profileType === 'My Profile') {
      return;
    }

    axios
      .get(`/calendar/${userId}`)
      .then((response) => {
        const { individualSchedule } = response.data.user;
        setSelectedProfileImage(friendProfileImage); // 받아온 데이터를 이미지에 반영
        setSelectedProfileMessage(individualSchedule); // 스케줄 메시지 업데이트
        setSelectedProfileName(name); // 선택된 친구 이름 업데이트
        setSelectedUserId(userId); // 선택된 사용자 ID 저장
        setIsBottomSheetOpen(true); // 바텀시트 열기
      })
      .catch((error) => {
        console.error('프로필 정보 가져오기 오류:', error);
      });
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

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
          style={{ width: '90px', height: '130px' }}
          onClick={() => handleClick('My Profile', 0)}
        >
          <img
            src={myProfileImage}
            alt="My Profile"
            className="w-full h-full rounded-full"
            style={{ marginBottom: '20px' }}
          />
          <img
            src={myMessageImage}
            alt="My Message"
            className="absolute bottom-[55%] left-1/2 transform -translate-x-1/2 w-full"
          />
          <p
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-bold"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '80px',
            }}
          >
            {myProfileName}
          </p>
        </button>

        {/* 친구들 프로필 */}
        {memoData.map((friend, index) => (
          <button
            key={index}
            className="relative flex-shrink-0 focus:outline-none"
            style={{ width: '90px', height: '130px' }}
            onClick={() => handleClick('Friend', index, friend.name, friend.id)} // 친구 클릭 시 userId 전달
          >
            <img
              src={friend.image}
              alt={`Friend ${index + 1}`}
              className="w-full h-full rounded-full"
              style={{ marginBottom: '20px' }}
            />
            <img
              src={friendsMessageImage}
              alt={`Friend ${index + 1} Message`}
              className="absolute bottom-[55%] left-1/2 transform -translate-x-1/2 w-full"
            />
            <p
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-bold"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '80px',
              }}
            >
              {friend.name}
            </p>
          </button>
        ))}
      </div>

      {/* 바텀시트 모달에 메시지 및 이름 전달 */}
      <MemoBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        profileImage={selectedProfileImage}
        profileMessage={selectedProfileMessage}
        profileName={selectedProfileName}
        userId={selectedUserId}
      />
    </>
  );
};

export default MainMemo;

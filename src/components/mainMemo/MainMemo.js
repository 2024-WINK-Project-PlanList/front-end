import React, { useState, useRef } from 'react';
import axios from 'axios';
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
  const [selectedCalendarData, setSelectedCalendarData] = useState([]); // 캘린더 데이터 상태 추가
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

  // 친구 프로필 클릭 시 서버에서 캘린더 데이터 가져오기
  const handleClick = async (profileType, index, nickname, userId) => {
    if (profileType === 'My Profile') {
      return;
    }

    try {
      // 캘린더 데이터 요청
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/calendar/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { individualSchedule } = response.data.user; // 서버에서 받아온 스케줄 리스트
      setSelectedCalendarData(individualSchedule); // 캘린더 데이터 업데이트

      // 친구의 정보를 바텀시트에 보여줌
      setSelectedProfileImage(friendProfileImage);
      setSelectedProfileMessage(memoData[index].comment); // 친구의 comment를 바텀시트에 표시
      setSelectedProfileName(nickname);
      setSelectedUserId(userId);
      setIsBottomSheetOpen(true);
    } catch (error) {
      console.error('캘린더 데이터를 가져오는 중 오류 발생:', error);
    }
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
            onClick={() =>
              handleClick('Friend', index, friend.nickname, friend.id)
            } // 친구 클릭 시 userId 전달
          >
            <img
              src={friend.profileImagePath} // profileImagePath 사용
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
              {friend.nickname}
            </p>
          </button>
        ))}
      </div>

      {/* 바텀시트 모달에 메시지 및 캘린더 데이터 전달 */}
      <MemoBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        profileImage={selectedProfileImage}
        profileMessage={selectedProfileMessage}
        profileName={selectedProfileName}
        userId={selectedUserId}
        calendarData={selectedCalendarData} // 받아온 캘린더 데이터 전달
      />
    </>
  );
};

export default MainMemo;

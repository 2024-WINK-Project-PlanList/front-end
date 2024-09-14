import React, { useState, useRef } from 'react'; // 필요한 훅 import
import MemoBottomSheet from '../Modal/MemoBottomSheet'; // 바텀시트 모달 가져오기
import myProfileImage from '../../assets/mainpage/profile.svg'; // 내 프로필 이미지 경로
import friendProfileImage from '../../assets/mainpage/profile.svg'; // 친구 프로필 이미지 경로
import myMessageImage from '../../assets/mainpage/mymessage.svg'; // 내 메시지 이미지 경로
import friendsMessageImage from '../../assets/mainpage/friendsmessage.svg'; // 친구 메시지 이미지 경로

const MainMemo = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedProfileMessage, setSelectedProfileMessage] = useState(''); // 프로필 메시지 상태 추가
  const [selectedProfileName, setSelectedProfileName] = useState(''); // 선택된 프로필 이름 상태 추가
  const sliderRef = useRef(null);
  const myProfileName = '나의 하루'; // 내 프로필 이름 설정 (여기서 수정 가능)

  let isDragging = false;
  let startX;
  let scrollLeft;

  // 드래그 시작 핸들러
  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  // 드래그 중 핸들러
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // 드래그 종료 핸들러
  const handleMouseUp = () => {
    isDragging = false;
  };

  // 드래그 취소 핸들러
  const handleMouseLeave = () => {
    isDragging = false;
  };

  // 프로필 클릭 핸들러
  const handleClick = (profileType, index, name) => {
    // 'My Profile'인 경우 모달을 열지 않음
    if (profileType === 'My Profile') {
      return;
    }

    const profileImage = friendProfileImage;
    const profileMessage = `Friend ${index + 1}'s message`; // 각 친구의 메시지 설정
    const profileName = name; // 친구 이름 설정

    setSelectedProfileImage(profileImage);
    setSelectedProfileMessage(profileMessage); // 선택된 메시지 설정
    setSelectedProfileName(profileName); // 선택된 친구 이름 설정
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const friendsProfiles = [
    { image: friendProfileImage, name: '황현진' },
    { image: friendProfileImage, name: '류상우' },
    { image: friendProfileImage, name: '박지민' },
    { image: friendProfileImage, name: '황수민' },
    { image: friendProfileImage, name: '징민우' },
    { image: friendProfileImage, name: '남윤찬' },
  ]; // 친구들 프로필 배열

  return (
    <>
      {/* 친구들 프로필과 메인 프로필 */}
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
          style={{ width: '90px', height: '130px' }} // 높이를 130px로 확장해 이름 공간 확보
          onClick={() => handleClick('My Profile', 0)} // 내 프로필은 모달을 열지 않음
        >
          <img
            src={myProfileImage}
            alt="My Profile"
            className="w-full h-full rounded-full"
            style={{ marginBottom: '20px' }} // 이미지와 텍스트 사이 간격을 20px로 확장
          />
          <img
            src={myMessageImage}
            alt="My Message"
            className="absolute bottom-[55%] left-1/2 transform -translate-x-1/2 w-full"
          />
          <p
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-bold"
            style={{
              whiteSpace: 'nowrap', // 한 줄로 표시
              overflow: 'hidden', // 넘치는 부분 숨김
              textOverflow: 'ellipsis', // 넘치는 부분을 생략 표시 (...)
              maxWidth: '80px', // 이름의 최대 너비 설정
            }}
          >
            {myProfileName} {/* 내 프로필 이름 표시 */}
          </p>
        </button>

        {/* 친구들 프로필 */}
        {friendsProfiles.map((friend, index) => (
          <button
            key={index}
            className="relative flex-shrink-0 focus:outline-none"
            style={{ width: '90px', height: '130px' }} // 높이를 130px로 확장해 이름 공간 확보
            onClick={() => handleClick('Friend', index, friend.name)} // 친구들 클릭 시 모달 열림
          >
            <img
              src={friend.image}
              alt={`Friend ${index + 1}`}
              className="w-full h-full rounded-full"
              style={{ marginBottom: '20px' }} // 이미지와 텍스트 사이 간격을 20px로 확장
            />
            <img
              src={friendsMessageImage}
              alt={`Friend ${index + 1} Message`}
              className="absolute bottom-[55%] left-1/2 transform -translate-x-1/2 w-full"
            />
            {/* 친구 메시지 이미지 추가 */}
            <p
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-bold"
              style={{
                whiteSpace: 'nowrap', // 한 줄로 표시
                overflow: 'hidden', // 넘치는 부분 숨김
                textOverflow: 'ellipsis', // 넘치는 부분을 생략 표시 (...)
                maxWidth: '80px', // 이름의 최대 너비 설정
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
        profileMessage={selectedProfileMessage} // 선택된 메시지 전달
        profileName={selectedProfileName} // 선택된 친구 이름 전달
      />
    </>
  );
};

export default MainMemo; // 컴포넌트 내보내기

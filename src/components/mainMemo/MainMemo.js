import React, { useState, useRef } from 'react';
import MemoBottomSheet from '../Modal/MemoBottomSheet';
import myProfileImage from '../../assets/mainpage/profile.svg';
import myMessageImage from '../../assets/mainpage/mymessage.svg';
import friendsMessageImage from '../../assets/mainpage/friendsmessage.svg';

const MainMemo = ({ memoData }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedProfileMessage, setSelectedProfileMessage] = useState('');
  const [selectedProfileName, setSelectedProfileName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // userId를 저장
  const [selectedProfileEmail, setSelectedProfileEmail] = useState(''); // 선택된 프로필 이메일
  const [selectedCurrentSong, setSelectedCurrentSong] = useState(''); // 선택된 친구의 노래

  const sliderRef = useRef(null);
  const myProfileName = '나의 하루';
  const myUserId = 'myUserId'; // 본인의 userId
  const myProfileEmail = 'myemail@example.com'; // 본인의 이메일
  const myCurrentSong = 'My Current Song'; // 본인의 현재 노래

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

  const handleClick = (index, friend) => {
    console.log('Friend clicked:', friend); // friend 객체 출력

    // 친구 객체에서 이메일 확인
    if (friend.email) {
      setSelectedProfileEmail(friend.email); // 친구의 이메일 설정
    } else {
      console.log('이메일 정보가 없습니다.');
      setSelectedProfileEmail('email@example.com'); // 기본 이메일 설정
    }

    setSelectedProfileImage(friend.profileImagePath || myProfileImage);
    setSelectedProfileMessage(friend.comment);
    setSelectedProfileName(friend.nickname);
    setSelectedCurrentSong(friend.song || 'No Song Playing'); // 친구의 현재 노래
    setSelectedUserId(friend.id); // userId 대신 id 사용
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const sortedMemoData = memoData.sort((a, b) => {
    const aHasContent = a.comment !== null || a.song !== null;
    const bHasContent = b.comment !== null || b.song !== null;
    return aHasContent === bHasContent ? 0 : aHasContent ? -1 : 1;
  });

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

        {/* 본인 프로필 버튼 - 클릭 불가 */}
        <button
          className="relative flex-shrink-0 focus:outline-none cursor-default" // 클릭할 수 없도록 cursor 변경
          style={{ width: '90px', height: '130px' }}
        >
          <img
            src={myProfileImage}
            alt="My Profile"
            className="w-full h-[90px] rounded-full object-cover"
            style={{ marginBottom: '5px' }}
          />
          <img
            src={myMessageImage}
            alt="My Message"
            className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-full object-cover"
          />
          <p
            className="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 text-sm font-bold"
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

        {/* 친구들 프로필 버튼 */}
        {sortedMemoData.map((friend, index) => (
          <button
            key={index}
            className="relative flex-shrink-0 focus:outline-none"
            style={{ width: '90px', height: '130px' }}
            onClick={() => handleClick(index, friend)}
          >
            <img
              src={friend.profileImagePath || myProfileImage}
              alt={`Friend ${index + 1}`}
              className="w-full h-[90px] rounded-full object-cover"
              style={{ marginBottom: '5px' }}
            />
            {friend.comment && (
              <p
                className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-semibold rounded-md z-50 text-white overflow-hidden"
                style={{
                  maxWidth: '80px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                {friend.comment}
              </p>
            )}
            {friend.comment !== null || friend.song !== null ? (
              <img
                src={friendsMessageImage}
                alt={`Friend ${index + 1} Message`}
                className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-full object-cover"
              />
            ) : null}
            <p
              className="absolute bottom-[-1px] left-1/2 transform -translate-x-1/2 text-sm font-bold"
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

      {/* 메모 바텀시트 */}
      <MemoBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        profileImage={selectedProfileImage}
        profileMessage={selectedProfileMessage}
        profileName={selectedProfileName}
        profileEmail={selectedProfileEmail} // 이메일 전달
        currentSong={selectedCurrentSong} // 현재 노래 전달
        userId={selectedUserId} // calendarId 대신 id를 전달
      />
    </>
  );
};

export default MainMemo;

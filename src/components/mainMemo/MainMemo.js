import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MemoBottomSheet from '../Modal/MemoBottomSheet';
import myProfileImage from '../../assets/mainpage/profile.svg'; // 기본 이미지
import myMessageImage from '../../assets/mainpage/mymessage.svg';
import friendsMessageImage from '../../assets/mainpage/friendsmessage.svg';

const MainMemo = ({ memoData }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedProfileMessage, setSelectedProfileMessage] = useState('');
  const [selectedProfileName, setSelectedProfileName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // userId 저장
  const [selectedProfileEmail, setSelectedProfileEmail] = useState(''); // 선택된 프로필 이메일
  const [selectedCurrentSong, setSelectedCurrentSong] = useState(''); // 선택된 친구의 노래

  const [myProfileInfo, setMyProfileInfo] = useState({
    myProfileName: '나의 하루',
    myProfileEmail: 'myemail@example.com',
    myCurrentSong: 'My Current Song',
    myProfileImage: myProfileImage,
    myMessage: '', // 메시지를 추가
    myMessageImage: myMessageImage,
  });

  const sliderRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  useEffect(() => {
    // 내 정보 조회 API 호출
    const fetchMyProfileInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // 토큰 필요시
            },
          },
        );
        const { user } = response.data;

        // 서버로부터 받아온 내 정보 설정
        setMyProfileInfo({
          myProfileName: user.nickname || '나의 하루',
          myProfileEmail: user.email || 'myemail@example.com',
          myCurrentSong: user.currentSong || 'No Song Playing',
          myProfileImage: user.profileImagePath || myProfileImage,
          myMessage: user.comment || '', // 메시지를 서버에서 받아온 값으로 설정
          myMessageImage: myMessageImage,
        });
      } catch (error) {
        console.error('내 정보 조회 실패:', error);
      }
    };

    fetchMyProfileInfo();
  }, []);

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
    console.log('Friend clicked:', friend);

    if (friend.email) {
      setSelectedProfileEmail(friend.email);
    } else {
      console.log('이메일 정보가 없습니다.');
      setSelectedProfileEmail('email@example.com');
    }

    setSelectedProfileImage(friend.profileImagePath || myProfileImage);
    setSelectedProfileMessage(friend.comment);
    setSelectedProfileName(friend.nickname);
    setSelectedCurrentSong(friend.song || 'No Song Playing');
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

        {/* 본인 프로필 버튼 */}
        <button
          className="relative flex-shrink-0 focus:outline-none cursor-default" // 클릭할 수 없도록 cursor 변경
          style={{ width: '90px', height: '130px' }}
        >
          <img
            src={myProfileInfo.myProfileImage}
            alt="My Profile"
            className="w-full h-[90px] rounded-full object-cover"
            style={{ marginBottom: '5px' }}
          />
          {/* 본인의 메시지를 표시 */}
          {myProfileInfo.myMessage && (
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
              {myProfileInfo.myMessage}
            </p>
          )}
          <img
            src={myProfileInfo.myMessageImage}
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
            {myProfileInfo.myProfileName}
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

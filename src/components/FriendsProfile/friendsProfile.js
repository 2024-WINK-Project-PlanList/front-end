import React from 'react';
import friendsMessageImage from '../../assets/mainpage/friendsmessage.svg'; // 친구 메시지 이미지 경로 직접 import
import FriendsMusic from '../Friends/friendsMusic'; // FriendsMusic 컴포넌트 import

const FriendsProfile = ({
  profileImage,
  profileName = '이름',
  profileEmail = 'email@example.com',
  currentSong = 'No Song Playing', // 기본값을 'No Song Playing'으로 설정
  profileMessage, // 친구의 코멘트
}) => {
  return (
    <div className="relative flex items-center">
      {/* 프로필 이미지 */}
      {profileImage && (
        <div className="absolute mt-[20%] ml-[5%] flex-shrink-0">
          <img
            src={profileImage}
            alt="Profile"
            className="w-[80px] h-[80px] rounded-full border-2 border-gray-300"
          />
        </div>
      )}

      {/* 이름과 이메일 텍스트 추가 */}
      <div className="absolute mt-[20%] ml-[27%] flex items-center space-x-2">
        <div>
          <p className="text-lg font-bold">{profileName}</p>
          <p className="text-sm text-gray-500">{profileEmail}</p>
        </div>
      </div>

      {/* FriendsMusic 컴포넌트를 이름과 이메일 오른쪽에 추가 */}
      <div className="absolute mt-[20%] ml-[62%]">
        <FriendsMusic song={currentSong} />
      </div>
    </div>
  );
};

export default FriendsProfile;

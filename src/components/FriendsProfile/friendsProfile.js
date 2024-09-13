import React from 'react';
import friendsMessageImage from '../../assets/mainpage/friendsmessage.svg'; // 친구 메시지 이미지 경로 직접 import

const FriendsProfile = ({
  profileImage,
  profileName = '이름',
  profileEmail = 'email@example.com',
}) => {
  return (
    <div>
      {/* 프로필 이미지 */}
      {profileImage && (
        <div className="absolute mt-[20%] ml-[5%] flex-shrink-0">
          <img
            src={profileImage}
            alt="Profile"
            className="w-[55%] h-[55%] rounded-full border-2 border-gray-300"
          />
        </div>
      )}

      {/* 이름과 이메일 텍스트 추가 */}
      <div className="absolute mt-[23%] ml-[27%]">
        <p className="text-lg font-bold">{profileName}</p>{' '}
        {/* 이름, 기본값은 '이름' */}
        <p className="text-sm text-gray-500">{profileEmail}</p>{' '}
        {/* 이메일, 기본값은 'email@example.com' */}
      </div>

      {/* 친구 메시지 이미지 */}
      <div className="absolute mt-[12%] ml-[5%]">
        <img
          src={friendsMessageImage} // 친구 메시지 이미지 경로를 import로 가져옴
          alt="Friends Message"
          className="w-[90px] h-[90px]"
        />
      </div>
    </div>
  );
};

export default FriendsProfile;

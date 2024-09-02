import React from 'react';
import myProfileImage from '../../assets/mainpage/profile.svg';
import friendProfileImage from '../../assets/mainpage/profile.svg';
import myMessageImage from '../../assets/mainpage/mymessage.svg';
import friendsMessageImage from '../../assets/mainpage/friendsmessage.svg';

const MainMemo = () => {
  const friendsProfiles = [
    friendProfileImage,
    friendProfileImage,
    friendProfileImage,
    friendProfileImage,
  ];

  return (
    <div
      className="flex items-center p-4"
      id="profile-slider"
      style={{
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* 나의 프로필 */}
      <div className="relative">
        <img
          src={myProfileImage}
          alt="My Profile"
          className="w-[100] h-[100%] rounded-full mr-4"
          style={{
            flexShrink: 0,
          }}
        />
        <img
          src={myMessageImage}
          alt="My Message"
          className="absolute bottom-[55%] left-1/2 transform -translate-x-1/2 w-[100%]"
        />
      </div>

      {friendsProfiles.map((profile, index) => (
        <div key={index} className="relative">
          <img
            src={profile}
            alt={`Friend ${index + 1}`}
            className="w-[100%] h-[80%] rounded-full mr-4"
            style={{
              flexShrink: 0,
            }}
          />
          <img
            src={friendsMessageImage}
            alt={`Friend ${index + 1} Message`}
            className="absolute bottom-[55%] left-1/2 transform -translate-x-1/2 w-[100%]"
          />
        </div>
      ))}
    </div>
  );
};

export default MainMemo;

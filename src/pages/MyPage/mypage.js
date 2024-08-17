import React from 'react';
import { ReactComponent as ProfilePic } from '../../assets/mypage/profile.svg';

const MyPage = () => {
  return (
    <div className="flex flex-col items-center">
      <ProfilePic></ProfilePic>
      <div className="text-2xl font-preSemiBold"> 왕연진</div>
    </div>
  );
};
export default MyPage;

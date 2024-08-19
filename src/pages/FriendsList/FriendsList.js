import React from 'react';
import { ReactComponent as Glass } from '../../assets/friendsList/magnifyingGlass.svg';

const FriendsList = () => {
  return (
    <div className="flex flex-col items-center font-preRegular pt-[26px]">
      <div className="relative w-full px-[24px]">
        <input
          placeholder="이메일로 검색"
          className="w-full h-[45px] pl-[50px] bg-[#D9D9D9]/50 rounded-[0.625rem] text-base"
        />
        <Glass className="absolute bottom-[12px] left-[40px] w-[20px] h-[20px] fill-[#3F3F3F]" />
      </div>
      <div className="text-xl pt-[73px]">새로운 친구를 추가해보세요!</div>
    </div>
  );
};
export default FriendsList;

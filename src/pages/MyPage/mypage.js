import React from 'react';
import { ReactComponent as ProfilePic } from '../../assets/mypage/profile.svg';
import { ReactComponent as FriendsIcon } from '../../assets/mypage/friends.svg';
import { ReactComponent as SignIcon } from '../../assets/mypage/sign.svg';
import { ReactComponent as MySentenceIcon } from '../../assets/mypage/mySentence.svg';
import PlayList from '../../components/PlayList/playList';

const MyPage = () => {
  return (
    <div className="flex flex-col items-center">
      <ProfilePic className="mt-[30px]"></ProfilePic>
      <div className="text-2xl font-preSemiBold pt-[15px]">왕연진</div>
      <div className="text-base font-preLight text-[#3F3F3F] pt-[7px]">
        jjini6530@kookmin.ac.kr
      </div>
      <div className="flex justify-center items-center text-sm text-white font-preMedium bg-[#6AB6FF] w-[5.8125rem] h-[1.6875rem] rounded-[0.625rem] mt-4">
        내 정보 수정
      </div>
      <div className="flex justify-between items-center w-[22rem] h-[3.0625rem] rounded-[0.625rem] border-[0.5px] border-[#D5D5D5] mt-6 pl-[22px] pr-[16px]">
        <div className="flex items-center">
          <FriendsIcon />
          <div className="font-preRegular pl-[6px]">내 친구</div>
        </div>
        <div className="flex items-center">
          <div className="font-preSemiBold text-xl text-[#5DA4E7] pr-[17px]">
            650명
          </div>
          <SignIcon />
        </div>
      </div>
      <div className="flex justify-between items-center w-[22rem] h-[3.0625rem] rounded-[0.625rem] border-[0.5px] border-[#D5D5D5] mt-6 pl-[22px] pr-[16px]">
        <div className="flex items-center">
          <MySentenceIcon />
          <div className="font-preRegular pl-[6px]">나의 한마디</div>
        </div>
        <div className="font-preLight text-sm max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap">
          야무지게 살자용 아자아자 화이띵
        </div>
      </div>
      <div className="w-full pb-[13px] pt-[33px] pl-[33px] font-preSemiBold text-xl">
        나의 PlayList
      </div>
      <PlayList music={true} />
    </div>
  );
};
export default MyPage;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Glass } from '../../assets/friendsList/magnifyingGlass.svg';
import Friend from '../../components/Friends/newFriends';
import { ReactComponent as Profile } from '../../assets/friendsList/profile.svg';
import { searchFriends } from '../../api/friends';

const RequestFriends = ({ hideModal }) => {
  const [userInput, setUserInput] = useState('');
  const [findUser, setFindUser] = useState([]);

  const closeModal = () => {
    hideModal();
  };

  useEffect(() => {
    if (userInput === '') {
      setFindUser([]);
    } else {
      const fetchFriends = async () => {
        try {
          const data = await searchFriends(userInput, false);
          const users = data.map((item) => item.user);
          setFindUser(users || []);
          console.log('새로운 친구 목록', data);
        } catch (error) {
          console.error('친구 검색 오류!', error);
          setFindUser([]); // 오류가 발생하면 빈 배열로 설정
        }
      };

      fetchFriends();
    }
  }, [userInput]);

  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/20 z-10 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[348px] h-[587px] bg-white rounded-[24px] px-[18px] py-[25px] overflow-hidden"
      >
        <div className="relative w-full">
          <input
            placeholder="이메일로 검색"
            onChange={getValue}
            className="w-full h-[34px] pl-[15px] bg-[#D9D9D9]/50 rounded-[0.625rem] text-sm font-preRegular text-[#9E9E9E]"
          />
          <Glass className="absolute bottom-[10px] right-[9px] w-[15px] h-[15px] fill-[#9E9E9E]" />
        </div>
        <div className="text-[#959595] text-[11px] font-preLight py-[18px]">
          친구 검색 결과
        </div>
        <div className="w-full">
          {userInput === '' && findUser.length === 0 ? (
            <div className="flex justify-center font-preRegular text-sm pt-[73px]">
              이메일을 통해 새로운 친구를 찾아보세요!
            </div>
          ) : findUser.length === 0 ? (
            <div className="flex justify-center font-preRegular text-sm pt-[73px]">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className="grid gap-y-[6px]">
              {findUser.map((item) => (
                <Friend
                  key={item.id}
                  {...item}
                  profile={
                    item.profileImagePath ? item.profileImagePath : <Profile />
                  }
                  name={item.nickname}
                  email={item.email}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

RequestFriends.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default RequestFriends;

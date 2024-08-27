import React, { useState, useEffect } from 'react';
import { ReactComponent as Glass } from '../../assets/friendsList/magnifyingGlass.svg';
import Friend from '../../components/Friends/friends';
import { ReactComponent as ProfilePic } from '../../assets/friendsList/profilePic.svg';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const FriendsList = () => {
  const [friends, setFriends] = useState([
    {
      id: 1,
      profile: ProfilePic,
      name: '왕연진',
      email: 'jjini6530@kookmin.ac.kr',
      song: '졸려요요요요요요 - 히히',
    },
    {
      id: 2,
      profile: ProfilePic,
      name: '한준교',
      email: 'hjk5533@kookmin.ac.kr',
      song: '졸려요 - 히히',
    },
    {
      id: 3,
      profile: ProfilePic,
      name: '왕연진',
      email: 'jjini6530@kookmin.ac.kr',
      song: '졸려요ㅜㅜ- 히히',
    },
  ]);

  const isEmpty = friends.length === 0;
  const [userInput, setUserInput] = useState('');
  const [findUser, setFindUser] = useState(friends);

  useEffect(() => {
    const searched = friends.filter((item) =>
      item.email.toLowerCase().includes(userInput),
    );
    setFindUser(searched);
  }, [userInput, friends]);

  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const handleDelete = (id) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    setFriends(updatedFriends);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center font-preRegular pt-[26px]">
        <div className="relative w-full px-[24px]">
          <input
            placeholder="이메일로 검색"
            onChange={getValue}
            className="w-full h-[45px] pl-[50px] bg-[#D9D9D9]/50 rounded-[0.625rem] text-base"
          />
          <Glass className="absolute bottom-[12px] left-[40px] w-[20px] h-[20px] fill-[#3F3F3F]" />
        </div>
        <div className="w-full px-[19px]">
          {isEmpty ? (
            <div className="flex justify-center font-preRegular text-xl pt-[73px]">
              새로운 친구를 추가해보세요!
            </div>
          ) : findUser.length === 0 ? (
            <div className="flex justify-center font-preRegular text-xl pt-[73px]">
              검색 결과가 없습니다.
            </div>
          ) : (
            <div>
              {findUser.map((item) => (
                <Friend
                  key={item.id}
                  {...item}
                  profile={<item.profile />}
                  name={item.name}
                  email={item.email}
                  song={item.song}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default FriendsList;

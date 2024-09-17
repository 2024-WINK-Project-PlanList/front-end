import React, { useState, useEffect } from 'react';
import { ReactComponent as Glass } from '../../assets/friendsList/magnifyingGlass.svg';
import Friend from '../../components/Friends/friends';
import { ReactComponent as Profile } from '../../assets/friendsList/profilePic.svg';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import RequestModal from '../../components/Modal/requestFriends';
import { getFriendsList, searchFriends } from '../../api/friends';
import { useLocation } from 'react-router-dom';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [findUser, setFindUser] = useState(friends);
  const [isShow, setShow] = useState(false);
  const location = useLocation();
  const { userData } = location.state;
  const isEmpty = friends.length === 0;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getFriendsList();

        if (data && Array.isArray(data.user)) {
          setFriends(data.user);
        } else {
          setFriends([]);
        }

        console.log('내친구 목록', data);
      } catch (error) {
        console.error('친구리스트 불러오기 실패', error);
        setFriends([]);
      }
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    if (userInput === '') {
      setFindUser([]);
    } else {
      const fetchFriends = async () => {
        try {
          const data = await searchFriends(userInput, true);
          const users = data.map((item) => item.user);
          setFindUser(users || []);
        } catch (error) {
          console.error('친구 검색 오류!', error);
          setFindUser([]); // 오류가 발생하면 빈 배열로 설정
        }
      };

      fetchFriends();
    }
  }, [userInput, friends]);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const getValue = (e) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const handleDelete = (id) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    setFriends(updatedFriends);
  };

  return (
    <>
      <Header onClick={showModal} />
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
                  profile={
                    item.profileImagePath ? item.profileImagePath : <Profile />
                  }
                  name={item.nickname}
                  email={item.email}
                  song={item.songId}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {isShow && <RequestModal hideModal={hideModal} userData={userData} />}
      <Footer />
    </>
  );
};
export default FriendsList;

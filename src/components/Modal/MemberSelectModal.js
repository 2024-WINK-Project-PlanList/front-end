import React, { useState, useEffect } from 'react';
import axios from 'axios';
import myProfileImage from '../../assets/mainpage/profile.svg'; // 기본 프로필 이미지 임포트

const MemberSelectModal = ({ isOpen, onClose, members, onAdd }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]); // 검색된 멤버 저장
  const [allFriends, setAllFriends] = useState([]); // 모든 친구 저장

  useEffect(() => {
    if (isOpen) {
      setSelectedMembers(members); // 모달이 열릴 때 부모에서 받은 members로 초기화
    }
  }, [isOpen, members]);

  // 친구 목록 불러오기 함수
  const fetchAllFriends = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/friend`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer 토큰을 헤더에 추가
          },
        },
      );

      const allFriendsData = response.data.map((result) => ({
        friend: result.friend,
        friendshipId: result.friendshipId,
      }));

      console.log('모든 친구 목록:', allFriendsData);
      setAllFriends(allFriendsData); // 모든 친구 목록 저장
      setFilteredMembers(allFriendsData); // 초기에는 모든 친구 목록을 표시
    } catch (error) {
      console.error('모든 친구 목록 불러오기 중 오류 발생:', error);
    }
  };

  // 검색된 친구 목록 불러오기 함수
  const searchFriends = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/friend/search`,
        {
          params: {
            keyword: searchTerm,
            onlyFriends: true, // 친구만 검색
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer 토큰을 헤더에 추가
          },
        },
      );

      const searchResults = response.data.map((result) => ({
        friend: result.user,
        isFriend: result.isFriend,
      }));

      console.log('검색된 친구 목록:', searchResults);
      setFilteredMembers(searchResults); // 검색된 친구 목록을 상태에 저장
    } catch (error) {
      console.error('친구 검색 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      return;
    }

    if (searchTerm) {
      searchFriends(); // 검색어가 있을 때 친구 검색
    } else {
      fetchAllFriends(); // 검색어가 없을 때는 모든 친구 목록 불러오기
    }
  }, [searchTerm, isOpen]);

  // 선택된 멤버의 상태를 토글하는 함수 (선택 또는 선택 해제)
  const toggleMemberSelection = (member) => {
    if (selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id)); // 이미 선택된 멤버는 취소
    } else {
      setSelectedMembers([...selectedMembers, member]); // 새롭게 선택된 멤버 추가
    }
  };

  const handleAdd = async () => {
    try {
      const selectedMemberIds = selectedMembers.map((member) => member.id); // 선택된 멤버들의 id만 추출
      onAdd(selectedMemberIds); // id 목록을 부모로 전달
      onClose();
    } catch (error) {
      console.error('멤버 추가 중 오류 발생:', error);
    }
  };

  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-xs mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '80%', maxWidth: '365px', height: '70vh' }}
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="이메일로 친구 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 검색어가 변경될 때마다 상태 업데이트
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#92C7FA] focus:border-[#92C7FA]"
          />
        </div>

        {/* 선택된 친구들의 사진을 나열, 고정된 위치에 유지 */}
        <div className="px-4 pb-2 mt-[-5px] overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-2 h-14">
            {selectedMembers.map((member, index) => (
              <img
                key={index}
                src={member.profileImagePath || myProfileImage}
                alt={member.nickname || 'No Name'}
                className="w-10 h-10 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* 친구 목록은 선택과 상관없이 고정된 위치에서 스크롤 가능하게 설정 */}
        <div className="p-4 flex-1 overflow-y-auto mt-[-30px]">
          <div className="text-sm text-gray-500 mb-2 ml-2">친구 목록</div>
          <div className="space-y-2">
            {filteredMembers.map((result, index) => {
              const friend = result.friend;

              if (!friend) return null; // friend 객체가 없을 경우 렌더링하지 않음

              const profileImage = friend.profileImagePath || myProfileImage; // 기본 이미지 처리
              const isSelected = selectedMembers.find(
                (m) => m.id === friend.id,
              ); // 이미 선택된 멤버인지 확인

              return (
                <div
                  key={index}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    isSelected ? 'bg-blue-100' : 'bg-white hover:bg-gray-100'
                  }`}
                  onClick={() => toggleMemberSelection(friend)}
                >
                  <img
                    src={profileImage}
                    alt={friend.nickname || 'No Name'}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium ml-[-4px]">
                      {friend.nickname || '이름 없음'}
                    </div>
                    <div className="text-xs text-gray-500 ml-[-4px]">
                      {friend.email || '이메일 없음'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between p-4">
          <button
            className="text-gray-500 hover:text-gray-700 ml-2"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 mr-2"
            onClick={handleAdd}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberSelectModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import myProfileImage from '../../assets/mainpage/profile.svg'; // 기본 프로필 이미지 임포트
import { SearchFriends, InviteMembers } from '../../api/members';

const MemberSelectModal = ({
  isOpen,
  onClose,
  members,
  onAdd,
  invite,
  onMemberSelect, // New prop for member selection callback
}) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [onlyFriends, setOnlyFriends] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSelectedMembers(members); // 모달이 열릴 때 부모에서 받은 members로 초기화
    }
  }, [isOpen, members]);

  useEffect(() => {
    const searchFriends = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/friend/search`,
          {
            params: {
              keyword: searchTerm,
              onlyFriends: onlyFriends,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        const allFriendsData = response.data.map((result) => ({
          friend: result.friend,
          friendshipId: result.friendshipId,
        }));

        setFilteredMembers(allFriendsData);
      } catch (error) {
        console.error('친구 검색 중 오류 발생:', error);
      }
    };

    if (searchTerm) {
      searchFriends(); // 검색어가 있을 때 친구 검색
    } else {
      setFilteredMembers(members);
    }
  }, [searchTerm, onlyFriends, isOpen, members]);

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
      if (invite) {
        await InviteMembers(selectedMembers);
      } else {
        const selectedMemberIds = selectedMembers.map((member) => member.id);
        if (typeof onAdd === 'function') {
          onAdd(selectedMemberIds);
        }
      }
      // Notify parent of selected members
      if (typeof onMemberSelect === 'function') {
        onMemberSelect(selectedMembers);
      }
      setSelectedMembers([]);
      onClose();
    } catch (error) {
      console.error('멤버 처리 중 오류 발생:', error);
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
              const { friend, profileImage } = result; // Destructure the result
              if (!friend) return null;

              const isSelected = selectedMembers.find(
                (m) => m.id === friend.id,
              );

              return (
                <div
                  key={index}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    isSelected ? 'bg-blue-100' : 'bg-white hover:bg-gray-100'
                  }`}
                  onClick={() => toggleMemberSelection(friend)}
                >
                  <img
                    src={profileImage || myProfileImage}
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

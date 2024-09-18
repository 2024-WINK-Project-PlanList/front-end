import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 임포트 추가
import { SearchFriends, InviteMembers } from '../../api/members';

const MemberSelectModal = ({ isOpen, onClose, members, onAdd }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]); // 검색된 멤버 저장
  const [onlyFriends, setOnlyFriends] = useState(true); // 친구만 검색 여부

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      return;
    }

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
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer 토큰을 헤더에 추가
            },
          },
        );

        const searchResults = response.data.map((result) => ({
          user: result.user,
          isFriend: result.isFriend,
        }));

        setFilteredMembers(searchResults); // 검색 결과를 상태에 저장
      } catch (error) {
        console.error('친구 검색 중 오류 발생:', error);
      }
    };

    if (searchTerm) {
      searchFriends();
    } else {
      setFilteredMembers(members); // 검색어 X, 기존 멤버 목록 표시
    }
  }, [searchTerm, onlyFriends, isOpen, members]);

  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  const toggleMemberSelection = (member) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleAdd = async () => {
    try {
      await InviteMembers(selectedMembers);
      onAdd(selectedMembers);
      setSelectedMembers([]); // 선택된 멤버 초기화
      onClose();
    } catch (error) {
      console.error('멤버 초대 중 오류 발생:', error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-xs h-[50vh] mx-4 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '80%', maxWidth: '365px', height: '70vh' }}
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="이메일로 친구 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#92C7FA] focus:border-[#92C7FA]"
          />
        </div>

        <div className="px-4 pb-2 overflow-x-auto whitespace-nowrap">
          {selectedMembers.map((member, index) => (
            <div
              key={index}
              className="inline-block px-3 py-2 bg-blue-100 rounded-lg mr-2"
            >
              {member.name}
            </div>
          ))}
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-sm text-gray-500 mb-2 ml-2">친구 목록</div>
          <div className="space-y-2">
            {filteredMembers.map((result, index) => {
              if (!result.user) return null; // user 객체가 없을 경우 렌더링하지 않음

              return (
                <div
                  key={index}
                  className={`flex items-center p-2 border rounded-lg cursor-pointer ${
                    selectedMembers.includes(result.user)
                      ? 'bg-blue-100'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleMemberSelection(result.user)}
                >
                  <img
                    src={result.user.profilePicture || '/default-profile.png'}
                    alt={result.user.name || 'No Name'}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {result.user.name || '이름 없음'}
                      {result.isFriend && (
                        <span className="text-xs text-green-500 ml-2">
                          (친구)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.user.email || '이메일 없음'}
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

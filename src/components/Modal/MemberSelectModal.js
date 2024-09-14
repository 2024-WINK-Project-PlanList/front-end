import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberSelectModal = ({ isOpen, onClose, members, onAdd }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]); // 검색된 멤버 저장
  const [onlyFriends, setOnlyFriends] = useState(true); // 친구만 검색 여부

  useEffect(() => {
    if (!isOpen) return;

    // 친구 검색 API 호출
    const searchFriends = async () => {
      try {
        const response = await axios.get('/friend/search', {
          params: {
            keyword: searchTerm,
            onlyFriends: onlyFriends,
          },
        });

        // SearchUserResponse 형식에 맞춰 데이터를 처리
        const searchResults = response.data.map((result) => ({
          user: result.user,
          isFriend: result.isFriend,
        }));

        setFilteredMembers(searchResults); // 검색 결과를 상태에 저장
        console.log('친구 검색 결과:', searchResults); // 검색 결과 콘솔에 기록
      } catch (error) {
        console.error('친구 검색 중 오류 발생:', error);
      }
    };

    if (searchTerm) {
      searchFriends(); // 검색어가 입력되면 검색 실행
    } else {
      setFilteredMembers(members); // 검색어가 없을 경우 원래 멤버 목록 표시
    }
  }, [searchTerm, onlyFriends, isOpen, members]);

  if (!isOpen) return null; // 조건문에 의해 컴포넌트 렌더링 방지

  const toggleMemberSelection = (member) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
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
              // 방어 코드: user와 user.profilePicture가 undefined가 아닌지 확인
              if (!result.user) {
                console.error('user 객체가 undefined입니다.', result);
                return null; // user가 없으면 렌더링하지 않음
              }

              console.log(result); // 각각의 검색 결과를 콘솔에 출력하여 데이터 확인

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
                    src={result.user.profilePicture || '/default-profile.png'} // 프로필 사진이 없으면 기본 이미지 사용
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
            onClick={() => onAdd(selectedMembers)}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberSelectModal;

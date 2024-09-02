import React, { useState } from 'react';

const MemberSelectModal = ({ isOpen, onClose, members, onAdd }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const toggleMemberSelection = (member) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      (member.name &&
        member.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.email &&
        member.email.toLowerCase().includes(searchTerm.toLowerCase())),
  );

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

        {selectedMembers.length > 0 && (
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
        )}

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-sm text-gray-500 mb-2 ml-2">친구 목록</div>
          <div className="space-y-2">
            {filteredMembers.map((member, index) => (
              <div
                key={index}
                className={`flex items-center p-2 border rounded-lg cursor-pointer ${
                  selectedMembers.includes(member)
                    ? 'bg-blue-100'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => toggleMemberSelection(member)}
              >
                <img
                  src={member.profilePicture}
                  alt={member.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="text-sm font-medium">{member.name}</div>
                  <div className="text-xs text-gray-500">{member.email}</div>
                </div>
              </div>
            ))}
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

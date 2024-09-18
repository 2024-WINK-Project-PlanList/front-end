import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import FriendsSelectModal from './FriendsSelectModal';
import ColorSelectModal from './ColorSelectModal';
import myProfileImage from '../../assets/mainpage/profile.svg'; // 기본 프로필 이미지

const CalendarBottomSheet = ({
  isOpen,
  onClose,
  selectedDates = [],
  plan,
  closeCalendarPlanModal,
  calendarId,
  setPlans,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(plan?.colorId || 1);
  const [isPublic, setIsPublic] = useState(
    plan?.openStatus === 'PUBLIC' || false,
  );
  const [title, setTitle] = useState(plan?.name || '');
  const [details, setDetails] = useState(plan?.description || '');
  const [members, setMembers] = useState([]); // 선택된 멤버 상태 관리

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 30);
    } else if (isAnimating) {
      setIsAnimating(false);
      setTimeout(() => {
        setIsMounted(false);
        onClose();
      }, 300);
    }
  }, [isOpen]);

  // 클릭된 일정의 정보를 세팅하는 로직
  useEffect(() => {
    if (plan) {
      setSelectedColorId(plan?.colorId || 1);
      setIsPublic(plan?.openStatus === 'PUBLIC' || false);
      setTitle(plan?.name || '');
      setDetails(plan?.description || '');
      // 'scheduleMemberList'가 있을 경우 members로 설정
      setMembers(plan?.scheduleMemberList || []); // 수정 시 멤버 정보 설정
    }
  }, [plan]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMounted(false);
      onClose();
    }, 300);
  };

  const handleMemberModalClose = () => {
    setIsMemberModalOpen(false);
  };

  const handleMemberModalOpen = () => {
    setIsMemberModalOpen(true);
  };

  const handleColorModalClose = () => {
    setIsColorModalOpen(false);
  };

  const handleColorModalOpen = () => {
    setIsColorModalOpen(true);
  };

  const handleColorSelect = (colorId) => {
    setSelectedColorId(colorId);
  };

  const toggleIsPublic = () => {
    setIsPublic(!isPublic);
  };

  const handleAddClick = async () => {
    if (!calendarId) {
      console.error(
        '캘린더 아이디가 null입니다. 올바른 캘린더를 선택했는지 확인해주세요.',
      );
      return;
    }

    const parseDate = (dateString) => {
      const parts = dateString.split('-');
      return new Date(parts[0], parts[1] - 1, parts[2]);
    };

    const dateStrings = selectedDates.slice().sort();
    const startDate = parseDate(dateStrings[0]);
    const endDate = parseDate(dateStrings[dateStrings.length - 1]);

    const isSingleDay = selectedDates.length === 1;

    const formattedStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedEndDate = isSingleDay
      ? format(startDate, "yyyy-MM-dd'T'23:59:59")
      : format(endDate, "yyyy-MM-dd'T'HH:mm:ss");

    const newPlan = {
      name: title,
      description: details,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      openStatus: isPublic ? 'PUBLIC' : 'PRIVATE',
      colorId: selectedColorId,
      scheduleMembers:
        members.length > 0 ? members.map((member) => member.id) : [],
      calendarId: calendarId, // 캘린더 ID 전달
    };

    try {
      let response;

      // 수정할 일정이 있는 경우 PATCH 요청을 보냄
      if (plan && plan.id) {
        response = await axios.patch(
          `${process.env.REACT_APP_BACKEND_URL}/schedule/${plan.id}`,
          newPlan,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
      } else {
        // 새로운 일정 추가는 POST 요청을 사용
        response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/schedule`,
          newPlan,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
      }

      // 일정 추가 또는 수정 후 일정 목록을 다시 가져옴
      await fetchUpdatedPlans();

      setIsAnimating(false);
      setTimeout(() => {
        handleClose();
        if (closeCalendarPlanModal) {
          closeCalendarPlanModal(); // CalendarPlan 모달 닫기
        }
      }, 300);
    } catch (error) {
      console.error('일정 처리 중 오류 발생:', error);
    }
  };

  // 일정 목록을 다시 가져오는 함수 추가
  const fetchUpdatedPlans = async () => {
    try {
      const calendarResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/calendar`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (
        calendarResponse.data &&
        Array.isArray(calendarResponse.data.individualScheduleList)
      ) {
        if (typeof setPlans === 'function') {
          setPlans(calendarResponse.data.individualScheduleList);
        }
      }
    } catch (error) {
      console.error('캘린더 데이터 다시 가져오기 오류:', error);
    }
  };

  const handleAddMembers = (selectedMembers) => {
    setMembers(selectedMembers); // 선택된 멤버 업데이트
  };

  const displayedMembers = members.slice(0, 3); // 최대 3명의 멤버만 표시
  const extraMembersCount = members.length - 3; // 3명 초과 시 나머지 멤버 수 계산

  if (!isMounted) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
        onClick={handleOverlayClick}
      >
        <div
          className={`bg-white rounded-t-2xl shadow-lg w-[480px] mx-auto transform transition-transform duration-300 ease-out ${
            isAnimating ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ height: 'calc(100vh - 4.25rem)', overflowY: 'auto' }}
        >
          <div className="p-4 flex justify-between items-center">
            <button
              className="text-gray-500 text-lg font-medium ml-2"
              onClick={handleClose}
            >
              취소
            </button>
            <button
              className="text-blue-500 text-lg font-medium mr-2"
              onClick={handleAddClick}
            >
              {plan ? '수정' : '추가'}
            </button>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="일정 이름"
                className="w-full max-w-md px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92C7FA]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="상세"
                className="w-full max-w-md px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92C7FA]"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>

            {/* 멤버 버튼 내부에 멤버들을 우측 정렬하여 표시 */}
            <div className="mb-4 relative">
              <button
                className="w-full max-w-md px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92C7FA] text-left flex items-center justify-between"
                onClick={handleMemberModalOpen}
              >
                멤버
                <div className="flex items-center space-x-1">
                  {displayedMembers.map((member, index) => (
                    <img
                      key={index}
                      src={member.profileImagePath || myProfileImage}
                      alt={member.nickname || 'No Name'}
                      className="w-6 h-6 rounded-full"
                    />
                  ))}
                  {extraMembersCount > 0 && (
                    <span className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-200">
                      +{extraMembersCount}
                    </span>
                  )}
                </div>
              </button>
            </div>

            <div className="mb-4 relative">
              <button
                className="w-full max-w-md px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92C7FA] text-left flex items-center justify-between"
                onClick={handleColorModalOpen}
              >
                색상
                <span
                  className="w-24 h-5 rounded-md"
                  style={{ backgroundColor: getColorById(selectedColorId) }}
                ></span>
              </button>
            </div>

            <div className="mb-4 relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-black">
                공개 여부
              </span>
              <div className="w-full max-w-md pl-28 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 flex justify-end items-center">
                <div className="relative inline-block w-16 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    checked={isPublic}
                    onChange={toggleIsPublic}
                    className="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    style={{
                      top: 0,
                      left: isPublic ? 32 : 0,
                      transition: 'left 0.2s',
                    }}
                  />
                  <label
                    htmlFor="toggle"
                    className={`block overflow-hidden h-8 rounded-full cursor-pointer ${
                      isPublic ? 'bg-[#98CCFF]' : 'bg-gray-300'
                    }`}
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FriendsSelectModal
        isOpen={isMemberModalOpen}
        onClose={handleMemberModalClose}
        members={members}
        onAdd={handleAddMembers} // 멤버 추가 콜백 전달
      />

      <ColorSelectModal
        isOpen={isColorModalOpen}
        onClose={handleColorModalClose}
        onSelectColor={handleColorSelect}
      />
    </>
  );
};

export default CalendarBottomSheet;

function getColorById(colorId) {
  const colorMap = {
    1: '#6BB6FF',
    2: '#FF6B6B',
    3: '#BEFF6B',
  };
  return colorMap[colorId] || '#6BB6FF';
}

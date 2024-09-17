import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import MemberSelectModal from './MemberSelectModal';
import ColorSelectModal from './ColorSelectModal';

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
  const [isPublic, setIsPublic] = useState(plan?.openStatus === 'PUBLIC' || false);
  const [title, setTitle] = useState(plan?.name || '');
  const [details, setDetails] = useState(plan?.description || '');
  const [members, setMembers] = useState(plan?.members || []);

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

  useEffect(() => {
    if (plan) {
      setSelectedColorId(plan?.colorId || 1);
      setIsPublic(plan?.openStatus === 'PUBLIC' || false);
      setTitle(plan?.name || '');
      setDetails(plan?.description || '');
      setMembers(plan?.members || []);
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
    const parseDate = (dateString) => {
      const parts = dateString.split('-');
      return new Date(parts[0], parts[1] - 1, parts[2]);
    };

    const dateStrings = selectedDates.slice().sort();
    const startDate = parseDate(dateStrings[0]);
    const endDate = parseDate(dateStrings[dateStrings.length - 1]);

    // 사용자가 하루만 선택했는지 확인하는 로직 추가
    if (selectedDates.length === 1) {
      console.log("하루만 선택되었습니다:", selectedDates);
    } else {
      console.log("여러 날이 선택되었습니다:", selectedDates);
    }

    const formattedStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");

    const newPlan = {
      name: title,
      description: details,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      openStatus: isPublic ? 'PUBLIC' : 'PRIVATE',
      colorId: selectedColorId,
      scheduleMembers: members.length > 0 ? members.map((member) => member.id) : [],
      calendarId: calendarId || 1,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/schedule`,
        newPlan,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('응답:', response.data);

      const refreshCalendar = async () => {
        try {
          const calendarResponse = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/calendar`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          console.log('캘린더 새로 고침 정보:', calendarResponse.data);

          if (calendarResponse.data && Array.isArray(calendarResponse.data.individualScheduleList)) {
            setPlans(calendarResponse.data.individualScheduleList);
          }
        } catch (error) {
          console.error('캘린더 데이터 다시 가져오기 오류:', error);
        }
      };

      await refreshCalendar();

      setIsAnimating(false);
      setTimeout(() => {
        handleClose();
        if (closeCalendarPlanModal) {
          closeCalendarPlanModal();
        }
      }, 300);
    } catch (error) {
      console.error('일정 추가 중 오류 발생:', error);
      if (error.response) {
        console.error('서버 응답 상태 코드:', error.response.status);
        console.error('서버 응답 데이터:', error.response.data);
      } else {
        console.error('서버로부터 응답이 없습니다.');
      }
    }
  };

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
            <button className="text-gray-500 text-lg font-medium ml-2" onClick={handleClose}>
              취소
            </button>
            <button className="text-blue-500 text-lg font-medium mr-2" onClick={handleAddClick}>
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

            <div className="mb-4">
              <button
                className="w-full max-w-md px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#92C7FA] text-left"
                onClick={handleMemberModalOpen}
              >
                멤버
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

      <MemberSelectModal
        isOpen={isMemberModalOpen}
        onClose={handleMemberModalClose}
        members={members}
        onMemberSelect={(selectedMembers) => setMembers(selectedMembers)}
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

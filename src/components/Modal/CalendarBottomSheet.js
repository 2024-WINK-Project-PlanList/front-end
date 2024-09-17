import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemberSelectModal from './MemberSelectModal';
import ColorSelectModal from './ColorSelectModal';

const CalendarBottomSheet = ({
                               isOpen,
                               onClose,
                               onAdd,
                               selectedDates = [],
                               plan,
                               fetchCalendarData,
                             }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(plan?.color || '');
  const [isPublic, setIsPublic] = useState(plan?.isPublic || false);
  const [title, setTitle] = useState(plan?.title || '');
  const [details, setDetails] = useState(plan?.details || '');
  const [members, setMembers] = useState([]);

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
      setSelectedColor(plan?.color || '');
      setIsPublic(plan?.isPublic || false);
      setTitle(plan?.title || '');
      setDetails(plan?.details || '');
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

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    handleColorModalClose();
  };

  const toggleIsPublic = () => {
    setIsPublic(!isPublic);
  };

  const handleAddClick = async () => {
    const startDate = new Date(selectedDates?.[0] || Date.now());
    const endDate = new Date(selectedDates?.[selectedDates.length - 1] || Date.now());

    const newPlan = {
      name: title,
      description: details,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      openStatus: isPublic ? 'PUBLIC' : 'PRIVATE',
      colorId: selectedColor,
      scheduleMembers: members.map(member => member.id),
      calendarId: 1,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/schedule`, newPlan, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('응답:', response.data);
      setIsAnimating(false);
      setTimeout(() => {
        onAdd(newPlan);
        handleClose();
        fetchCalendarData();
      }, 300);
    } catch (error) {
      console.error('일정 추가 중 오류 발생:', error);
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
                  style={{ backgroundColor: selectedColor || '#6BB6FF' }}
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
        members={['멤버 1', '멤버 2', '멤버 3']}
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

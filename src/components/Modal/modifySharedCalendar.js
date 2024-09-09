import React, { useState, useEffect } from 'react';
import add from '../../assets/sharedCalendar/add.svg';
import exit from '../../assets/sharedCalendar/exit.svg';
import DetailModal from './exitCalendarModal';
import MemberSelectModal from './MemberSelectModal';
import ChooseImageModal from './chooseImageModal';

const CalendarBottomSheet = ({
  isOpen,
  onClose,
  mode,
  name,
  description,
  members,
  image,
  onSave,
  onExit,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // 이미지 모달 상태 추가
  const [calendarName, setCalendarName] = useState('');
  const [calendarDescription, setCalendarDescription] = useState('');
  const [calendarMembers, setCalendarMembers] = useState(0);
  const [calendarImage, setCalendarImage] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 30);

      if (mode === 'edit') {
        setCalendarName(name || '');
        setCalendarDescription(description || '');
        setCalendarMembers(members || 0);
        setCalendarImage(image || null);
      } else {
        setCalendarName('');
        setCalendarDescription('');
        setCalendarMembers(0);
        setCalendarImage(null);
      }
    } else if (isAnimating) {
      setIsAnimating(false);
      setTimeout(() => {
        setIsMounted(false);
        onClose();
      }, 300);
    }
  }, [isOpen, mode, name, description, members, image]);

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

  const handleMemberModalOpen = () => {
    setIsMemberModalOpen(true);
  };

  const handleMemberModalClose = () => {
    setIsMemberModalOpen(false);
  };

  const handleImageModalOpen = () => {
    setIsImageModalOpen(true); // 이미지 모달 열기
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false); // 이미지 모달 닫기
  };

  const handleImageSelect = (image) => {
    setCalendarImage(image); // 선택된 이미지 설정
  };

  const handleExit = () => {
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
  };

  const handleDetailModalConfirm = () => {
    if (onExit) {
      onExit();
    }
    handleDetailModalClose();
    onClose();
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        name: calendarName,
        description: calendarDescription,
        members: calendarMembers,
        image: calendarImage,
      });
    }
    onClose();
  };

  if (!isMounted) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
        onClick={handleOverlayClick}
      >
        <div
          className={`bg-white rounded-t-lg shadow-lg w-[480px] mx-auto transform transition-transform duration-300 ease-out ${
            isAnimating ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ height: 'calc(100vh - 4.25rem)', overflowY: 'auto' }}
        >
          <div className="relative p-4 flex justify-between items-center">
            <button
              className="text-gray-500 text-lg font-medium ml-2"
              onClick={handleClose}
            >
              취소
            </button>
            <button
              className="text-blue-500 text-lg font-medium mr-2"
              onClick={handleSave}
            >
              {mode === 'edit' ? '수정' : '생성'}
            </button>
          </div>

          <div className="p-4 flex flex-col items-center">
            <div className="mb-4 flex justify-center w-full">
              <label
                onClick={handleImageModalOpen} // 이미지 모달 열기 이벤트 추가
                className="flex items-center justify-center w-32 h-32 border border-gray-300 rounded-lg bg-white cursor-pointer"
              >
                {calendarImage ? (
                  <img
                    src={calendarImage}
                    alt="calendar logo"
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <span className="text-[#676767]">사진 추가</span>
                )}
              </label>
            </div>

            <div className="mb-4 w-full max-w-[400px]">
              <input
                type="text"
                value={calendarName}
                onChange={(e) => setCalendarName(e.target.value)}
                placeholder="캘린더 이름"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#92C7FA]"
              />
            </div>

            <div className="mb-4 w-full max-w-[400px]">
              <input
                value={calendarDescription}
                onChange={(e) => setCalendarDescription(e.target.value)}
                placeholder="소개"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#92C7FA]"
              />
            </div>

            <div className="w-full max-w-[400px] mb-4">
              <label className="block text-sm font-medium text-[#959595] mb-1">
                {mode === 'edit' ? `멤버 ${calendarMembers}명` : '멤버 수'}
              </label>
              <div className="flex items-center">
                <img
                  src={add}
                  alt="add button"
                  className="ml-2 mt-1 cursor-pointer"
                  onClick={handleMemberModalOpen}
                />
                <span className="text-[16px] ml-2">멤버 초대하기</span>
              </div>
            </div>

            {mode === 'edit' && (
              <div className="absolute bottom-8 right-8">
                <img
                  src={exit}
                  alt="exit button"
                  className="cursor-pointer w-7 h-7"
                  onClick={handleExit}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <MemberSelectModal
        isOpen={isMemberModalOpen}
        onClose={handleMemberModalClose}
        members={['멤버 1', '멤버 2', '멤버 3']}
      />

      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={handleDetailModalClose}
        onConfirm={handleDetailModalConfirm}
        calendarName={calendarName}
        calendarImage={calendarImage}
      />

      <ChooseImageModal
        isOpen={isImageModalOpen}
        onClose={handleImageModalClose}
        onImageSelect={handleImageSelect}
      />
    </>
  );
};

export default CalendarBottomSheet;

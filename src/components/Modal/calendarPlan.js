import React, { useState } from 'react';
import CalendarBottomSheet from './CalendarBottomSheet';

const CalendarPlan = ({ isOpen, onClose, selectedDate, plans, setPlans }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenBottomSheet = () => {
    // 새 일정 추가 시 초기화
    setSelectedPlan(null);
    setIsBottomSheetOpen(true);
  };

  const handlePlanClick = (plan) => {
    // 일정 수정 시 선택된 일정 데이터로 설정
    setSelectedPlan(plan);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleAddPlan = (newPlan) => {
    if (selectedPlan) {
      // 수정일 경우, 기존 계획을 수정
      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan === selectedPlan ? newPlan : plan)),
      );
    } else {
      // 새 계획 추가
      setPlans((prevPlans) => [...prevPlans, newPlan]);
    }
    setIsBottomSheetOpen(false);
    onClose(); // 바텀시트 닫기 후 캘린더 플랜 모달도 닫기
  };

  // 날짜 포맷팅 함수 (YYYY년 M월 D일 (요일) 형식으로 변환 및 D-day 계산)
  const formatDate = (dateString) => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString);
    const today = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];

    // D-day 계산
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dDayText =
      diffDays > 0
        ? `D-${diffDays}`
        : diffDays < 0
          ? `D+${Math.abs(diffDays)}`
          : 'D-day';

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };

  // D-day 텍스트 계산
  const getDDayText = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);

    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0
      ? `D-${diffDays}`
      : diffDays < 0
        ? `D+${Math.abs(diffDays)}`
        : 'D-day';
  };

  return (
    <>
      <div
        className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={handleOverlayClick}
      >
        <div
          className="modal-container bg-white rounded-2xl shadow-lg w-full max-w-xs h-[80vh] mx-4 flex flex-col"
          style={{ width: '80%', maxWidth: '365px', height: '75vh' }}
        >
          <div className="modal-header flex flex-col justify-between items-start p-4">
            <h2 className="text-xl font-preRegular">
              {formatDate(selectedDate)}
            </h2>
            {/* D-day 표시 추가 */}
            <p className="text-sm text-gray-500 mt-1">
              {getDDayText(selectedDate)}
            </p>
            <div className="flex flex-col mt-4 space-y-2 w-full">
              {plans
                .filter((plan) => plan.date === selectedDate)
                .map((plan, index) => (
                  <div
                    key={index}
                    className="relative w-full px-4 py-2 bg-white rounded-lg cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => handlePlanClick(plan)}
                  >
                    {/* 세로 막대 */}
                    <div
                      className="absolute left-0 top-2 bottom-1 w-[2.2%] rounded-lg"
                      style={{ backgroundColor: plan.color || '#73B7FF' }}
                    ></div>
                    <div className="ml-0">
                      <p className="text-m font-medium truncate">
                        {plan.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 text-left">
                        {plan.details}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="modal-content p-4 flex-1 overflow-y-auto"></div>
          <div className="modal-footer flex justify-end p-4">
            <button
              className="w-full px-4 py-2 bg-[#73B7FF] text-white rounded-lg hover:bg-[#58A9FF]"
              onClick={handleOpenBottomSheet}
            >
              일정 추가하기
            </button>
          </div>
        </div>
      </div>

      {/* CalendarBottomSheet 모달 */}
      <CalendarBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onAdd={handleAddPlan}
        selectedDate={selectedDate}
        plan={selectedPlan} // 선택된 일정 전달 (null이면 새 일정 추가)
      />
    </>
  );
};

export default CalendarPlan;

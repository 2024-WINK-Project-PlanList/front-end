import React, { useState } from 'react';
import CalendarBottomSheet from './CalendarBottomSheet';
import myProfileImage from '../../assets/mainpage/profile.svg'; // 기본 프로필 이미지

const CalendarPlan = ({
  isOpen,
  onClose,
  selectedDates,
  plans,
  setPlans,
  calendarId,
}) => {
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
    // 클릭된 일정의 정보를 콘솔에 출력
    console.log('클릭된 일정 정보:', plan);

    // 일정 수정 시 선택된 일정 데이터로 설정
    setSelectedPlan(plan);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 날짜 포맷팅 함수 (YYYY년 M월 D일 ~ YYYY년 M월 D일 형식으로 변환)
  const formatDateRange = (dates) => {
    if (!Array.isArray(dates) || dates.length === 0) return '';
    if (dates.length === 1) {
      const [year, month, day] = dates[0].split('-');
      return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
    } else {
      const [startYear, startMonth, startDay] = dates[0].split('-');
      const [endYear, endMonth, endDay] = dates[dates.length - 1].split('-');
      return `${startYear}년 ${parseInt(startMonth)}월 ${parseInt(startDay)}일 ~ ${endYear}년 ${parseInt(endMonth)}월 ${parseInt(endDay)}일`;
    }
  };

  // D-day 텍스트 계산 함수
  const getDDayText = (dates) => {
    if (!Array.isArray(dates) || dates.length === 0) return '';
    const today = new Date();
    const startDate = new Date(dates[0]);
    const endDate = new Date(dates[dates.length - 1]);

    const diffTimeStart = startDate - today;
    const diffDaysStart = Math.ceil(diffTimeStart / (1000 * 60 * 60 * 24));

    const diffTimeEnd = endDate - today;
    const diffDaysEnd = Math.ceil(diffTimeEnd / (1000 * 60 * 60 * 24));

    const dDayStart =
      diffDaysStart > 0
        ? `D-${diffDaysStart}`
        : diffDaysStart < 0
          ? `D+${Math.abs(diffDaysStart)}`
          : 'D-day';

    const dDayEnd =
      diffDaysEnd > 0
        ? `D-${diffDaysEnd}`
        : diffDaysEnd < 0
          ? `D+${Math.abs(diffDaysEnd)}`
          : 'D-day';

    return dates.length === 1 ? dDayStart : `${dDayStart} ~ ${dDayEnd}`;
  };

  // 일정 색상 가져오는 함수
  const getColorByColorId = (colorId) => {
    switch (colorId) {
      case 1:
        return '#6BB6FF';
      case 2:
        return '#FF6B6B';
      case 3:
        return '#BEFF6B';
      default:
        return '#73B7FF'; // 기본 색상
    }
  };

  // 선택된 날짜에 해당하는 일정 필터링
  const filteredPlans = plans.filter((plan) => {
    const planStartDate = plan.startDate ? plan.startDate.slice(0, 10) : null;
    const planEndDate = plan.endDate ? plan.endDate.slice(0, 10) : null;

    if (!planStartDate || !planEndDate) {
      return false;
    }

    // 선택된 날짜 중 하나라도 일정의 날짜 범위에 포함되는지 확인
    return selectedDates.some((date) => {
      return date >= planStartDate && date <= planEndDate;
    });
  });

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
              {formatDateRange(selectedDates)}
            </h2>
            {/* D-day 표시 추가 */}
            <p className="text-sm text-gray-500 mt-1">
              {getDDayText(selectedDates)}
            </p>
            <div className="flex flex-col mt-4 space-y-2 w-full">
              {/* 필터링된 일정 표시 */}
              {filteredPlans.map((plan, index) => {
                const displayedMembers = plan.scheduleMemberList.slice(0, 3);

                return (
                  <div
                    key={index}
                    className="relative w-full px-4 py-2 bg-white rounded-lg cursor-pointer hover:bg-gray-100 flex items-center"
                    onClick={() => handlePlanClick(plan)}
                  >
                    {/* 일정의 색상 막대 표시 */}
                    <div
                      className="absolute left-0 top-2 bottom-1 w-[2.2%] rounded-lg"
                      style={{
                        backgroundColor: getColorByColorId(plan.colorId),
                      }} // 일정의 colorId에 따라 색상 설정
                    ></div>
                    <div className="ml-2">
                      <p className="text-m font-medium truncate ml-[-7px]">
                        {plan.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 text-left ml-[-7px]">
                        {plan.description}
                      </p>
                    </div>
                    {/* 멤버 리스트를 우측에 표시 */}
                    <div className="flex items-center space-x-1 ml-auto">
                      {displayedMembers.map((member, idx) => (
                        <img
                          key={idx}
                          src={member.profileImagePath || myProfileImage}
                          alt={member.nickname || 'No Name'}
                          className="w-6 h-6 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
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
        selectedDates={selectedDates} // 선택된 날짜를 제대로 전달
        plan={selectedPlan} // 선택된 일정 전달
        calendarId={calendarId}
        setPlans={setPlans}
      />
    </>
  );
};

export default CalendarPlan;

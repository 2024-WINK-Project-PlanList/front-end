import React from 'react';
import Calendar from '../../components/Calendar/Calendar'; // 경로에 따라 조정

const MainPage = () => {
  return (
    <div className="mypage">
      <h1 className="text-center text-2xl font-bold mb-4"></h1>
      <Calendar />
    </div>
  );
};

export default MainPage;

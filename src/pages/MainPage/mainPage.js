import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios import
import Calendar from '../../components/Calendar/Calendar';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import MainMemo from '../../components/mainMemo/MainMemo';

const MainPage = () => {
  const [memoData, setMemoData] = useState([]); // 메모 데이터 상태
  const [calendarData, setCalendarData] = useState([]); // 캘린더 데이터 상태

  useEffect(() => {
    // 메모 데이터 요청
    axios
      .get('/api/memo')
      .then((response) => {
        setMemoData(response.data);
      })
      .catch((error) => {
        console.error('메모 데이터 가져오기 오류:', error);
      });

    // 캘린더 데이터 요청
    axios
      .get('/api/calendar')
      .then((response) => {
        setCalendarData(response.data);
      })
      .catch((error) => {
        console.error('캘린더 데이터 가져오기 오류:', error);
      });
  }, []);

  return (
    <div className="relative">
      <Header />
      {/* 받아온 메모 데이터를 MainMemo 컴포넌트로 전달 */}
      <MainMemo memoData={memoData} />
      {/* 받아온 캘린더 데이터를 Calendar 컴포넌트로 전달 */}
      <Calendar calendarData={calendarData} />
      <Footer />
    </div>
  );
};

export default MainPage;

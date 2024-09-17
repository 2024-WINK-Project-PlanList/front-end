import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios import
import Calendar from '../../components/Calendar/Calendar';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import MainMemo from '../../components/mainMemo/MainMemo';

// .env 파일의 BACKEND URL 가져오기
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MainPage = () => {
  const [friendComments, setFriendComments] = useState([]); // 친구 댓글 데이터 상태
  const [newNotificationCount, setNewNotificationCount] = useState(0); // 새로운 알림 개수 상태

  useEffect(() => {
    // 로컬 스토리지에서 토큰 가져오기
    let token = localStorage.getItem('token');

    // 토큰이 없을 경우 경고 또는 리다이렉션 처리
    if (!token) {
      console.error('토큰이 없습니다. 로그인 필요');
      return;
    }

    // 데이터 요청
    axios
      .get(`${BASE_URL}/main`, {
        headers: {
          Authorization: `Bearer ${token}`, // 로컬 스토리지에서 가져온 토큰을 Authorization 헤더에 추가
        },
      })
      .then((response) => {
        const { friendComments, newNotificationCount } = response.data;
        setFriendComments(friendComments); // 친구 데이터 저장
        setNewNotificationCount(newNotificationCount); // 알림 개수 저장
      })
      .catch((error) => {
        console.error('메인 페이지 데이터 가져오기 오류:', error);
      });
  }, []);

  return (
    <div className="relative">
      <Header newNotificationCount={newNotificationCount} />
      {/* 알림 개수 전달 */}

      {/* 받아온 친구 댓글 데이터를 MainMemo 컴포넌트로 전달 */}
      <MainMemo memoData={friendComments} />

      {/* 캘린더 컴포넌트도 필요 시 수정 */}
      <Calendar calendarData={friendComments} />
      {/* friendComments를 캘린더에 맞게 사용 */}

      <Footer />
    </div>
  );
};

export default MainPage;

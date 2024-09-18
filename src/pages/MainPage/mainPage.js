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
  const [newNotificationCount, setNewNotificationCount] = useState(-1); // 새로운 알림 개수 상태

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
        setNewNotificationCount(newNotificationCount);
        console.log('친구 정보: ', friendComments);
        console.log('새알람 : ', newNotificationCount); // 알림 개수 저장
      })
      .catch((error) => {
        console.error('메인 페이지 데이터 가져오기 오류:', error);
      });
  }, []);

  return (
    <div className="relative">
      {newNotificationCount === -1 ? (
        <Header />
      ) : (
        <Header newNotificationCount={newNotificationCount} />
      )}
      {/* 알림 개수 전달 */}


      <div className="relative mt-2">
        <MainMemo memoData={friendComments} />
      </div>

      <div className="relative">
        <Calendar calendarData={friendComments} />
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;

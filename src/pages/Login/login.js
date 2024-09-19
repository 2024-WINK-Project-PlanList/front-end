import React from 'react';
import Planlist from '../../assets/Login/Planlist.svg';
import Kakao from '../../assets/Login/Kakao.svg';

const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_API_URL;
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoLink; // 카카오 로그인 페이지로 리디렉션
  };

  return (
    <div className="h-screen flex flex-col justify-start items-start pl-8 pr-8 pt-36">
      <div className={'w-[100%] flex flex-col gap-[40vh]'}>
        <div>
          <span className="text-lg">하루를 시작하는 즐거움</span>
          <img src={Planlist} alt="Planlist" className="w-44" />
          <span className="text-lg">함께 시작할까요?</span>
        </div>

        <button className="flex flex-row justify-between items-center w-[100%] h-[60px] pl-5 pr-5 rounded-[20px] font-preMedium text-black text-[18px] bg-[#FFE200]">
          <img src={Kakao} alt="kakao" />
          카카오로 시작하기
          <div className={'w-[22px] h-[100%]'}></div>
        </button>
      </div>
    </div>
  );
};

export default Login;

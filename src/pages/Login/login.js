import React from 'react';
import Planlist from '../../assets/Planlist.svg';
import Kakao from '../../assets/Kakao.svg';

const Login = () => {
  const REST_API_KEY = '???'; // 백엔드에서 발급받은 값으로 변경
  const REDIRECT_URI = '???'; // 백엔드에서 발급받은 값으로 변경
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = kakaoLink; // 카카오 로그인 페이지로 리디렉션
  };

  return (
    <div className="h-screen flex flex-col justify-start items-start pl-8 pt-36">
      <span className="text-lg">하루를 시작하는 즐거움</span>
      <img src={Planlist} alt="Planlist" className="w-44" />
      <span className="text-lg">함께 시작할까요?</span>

      <button
        type="button"
        className="flex justify-center items-center bg-yellow-400 py-3 px-6 gap-2 text-xl mt-80 ml-6 rounded-lg font-semibold cursor-pointer"
        onClick={loginHandler}
      >
        <img src={Kakao} alt="Kakao Logo" className="mt-1" />
        <span>카카오로 시작하기</span>
      </button>
    </div>
  );
};

export default Login;

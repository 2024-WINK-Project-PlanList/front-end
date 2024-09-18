import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Planlist from '../../assets/Login/Planlist.svg';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false); // 닉네임 중복 여부 상태 추가

  const kakaoAccessToken = localStorage.getItem('token');

  useEffect(() => {
    // 카카오 엑세스 토큰 X -> 로그인 페이지로 리디렉션
    if (!kakaoAccessToken) {
      navigate('/login');
    }
  }, [kakaoAccessToken, navigate]);

  const nameHandler = (e) => {
    const { value } = e.target;
    setName(value);
    setIsValid(value.length <= 10 && value.length > 0);
    setIsDuplicate(false);
  };

  const completeHandler = async () => {
    if (isValid && kakaoAccessToken) {
      try {
        // 닉네임 중복 검사
        const NicknameRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/nick-validation/${name}`,
        );
        if (!NicknameRes.data) {
          const registerRes = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            {
              kakaoAccessToken,
              nickname: name,
            },
          );
          // 회원가입 성공 시, 반환된 토큰 저장
          const { accessToken } = registerRes.data;
          localStorage.setItem('token', accessToken);
          navigate('/main');
        } else {
          setIsDuplicate(true);
        }
      } catch (error) {
        alert('오류 발생');
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-start pl-8 pt-36">
      <div className="flex flex-col items-start mb-24">
        <span className="text-lg">하루를 시작하는 즐거움</span>
        <img src={Planlist} alt="" className="w-44" />
        <span className="text-lg">함께 시작할까요?</span>
      </div>
      <div className="flex flex-col items-center justify-center relative">
        <input
          type="text"
          placeholder="사용하실 이름을 입력해 주세요."
          value={name}
          onChange={nameHandler}
          className={`w-72 border-b-2 py-2 px-2 outline-none ${
            name.length === 0
              ? 'border-gray-400'
              : isDuplicate
                ? 'border-red-500'
                : isValid
                  ? 'border-blue-500'
                  : 'border-gray-400'
          }`}
        />
        <span
          className={`mt-4 text-xs ${
            isDuplicate
              ? 'text-red-500'
              : isValid
                ? 'text-blue-500'
                : 'text-gray-400'
          } absolute top-8 left-2 w-full text-left`}
        >
          {isDuplicate
            ? '이미 존재하는 닉네임입니다.'
            : name.length > 10
              ? '사용하실 이름은 10글자 이내로 제한됩니다.'
              : name.length > 0 && isValid
                ? '사용 가능한 이름입니다.'
                : ''}
        </span>
        <button
          type="button"
          onClick={completeHandler}
          disabled={!isValid || isDuplicate}
          className={`w-72 h-12 text-white font-semibold rounded-lg mt-60 
            ${
              isValid && !isDuplicate
                ? 'bg-[#1E86FF] cursor-pointer'
                : 'bg-gray-300 text-gray-400 cursor-default'
            }`}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Profile;

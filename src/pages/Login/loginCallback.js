import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // accessToken 요청
      fetch(`https://kauth.kakao.com/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: `${process.env.REACT_APP_REST_API_KEY}`,
          redirect_uri: `${process.env.REACT_APP_API_URL}`,
          code: code,
          client_secret: `${process.env.REACT_APP_API_SECRET_KEY}`,
        }),
      })
        .then((res) => res.json())
        .then((tokenData) => {
          const accessToken = tokenData.access_token;

          // accessToken을 사용하여 로그인 요청
          return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/kakao`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accessToken: accessToken,
            }),
          });
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.type === 'EXIST') {
            localStorage.setItem('token', data.token);
            navigate('/main');
          } else if (data.type === 'REGISTER') {
            localStorage.setItem('token', data.token);
            navigate('/profile');
          } else {
            alert('로그인 실패');
            navigate('/login');
          }
        })
        .catch((error) => {
          console.log(error);
          alert('로그인 콜백 오류');
          navigate('/login');
        });
    }
  }, [code]);

  return (
    <>
      <span>카카오 로그인 진행중입니다.</span>
    </>
  );
};

export default LoginCallback;

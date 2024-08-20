import { React, useEffect } from 'react';
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
          client_id: 'REST API KEY',
          redirect_uri: 'REACT_APP_API_URL',
          code: code,
        }),
      })
        .then((res) => res.json())
        .then((tokenData) => {
          const accessToken = tokenData.access_token;

          // accessToken을 사용하여 로그인 요청
          return fetch(`${'backendurl'}/auth/kakao`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken }),
          });
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.type === 'exist') {
            navigate('/main');
          } else if (data.type === 'register') {
            sessionStorage.setItem('token', data.token);
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
  }, [code, navigate]);

  return (
    <>
      <span>카카오 로그인 진행중입니다.</span>
    </>
  );
};

export default LoginCallback;

import axios from 'axios';

export const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // 기본 서버 주소 입력
});

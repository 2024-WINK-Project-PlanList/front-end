import axios from 'axios';
import { customAxios } from './customAxios';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const getToken = () => {
  // return sessionStorage.getItem('token');
  return process.env.REACT_APP_TEST_TOKEN;
};

const getEncodedCredentials = () => {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('CLIENT_ID', CLIENT_ID);
    console.error('CLIENT_SECRET', CLIENT_SECRET);
    throw new Error('CLIENT_ID 및 CLIENT_SECRET 에러');
  }
  return btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
};

// spotify 토큰 가져오기
export const fetchToken = async () => {
  try {
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${getEncodedCredentials()}`,
        },
      },
    );
    return response.data.access_token;
  } catch (error) {
    console.error(
      '토큰을 가져오는 중 에러 발생:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// 음악 검색
export const searchTracks = async (token, query) => {
  try {
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: query,
        type: 'track',
        limit: 10,
      },
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error(
      '트랙을 검색하는 중 에러 발생:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// 음악 변경 api
export const modifySong = async (songData) => {
  try {
    const response = await customAxios.patch(
      `/user/me/song`,
      {
        songId: songData.songId,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('노래 변경 오류!', error);
    throw error;
  }
};

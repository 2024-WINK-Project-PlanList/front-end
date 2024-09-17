import { customAxios } from './customAxios';

const getToken = () => {
  return localStorage.getItem('token');
  // return process.env.REACT_APP_TEST_TOKEN;
};

export const getUserInfo = async () => {
  try {
    const response = await customAxios.get(`/user/me`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('유저 정보 오류!', error);
    throw error;
  }
};

export const modifyUserInfo = async (userData) => {
  try {
    const response = await customAxios.patch(
      `/user/me`,
      {
        nickname: userData.nickname,
        profileImage: userData.profileImage,
        songId: userData.songId,
        comment: userData.comment,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('유저 정보 수정 오류!', error);
    throw error;
  }
};

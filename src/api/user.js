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
    const userFormData = new FormData();

    if (userData.profileImage && userData.profileImage instanceof File) {
      userFormData.append('profileImage', userData.profileImage);
    } else {
      console.log('사진이 안담겨요');
    }

    const profileData = {
      nickname: userData.nickname,
      songId: userData.songId,
      comment: userData.comment,
    };

    userFormData.append(
      'profile',
      new Blob([JSON.stringify(profileData)], { type: 'application/json' }),
    );

    const response = await customAxios.patch(`/user/me`, userFormData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('유저 정보 수정 오류!', error);
    throw error;
  }
};

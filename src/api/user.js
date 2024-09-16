import { customAxios } from './customAxios';

const getToken = () => {
  return sessionStorage.getItem('token');
  // return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0bmFsczY1NUBrb29rbWluLmFjLmtyIiwiaWF0IjoxNzI2NDEwNjE0LCJleHAiOjE3MjcwMTU0MTQsInN1YiI6InRlc3RAZ21haWwuY29tIiwiaWQiOjF9.TQ-HNQnEWVfbhXeQJw6AKB2REhqbyJjRvQ-Oj-OY8BI';
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
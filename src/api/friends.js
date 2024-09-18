import { customAxios } from './customAxios';

const getToken = () => {
  return localStorage.getItem('token');
  // return process.env.REACT_APP_TEST_TOKEN;
};

// 내친구 목록 조회
export const getFriendsList = async () => {
  try {
    const response = await customAxios.get(`/friend`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('친구 리스트 조회 오류!', error);
    throw error;
  }
};

// 친구 검색
export const searchFriends = async (keyword, onlyFriends) => {
  try {
    const response = await customAxios.get(`/friend/search`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        keyword,
        onlyFriends,
      },
    });
    return response.data;
  } catch (error) {
    console.error('친구 검색 오류!', error);
    throw error;
  }
};

// 친구 요청
export const requestFriend = async (userData, friendData) => {
  try {
    const response = await customAxios.post(
      `/friend`,
      {
        followingId: friendData,
        followerId: userData,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('친구 신청 오류!', error);
    throw error;
  }
};

// 친구 삭제
export const deleteFriend = async (friendData) => {
  try {
    const response = await customAxios.delete(
      `/friend/${friendData.friendshipId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('친구 삭제 오류!', error);
    throw error;
  }
};

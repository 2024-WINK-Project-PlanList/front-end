import { customAxios } from './customAxios';

const getToken = () => {
  return localStorage.getItem('token');
  // return process.env.REACT_APP_TEST_TOKEN;
};

// 친구 검색 API
export const SearchFriends = async (keyword, onlyFriends) => {
  try {
    const response = await customAxios.get('/friend/search', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: {
        keyword: keyword,
        onlyFriends: onlyFriends,
      },
    });
    return response.data;
  } catch (error) {
    console.error('친구 검색 오류', error);
    throw error;
  }
};

// 공유 캘린더 멤버 초대 API
export const InviteMembers = async (members) => {
  try {
    const response = await customAxios.post(
      '/shared-calendar/invite',
      { members },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('캘린더 멤버 초대 오류', error);
    throw error;
  }
};

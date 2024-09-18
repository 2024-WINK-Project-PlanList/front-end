import { customAxios } from './customAxios';

const getToken = () => {
  return localStorage.getItem('token');
  // return process.env.REACT_APP_TEST_TOKEN;
};

// 캘린더 목록 조회 API
export const getCalendarList = async () => {
  try {
    const response = await customAxios.get(`/shared-calendar`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('캘린더 목록 조회 오류', error);
    throw error;
  }
};

// 공유캘린더 생성 API
export const createSharedCalendar = async (calendarData) => {
  try {
    const response = await customAxios.post(
      `/shared-calendar`,
      {
        name: calendarData.name,
        description: calendarData.description,
        imageBase64: calendarData.imageBase64,
        membersToInvite: calendarData.membersToInvite,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('공유 캘린더 생성 오류', error);
    throw error;
  }
};

// 공유캘린더 수정 API
export const modifySharedCalendar = async (calendarId, calendarData) => {
  try {
    const response = await customAxios.patch(
      `/shared-calendar/${calendarId}`,
      {
        name: calendarData.name,
        description: calendarData.description,
        imageBase64: calendarData.imageBase64,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('공유 캘린더 수정 오류', error);
    throw error;
  }
};

// 공유캘린더 삭제 API
export const deleteSharedCalendar = async (calendarId) => {
  try {
    await customAxios.delete(`/shared-calendar/${calendarId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.error('공유 캘린더 나가기 오류', error);
    throw error;
  }
};

// 공유캘린더 조회 API
export const getSharedCalendar = async (calendarId) => {
  try {
    await customAxios.get(`/shared-calendar/${calendarId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (error) {
    console.error('공유 캘린더 조회 오류', error);
    throw error;
  }
};

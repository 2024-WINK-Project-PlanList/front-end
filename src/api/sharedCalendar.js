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
    // FormData 인스턴스 여부 확인
    const isFormData = calendarData instanceof FormData;

    const response = await customAxios.post(
      '/shared-calendar',
      isFormData
        ? calendarData
        : JSON.stringify({
            name: calendarData.name,
            description: calendarData.description,
            membersToInvite: calendarData.membersToInvite || [],
          }),
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': isFormData
            ? 'multipart/form-data'
            : 'application/json',
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
    const isFormData = calendarData instanceof FormData;

    const response = await customAxios.patch(
      `/shared-calendar/${calendarId}`,
      isFormData
        ? calendarData
        : JSON.stringify({
            name: calendarData.name,
            description: calendarData.description,
          }),
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': isFormData
            ? 'multipart/form-data'
            : 'application/json',
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

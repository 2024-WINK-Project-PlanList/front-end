import React, { useState, useEffect } from 'react';
import { customAxios } from '../../api/customAxios';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import NotificationItem from '../../components/notification/NotificationItem';
const token = localStorage.getItem('token');

const Notification = () => {
  const [notificationList, setNotificationList] = useState([]);

  const onRemove = (id) => {
    setNotificationList(notificationList.filter((Item) => Item.id !== id));
  };

  useEffect(() => {
    customAxios
      .get(`/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotificationList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('알림 조회하기 오류', error);
      });

    const handleBeforeUnload = () => {
      customAxios
        .patch(`/notification`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .catch((error) => {
          console.error('알림 읽음 처리 오류', error);
        });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Header />
      <div className={'tracking-tight'}>
        <div>
          <p className={'m-5 mb-2 font-bold text-[1.0625rem]'}>최근 알림</p>
          {notificationList.some((item) => !item.isRead) || (
            <p className={'text-center my-10 text-sm'}>최근 알림이 없습니다</p>
          )}
          <div>
            {notificationList
              .filter((item) => !item.isRead)
              .map((item) => (
                <NotificationItem
                  key={item.id}
                  value={item}
                  onRemove={onRemove}
                />
              ))}
          </div>
        </div>
        <div>
          <p className={'m-5 mb-2 font-bold text-[1.0625rem]'}>지난 알림</p>
          {notificationList.some((item) => item.isRead) || (
            <p className={'text-center my-10 text-sm'}>지난 알림이 없습니다</p>
          )}
          {notificationList
            .filter((item) => item.isRead)
            .map((item) => (
              <NotificationItem
                key={item.id}
                value={item}
                onRemove={onRemove}
              />
            ))}
        </div>
      </div>
      <div className={'h-20'} />
      <Footer />
    </>
  );
};

export default Notification;

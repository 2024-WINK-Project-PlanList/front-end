import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const Item = ({ isNew, type }) => {
  const title = `${type}형식의 알림`;
  const text = `${type}형식의 알림이 왔습니다`;

  const onAllow = () => {
    console.log('수락');
  };
  const onDeny = () => {
    console.log('거절');
  };

  return (
    <div className={'flex justify-between mb-5'}>
      <div className={'ml-5 w-9/12'}>
        <div
          className={`rounded-full w-[0.375rem] h-[0.375rem] translate-y-[0.375rem] ${isNew && 'bg-blue-400'}`}
        />
        <p className={'ml-2 text-sm font-semibold'}>{title}</p>
        <p className={'ml-3 mt-2 w-full text-[0.7rem] text-gray-900'}>{text}</p>
      </div>
      {type === 'INVITATION' || type === 'FRIEND' ? (
        <div
          className={
            'my-auto mr-5 flex justify-between text-white text-center content-center text-sm'
          }
        >
          <button
            className={'bg-blue-400 rounded-lg w-[3.75rem] h-6'}
            onClick={onAllow}
          >
            수락
          </button>
          <div className={'w-2'} />
          <button
            className={'bg-gray-400 rounded-lg w-[3.75rem] h-6'}
            onClick={onDeny}
          >
            거절
          </button>
        </div>
      ) : (
        <div className={'border-2 w-12 h-12 rounded-lg mx-5'} />
      )}
    </div>
  );
};

const Notification = () => {
  const testList = [
    { id: 1, type: 'NORMAL', isRead: false },
    { id: 2, type: 'FRIEND', isRead: false },
    { id: 3, type: 'INVITATION', isRead: false },
    { id: 4, type: 'NORMAL', isRead: true },
    { id: 5, type: 'FRIEND', isRead: true },
    { id: 6, type: 'INVITATION', isRead: true },
  ];

  return (
    <>
      <Header />
      <div className={'tracking-tight'}>
        <div>
          <p className={'m-5 mb-2 font-bold text-[1.0625rem]'}>최근 알림</p>
          {testList.some((item) => !item.isRead) || (
            <p className={'text-center my-10 text-sm'}>최근 알림이 없습니다</p>
          )}
          <div>
            {testList
              .filter((item) => !item.isRead)
              .map((item) => (
                <Item key={item.id} type={item.type} isNew={true} />
              ))}
          </div>
        </div>
        <div>
          <p className={'m-5 mb-2 font-bold text-[1.0625rem]'}>지난 알림</p>
          {testList.some((item) => item.isRead) || (
            <p className={'text-center my-10 text-sm'}>지난 알림이 없습니다</p>
          )}
          {testList
            .filter((item) => item.isRead)
            .map((item) => (
              <Item key={item.id} type={item.type} isNew={false} />
            ))}
        </div>
      </div>
      <div className={'h-20'} />
      <Footer />
    </>
  );
};

export default Notification;

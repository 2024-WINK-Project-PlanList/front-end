import React from 'react';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../../api/customAxios';
const token = localStorage.getItem('token');

const Friend = ({ value, onRemove }) => {
  const onAllow = () => {
    customAxios
      .post(
        `/friend/accept`,
        {
          friendshipId: value.referenceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          onRemove(value.id);
        }
      })
      .catch((error) => console.error('친구 요청 수락 오류', error));
  };
  const onDeny = () => {
    customAxios
      .delete(`/friend/${value.referenceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        onRemove(value.id);
      })
      .catch((error) => console.error('친구 요청 거절 오류', error));
  };
  return (
    <div className={'flex justify-between mb-5'}>
      <div className={'ml-5 w-9/12'}>
        <div
          className={`rounded-full w-[0.375rem] h-[0.375rem] translate-y-[0.375rem] ${value.isRead || 'bg-blue-400'}`}
        />
        <p className={'ml-2 text-sm font-semibold'}>{value.title}</p>
        <p className={'ml-3 mt-2 w-full text-[0.7rem] text-gray-900'}>
          {value.message}
        </p>
      </div>
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
    </div>
  );
};

const Invitation = ({ value, onRemove }) => {
  const onAllow = () => {
    customAxios
      .post('/shared-calendar/join', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          inviteId: value.referenceId,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onRemove(value.id);
        }
      })
      .catch((error) => console.error('공유 캘린더 초대 수락 오류', error));
  };
  const onDeny = () => {
    customAxios
      .delete('/shared-calendar/invite', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          inviteId: value.referenceId,
        },
      })
      .then(() => {
        onRemove(value.id);
      })
      .catch((error) => console.error('공유 캘린더 초대 거절 오류', error));
  };

  return (
    <div className={'flex justify-between mb-5'}>
      <div className={'ml-5 w-9/12'}>
        <div
          className={`rounded-full w-[0.375rem] h-[0.375rem] translate-y-[0.375rem] ${value.isRead || 'bg-blue-400'}`}
        />
        <p className={'ml-2 text-sm font-semibold'}>{value.title}</p>
        <p className={'ml-3 mt-2 w-full text-[0.7rem] text-gray-900'}>
          {value.message}
        </p>
      </div>
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
    </div>
  );
};

const Normal = ({ value }) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (value.link) {
      navigate(`${value.link}`);
    }
  };

  return (
    <div className={'flex justify-between mb-5'} onClick={onClick}>
      <div className={'ml-5 w-9/12'}>
        <div
          className={`rounded-full w-[0.375rem] h-[0.375rem] translate-y-[0.375rem] ${value.isRead || 'bg-blue-400'}`}
        />
        <p className={'ml-2 text-sm font-semibold'}>{value.title}</p>
        <p className={'ml-3 mt-2 w-full text-[0.7rem] text-gray-900'}>
          {value.message}
        </p>
      </div>
      {value.imagePath && (
        <div className={`border-2 w-12 h-12 rounded-lg mx-5 bg-[require()]`} />
      )}
    </div>
  );
};

const NotificationItem = ({ value, onRemove }) => {
  switch (value.type) {
    case 'FRIEND':
      return <Friend value={value} onRemove={onRemove} />;
    case 'INVITATION':
      return <Invitation value={value} onRemove={onRemove} />;
    case 'NORMAL':
      return <Normal value={value} />;
    default:
      break;
  }
};

export default NotificationItem;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { ReactComponent as Arrow } from '../../assets/todolist/arrow.svg';

const Day = ({ date, focus, todoExist }) => {
  const navigate = useNavigate();
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const setColor = (num) => {
    if (num === '0') {
      return 'text-red-600';
    } else if (num === '6') {
      return 'text-blue-600';
    } else {
      return 'text-black';
    }
  };

  const setDate = () => {
    navigate(`/todolist/${date.format('YYMMDD')}`);
  };

  return (
    <div>
      <div className={`text-xs ${setColor(date.format('d'))}`}>
        {days[date.format('d')]}
      </div>
      <div
        className={`w-9 h-9 content-center ${focus && 'rounded-full bg-blue-400 text-white'}`}
        onClick={setDate}
      >
        {date.format('D')}
      </div>
      <div
        className={`w-2 h-2 rounded-full mx-auto mt-1 ${todoExist && 'bg-red-600'}`}
      />
    </div>
  );
};

const Days = ({ date, todoExist }) => {
  const navigate = useNavigate();
  const fixedDate = dayjs(
    `20${date[0] + date[1]}-${date[2] + date[3]}-${date[4] + date[5]}`,
  );

  return (
    <div className={'mt-3'}>
      <div className={'text-center font-bold'}>{fixedDate.format('M')}월</div>
      <div className={'flex justify-between text-center items-center text-xl'}>
        <Arrow
          className={'ml-2 mt-2'}
          style={{ transform: 'rotate(180deg)' }}
          onClick={() =>
            navigate(`/todolist/${fixedDate.add(-7, 'day').format('YYMMDD')}`)
          }
        />
        <Day date={fixedDate.add(-3, 'day')} todoExist={todoExist[0]} />
        <Day date={fixedDate.add(-2, 'day')} todoExist={todoExist[1]} />
        <Day date={fixedDate.add(-1, 'day')} todoExist={todoExist[2]} />
        <Day date={fixedDate} focus={true} todoExist={todoExist[3]} />
        <Day date={fixedDate.add(1, 'day')} todoExist={todoExist[4]} />
        <Day date={fixedDate.add(2, 'day')} todoExist={todoExist[5]} />
        <Day date={fixedDate.add(3, 'day')} todoExist={todoExist[6]} />
        <Arrow
          className={'mr-2 mt-2'}
          onClick={() =>
            navigate(`/todolist/${fixedDate.add(7, 'day').format('YYMMDD')}`)
          }
        />
      </div>
    </div>
  );
};

export default Days;

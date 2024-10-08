import React from 'react';
import dayjs from 'dayjs';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Home } from '../../assets/footer/home.svg';
import { ReactComponent as Calendar } from '../../assets/footer/calendar.svg';
import { ReactComponent as TodoList } from '../../assets/footer/todolist.svg';
import { ReactComponent as MyPage } from '../../assets/footer/mypage.svg';

const Footer = () => {
  const location = useLocation().pathname.split('/')[1];

  return (
    <footer>
      <div className={'fixed bottom-0 bg-white max-w-[480px] w-full'}>
        <div className="border-t" />
        <div className={'flex justify-between px-10 pb-4'}>
          <Link to={`/main`} className={'p-5'}>
            <Home
              width={'2.3rem'}
              height={'2.3rem'}
              stroke={location === 'main' ? '#000000' : '#858585'}
            />
          </Link>
          <Link to={`/calendar`} className={'p-5'}>
            <Calendar
              width={'2.3rem'}
              height={'2.3rem'}
              fill={location === 'calendar' ? '#000000' : '#858585'}
            />
          </Link>
          <Link to={`/todolist/${dayjs().format('YYMMDD')}`} className={'p-5'}>
            <TodoList
              width={'2.3rem'}
              height={'2.3rem'}
              fill={location === 'todolist' ? '#000000' : '#858585'}
            />
          </Link>
          <Link to={`/mypage`} className={'p-5'}>
            <MyPage
              width={'2.3rem'}
              height={'2.3rem'}
              fill={
                ['mypage', 'playList', 'friends'].includes(location)
                  ? '#000000'
                  : '#858585'
              }
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Home } from '../../assets/footer/home.svg';
import { ReactComponent as Calendar } from '../../assets/footer/calendar.svg';
import { ReactComponent as TodoList } from '../../assets/footer/todolist.svg';
import { ReactComponent as MyPage } from '../../assets/footer/mypage.svg';

const Footer = () => {
  const location = useLocation().pathname.split('/')[1];

  return (
    <footer className={'fixed bottom-0 bg-white w-p'}>
      <div className="border-t" />
      <div className={'flex justify-between px-10 pb-4'}>
        <Link to={'/main'} className={'p-5'}>
          <Home
            width={'2.3rem'}
            height={'2.3rem'}
            stroke={location === 'main' ? '#000000' : '#858585'}
          />
        </Link>
        <Link to={'/calendar'} className={'p-5'}>
          <Calendar
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'calendar' ? '#000000' : '#858585'}
          />
        </Link>
        <Link to={'/todolist'} className={'p-5'}>
          <TodoList
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'todolist' ? '#000000' : '#858585'}
          />
        </Link>
        <Link to={'/mypage'} className={'p-5'}>
          <MyPage
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'mypage' ? '#000000' : '#858585'}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

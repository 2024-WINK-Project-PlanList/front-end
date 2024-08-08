import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Home } from '../../assets/footer_icon/home.svg';
import { ReactComponent as Calendar } from '../../assets/footer_icon/calendar.svg';
import { ReactComponent as TodoList } from '../../assets/footer_icon/todolist.svg';
import { ReactComponent as MyPage } from '../../assets/footer_icon/mypage.svg';

const Footer = ({ location }) => {
  return (
    <footer
      className={'fixed bottom-0 w-full bg-white'}
      style={{ width: '480px' }}
    >
      <div className="border mx-2 mt-2" />
      <div className={'flex justify-between px-10 py-2'}>
        <Link to={'/main'} className={'p-5'}>
          <Home
            width={'2.3rem'}
            height={'2.3rem'}
            stroke={location === 'main' ? '#000000' : '#858585'}
          />
        </Link>
        <Link to={'/shared calendar'} className={'p-5'}>
          <Calendar
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'shared calendar' ? '#000000' : '#858585'}
          />
        </Link>
        <Link to={'/todolist'} className={'p-5'}>
          <TodoList
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'todolist' ? '#000000' : '#858585'}
          />
        </Link>
        <Link to={'/my page'} className={'p-5'}>
          <MyPage
            width={'2.3rem'}
            height={'2.3rem'}
            fill={location === 'my page' ? '#000000' : '#858585'}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
